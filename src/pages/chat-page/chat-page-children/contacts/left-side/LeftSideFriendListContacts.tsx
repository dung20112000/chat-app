import React, {useRef, MouseEvent, useState, useEffect} from "react";
import {ButtonGroup, Col, Dropdown, Row} from "react-bootstrap";
import {Avatar} from "../../../../../common-components/avatar.common";
import {IUserFriendsList} from "../../../../../@types/redux";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux/reducers/RootReducer.reducer.redux";
import "../scss/friendList.scss"
import LeftSideFriendInfosModal from "./LeftSideFriendInfosModal";
import LeftSideDeleteFriendModal from "./LeftSideDEleteFriendModal";

interface IPropsSearch {
    handleChange: (searchValue: string) => void
}

const Search = (props: IPropsSearch) => {
    const onSearchChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const target = evt.target;
        const value = target.value;
        props.handleChange(value)
    }
    return (
        <Row className="mb-3 pl-3">
            <Col xs={12}>
                <form>
                    <Row>
                        <Col xs={12}>
                            <div className="rounded-1rem">
                                <input
                                    id="searchValues"
                                    name="searchValues"
                                    type="text"
                                    onChange={onSearchChange}
                                    placeholder="Search friends"
                                    className="form-control"
                                />
                            </div>
                        </Col>
                    </Row>
                </form>
            </Col>
        </Row>
    )
}

interface IConversationBlockCommon {
    avatarUrl: string,
    friendName: string,
    active?: boolean,
    _id: string,

}

const ContactsCommon: React.FC<IConversationBlockCommon> = ({avatarUrl, friendName, _id}) => {
    const areaRef = useRef(null)

    const [showFriendInfos, setShowFriendInfos] = useState(false);
    const handleCloseFriendInfos = () => setShowFriendInfos(false);
    const handleShowFriendInfos = () => setShowFriendInfos(true);

    const [showDeleteFriend, setShowDeleteFriend] = useState(false);
    const handleCloseDeleteFriend = () => setShowDeleteFriend(false);
    const handleShowDeleteFriend = () => setShowDeleteFriend(true);

    const onMouseOverArea = (event: MouseEvent) => {
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
        <Row ref={areaRef} onMouseOver={onMouseOverArea} onMouseOut={onMouseOutArea}
             className="friend-row pl-3 py-3 rounded-1rem align-items-center mb-3">
            <Col xs={3}>
                <Avatar avatarUrl={avatarUrl} alt={friendName}/>
            </Col>
            <Col xs={6} className="pl-0">
                <div>
                    <h5 className="mb-0" style={{fontSize: "1.5rem"}}>{friendName}</h5>
                </div>
            </Col>
            <Col xs={3} className="text-right pt-2 pl-0">
                <Dropdown as={ButtonGroup} className="setting">
                    <Dropdown.Toggle className="button-setting border-0">
                        <i className="fas fa-ellipsis-h icon-dropdown" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="super-colors">
                        <Dropdown.Item eventKey="1" onClick={handleShowFriendInfos}>View Information</Dropdown.Item>
                        <Dropdown.Item eventKey="3" onClick={handleShowDeleteFriend}>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <LeftSideDeleteFriendModal show={showDeleteFriend} handleClose={handleCloseDeleteFriend} id={_id} />
                <LeftSideFriendInfosModal show={showFriendInfos} handleClose={handleCloseFriendInfos} id={_id}/>
            </Col>
        </Row>
    )
}
const LeftSideFriendListContacts = () => {
    const [showListFriend, setShowListFriend] = useState<IUserFriendsList[]>([])
    const friendsListRedux: IUserFriendsList[] = useSelector((state: RootState) => state.friendsList)

    useEffect(()=>{
        setShowListFriend(friendsListRedux)
    },[friendsListRedux])
    const handleSearch = (searchValues: string) => {
        if (!searchValues) {
            setShowListFriend(friendsListRedux)
        }
        const result = friendsListRedux.filter(friend => {
            return friend.email.includes(searchValues) ||
                friend.personalInfos.firstName.includes(searchValues) ||
                friend.personalInfos.lastName.includes(searchValues)
        })
        setShowListFriend(result)

    }
    return (
        <Col xs={3} className="friend-list">
            <Search handleChange={handleSearch}/>
            {
                showListFriend && showListFriend.length > 0 ?
                    showListFriend.map((item, index: number) => {
                        const {personalInfos: {firstName, lastName, avatarUrl}, _id} = item;
                        return (
                            <ContactsCommon key={_id} friendName={`${firstName} ${lastName}`} _id={_id}
                                            avatarUrl={avatarUrl}/>
                        )
                    }) : null
            }
        </Col>
    )
}
export default LeftSideFriendListContacts;