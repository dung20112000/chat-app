import {Container, Row, Col} from "react-bootstrap";
import {Avatar} from "../../../../../common-components/avatar.common";
import React from "react";

interface IChatDetailFriend {
    avatarUrl?: string,
    friendName: string,
    friendQuantity: number,
    lastMessage?: string,
}

const ChatDetailFriend: React.FC<IChatDetailFriend> = ({avatarUrl, friendName, friendQuantity,lastMessage}) => {
    return (
        <Row>
            <Col xs={3} className="pt-5 align-items-center">
                <Avatar avatarUrl={""} alt={friendName} />
            </Col>
            <Col xs={6} className="pt-5 pl-0 align-items-center" >
                <div>
                    <h5 className="mb-1 pt-2 text-truncate">{friendName}</h5>
                    <p className="m-0 text-truncate text-muted">{friendQuantity} members</p>
                </div>
            </Col>
            <Col xs={3} className="text-right pt-5 pl-0">
                <button className="btn pt-2">
                    <i className="fas fa-pencil-alt"/>
                </button>
            </Col>
        </Row>
    )
}
const RightSideChatDetail = () => {
    return (
        <Container>
            <Row className="align-items-center">
                <Col xs={2}>
                    <div className="rounded-circle w-100 position-relative bg-light-secondary" style={{paddingTop: "100%"}}>
                        <div className="position-absolute"
                             style={{top: "50%", left: "50%", transform: "translate(-50%,-50%)"}}>
                            <button style={{fontSize: "1.4rem"}} className="btn p-0" type="button"><i
                                className="fas fa-arrow-left"/></button>
                        </div>
                    </div>
                </Col>
                <Col xs={10} className="pl-0">
                    <h4>Chat Details</h4>
                </Col>
            </Row>
            <ChatDetailFriend friendName="Hoangabc" friendQuantity={1} />
            <Row className="align-items-center pt-3">
                <Col xs={6} className="pr-1">
                    <button className="btn btn-primary w-100 rounded-1rem pt-2 pb-2">
                        <i className="fas fa-phone-alt"/> Voice chat
                    </button>
                </Col>
                <Col xs={6} className="pl-1">
                    <button className="btn btn-danger w-100 rounded-1rem pt-2 pb-2">
                        <i className="fas fa-video"/> Video call
                    </button>
                </Col>
            </Row>
        </Container>
    )
}
export default RightSideChatDetail;