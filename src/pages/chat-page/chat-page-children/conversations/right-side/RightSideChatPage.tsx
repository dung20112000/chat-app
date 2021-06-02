import {Col, Row} from "react-bootstrap";
import RightSideOnlineFriendsList from "./RightSideOnlineFriendsList";
const RightSideChatPage = ()=>{
    return (
        <Row className="vh-100">
            <Col xs="12" className="h-25">
                media
            </Col>
            <Col xs="12">
                <RightSideOnlineFriendsList/>
            </Col>
        </Row>
    )
}
export default RightSideChatPage;