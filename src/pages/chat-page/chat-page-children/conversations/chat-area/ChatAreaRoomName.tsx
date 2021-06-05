import {Row,Col} from "react-bootstrap";
import {AvatarWithStatus} from "../../../../../common-components/avatar.common";

const ChatAreaRoomName = () => {
    return (
        <Row className="px-3 py-3 align-items-center border-bottom bg-light-secondary chat-area-room-name">
            <Col xs={4}>
                <Row className="d-flex align-items-center">
                    <Col xs={4}>
                        <AvatarWithStatus avatarUrl={""} alt="Hoang" />
                    </Col>
                    <Col className="pl-0">
                        <h4>Hoangdz</h4>
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