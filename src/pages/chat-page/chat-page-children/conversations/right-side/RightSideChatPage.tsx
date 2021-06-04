import { Col, Row } from "react-bootstrap";
import RightSideOnlineFriendsList from "./RightSideOnlineFriendsList";
import "./scss/rightsidecahtpage.scss";

const RightSideChatPage = () => {
    return (
        <Row className="vh-100">
            <Col xs="12" className="h-55">
                media
            </Col>
            <Col xs="12" className="h-45 vh-45">
                <RightSideOnlineFriendsList />
            </Col>
        </Row>
    )
}
export default RightSideChatPage;