import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import withAuthentication from "../../helpers/HOCs/withAuthentication";
import { fetchUserInfos } from './../../redux/actions/users.actions.redux';
import { RootState } from "../../redux/reducers/RootReducer.reducer.redux";
import { createSocket } from "../../server-interaction/socket.services";
import { addSocket } from "../../redux/actions/socket.actions.redux";
import {notifySuccess} from "../../helpers/functions/notify.helper";
import {IUserInfosReducer} from "../../@types/redux";
import LeftSideChatPage from "./chat-page-children/left-side/LeftSideChatPage";
const ChatPage = () => {
    const dispatch = useDispatch();
    const userInfosStateRedux:IUserInfosReducer = useSelector((state: RootState) => {
        return state.userInfos;
    });
    const socketStateRedux = useSelector((state: RootState) => state.socket);

    useEffect(() => {
        const socketInstance = createSocket();
        if (socketInstance) {
            dispatch(addSocket(socketInstance))
        };
        dispatch(fetchUserInfos());
    }, [dispatch]);

   useEffect(() =>{
       if(userInfosStateRedux){
           notifySuccess(`Welcome back , ${userInfosStateRedux.personalInfos.firstName}  ${userInfosStateRedux.personalInfos.lastName}`)
       }
   },[userInfosStateRedux])
    if (!userInfosStateRedux){
        return null;
    }
    return (
        <Container fluid>
            <Row>
                <Col xs={1}>
                {/*    sidebar*/}
                </Col>
                <Col xs={3}>
                    <LeftSideChatPage/>
                </Col>
                <Col>
                    {/*Chat Area*/}
                </Col>
                <Col xs={3}>
                    {/*RightSide*/}
                </Col>
            </Row>
        </Container>
    )
};

export default withAuthentication(ChatPage);