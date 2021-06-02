import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import withAuthentication from "../../../../helpers/HOCs/withAuthentication";
import { fetchUserInfos } from '../../../../redux/actions/users.actions.redux';
import { RootState } from "../../../../redux/reducers/RootReducer.reducer.redux";
import { createSocket } from "../../../../server-interaction/socket.services";
import { addSocket } from "../../../../redux/actions/socket.actions.redux";
import {notifySuccess} from "../../../../helpers/functions/notify.helper";
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
                <Col>
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