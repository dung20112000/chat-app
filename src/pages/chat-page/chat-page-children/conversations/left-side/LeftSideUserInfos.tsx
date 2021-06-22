import {Col, Row, Dropdown, ButtonGroup} from "react-bootstrap";
import {EOnlineStatus} from "../../../../../@types/enums.d";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../redux/reducers/RootReducer.reducer.redux";
import {useState} from 'react';
import "./scss/leftsidechatpage.scss";
import LeftSideUserInfoModal from "./LeftSideUserInfoModal";
import LeftSideSecurityModal from "./LeftSideSecurityModal";
import {emitChangeStatus} from "../../../../../server-interaction/socket-handle/socket-change-status";
import { updateUserStatus} from "../../../../../redux/actions/users.actions.redux";
import {emitClientLogout} from '../../../../../server-interaction/socket-handle/socket.services';
import {Socket} from "socket.io-client";
import AvatarUploadCommon from "../../../../../common-components/avatar-upload.common";


const LeftSideUserInfos = () => {
    const userInfos = useSelector((state: RootState) => state.userInfos);
    const socketStateRedux: Socket = useSelector((state: RootState) => state.socket);
    const dispatch = useDispatch();
    const {onlineStatus, personalInfos: {firstName, lastName, job, avatarUrl}} = userInfos;
    const [changeStatus, setChangeStatus] = useState(onlineStatus);

    const [showChangeInfos, setShowChangeInfos] = useState(false);
    const handleCloseChangeInfos = () => setShowChangeInfos(false);
    const handleShowChangeInfos = () => setShowChangeInfos(true);

    const [showChangeSecurity, setShowChangeSecurity] = useState(false);
    const handleCloseChangeSecurity = () => setShowChangeSecurity(false);
    const handleShowChangeSecurity = () => setShowChangeSecurity(true);

    if (!userInfos) {
        return null;
    }

    const onChangeStatus = (newStatus: EOnlineStatus) => {
        if (userInfos && socketStateRedux) {
            const body = {userId: userInfos._id, newStatus, currentStatus: userInfos.onlineStatus}
            emitChangeStatus(socketStateRedux, body, (response: any) => {
                if (response.status) {
                    const {_id, ...rest} = response.updatedStatus;
                    dispatch(updateUserStatus({...rest}));
                    setChangeStatus(newStatus);
                }
            });

        }

    }

    const onLogout = () => {
        emitClientLogout(socketStateRedux, userInfos._id);
    }


    return (
        <Row>
            <Col xs lg="3">
                <div className="show-avatar">
                    <AvatarUploadCommon avatarUrl={avatarUrl} alt={`${firstName} ${lastName}`}
                                        status={changeStatus}/>
                </div>
            </Col>
            <Col xs className="pl-0">
                <div className="user-info">
                    <p className="user-name">{`${firstName} ${lastName}`}</p>
                    <p className="job-name">
                        {
                            job ? job : "Free"
                        }
                    </p>
                    <Dropdown as={ButtonGroup}>
                        <Dropdown.Toggle className="bg-light border-0 text-dark">
                            <span className={
                                changeStatus === EOnlineStatus.online ? "text-primary" : changeStatus === EOnlineStatus.busy ? "text-warning" : "text-muted"
                            }>{changeStatus}</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="super-colors">
                            <Dropdown.Item className="text-primary" eventKey="1"
                                           onClick={() => onChangeStatus(EOnlineStatus.online)}>online</Dropdown.Item>
                            <Dropdown.Item className="text-warning" eventKey="2"
                                           onClick={() => onChangeStatus(EOnlineStatus.busy)}>busy</Dropdown.Item>
                            <Dropdown.Item className="text-muted" eventKey="3"
                                           onClick={() => onChangeStatus(EOnlineStatus.offline)}>offline</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </Col>
            <Col xs lg="3" className="text-right">
                <Dropdown as={ButtonGroup} className="setting">
                    <Dropdown.Toggle className="bg-light border-0 text-dark">
                        <i className="fas fa-cog"/>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="super-colors">
                        <Dropdown.Item eventKey="1" onClick={handleShowChangeInfos}>Change
                            Information</Dropdown.Item>
                        <Dropdown.Item eventKey="2"
                                       onClick={handleShowChangeSecurity}>Security</Dropdown.Item>
                        <Dropdown.Item eventKey="3" onClick={onLogout}>Log out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <LeftSideUserInfoModal show={showChangeInfos} handleClose={handleCloseChangeInfos}/>
                <LeftSideSecurityModal show={showChangeSecurity}
                                       handleClose={handleCloseChangeSecurity}/>
            </Col>
        </Row>
    )
}
export default LeftSideUserInfos;