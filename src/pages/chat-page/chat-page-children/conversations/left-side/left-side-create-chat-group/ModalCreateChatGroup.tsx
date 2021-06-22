import React, { useState } from "react";
import { Modal, Button, Row, Col, Container, Form } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { IUserInfosReducer } from "../../../../../../@types/redux";
import { RootState } from "../../../../../../redux/reducers/RootReducer.reducer.redux";
import { ModalItemFriend } from "./ModalItemFriend";
import { ModalItemFriendInGroup } from "./ModalItemFriendInGroup";

interface IAddFriend {
    id: string;
    personalInfos: {
        firstName: string;
        lastName: string;
        avatarUrl: string;
    }
}

const itemFriend = (id: string, personalInfos: any): IAddFriend => {
    return {
        id: id,
        personalInfos: {
            firstName: personalInfos.firstName,
            lastName: personalInfos.lastName,
            avatarUrl: personalInfos.avatarUrl,
        }
    }
}

export const ModalCreateChatGroup = (props: any) => {
    const friendsList = useSelector((state: RootState) => state.friendsList);
    const userInfosStateRedux: IUserInfosReducer = useSelector((state: RootState) => {
        return state.userInfos;
    });
    const initialValues = itemFriend(userInfosStateRedux._id, userInfosStateRedux.personalInfos);
    const [listFriendsInGroup, setListFriendsInGroup] = useState<IAddFriend[]>([initialValues]);
    const changeSearchFriend = (event: any) => {

    }
    const onCloseForm = () => {
        const { onHide } = props;
        setListFriendsInGroup([initialValues]);
        onHide();
    }

    const onChooseFriend = (id: string) => {
        if (!listFriendsInGroup.some(item => item.id === id)) {
            const itemFr = friendsList.find((item: any) => item._id === id);
            if (itemFr) {
                const addItemFriend = itemFriend(itemFr._id, itemFr.personalInfos);
                listFriendsInGroup.push(addItemFriend);
                setListFriendsInGroup([...listFriendsInGroup]);
            }
        } else {
            const removeListFriends = listFriendsInGroup.filter(item => item.id !== id);
            setListFriendsInGroup([...removeListFriends]);
        }
    }

    const unCheckedFriends = () => {

    }

    return (
        <>
            <Modal {...props}
                size="lg"
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
                                <h6>Name Group</h6>
                                <input type="text" className="form-control"
                                    placeholder="Name Group" onChange={(e) => changeSearchFriend(e)}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <h6>Search Friend</h6>
                                <input type="text" className="form-control"
                                    placeholder="Search Friend" onChange={(e) => changeSearchFriend(e)}
                                />
                            </Col>
                        </Row>
                        {
                            listFriendsInGroup.length > 1 && (
                                <Row className="mb-3">
                                    <Col xs="12">
                                        <div className="d-flex flex-wrap box-friend-group">
                                            {
                                                listFriendsInGroup.map((item: any) => {
                                                    return <ModalItemFriendInGroup key={item.id} info={item}
                                                        onChooseFriend={onChooseFriend} />
                                                })
                                            }
                                        </div>
                                    </Col>
                                </Row>
                            )
                        }
                        <Form>
                            {
                                friendsList.length > 0 && friendsList.map((friend: any) => {
                                    const { personalInfos, _id } = friend;
                                    return <ModalItemFriend key={_id} personalInfos={personalInfos}
                                        id={_id}
                                        onChooseFriend={onChooseFriend}
                                    />
                                })
                            }
                        </Form>

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