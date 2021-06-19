import React from "react";
import {Container} from "react-bootstrap";
import {
    ConversationBlockCommon,
    ConversationBlockGroup
} from "../../../../../common-components/conversation-block.common";
import {useEffect, useState} from "react";
import {callApi} from "../../../../../server-interaction/api.services";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux/reducers/RootReducer.reducer.redux";
import {onServerSendMessage} from "../../../../../server-interaction/socket-handle/socket-chat";
import {Socket} from "socket.io-client";

const LeftSideConversationList = () => {
    const [conversationsList, setConversationsList] = useState<any[]>([])
    const idUserRedux = useSelector((state: RootState) => state.userInfos._id)
    const socketStateRedux: Socket = useSelector((state: RootState) => {
        return state.socket
    });
    const friendsListRedux = useSelector((state: RootState) => state.friendsList)
    useEffect(() => {
        callApi(`/conversations`, "get")
            .then(res => {
                if (res.data && res.data.userConversations && res.data.userConversations.conversations) {
                    setConversationsList(res.data.userConversations.conversations)
                }
            })
            .catch(err => console.log(err.response))
    }, [])
    useEffect(() => {
        if (socketStateRedux && conversationsList) {
            onServerSendMessage(socketStateRedux, (data: any) => {
                const {conversationId, ...rest} = data;
                const isConversationsIdInlist = conversationsList.find((item: any) => item._id === conversationId)
                if (!isConversationsIdInlist) {
                    callApi(`/conversations/${conversationId}`, "get").then((res) => {
                        if (res.status === 200 && res.data && res.data.conversationsInfo) {
                            setConversationsList([res.data.conversationsInfo, ...conversationsList])
                        }
                    })
                }
                if (isConversationsIdInlist) {
                    conversationsList.forEach((item: any, index) => {
                        if (item._id === conversationId && item.room && item.room.dialogs) {
                            item.room.dialogs.push({...rest})
                            setConversationsList([...conversationsList])
                        }
                    })
                }
            })
        }
    }, [socketStateRedux, conversationsList])
    const showConversationsList = (arrayList: any[]) => {
        console.log(arrayList)
        return arrayList.length > 0 ? arrayList.map((item, index) => {
            const {_id, room: {participants, roomName, dialogs}} = item;
            console.log(participants)
            if (dialogs.length === 0) return;
            const {message, updatedAt} = dialogs.length > 0 && dialogs[dialogs.length - 1]
            if (participants.length <= 2) {
                const idFriend = participants.find((item: any) => item.userId !== idUserRedux)
                if (idFriend && friendsListRedux) {
                    const friendChat = friendsListRedux.find((item: any) => item._id === idFriend.userId)
                    if (friendChat) {
                        const {
                            onlineStatus,
                            personalInfos: {firstName, lastName, avatarUrl}
                        } = friendChat
                        return <ConversationBlockCommon
                            lastMessageTime={updatedAt}
                            status={onlineStatus} key={_id} id={_id}
                            friendName={`${firstName} ${lastName}`} avatarUrl={avatarUrl}
                            lastMessage={message}/>
                    }
                }
            }
            return <ConversationBlockGroup currentUserAvatarUrl={""} groupName={"Huy"}
                                        lastMessage={{sender: "Huy", message: "abc"}}
                                        members={6}/>


        }) : null
    }
    return (
        <Container fluid>
            {
                showConversationsList(conversationsList)
                // conversationsList && conversationsList.length > 0 ? showConversationsList(conversationsList) : null
            }
        </Container>
    )
}
export default React.memo(LeftSideConversationList);
