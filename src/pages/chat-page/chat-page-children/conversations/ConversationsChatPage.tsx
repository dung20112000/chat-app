import {useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import withAuthentication from "../../../../helpers/HOCs/withAuthentication";
import { RootState } from "../../../../redux/reducers/RootReducer.reducer.redux";

import {IUserInfosReducer} from "../../../../@types/redux";
import LeftSideChatPage from "./left-side/LeftSideChatPage";
import RightSideChatPage from "./right-side/RightSideChatPage";
import ChatAreaChatPage from "./chat-area/ChatAreaChatPage";
const ConversationsChatPage = () => {
    const userInfosStateRedux:IUserInfosReducer = useSelector((state: RootState) => {
        return state.userInfos;
    });

    if (!userInfosStateRedux){
        return null;
    }
    return (
        <Container fluid>
            <Row className="pl-5">
                <Col xs={3}>
                    <LeftSideChatPage/>
                </Col>
                <Col xs={6}>
                    <ChatAreaChatPage/>
                </Col>
                <Col xs={3}>
                   <RightSideChatPage/>
                </Col>
            </Row>
        </Container>
    )
};

export default withAuthentication(ConversationsChatPage);