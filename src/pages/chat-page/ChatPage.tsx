import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import { callApi } from "../../server-interaction/api.services";

import withAuthentication from "../../helpers/HOCs/withAuthentication";
import { fetchUserInfos } from './../../redux/actions/users.actions.redux';
import { RootState } from "../../redux/reducers/RootReducer.reducer.redux";
import { createSocket } from "../../server-interaction/socket.services";
import { addSocket } from "../../redux/actions/socket.actions.redux";

const EMAIL = 'huy12@gmail.com';
const LOGIN = '/login';
const USER = "/users";
const ChatPage = () => {
    const dispatch = useDispatch();
    const userInfosStateRedux = useSelector((state: RootState) => {
        return state.userInfos;
    });

    useEffect(() => {
        const socketInstance = createSocket();
        if (socketInstance) dispatch(addSocket(socketInstance));
        dispatch(fetchUserInfos());
    }, [dispatch])

    const authToken = () => {
        callApi(LOGIN, "POST", { email: EMAIL, password: "123" }).then((res: any) => {
            localStorage.setItem("authToken", JSON.stringify(res.data.authToken));
        });
    }

    const getUserInfo = () => {
        dispatch(fetchUserInfos());
        // callApi(USER, "GET").then((res: any) => {
        //     console.log(res.data);
        // })
    }


    return (
        <Container fluid>
            <Row>
                <Col xs={3}>
                    <Button variant="primary" onClick={authToken}>Auth Token</Button>
                    {/*LeftSide*/}
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

export default ChatPage;