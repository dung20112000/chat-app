import { Col, Container, Row } from "react-bootstrap";
import { EOnlineStatus } from "../../../../../@types/enums.d";
import React, { useEffect, useState } from "react";
import { AvatarWithStatus } from "../../../../../common-components/avatar.common";
import RightSideModal from './RightSideModal';
import ComponentTitleCommon from "../../../../../common-components/component-title.common";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/reducers/RootReducer.reducer.redux";

interface IPropsRowFriend {
    _id: string;
    avatarUrl: string;
    status: EOnlineStatus;
    firstName: string;
    lastName: string;
}
interface IPropsFriendsRequests {
    requestsList: string[]
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

const FriendsRequests: React.FC<IPropsFriendsRequests> = ({ requestsList }) => {
    return (
        <div>
            <i className="fas fa-user"></i>
            <span>{requestsList.length}</span>
        </div>
    )
}
const RightSideOnlineFriendsList = () => {
    const [modalShow, setModalShow] = useState(false);
    const [userFriendsOnline, setUserFriendsOnline] = useState([]);
    const friendsListStateRedux = useSelector((state: RootState) => {
        return state.friendsList;
    });

    useEffect(() => {
        if (friendsListStateRedux && friendsListStateRedux.length > 0) {
            const userFriendsOnline = friendsListStateRedux.filter((friend: any) => {
                return friend.onlineStatus !== EOnlineStatus.offline;
            })
            setUserFriendsOnline(userFriendsOnline);
        }
    }, [friendsListStateRedux]);

    const changeSearchFriend = (event: any) => {
        const textInput = (event.target.value).toUpperCase();
        // eslint-disable-next-line array-callback-return
        const searchFriends = friendsListStateRedux.filter((friend: any) => {
            const { personalInfos } = friend;
            if (personalInfos.firstName.toUpperCase().includes(textInput)
                || personalInfos.lastName.toUpperCase().includes(textInput)) {
                return friend;
            }
        })
        setUserFriendsOnline(searchFriends);
    }

    const onModalShow = () => {
        setModalShow(true)
    }

    return (
        <Container>
            <Row className="mb-3 vh-10">
                <Col xs="6">
                    <div className="friend-request d-flex align-items-center">
                        <ComponentTitleCommon title={"Online people"} />
                        <FriendsRequests requestsList={[]} />
                    </div>
                </Col>
                <Col xs="5" className="offset-1">
                    <div className="add-friend" onClick={onModalShow}>
                        <button className="btn text-primary d-flex align-items-center"><i
                            className="fas fa-plus-square mr-1"></i> Add friends
                        </button>
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
                            placeholder=" " onChange={(e) => changeSearchFriend(e)}
                        />
                        <label htmlFor="" className="form__label">Search Name</label>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col id="custom-scroll">
                    <div className="list-friend">
                        {
                            userFriendsOnline.length > 0 && userFriendsOnline &&
                            userFriendsOnline.map((friend: any, index: number) => {
                                const { onlineStatus, personalInfos } = friend;
                                return <RowFriendsMemo key={index} _id={personalInfos._id} avatarUrl={personalInfos.avatarUrl}
                                    status={onlineStatus} firstName={personalInfos.firstName}
                                    lastName={personalInfos.lastName} />
                            })
                        }
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
export default RightSideOnlineFriendsList;