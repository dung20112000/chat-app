import React from "react";
import { Col, Modal, Row} from "react-bootstrap";
import {Avatar} from "../../../../../common-components/avatar.common";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux/reducers/RootReducer.reducer.redux";

interface ILeftSideUserInfoModal {
    show: boolean,
    handleClose: any,
    id: string
}
interface FormValues {
    avatarUrl:string,
    firstName: string,
    lastName: string,
    // gender: EGender,
}

const LeftSideFriendInfosModal = ({show,handleClose,id}: ILeftSideUserInfoModal) => {
    const friendListInfosRedux:any = useSelector((state:RootState) => state.friendsList)
    let initialValues: FormValues = {
        avatarUrl: "",
        firstName: "",
        lastName: "",
        // gender: EGender.female
    }
    if(friendListInfosRedux) {
        const friendInfos = friendListInfosRedux.find((item:any) => item._id === id);
        if (friendInfos) {
            const {personalInfos : {firstName,lastName,avatarUrl}} = friendInfos;
            initialValues = {avatarUrl,firstName,lastName}
        }
    }
    const {firstName,lastName,avatarUrl} = initialValues;
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
                        <Col xs={9} className="mb-2 ml-5">
                            <div>
                                <h3 className="pl-4 mb-1 pt-2">{firstName} {lastName}</h3>
                            </div>
                        </Col>
                        <Col xs={1}>
                            <button type="button" className="btn text-right pt-2">
                                <i className="fas fa-pencil-alt"/>
                            </button>
                        </Col>
                        <Col xs={12} className="mb-3">
                            <div className="text-muted" style={{fontSize: "1.2rem"}}>
                                <p className="mb-0">Description </p>
                            </div>
                        </Col>
                        <Col xs={12} className="pb-4">
                            <button className="btn btn-primary w-25">
                                Chat
                            </button>
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