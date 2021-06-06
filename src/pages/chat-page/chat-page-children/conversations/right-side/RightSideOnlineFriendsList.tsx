import {Col, Container, Row} from "react-bootstrap";
import {EOnlineStatus} from "../../../../../@types/enums.d";
import React, {useState} from "react";
import {AvatarWithStatus} from "../../../../../common-components/avatar.common";
import RightSideModal from './RightSideModal';
import ComponentTitleCommon from "../../../../../common-components/component-title.common";

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
const RowFriend: React.FC<IPropsRowFriend> = ({_id, avatarUrl, firstName, lastName, status}) => {
    return (
        <div className="item-friends">
            <Row className="my-2">
                <Col xs="3">
                    <AvatarWithStatus avatarUrl={avatarUrl} alt={`${firstName} ${lastName}`}/>
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

const FriendsRequests:React.FC<IPropsFriendsRequests> = ({requestsList})=>{
    return (
        <div>
            <i className="fas fa-user"></i>
            <span>{requestsList.length}</span>
        </div>
    )
}
const RightSideOnlineFriendsList = () => {
    const [modalShow, setModalShow] = useState(false);
    const onModalShow = () => {
        setModalShow(true)
    }
    return (
        <Container>
            <Row className="mb-3 vh-10">
                <Col xs="6">
                    <div className="friend-request d-flex align-items-center">
                        <ComponentTitleCommon title={"Online people"}/>
                        <FriendsRequests requestsList={[]}/>
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
                        onHide={() => setModalShow(false)}/>
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
                                return <RowFriendsMemo key={index} _id={`${index + 1}`} avatarUrl={""}
                                                       status={EOnlineStatus.online} firstName={"Huy"}
                                                       lastName={"Dung"}/>
                            })
                        }
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
export default RightSideOnlineFriendsList;