import {IUserInfosReducer} from "../../../../@types/redux";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/reducers/root.reducer.redux";
import {Col, Container, Row} from "react-bootstrap";
import LeftSideFriendListContacts from "./left-side/LeftSideFriendListContacts";
import FriendsSuggestion from "./right-side/RightSideFriendsSuggestion";



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
                <LeftSideFriendListContacts />
                <Col xs={9}>
                    <FriendsSuggestion />
                </Col>
            </Row>
        </Container>
    )
}
export default ContactsChatPage;