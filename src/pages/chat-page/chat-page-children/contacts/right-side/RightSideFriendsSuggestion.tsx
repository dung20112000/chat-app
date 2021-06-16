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
            <Row className="text-center bg-white align-items-center">
                <Col xs={6} style={{marginLeft:"5rem"}}>
                    <Avatar avatarUrl={""} alt={firstName}/>
                </Col>
                <Col xs={12} className="pl-0 mb-2">
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
                <Col xs={12} className="pl-0">
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
            <Row className="align-items-center">
                <Col xs={1}>
                    <div
                        className="bg-secondary rounded-circle d-flex align-items-center justify-content-center position-relative avatar avatar-with-status"
                        style={{
                            backgroundImage: `url("data:image/jpeg;base64,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")`
                        }}>
                        <div className="position-absolute rounded-circle status-badge bg-primary text-light">
                            <i className="fas fa-check"/>
                        </div>
                    </div>
                </Col>
                <Col>
                    <h1>Friend suggestion list</h1>
                </Col>
            </Row>
            <Row className="mt-3 pt-3 bg-light-secondary d-flex justify-content-around">
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