import React from "react";
import {Button, ButtonGroup, Col, Dropdown, Modal, Row} from "react-bootstrap";
import {Avatar} from "../../../../../common-components/avatar.common";

interface ILeftSideUserInfoModal {
    show: boolean,
    handleClose: any,
    avatarUrl: string,
    friendName: string,
}


const LeftSideFriendInfosModal = (props: ILeftSideUserInfoModal) => {
    const {show, handleClose,avatarUrl,friendName} = props;


    return <div>
        <Modal show={show}
               onHide={handleClose}
               size="lg"
               aria-labelledby="contained-modal-title-vcenter"
               centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Profile
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className= "friend-row py-3 rounded-1rem align-items-center mb-2">
                    <Col xs={3}>
                        <Avatar avatarUrl={avatarUrl} alt={friendName} />
                    </Col>
                    <Col xs={6} className="pl-0">
                        <div>
                            <h5 className="mb-0" style={{fontSize:"1.5rem"}}>{friendName}</h5>
                        </div>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
        </Modal>
    </div>
}
export default LeftSideFriendInfosModal;