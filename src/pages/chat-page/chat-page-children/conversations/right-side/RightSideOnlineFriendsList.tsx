import {Col, Container, Row} from "react-bootstrap";
import {EOnlineStatus} from "../../../../../@types/enums.d";
import React from "react";
import {AvatarWithStatus} from "../../../../../common-components/avatar.common";
import {RootState} from "../../../../../redux/reducers/RootReducer.reducer.redux";
import {useSelector} from "react-redux";
import {IUserInfosReducer} from "../../../../../@types/redux";

interface IPropsRowFriend {
    _id: string;
    avatarUrl: string;
    status: EOnlineStatus;
    firstName: string;
    lastName: string;
}

const RowFriend: React.FC<IPropsRowFriend> = ({_id, avatarUrl, firstName, lastName, status}) => {
    return (
        <Row>
            <Col xs="12">
                <Row>
                    <Col xs="3">
                        <AvatarWithStatus avatarUrl={avatarUrl} alt={`${firstName} ${lastName}`}/>
                    </Col>
                    <Col>
                        <div>{`${firstName} ${lastName}`}</div>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
const RowFriendsMemo = React.memo(RowFriend);

const RightSideOnlineFriendsList = () => {
    const userInfosRedux:IUserInfosReducer =  useSelector((state:RootState) => state.userInfos);
    const {friendsList} = userInfosRedux;

    return (
        <Container>
            {
                [...Array(5)].map((friend,index)=>{
                    return <RowFriendsMemo key={index} _id={`${index+1}`} avatarUrl={""} status={EOnlineStatus.online} firstName={"Huy"} lastName={"Dung"}/>
                })
            }
        </Container>
    )
}
export default RightSideOnlineFriendsList;