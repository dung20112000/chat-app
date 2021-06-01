import {Col, Row, DropdownButton, Dropdown} from "react-bootstrap";
import {AvatarWithStatus, AvatarGroup, Avatar} from "../../../../../common-components/avatar.common";
import {EOnlineStatus} from "../../../../../@types/enums";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux/reducers/RootReducer.reducer.redux";
import {useState} from 'react';
import "./scss/leftsidechatpage.scss";

const LeftSideUserInfos = () => {
    const listTestStatus = [EOnlineStatus.online, EOnlineStatus.busy, EOnlineStatus.offline]
    const userInfos = useSelector((state: RootState) => state.userInfos);
    if (!userInfos) {
        return null;
    }
    const {onlineStatus, personalInfos: {firstName, lastName, job, avatarUrl}} = userInfos;
    const [changeStatus, setChangeStatus] = useState(onlineStatus);

    const changedStatus = (status: any) => {
        setChangeStatus(status);
    }

    return (
        <Row>
            <Col xs lg="3" className="p-0">
                <AvatarGroup
                    avatarUrl={avatarUrl}
                    avatarUrlMember="https://photographer.vn/wp-content/uploads/2016/10/goi-y-nhung-dia-diem-chup-anh-dep-vao-thang-10.jpg"
                    status={changeStatus} alt={`${firstName} ${lastName}`}/>
            </Col>
            <Col xs>
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
                <span>
                    <i className="fas fa-cog"/>
                </span>
            </Col>
        </Row>
    )
}
export default LeftSideUserInfos;