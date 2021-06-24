import { Col, Row } from "react-bootstrap";
import RightSideOnlineFriendsList from "./RightSideOnlineFriendsList";
import "./scss/rightsidechatpage.scss";
import {Switch, Route} from "react-router-dom"
import RightSideChatDetail from "./RightSideChatDetail";
import RightSideSlideShow from "./RightSideSlideShow";

const RightSideChatPage = () => {
    return (
        <Row className="vh-100">
            <Col xs={12} className="pb-3">
                <Switch>
                    <Route exact path="/chat-page/conversations" component={RightSideSlideShow} />
                    <Route path="/chat-page/conversations/:id" component={RightSideChatDetail} />
                </Switch>
            </Col>
            <Col xs="12" className="h-45 vh-45">
                <RightSideOnlineFriendsList />
            </Col>
        </Row>
    )
}
export default RightSideChatPage;