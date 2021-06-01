import {Col, Row, DropdownButton, Dropdown} from "react-bootstrap";
import {AvatarWithStatus, AvatarGroup, Avatar} from "../../../../../common-components/avatar.common";
import {EOnlineStatus} from "../../../../../@types/enums.d";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux/reducers/RootReducer.reducer.redux";
import {useState} from 'react';
import "./scss/leftsidechatpage.scss";

const LeftSideUserInfos = () => {
    const listTestStatus = [EOnlineStatus.online, EOnlineStatus.busy, EOnlineStatus.offline]
    const userInfos = useSelector((state: RootState) => state.userInfos);
    const {onlineStatus, personalInfos: {firstName, lastName, job, avatarUrl}} = userInfos;
    const [changeStatus, setChangeStatus] = useState(onlineStatus);
    if (!userInfos) {
        return null;
    }

    const changedStatus = (status: any) => {
        setChangeStatus(status);
    }

    return (
        <Row>
            <Col xs lg="3" className="">
                <AvatarWithStatus
                    avatarUrl={avatarUrl}
                    avatarUrlMember="https://photographer.vn/wp-content/uploads/2016/10/goi-y-nhung-dia-diem-chup-anh-dep-vao-thang-10.jpg"
                    alt={`${firstName} ${lastName}`}/>
            </Col>
            <Col xs className="pl-0">
                <div className="user-info">
                    <p className="user-name">{`${firstName} ${lastName}`}</p>
                    <p className="job-name">Frontend Deverloper</p>
                    <DropdownButton className="bg-none" title={changeStatus}>
                        {
                            listTestStatus.map((status, index) => {
                                return <Dropdown.Item key={index}
                                                      onClick={() => changedStatus(status)}>{status}</Dropdown.Item>
                            })
                        }
                    </DropdownButton>
                </div>
            </Col>
            <Col xs lg="3">
                <div className="text-right">
                    <i className="fas fa-cog"/>
                </div>
            </Col>
        </Row>
    )
}
export default LeftSideUserInfos;