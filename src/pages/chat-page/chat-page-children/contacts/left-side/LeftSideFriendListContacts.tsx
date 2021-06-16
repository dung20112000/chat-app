import React, {useRef, MouseEvent, useState} from "react";
import {ButtonGroup, Col, Container, Dropdown, Row} from "react-bootstrap";
import {Avatar} from "../../../../../common-components/avatar.common";
import {IUserFriendsList} from "../../../../../@types/redux";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux/reducers/RootReducer.reducer.redux";
import "../scss/friendList.scss"
import {Route, Switch, useHistory} from "react-router-dom";
import LeftSideFriendInfosModal from "./LeftSideFriendInfosModal";

interface IConversationBlockCommon {
    avatarUrl: string,
    friendName: string,
    active?:boolean,
    _id: string,
    show: boolean,
    handleShow: any,
    handleClose: any
}
const ContactsCommon:React.FC<IConversationBlockCommon> = ({avatarUrl,friendName,show, handleClose, handleShow,_id}) => {
    const areaRef = useRef(null)
    const history = useHistory();
    const onMouseOverArea = (event:MouseEvent) => {
        if (areaRef.current) {
            //@ts-ignore
            areaRef.current.classList.add("hover")
            //@ts-ignore
            areaRef.current.classList.add("bg-contact-item")
        }
    }
    const onMouseOutArea = (event: MouseEvent) => {
        if (areaRef.current) {
            //@ts-ignore
            areaRef.current.classList.remove("hover")
            //@ts-ignore
            areaRef.current.classList.remove("bg-contact-item")
        }
    }
    return (
        <Row ref={areaRef} onMouseOver={onMouseOverArea} onMouseOut={onMouseOutArea} className= "friend-row py-3 rounded-1rem align-items-center mb-2">
            <Col xs={3}>
                <Avatar avatarUrl={avatarUrl} alt={friendName} />
            </Col>
            <Col xs={6} className="pl-0">
                <div>
                    <h5 className="mb-0" style={{fontSize:"1.5rem"}}>{friendName}</h5>
                </div>
            </Col>
            <Col xs={3} className="text-right pt-2 pl-0">
                <Dropdown as={ButtonGroup} className="setting">
                    <Dropdown.Toggle className="button-setting border-0">
                        <i className="fas fa-ellipsis-h icon-dropdown"/>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="super-colors">
                        <Dropdown.Item eventKey="1" onClick={handleShow} >View Information</Dropdown.Item>
                        <Dropdown.Item eventKey="3">Delete</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <LeftSideFriendInfosModal show={show} handleClose={handleClose} friendName={friendName} avatarUrl={avatarUrl}/>
            </Col>
        </Row>
    )
}
const LeftSideFriendListContacts = () => {
    const friendsListRedux:IUserFriendsList[] = useSelector((state:RootState) => state.friendsList)

    const [showFriendInfos, setShowFriendInfos] = useState(false);
    const handleCloseFriendInfos = () => setShowFriendInfos(false);
    const handleShowFriendInfos = () => setShowFriendInfos(true);
    return (
           <Col xs={3} className="friend-list">
               <Row className="mb-3" >
                   <Col xs={12}>
                       <form>
                           <Row>
                               <Col xs={12}>
                                   <div className="rounded-1rem">
                                       <input type="text" className="form-control rounded" placeholder="Search friends"/>
                                   </div>
                               </Col>
                           </Row>
                       </form>
                   </Col>
               </Row>
               {
                   friendsListRedux && friendsListRedux.length > 0 ?
                       friendsListRedux.map((item,index: number) => {
                           const {personalInfos : {firstName, lastName, avatarUrl}, _id} = item;
                           return (
                               <ContactsCommon key={_id} friendName={`${firstName} ${lastName}`} _id={_id} avatarUrl={avatarUrl} show={showFriendInfos} handleShow={handleShowFriendInfos} handleClose={handleCloseFriendInfos}/>
                           )
                       }) : null
               }
           </Col>
    )
}
export default LeftSideFriendListContacts;