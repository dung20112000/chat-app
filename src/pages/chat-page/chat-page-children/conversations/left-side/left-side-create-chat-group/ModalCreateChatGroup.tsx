import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col, Container } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { IUserFriendsList, IUserInfosReducer } from "../../../../../../@types/redux";
import { RootState } from "../../../../../../redux/reducers/RootReducer.reducer.redux";
import { callApi } from "../../../../../../server-interaction/apis/api.services";
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
    const friendsListRedux = useSelector((state: RootState) => state.friendsList);
    const userInfosStateRedux: IUserInfosReducer = useSelector((state: RootState) => {
        return state.userInfos;
    });
    const initialValues = itemFriend(userInfosStateRedux._id, userInfosStateRedux.personalInfos);
    const [listFriendsInGroup, setListFriendsInGroup] = useState<IAddFriend[]>([initialValues]);
    const [nameGroup, setNameGroup] = useState("");
    const [errorNameGroup, setErrorNameGroup] = useState(false);
    const [showListFriend, setShowListFriend] = useState<IUserFriendsList[]>([]);

    const history = useHistory();
    const changeSearchFriend = (event: any) => {
        const searchValues = event.target.value;
        if (!searchValues) {
            setShowListFriend(friendsListRedux)
        }
        const result = friendsListRedux.filter((friend: IUserFriendsList) => {
            const { email, personalInfos: { firstName, lastName } } = friend;
            const fullName = `${firstName} ${lastName}`;
            return email.includes(searchValues) ||
                firstName.includes(searchValues) ||
                lastName.includes(searchValues) ||
                fullName.includes(searchValues)
        })
        setShowListFriend(result)
    }

    const onChangeNameRoom = (event: any) => {
        const nameGroupInput = event.target.value;
        setErrorNameGroup(false);
        setNameGroup(nameGroupInput);
    }
    const onCloseForm = () => {
        const { onHide } = props;
        setErrorNameGroup(false);
        setNameGroup("");
        setListFriendsInGroup([initialValues]);
        onHide();
    }

    const onChooseFriend = (id: string) => {
        if (!listFriendsInGroup.some(item => item.id === id)) {
            const itemFr = friendsListRedux.find((item: any) => item._id === id);
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

    const createGroup = () => {
        const participants = listFriendsInGroup.map(item => {
            return { userId: item.id }
        })
        if (nameGroup) {
            callApi("/conversations", "POST", { participants, roomName: nameGroup }).then(response => {
                if (response.status === 200 && response.data.success) {
                    onCloseForm();
                    history.push(`/chat-page/conversations/${response.data.conversationsId}`);
                }
            })
        } else {
            setErrorNameGroup(true);
        }

    }

    useEffect(() => {
        setShowListFriend(friendsListRedux)
    }, [friendsListRedux])

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
                        <Row className="mb-4">
                            <Col>
                                <div className="form__div">
                                    <input type="text" className="form__input"
                                        value={nameGroup}
                                        placeholder=" " onChange={(e) => onChangeNameRoom(e)}
                                    />
                                    <label htmlFor="" className="form__label">
                                        Name Group
                                    </label>
                                </div>
                                {
                                    errorNameGroup && (<div className="text-danger">Name is required</div>)
                                }
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <div className="form__div">
                                    <input type="text" className="form__input"
                                        placeholder=" " onChange={(e) => changeSearchFriend(e)}
                                    />
                                    <label htmlFor="" className="form__label">
                                        Search friend by name or phone number
                                    </label>
                                </div>

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
                        <Row>
                            <Col xs={12} className="pt-2">
                                {
                                    friendsListRedux && friendsListRedux.length > 0 ? (
                                        <h4>Friend List {`(${friendsListRedux.length}/50)`}</h4>
                                    ) : <h4>Friend List {`(0/50)`}</h4>
                                }
                            </Col>
                            <Col xs={12}>
                                <form className="overflow-auto friend-list-create">
                                    {
                                        showListFriend && showListFriend.length > 0 && showListFriend.map((friend: any) => {
                                            const { personalInfos, _id } = friend;
                                            const checked = listFriendsInGroup.some(item => item.id === _id);
                                            return <ModalItemFriend key={_id} personalInfos={personalInfos}
                                                id={_id}
                                                checked={checked}
                                                onChooseFriend={onChooseFriend}
                                            />
                                        })
                                    }
                                </form>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => onCloseForm()}>
                        Close
                    </Button>
                    <Button type="submit" variant="primary" onClick={() => createGroup()}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}