import React from "react";
import { Row, Col, Form } from 'react-bootstrap';
import { Avatar } from './../../../../../../common-components/avatar.common';

export const ModalItemFriend = (props: any) => {
    const { id, personalInfos: { firstName, lastName, avatarUrl }, onChooseFriend } = props;

    const onChoose = (event: any) => {
        const target = event.target;
        const value = target.value;
        target.checked ? onChooseFriend(value) : onChooseFriend(value)
    }

    return (
        <label htmlFor={id} className="d-block">
            <Form.Group className="px-3 m-0">
                <Row className="align-items-center">
                    <Col xs="1">
                        <div className="d-flex ">
                            <Form.Check type="checkbox" id={id}
                                value={id}
                                onChange={onChoose}
                                custom={true} />
                        </div>
                    </Col>
                    <Col xs="1" className="pl-1">
                        <Avatar avatarUrl={avatarUrl}
                            alt={`${firstName} ${lastName}`} />
                    </Col>
                    <Col xs="6">
                        <div className="d-flex align-items-center h-100">
                            <h6 className="m-0"> {`${firstName} ${lastName}`}</h6>
                        </div>
                    </Col>
                </Row>
            </Form.Group>
        </label>
    )
}