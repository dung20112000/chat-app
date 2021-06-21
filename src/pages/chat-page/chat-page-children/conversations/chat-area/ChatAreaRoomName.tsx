import {Row,Col} from "react-bootstrap";
import {AvatarWithStatus} from "../../../../../common-components/avatar.common";

interface IPropsChatAreaRoomName {
    participants: any[],
}
const ChatAreaRoomName = ({participants}:IPropsChatAreaRoomName) => {
    if (!participants || participants.length === 0) {
        return (
            <Row className="vh-100">
            </Row>
        )
    }
        const participantsNames = ()=> {
        return participants.length > 1 ? participants.reduce((allNames: string, member) => {
            const {userId: {personalInfos: {firstName, lastName}}} = member;
            allNames += `${firstName} ${lastName}, `
            return allNames;
        }, "") : `${participants[0].userId.personalInfos.firstName} ${participants[0].userId.personalInfos.lastName}`
    }
    const participantsAvatar = () => {
        return participants.length === 1 ? `${participants[0].userId.personalInfos.avatarUrl}` : ""
    }
    return (
        <Row className="px-3 py-3 align-items-center border-bottom bg-light-secondary chat-area-room-name">
            <Col xs={4}>
                <Row className="d-flex align-items-center">
                    <Col xs={4}>
                        <AvatarWithStatus avatarUrl={participantsAvatar()} alt={participantsNames()} />
                    </Col>
                    <Col className="pl-0">
                        <h4>{participantsNames()}</h4>
                    </Col>
                </Row>
            </Col>
            <Col className="text-right">
                <div>
                    <i className="fas fa-ellipsis-v"/>
                </div>
            </Col>
        </Row>
    )
}
export default ChatAreaRoomName;