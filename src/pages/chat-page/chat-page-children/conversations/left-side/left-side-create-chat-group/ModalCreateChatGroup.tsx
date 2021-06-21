import React, { useState } from "react";
import { Modal, Button, Row, Col, Container } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { IUserInfosReducer } from "../../../../../../@types/redux";
import { RootState } from "../../../../../../redux/reducers/RootReducer.reducer.redux";
import { Avatar } from './../../../../../../common-components/avatar.common';

const RowFrienItem = (infoFriend: any) => {
    const { personalInfos: { firstName, lastName, avatarUrl } } = infoFriend;
    return (
        <Row className="my-3">
            <Col xs="1">

            </Col>
            <Col xs="2">
                <Avatar avatarUrl={avatarUrl}
                    alt={`${firstName} ${lastName}`} />
            </Col>
            <Col xs="6">
                <div className="d-flex align-items-center h-100">
                    <h6 className="m-0"> {`${firstName} ${lastName}`}</h6>
                </div>
            </Col>
        </Row>
    )
}

export const ModalCreateChatGroup = (props: any) => {
    const friendsList = useSelector((state: RootState) => state.friendsList);
    const userInfosStateRedux: IUserInfosReducer = useSelector((state: RootState) => {
        return state.userInfos;
    });
    const [listFriendsInGroup, setListFriendsInGroup] = useState([]);
    const changeSearchFriend = (event: any) => {

    }
    const onCloseForm = () => {
        const { onHide } = props;
        onHide();
    }

    return (
        <>
            <Modal {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={() => onCloseForm()}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create Group</Modal.Title>
                </Modal.Header>
                <Modal.Body className="px-0">
                    <Container>
                        <Row className="mb-3">
                            <Col>
                                <div className="form__div">
                                    <input type="text" className="form__input"
                                        placeholder=" " onChange={(e) => changeSearchFriend(e)}
                                    />
                                    <label htmlFor="" className="form__label">Name Group</label>
                                </div>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <div className="form__div">
                                    <input type="text" className="form__input"
                                        placeholder=" " onChange={(e) => changeSearchFriend(e)}
                                    />
                                    <label htmlFor="" className="form__label">Search Friend</label>
                                </div>
                            </Col>
                        </Row>
                        {
                            friendsList.length > 0 && friendsList.map((friend: any) => {
                                const { personalInfos, _id } = friend;
                                return <RowFrienItem key={_id} personalInfos={personalInfos} />
                            })
                        }
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => onCloseForm()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => onCloseForm()}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}