import {Row, Col} from "react-bootstrap";

const ChatAreaDialog = () => {
    return (
        <Row className="chat-area-dialog">
            <Col xs={6} className="message-box border rounded-1rem bg-success">
                <div className="message-text">Hello</div>
            </Col>
        </Row>
    )
}
export default ChatAreaDialog