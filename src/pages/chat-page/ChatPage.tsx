import {Container, Row,Col} from "react-bootstrap";
import withAuthentication from "../../helpers/HOCs/withAuthentication";
const ChatPage = ()=>{

    return (
        <Container fluid>
            <Row>
                <Col xs={3}>
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