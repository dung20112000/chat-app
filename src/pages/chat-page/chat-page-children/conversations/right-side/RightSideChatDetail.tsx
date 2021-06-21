import {Container, Row, Col} from "react-bootstrap";
import {Avatar} from "../../../../../common-components/avatar.common";
import React from "react";
import ComponentTitleCommon from "../../../../../common-components/component-title.common";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux/reducers/RootReducer.reducer.redux";
import RightSideChatFiles from "./RightSideChatFiles";

interface IChatDetailFriend {
    avatarUrl: string,
    friendName: string,
    friendQuantity: number,
    lastMessage?: string,
}

const ChatDetailFriend: React.FC<IChatDetailFriend> = ({avatarUrl, friendName, friendQuantity,lastMessage}) => {
    return (
        <Row className="pt-3">
            <Col xs={3} className="align-items-center">
                <Avatar avatarUrl={avatarUrl} alt={friendName} />
            </Col>
            <Col xs={6} className=" pl-0 align-items-center" >
                <div>
                    <h5 className="mb-1 pt-2 text-truncate">{friendName}</h5>
                    <p className="m-0 text-truncate text-muted">{friendQuantity} members</p>
                </div>
            </Col>
            <Col xs={3} className="text-right pl-0">
                <button className="btn mt-2">
                    <i style={{fontSize:"1.8rem",color:"#76c00d"}} className="fas fa-plus-circle"/>
                </button>
            </Col>
        </Row>
    )
}
const RightSideChatDetail = () => {
    const conversationDetailRedux = useSelector((state:RootState) => state.conversationDetail)
    if(!conversationDetailRedux){
        return (
            <Container>
                <Row className="align-items-center">
                    <Col xs={10}>
                        <ComponentTitleCommon title="Chat Detail" />
                    </Col>
                    <Col xs={2}>
                        <div className="rounded-circle w-100 position-relative bg-light-secondary" style={{paddingTop: "100%"}}>
                            <div className="position-absolute"
                                 style={{top: "50%", left: "50%", transform: "translate(-50%,-50%)"}}>
                                <button style={{fontSize: "1.4rem"}} className="btn p-0" type="button"><i
                                    className="fas fa-arrow-right"/></button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
    const {firstName, lastName, avatarUrl, _id, roomName, members} = conversationDetailRedux
    return (
        <Container>
            <Row className="align-items-center">
                <Col xs={10}>
                    <ComponentTitleCommon title="Chat Detail" />
                </Col>
                <Col xs={2}>
                    <div className="rounded-circle w-100 position-relative bg-light-secondary" style={{paddingTop: "100%"}}>
                        <div className="position-absolute"
                             style={{top: "50%", left: "50%", transform: "translate(-50%,-50%)"}}>
                            <button style={{fontSize: "1.4rem"}} className="btn p-0" type="button"><i
                                className="fas fa-arrow-right"/></button>
                        </div>
                    </div>
                </Col>
            </Row>
            {
                roomName === "" ? (
                    <ChatDetailFriend friendName={`${firstName} ${lastName}`} friendQuantity={members} avatarUrl={avatarUrl} />
                ) : (
                    <ChatDetailFriend friendName={roomName} friendQuantity={members} avatarUrl={avatarUrl} />
                )
            }
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
                <Col xs="12" className="mt-5 h-25">
                    <RightSideChatFiles />
                </Col>
            </Row>
        </Container>
    )
}
export default RightSideChatDetail;