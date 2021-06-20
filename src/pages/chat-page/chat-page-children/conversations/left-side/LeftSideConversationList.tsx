import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Container} from "react-bootstrap";
import {
    ConversationBlockCommon,
    ConversationBlockGroup
} from "../../../../../common-components/conversation-block.common";
import {callApi} from "../../../../../server-interaction/apis/api.services";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux/reducers/RootReducer.reducer.redux";
import {IResponseConversationsList} from "../../../../../@types/api.response";
import {IUserFriendsList} from "../../../../../@types/redux";
import {EOnlineStatus} from "../../../../../@types/enums.d";
import {Socket} from "socket.io-client";
import {onServerSendMessage} from "../../../../../server-interaction/socket-handle/socket-chat";
import {useLocation,useRouteMatch} from "react-router-dom";


const ShowConversations: React.FC<IResponseConversationsList> = (props) => {
    const {pathname} = useLocation();
    const urlConversationsId = pathname.replace("/chat-page/conversations/","");

    const friendsListStateRedux: IUserFriendsList[] = useSelector((state: RootState) => state.friendsList);
    const {_id: conversationsId} = props;
    const {participants, roomName, dialogs} = props.room;
    if (!dialogs || dialogs.length === 0) return null;
    const {
        sender: {personalInfos: {firstName: senderFirstName, lastName: senderLastName}},
        message,
        updatedAt
    } = dialogs[0] ;
    const senderLastMessage = senderFirstName + senderLastName;
    const participantsNames = ()=> {
        return participants.length > 1 ? participants.reduce((allNames: string, member) => {
            const {userId: {personalInfos: {firstName, lastName}}} = member;
            allNames += `${firstName} ${lastName}, `
            return allNames;
        }, "") : `${participants[0].userId.personalInfos.firstName} ${participants[0].userId.personalInfos.lastName}`
    }
    if (!friendsListStateRedux) return null;
    if (participants.length > 2) {
        return <ConversationBlockGroup currentUserAvatarUrl={""}
                                       groupName={roomName ? roomName : participantsNames()}
                                       lastMessage={{sender: senderLastMessage, message}}
                                       members={participants.length + 1} active={urlConversationsId === conversationsId}/>
    }
    const {
        userId: {
            _id: partnerId,
            personalInfos: {
                firstName: partnerFirstName,
                lastName: partnerLastName,
                avatarUrl: partnerAvatarUrl
            }
        }
    } = participants[0];
    const partnerName = `${partnerFirstName} ${partnerLastName}`;
    const isFriend = friendsListStateRedux.find(friend => friend._id === partnerId);
    if (!isFriend) {
        return <ConversationBlockCommon
            lastMessageTime={updatedAt}
            status={EOnlineStatus.offline} key={partnerId} id={conversationsId}
            friendName={partnerName} avatarUrl={partnerAvatarUrl}
            lastMessage={message}
            active={urlConversationsId === conversationsId}/>
    }
    return <ConversationBlockCommon
        lastMessageTime={updatedAt}
        status={isFriend.onlineStatus} key={partnerId} id={conversationsId}
        friendName={partnerName} avatarUrl={partnerAvatarUrl}
        lastMessage={message}
        active={urlConversationsId === conversationsId}/>
}

// const ShowConversationsMemo = React.memo(ShowConversations);


const LeftSideConversationList = () => {
    const [conversationsList, setConversationsList] = useState<null | IResponseConversationsList[]>(null);
    const socketStateRedux: Socket = useSelector((state: RootState) => state.socket);
    useEffect(() => {
        (
            async () => {
                const response = await callApi("/conversations", "GET");
                if (response && response.status === 200 && response.data && response.data.conversations) {
                    const {conversations} = response.data;
                    setConversationsList(conversations);
                }
            }
        )()
    }, []);
    const updateDialogs = useCallback(async ( serverData:any,conversationsList: IResponseConversationsList[]) => {
        const {conversationId,...rest} = serverData;
        const indexIdInList = conversationsList.findIndex(conversation => conversation._id === conversationId);
        if (indexIdInList < 0){
            const response = await callApi(`conversations/${conversationId}`,"GET");
            response && response.status === 200 ? conversationsList.push(response.data.conversationsInfo) : console.log(response);
            conversationsList.unshift(response.data.conversationsInfo);
            return [...conversationsList];
        }
        conversationsList[indexIdInList].room.dialogs = [{...rest}];
        const topPushing = conversationsList[indexIdInList];
        conversationsList.splice(indexIdInList,1);
        conversationsList.unshift(topPushing);
        return [...conversationsList];

    },[])
    useEffect(() => {
        if (socketStateRedux && conversationsList) {
            onServerSendMessage(socketStateRedux,async (data:any)=>{
                if(data){
                    const newState = await updateDialogs(data,conversationsList);
                    setConversationsList(newState);
                }
            })
        }
    }, [socketStateRedux,conversationsList])
    return (
        <Container fluid>
            {
                conversationsList && conversationsList.length > 0 ? conversationsList.map((conversation, index) => {
                    const {_id} = conversation;
                    return <ShowConversations {...conversation} key={_id}/>
                }) : conversationsList && conversationsList.length === 0 ?
                    <p>You have no conversation</p> : <p>Loading</p>
            }
        </Container>
    )
}
export default React.memo(LeftSideConversationList);
