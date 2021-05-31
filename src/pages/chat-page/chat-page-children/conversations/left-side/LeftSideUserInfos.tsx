import {Col, Row} from "react-bootstrap";
import {AvatarWithStatus} from "../../../../../common-components/avatar.common";
import {EOnlineStatus} from "../../../../../@types/enums";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux/reducers/RootReducer.reducer.redux";

const LeftSideUserInfos = () => {
    const userInfos = useSelector((state:RootState)=> state.userInfos);
    if(!userInfos){
        return null;
    }
    const {onlineStatus,personalInfos:{firstName,lastName,job,avatarUrl}} = userInfos;
    return (
        <Row>
            <Col xs lg="3">
                <AvatarWithStatus
                    avatarUrl={avatarUrl}
                    status={onlineStatus} alt={`${firstName} ${lastName}`}/>
            </Col>
            <Col xs>
                {/*infos*/}
            </Col>
            <Col xs lg="3">
                setting
            </Col>
        </Row>
    )
}
export default LeftSideUserInfos;