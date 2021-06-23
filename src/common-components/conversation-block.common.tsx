import {Row, Col} from "react-bootstrap";
import {AvatarGroup, AvatarWithStatus} from "./avatar.common";
import React from "react";
import "./scss/conversation-block.common.scss"
import {EOnlineStatus} from "../@types/enums";
import {useHistory} from "react-router-dom";
import TimeDistanceCommon from "./time-distance.common";

interface IConversationBlockCommon {
    avatarUrl: string,
    friendName: string,
    lastMessage: string,
    active?: boolean,
    id: string,
    status: EOnlineStatus,
    lastMessageTime: any,
    updateSeen: boolean,
    seenAction: (conversationsId: string) => void;
}

interface IConversationsBlockGroup {
    currentUserAvatarUrl: string;
    groupName: string;
    lastMessage: {
        sender: string;
        message: string;
    };
    active?: boolean;
    members: number;

}

export const ConversationBlock: React.FC<IConversationBlockCommon> = ({
                                                                          lastMessageTime,
                                                                          status,
                                                                          id,
                                                                          avatarUrl,
                                                                          friendName,
                                                                          lastMessage,
                                                                          active,
                                                                          updateSeen,
                                                                          seenAction
                                                                      }) => {
    const history = useHistory();
    const dotSeen = <div className="rounded-circle bg-primary"
                         style={{width: "0.75rem", height: "0.75rem"}}/>;
    const onClickConversations = () => {
        seenAction(id);
        history.push(`/chat-page/conversations/${id}`)
    }
    return (
        <Row
            className={active ? "py-3 rounded-1rem align-items-stretch active conversation-block-common mb-2" : "py-3 mb-2 rounded-1rem align-items-stretch conversation-block-common"}
            onClick={onClickConversations}>
            <Col xs={3}>
                <AvatarWithStatus status={status} avatarUrl={avatarUrl} alt={friendName}/>
            </Col>
            <Col xs={6} className="pt-2 pl-0">
                <div>
                    <h5 className={`mb-1 text-truncate ${!updateSeen ? "font-weight-bold" : ""}`}>{friendName} </h5>
                    <p className={`m-0 text-truncate  ${!updateSeen ? "font-weight-bold text-dark" : "text-muted"}`}>{lastMessage} </p>
                </div>
            </Col>
            {
                !updateSeen ? <Col>
                    <div
                        className="d-flex align-items-center justify-content-end h-100">{dotSeen}</div>
                </Col> : <TimeDistanceCommon lastMessageTime={lastMessageTime}/>
            }
        </Row>
    )
}
export const ConversationBlockCommon = React.memo(ConversationBlock);
export const ConversationGroup: React.FC<IConversationsBlockGroup> = ({
                                                                          currentUserAvatarUrl,
                                                                          active,
                                                                          members,
                                                                          groupName,
                                                                          lastMessage
                                                                      }) => {
    return (
        <Row
            className={active ? "py-3 rounded-1rem align-items-stretch active conversation-block-common mb-2" : "py-3 mb-2 rounded-1rem align-items-stretch conversation-block-common"}>
            <Col xs={3}>
                <AvatarGroup avatarUrl={currentUserAvatarUrl} alt={"Huy"} altMembers={"Huy"}
                             members={members}/>
            </Col>
            <Col xs={6} className="pt-2 pl-0">
                <div>
                    <h5 className="mb-1 text-truncate">{groupName}</h5>
                    <p className="m-0 text-truncate text-muted">{lastMessage.sender} : {lastMessage.message}</p>
                </div>
            </Col>
            <Col xs={3} className="text-right pt-2 pl-0">
                <div className="h-100">
                    <span className="text-muted">1 hour</span>
                </div>
            </Col>
        </Row>
    )

}
export const ConversationBlockGroup = React.memo(ConversationGroup);