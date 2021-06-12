import {Row, Col, Container} from "react-bootstrap";
import LeftSideUserInfos from "./LeftSideUserInfos";
import LeftSideConversationList from "./LeftSideConversationList";
const LeftSideChatPage = () => {
    return (
        <Container fluid={true}>
            <Row className="my-3">
                <Col xs={12} >
                   <div className="border-bottom pb-3">
                       <img src="media/logo.svg" alt="" className="mw-100"/>
                   </div>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col xs={12}>
                    <div className="border-bottom pb-3">
                        <LeftSideUserInfos/>
                    </div>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col xs={12}>
                    <form>
                        <Row>
                            <Col xs={12}>
                                <div>
                                    <input type="text" className="form-control rounded" placeholder="Search conversations"/>
                                </div>
                            </Col>
                        </Row>
                    </form>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <LeftSideConversationList />
                </Col>
            </Row>
        </Container>
    )
}
export default LeftSideChatPage