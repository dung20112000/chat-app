import {Container, Row, Col} from "react-bootstrap";
import React from "react";
import {Avatar} from "../../../../../common-components/avatar.common";


interface IChatDetailFriend {
    avatarUrl?: string,
    firstName: string,
    lastName: string,
}

const FriendSuggestionItem: React.FC<IChatDetailFriend> = ({avatarUrl, firstName, lastName}) => {
    return (
        <Col xs={3} className="mb-5 ml-3 mr-3">
            <Row className="text-center bg-white align-items-center rounded-1rem">
                <Col xs={12} className="pt-3">
                    <div className="d-flex justify-content-center align-items-center w-35 mx-auto" >
                        <Avatar avatarUrl={""} alt={firstName}/>
                    </div>
                </Col>
                <Col xs={12} className="mb-2">
                    <div>
                        <h3 className="mb-1 pt-2 text-truncate">{firstName} {lastName}</h3>
                    </div>
                </Col>
                <Col xs={12}>
                    <div className="text-muted" style={{fontSize: "1.2rem"}}>
                        <p className="mb-0">From friend suggestion </p>
                        <p>No mutual group</p>
                    </div>
                </Col>
                <Col xs={12} className="pb-4">
                    <button className="btn btn-primary">
                        ADD FRIEND
                    </button>
                </Col>
            </Row>
        </Col>
    )
}

const FriendSuggestion = () => {
    return (
        <Container>
            <Row className="mt-3 pt-3 rounded-1rem bg-very-light-secondary d-flex justify-content-around">
                <Col xs={12} className="mb-4">
                    <h3 className="pl-5">Recommended Friends ()</h3>
                </Col>
                <FriendSuggestionItem firstName="Hoang" lastName="2"/>
                <FriendSuggestionItem firstName="Hoang" lastName="3"/>
                <FriendSuggestionItem firstName="Hoang" lastName="4"/>
                <FriendSuggestionItem firstName="Hoang" lastName="5"/>
                <FriendSuggestionItem firstName="Hoang" lastName="6"/>
                <FriendSuggestionItem firstName="Hoang" lastName="7"/>
            </Row>
        </Container>
    )
}
export default FriendSuggestion;