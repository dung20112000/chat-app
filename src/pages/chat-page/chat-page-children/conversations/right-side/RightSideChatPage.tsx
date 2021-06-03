import { Col, Row } from "react-bootstrap";
import RightSideOnlineFriendsList from "./RightSideOnlineFriendsList";
import "./scss/rightsidecahtpage.scss";

const RightSideChatPage = () => {
    return (
        <Row className="vh-100">
            <Col xs="12" className="h-40">
                media
            </Col>
            <Col xs="12" className="h-60 vh-60">
                <RightSideOnlineFriendsList />
            </Col>
        </Row>
    )
}
export default RightSideChatPage;