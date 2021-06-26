import { Col, Row } from "react-bootstrap";
import RightSideOnlineFriendsList from "./RightSideOnlineFriendsList";
import "./scss/rightsidechatpage.scss";
import {Switch, Route} from "react-router-dom"
import RightSideChatDetail from "./RightSideChatDetail";
import RightSideSlideShow from "./RightSideSlideShow";

const RightSideChatPage = () => {
    return (
        <Row>
            <Col xs={12} className="pb-3 mb-5">
                <div style={{maxHeight:"30vh"}}>
                    <Switch>
                        <Route exact path="/chat-page/conversations" component={RightSideSlideShow} />
                        <Route path="/chat-page/conversations/:id" component={RightSideChatDetail} />
                    </Switch>
                </div>
            </Col>
            <Col xs="12">
                <RightSideOnlineFriendsList />
            </Col>
        </Row>
    )
}
export default RightSideChatPage;