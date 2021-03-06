import {Col, Modal, Row} from "react-bootstrap";
import React from "react";
import {useDispatch} from "react-redux";
import {deleteFriend} from "../../../../../redux/actions/friends-list.actions.redux";
import {callApi} from "../../../../../server-interaction/apis/api.services";


interface ILeftSideDeleteFriendModal {
    show: boolean,
    handleClose: any,
    id: string
}

const LeftSideDeleteFriendModal = ({show, handleClose, id}: ILeftSideDeleteFriendModal) => {
    const dispath = useDispatch()
    const DeteleFriend = (id: string) => {
        callApi(`/users/friends-list/${id}`, "delete")
            .then((res) => {
                if(res.status === 200 && res.data && res.data.success) {
                    dispath(deleteFriend(id))
                }
            })
            .catch((err) => console.log(err.response))
    }
    return (
        <div>
            <Modal show={show}
                   onHide={handleClose}
                   aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Delete friend
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="pt-0">
                    <Row className="bg-very-light-secondary rounded-1rem mb-2">
                        <Col xs={12} className="pt-3">
                            <h5>Are you sure you want to remove this friend from your list friend?</h5>
                        </Col>
                        <Col xs={12} className="pb-4 text-right">
                            <button type="button" onClick={handleClose}
                                    className="btn btn-primary w-25">
                                No
                            </button>
                            <button type="button" onClick={() => DeteleFriend(id)}
                                    className="btn btn-danger w-25 ml-3">
                                Yes
                            </button>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </div>
    )
}
export default LeftSideDeleteFriendModal;