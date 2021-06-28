import React from "react";
import { Col, Modal, Row} from "react-bootstrap";
import {Avatar} from "../../../../../common-components/avatar.common";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux/reducers/root.reducer.redux";
import {useHistory} from "react-router-dom";
import {emitJoinRoom} from "../../../../../server-interaction/socket-handle/socket-chat.services";
import {IUserInfosReducer} from "../../../../../@types/redux";

interface ILeftSideUserInfoModal {
    show: boolean,
    handleClose: any,
    _id: string
}
interface IValues {
    avatarUrl:string,
    firstName: string,
    lastName: string,
    conversationsId: string,
    // gender: EGender,
}

const LeftSideFriendInfosModal = ({show,handleClose,_id}: ILeftSideUserInfoModal) => {
    const history = useHistory()
    const friendListInfosRedux:any = useSelector((state:RootState) => state.friendsList)
    const userInfosStateRedux: IUserInfosReducer = useSelector((state: RootState) => {
        return state.userInfos;
    });
    const socketStateRedux: any = useSelector((state: RootState) => {
        return state.socket
    });
    let initialValues: IValues = {
        avatarUrl: "",
        firstName: "",
        lastName: "",
        conversationsId: "",
        // gender: EGender.female
    }
    if(friendListInfosRedux) {
        const friendInfos = friendListInfosRedux.find((item:any) => item._id === _id);
        if (friendInfos) {
            const {personalInfos : {firstName,lastName,avatarUrl}} = friendInfos;
            const {conversationsId} = friendInfos
            initialValues = {avatarUrl,firstName,lastName,conversationsId}
        }
    }
    const onChat = () => {
        if (userInfosStateRedux && socketStateRedux) {
            const members: any = [];
            members.push({ userId: userInfosStateRedux._id })
            members.push({ userId: _id })

            emitJoinRoom(socketStateRedux, conversationsId, members, (response: any) => {
                console.log(response)
                if (response.status && response.roomId) {
                    history.push(`/chat-page/conversations/${response.roomId}`);
                }
            })
        }
    }
    const {firstName,lastName,avatarUrl,conversationsId} = initialValues;
    return (
        <div>
            <Modal show={show}
                   onHide={handleClose}
                   aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Profile
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="pt-0">
                    <Row className= "bg-very-light-secondary friend-row rounded-1rem text-center mb-2">
                        <Col xs={12} className="pt-3">
                            <div className="d-flex justify-content-center align-items-center w-25 mx-auto" >
                                <Avatar avatarUrl={avatarUrl} alt={firstName}/>
                            </div>
                        </Col>
                        <Col xs={12} className="pt-2">
                            <div>
                                <h3 >{firstName} {lastName}</h3>
                            </div>
                        </Col>
                        <Col xs={12} className="mb-3">
                            <div className="text-muted" style={{fontSize: "1.2rem"}}>
                                <p className="mb-0">Description </p>
                            </div>
                        </Col>
                        <Col xs={12} className="pb-4">
                            {
                                conversationsId ? (
                                    <button type="button" onClick={() => history.push(`/chat-page/conversations/${conversationsId}`)} className="btn btn-primary w-25">
                                        Chat
                                    </button>
                                ) : (
                                    <button type="button" onClick={onChat} className="btn btn-primary w-25">
                                        Chat
                                    </button>
                                )
                            }
                        </Col>
                    </Row>
                    <Row className="text-left d-flex align-items-center">
                        <Col xs={5} className="ml-4">
                            <h4 className="text-muted mb-0">Phone Number</h4>
                        </Col>
                        <Col xs={6}>
                            <span style={{fontSize:"1.3rem"}}>0123453412</span>
                        </Col>
                        <Col xs={5} className="ml-4">
                            <h4 className="text-muted mb-0">Mutual Group</h4>
                        </Col>
                        <Col xs={6}>
                            <span style={{fontSize:"1.3rem"}}>0123453412</span>
                        </Col>
                        <Col xs={5} className="ml-4">
                            <h4 className="text-muted mb-0">Gender</h4>
                        </Col>
                        <Col xs={6}>
                            <span style={{fontSize:"1.3rem"}}>0123453412</span>
                        </Col>
                        <Col xs={5} className="ml-4">
                            <h4 className="text-muted mb-0">Email</h4>
                        </Col>
                        <Col xs={6}>
                            <span style={{fontSize:"1.3rem"}}>0123453412</span>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default LeftSideFriendInfosModal;