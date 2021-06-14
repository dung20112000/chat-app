import React from "react";
import {ButtonGroup, Col, Container, Dropdown, Row} from "react-bootstrap";
import {AvatarWithStatus} from "../../../../../common-components/avatar.common";

interface IConversationBlockCommon {
    avatarUrl?: string,
    friendName: string,
    active?:boolean;
}
const ContactsCommon:React.FC<IConversationBlockCommon> = ({avatarUrl,friendName,active}) => {
    return (
        <Row className={active ? "py-3 rounded-1rem align-items-center active conversation-block-common mb-2" : "py-3 mb-2 rounded-1rem align-items-center conversation-block-common"}>
            <Col xs={3}>
                <AvatarWithStatus avatarUrl={""} alt={friendName} />
            </Col>
            <Col xs={6} className="pl-0">
                <div>
                    <span className="mb-1 text-truncate" style={{fontSize:"1.5rem"}}>{friendName}</span>
                </div>
            </Col>
            <Col xs={3} className="text-right pt-2 pl-0">
                <Dropdown as={ButtonGroup} className="setting">
                    <Dropdown.Toggle className="bg-light border-0 text-white conversation-block-common text-dark">
                        <i className="fas fa-ellipsis-h" style={{fontSize:"1.5rem"}}/>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="super-colors">
                        <Dropdown.Item eventKey="1" >View Information</Dropdown.Item>
                        <Dropdown.Item eventKey="3">Delete</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
        </Row>
    )
}
const FriendListContacts = () => {
    return (
        <Container fluid className="friend-list">
            <Row className="mb-3">
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
            <ContactsCommon friendName={"Hoang"}  />
        </Container>
    )
}
export default FriendListContacts;