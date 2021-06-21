import { Row, Col, Container } from "react-bootstrap";
import LeftSideUserInfos from "./LeftSideUserInfos";
import LeftSideConversationList from "./LeftSideConversationList";
import { ModalCreateChatGroup } from "./left-side-create-chat-group/ModalCreateChatGroup";
import { useState } from "react";
const LeftSideChatPage = () => {
    const [modalShow, setModalShow] = useState(false);

    const onModalShow = () => {
        setModalShow(true)
    }

    return (
        <Container fluid={true}>
            <Row className="my-3">
                <Col xs={12} >
                    <div className="border-bottom pb-3">
                        <img src="media/logo.svg" alt="" className="mw-100" />
                    </div>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col xs={12}>
                    <div className="border-bottom pb-3">
                        <LeftSideUserInfos />
                    </div>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col xs={12}>
                    <div className="d-flex align-items-center justify-content-between">
                        <h5 className="mb-0 mr-2">
                            Active Chats
                        </h5>
                        <button className="btn text-primary d-flex align-items-center p-0"
                            onClick={onModalShow}>
                            <i className="fas fa-users"></i>
                        </button>
                    </div>
                    <ModalCreateChatGroup
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                </Col>
            </Row>
            <Row className="mb-3">
                <Col xs={12}>
                    <form>
                        <Row>
                            <Col xs={12}>
                                <div>
                                    <input type="text" className="form-control rounded" placeholder="Search conversations" />
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