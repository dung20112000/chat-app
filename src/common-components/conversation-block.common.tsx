import {Row,Col} from "react-bootstrap";
import {AvatarWithStatus} from "./avatar.common";
import React, {useState} from "react";
import "./scss/conversation-block.common.scss"

interface IConversationBlockCommon {
    avatarUrl?: string,
    friendName: string,
    lastMessage: string,
    lastTimeChat?: string,
    active?:boolean;
}

const ConversationBlockCommon:React.FC<IConversationBlockCommon> = ({avatarUrl,friendName,lastMessage,lastTimeChat,active}) => {
    return (
        <Row className={active ? "py-3 rounded-1rem align-items-stretch active conversation-block-common mb-2" : "py-3 mb-2 rounded-1rem align-items-stretch conversation-block-common"}>
            <Col xs={3}>
                <AvatarWithStatus avatarUrl={""} alt={friendName} />
            </Col>
            <Col xs={6} className="pt-2 pl-0">
                <div>
                    <h5 className="mb-1 text-truncate">{friendName} dajdhajdhwajdhakwdhwakdhak</h5>
                    <p className="m-0 text-truncate text-muted">{lastMessage} djadhjawhdjhdjwakdhakwdhwka</p>
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
export default ConversationBlockCommon;
