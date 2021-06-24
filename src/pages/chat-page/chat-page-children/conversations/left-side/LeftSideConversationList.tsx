import React, { useCallback, useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
    ConversationBlockCommon,
    ConversationBlockGroup
} from "../../../../../common-components/conversation-block.common";
import { callApi } from "../../../../../server-interaction/apis/api.services";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/reducers/RootReducer.reducer.redux";
import { IResponseConversationsList } from "../../../../../@types/api.response";
import { IUserFriendsList, IUserInfosReducer } from "../../../../../@types/redux";
import { EOnlineStatus } from "../../../../../@types/enums.d";
import { Socket } from "socket.io-client";
import {
    emitSeenMessage,
    onServerSendMessage
} from "../../../../../server-interaction/socket-handle/socket-chat";

import {useLocation} from "react-router-dom";
import {toggleScrollbar} from "../../../../../helpers/functions/toggle-scrollbar";

interface IPropsShowConversations extends IResponseConversationsList {
    seenAction: (conversationId: string) => void;
}

const ShowConversations: React.FC<IPropsShowConversations> = (props) => {
    const { pathname } = useLocation();
    const urlConversationsId = pathname.replace("/chat-page/conversations/", "");

    const friendsListStateRedux: IUserFriendsList[] = useSelector((state: RootState) => state.friendsList);
    const { _id: conversationsId, seenAction } = props;
    const { participants, roomName, dialogs, updateSeen } = props.room;
    if (!dialogs || dialogs.length === 0) return null;
    const {
        sender: { personalInfos: { firstName: senderFirstName, lastName: senderLastName } },
        message,
        updatedAt
    } = dialogs[0];
    const senderLastMessage = senderFirstName + senderLastName;
    const participantsNames = () => {
        return participants.length > 1 ? participants.reduce((allNames: string, member) => {
            const { userId: { personalInfos: { firstName, lastName } } } = member;
            allNames += `${firstName} ${lastName}, `
            return allNames;
        }, "") : `${participants[0].userId.personalInfos.firstName} ${participants[0].userId.personalInfos.lastName}`
    }
    if (!friendsListStateRedux) return null;
    if (participants.length > 2) {
        return <ConversationBlockGroup currentUserAvatarUrl={""}
            groupName={roomName ? roomName : participantsNames()}
            lastMessage={{ sender: senderLastMessage, message }}
            members={participants.length + 1}
            active={urlConversationsId === conversationsId} />
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
            active={urlConversationsId === conversationsId}
            updateSeen={updateSeen}
            seenAction={seenAction} />
    }
    return <ConversationBlockCommon
        lastMessageTime={updatedAt}
        status={isFriend.onlineStatus} key={partnerId} id={conversationsId}
        friendName={partnerName} avatarUrl={partnerAvatarUrl}
        lastMessage={message}
        active={urlConversationsId === conversationsId}
        updateSeen={updateSeen}
        seenAction={seenAction} />
}

// const ShowConversationsMemo = React.memo(ShowConversations);
interface IPropsSearch {
    handleChange: (searchValue: string) => void
}

const SearchConversation = (props: IPropsSearch) => {
    const onSearchChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const target = evt.target;
        const value = target.value;
        props.handleChange(value)
    }
    return (
        <Row className="mb-3">
            <Col xs={12}>
                <form>
                    <div>
                        <input
                            id="searchValues"
                            name="searchValues"
                            type="text"
                            onChange={onSearchChange}
                            placeholder="Search Conversation"
                            className="form-control"
                        />
                    </div>
                </form>
            </Col>
        </Row>
    )
}

const LeftSideConversationList = () => {
    const [conversationsList, setConversationsList] = useState<null | IResponseConversationsList[]>(null);
    const socketStateRedux: Socket = useSelector((state: RootState) => state.socket);
    const userInfosStateRedux: IUserInfosReducer = useSelector((state: RootState) => {
        return state.userInfos;
    });
    const allConversationsRef = useRef<any[]>([])
    const conversationItemRef = useRef(null);

    useEffect(()=>{
        toggleScrollbar(conversationItemRef.current);
    } ,[])

    useEffect(() => {
        (
            async () => {
                const response = await callApi("/conversations", "GET");
                if (response && response.status === 200 && response.data && response.data.conversations) {
                    const { conversations } = response.data;
                    allConversationsRef.current = conversations
                    setConversationsList(conversations);
                }
            }
        )()
    }, []);

    const isMatchParticipants = useCallback((participants: any[], searchValue: string) => {
        for (const participant of participants) {
            const { userId: { personalInfos: { firstName, lastName } } } = participant;
            const fullName = `${firstName} ${lastName}`;
            if (firstName.includes(searchValue)
                || lastName.includes(searchValue)
                || fullName.includes(searchValue)) {
                return true
            }
        }
        return false
    }, [])
    const handleSearch = (searchValue: string) => {
        if (allConversationsRef.current.length > 0 && conversationsList) {
            if (!searchValue) {
                setConversationsList(allConversationsRef.current)
            }
            const result = allConversationsRef.current.filter(conversation => {
                return conversation.room.roomName.includes(searchValue) ||
                    isMatchParticipants(conversation.room.participants, searchValue)

            })
            setConversationsList(result)
        }
    }

    const updateDialogs = useCallback(async (senderId: string, serverData: any, conversationsList: IResponseConversationsList[]) => {
        const { conversationId, ...rest } = serverData;
        const indexIdInList = conversationsList.findIndex(conversation => conversation._id === conversationId);
        if (indexIdInList < 0) {
            const response = await callApi(`conversations/${conversationId}`, "GET");
            response && response.status === 200 ? conversationsList.unshift(response.data.conversationsInfo) : console.log(response);
            return [...conversationsList];
        }
        if (senderId !== serverData.sender._id) {
            conversationsList[indexIdInList].room.updateSeen = false;
        }
        conversationsList[indexIdInList].room.dialogs = [{ ...rest }];
        const topPushing = conversationsList[indexIdInList];
        conversationsList.splice(indexIdInList, 1);
        conversationsList.unshift(topPushing);
        return [...conversationsList];

    }, []);
    const seenAction = (conversationsId: string) => {
        if (conversationsList && conversationsList.length > 0 && socketStateRedux) {
            const indexIdInList = conversationsList.findIndex((conversation) => conversation._id === conversationsId);
            if (indexIdInList >= 0) {
                conversationsList[indexIdInList].room.updateSeen = true;
                emitSeenMessage(socketStateRedux, conversationsId)
                setConversationsList([...conversationsList]);
            }
        }
    }
    useEffect(() => {
        if (socketStateRedux && conversationsList) {
            onServerSendMessage(socketStateRedux, async (data: any) => {
                if (data) {
                    const newState = await updateDialogs(userInfosStateRedux._id, data, conversationsList);
                    setConversationsList(newState);
                }
            })

        }
    }, [socketStateRedux, conversationsList, userInfosStateRedux?._id, updateDialogs]);
    return (
        <div>
            <SearchConversation handleChange={handleSearch}/>
            <div className="conversation-area">
                <div ref={conversationItemRef} className="conversation-item">
                    {
                        conversationsList && conversationsList.length > 0 ? conversationsList.map((conversation, index) => {
                            const {_id} = conversation;
                            return <ShowConversations seenAction={seenAction} {...conversation} key={_id}/>
                        }) : conversationsList && conversationsList.length === 0 ?
                            <p>You have no conversation</p> : <p>Loading</p>
                    }
                </div>
            </div>
        </div>
    )
}
export default React.memo(LeftSideConversationList);
