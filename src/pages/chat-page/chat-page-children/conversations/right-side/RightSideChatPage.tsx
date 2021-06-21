import { Col, Row } from "react-bootstrap";
import RightSideOnlineFriendsList from "./RightSideOnlineFriendsList";
import "./scss/rightsidechatpage.scss";
import RightSideChatFiles from "./RightSideChatFiles";
import RightSideChatDetail from "./RightSideChatDetail";

const RightSideChatPage = () => {
    return (
        <Row className="vh-100">
            <Col xs={12} className="pb-4">
                <RightSideChatDetail />
            </Col>
            <Col xs="12" className="h-45 vh-45">
                <RightSideOnlineFriendsList />
            </Col>
        </Row>
    )
}
export default RightSideChatPage;