import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import * as Yup from "yup";
import "./scss/rightsidecahtpage.scss";
import { Avatar } from './../../../../../common-components/avatar.common';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/reducers/RootReducer.reducer.redux';

const RightSideModal = (props: any) => {
    const [flag, setFlag] = useState(true);
    const { handleSubmit, handleChange, touched, errors, values } = useFormik({
        initialValues: { email: '' },
        validationSchema: Yup.object({
            email: Yup.string().email().required("Email is required"),
        }),
        onSubmit: values => {
            console.log(values);
        },
    })
    const userInfos = useSelector((state: RootState) => state.userInfos);
    const { personalInfos: { firstName, lastName, avatarUrl } } = userInfos;

    const sendMasage = () => {
        setFlag(!flag);
    }

    return (
        <>
            <Modal {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add new friend
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <label>Email</label>
                        <Row>
                            <Col xs="10">
                                <input
                                    id="email"
                                    name="email"
                                    type="text"
                                    className={`form-control ${touched.email && errors.email && 'is-invalid'}`}
                                    onChange={handleChange}
                                    value={values.email}
                                />
                            </Col>
                            <Col xs="2" className="pl-0">
                                <Button variant="outline-primary" type="submit"
                                    className="w-100 h-100"
                                >
                                    <div className="d-flex justify-content-center align-items-center">
                                        <i className="fas fa-search"></i>
                                    </div>
                                </Button>
                            </Col>
                        </Row>
                        {touched.email && errors.email ? (
                            <div className="text-danger mb-3">{errors.email}</div>
                        ) : null}
                    </form>
                    <div className="result-email mt-3">
                        <Row>
                            <Col xs="2">
                                <Avatar avatarUrl={avatarUrl}
                                    alt={`${firstName} ${lastName}`} />
                            </Col>
                            <Col xs="6">
                                <div className="d-flex align-items-center h-100">
                                    <p className="m-0">
                                        {`${firstName} ${lastName}`}
                                    </p>
                                </div>
                            </Col>
                            <Col xs="4" className="d-flex align-items-center">
                                <Button type="button" className="w-100"
                                    variant={flag ? ("outline-primary") : ("outline-danger")}
                                    onClick={() => sendMasage()}
                                >
                                    {
                                        flag ? (<div className="d-flex justify-content-center align-content-center">
                                            Send Masage
                                        </div>) : (<div className="d-flex justify-content-center align-content-center">
                                            Cancel
                                        </div>)
                                    }
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default RightSideModal;