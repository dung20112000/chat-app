import {Row, Col, Container} from "react-bootstrap";
import LeftSideUserInfos from "./LeftSideUserInfos";
const LeftSideChatPage = () => {
    return (
        <Container fluid={true}>
            <Row>
                <Col xs={12}>
                    {/*logo*/}
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <LeftSideUserInfos/>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    {/*search conversation*/}
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    {/*conversations list*/}
                </Col>
            </Row>
        </Container>
    )
}
export default LeftSideChatPage