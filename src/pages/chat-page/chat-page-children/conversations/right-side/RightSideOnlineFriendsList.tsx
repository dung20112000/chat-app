import { Col, Container, Row } from "react-bootstrap";
import { EOnlineStatus } from "../../../../../@types/enums.d";
import React, { useState } from "react";
import { AvatarWithStatus } from "../../../../../common-components/avatar.common";
import RightSideModal from './RightSideModal';

interface IPropsRowFriend {
    _id: string;
    avatarUrl: string;
    status: EOnlineStatus;
    firstName: string;
    lastName: string;
}

const RowFriend: React.FC<IPropsRowFriend> = ({ _id, avatarUrl, firstName, lastName, status }) => {
    return (
        <div className="item-friends">
            <Row className="my-2">
                <Col xs="3">
                    <AvatarWithStatus avatarUrl={avatarUrl} alt={`${firstName} ${lastName}`} />
                </Col>
                <Col>
                    <div className="d-flex align-items-center h-100 name-friend">
                        <span>{`${firstName} ${lastName}`}</span>
                    </div>
                </Col>
            </Row>
        </div>

    )
}
const RowFriendsMemo = React.memo(RowFriend);

const RightSideOnlineFriendsList = () => {

    const [modalShow, setModalShow] = useState(false);

    return (
        <Container>
            <Row className="mb-3 vh-10">
                <Col xs="4">
                    <div className="friend-request">
                        <p className="mr-3">Friends</p>
                        <p>
                            <i className="fas fa-user"></i>
                            <span>10</span>
                        </p>
                    </div>
                </Col>
                <Col xs="6" className="offset-2">
                    <div className="add-friend" onClick={() => setModalShow(true)}>
                        <span><i className="fas fa-plus-square"></i></span>
                        <p className="m-0">ADD FRIENDS</p>
                    </div>
                    <RightSideModal
                        show={modalShow}
                        onHide={() => setModalShow(false)} />
                </Col>
            </Row>
            <Row className="mb-3 vh-10">
                <Col>
                    <div className="form__div">
                        <input type="text" className="form__input"
                            placeholder=" "
                        />
                        <label htmlFor="" className="form__label">Search Name</label>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col id="custom-scroll">
                    <div className="list-friend">
                        {
                            [...Array(10)].map((friend, index) => {
                                return <RowFriendsMemo key={index} _id={`${index + 1}`} avatarUrl={""} status={EOnlineStatus.online} firstName={"Huy"} lastName={"Dung"} />
                            })
                        }
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
export default RightSideOnlineFriendsList;