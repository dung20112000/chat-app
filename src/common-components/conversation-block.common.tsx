import {Row,Col} from "react-bootstrap";
import {AvatarWithStatus} from "./avatar.common";
import {useState} from "react";
import "./scss/conversation-block.common.scss"

interface IConversationBlockCommon {
    avatarUrl?: string,
    friendName: string,
    lastMessage: string,
    lastTimeChat?: string,
}

const ConversationBlockCommon:React.FC<IConversationBlockCommon> = ({avatarUrl,friendName,lastMessage,lastTimeChat}) => {
    const [active, setActive] = useState(true);
    return (
        <Row className={active ? "border px-2 py-4 rounded-1rem align-items-stretch active" : "border px-2 py-4 rounded-1rem align-items-stretch"}>
            <Col xs={3}>
                <AvatarWithStatus avatarUrl={""} alt={friendName} />
            </Col>
            <Col xs={6} className="pl-0 pt-2">
                <div>
                    <h5>{friendName}</h5>
                    <p className="m-0">{lastMessage}</p>
                </div>
            </Col>
            <Col xs={3} className="text-right h-100 pt-2">
                <div className="h-100">
                    <p className="m-0 h-100">1 hour</p>
                </div>
            </Col>
        </Row>
    )
}
export default ConversationBlockCommon;
