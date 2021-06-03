import {Col, Container, Row} from "react-bootstrap";
import ChatAreaRoomName from "./ChatAreaRoomName";
import "./scss/chatarea.scss"
import ChatAreaInput from "./ChatAreaInput";
import ChatAreaDialog from "./ChatAreaDialog";

const ChatAreaChatPage = () => {
    return (
        <Container fluid className="bg-very-light-secondary rounded-1rem chat-area-chat-page">
            <ChatAreaRoomName/>
            <ChatAreaDialog />
            <ChatAreaInput />
        </Container>
    )
}
export default ChatAreaChatPage;