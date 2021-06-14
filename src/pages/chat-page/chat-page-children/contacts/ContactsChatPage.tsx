import {IUserInfosReducer} from "../../../../@types/redux";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/reducers/RootReducer.reducer.redux";
import {Col, Container, Row} from "react-bootstrap";
import FriendListContacts from "./left-side/FriendListContacts";


const ContactsChatPage = () => {
    const friendListStateRedux:IUserInfosReducer = useSelector((state: RootState) => {
        return state.friendsList;
    });

    if (!friendListStateRedux){
        return null;
    }
    return (
        <Container fluid>
            <Row className="pl-5">
                <Col xs={3}>
                    <FriendListContacts />
                </Col>
            </Row>
        </Container>
    )
}
export default ContactsChatPage;