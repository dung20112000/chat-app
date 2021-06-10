import React, {useState} from "react";
import {Button, Col, Modal, Row} from "react-bootstrap";
import {ErrorMessage, Field, Form, Formik, FormikHelpers, FormikProps} from "formik";
import * as Yup from "yup";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux/reducers/RootReducer.reducer.redux";
import {IUserInfosReducer} from "../../../../../@types/redux";
import {EGender} from "../../../../../@types/enums.d";

interface ILeftSideUserInfoModal {
    show: boolean,
    handleClose: any,
}

interface FormValues {
    firstName: string,
    lastName: string,
    job: string,
    gender: EGender,
}

const LeftSideSecurityModal = (props: ILeftSideUserInfoModal) => {
    const {show, handleClose} = props;
    const userInfosRedux:IUserInfosReducer = useSelector((state:RootState) => state.userInfos)
    let initialValues: FormValues = {
        firstName: "",
        lastName: "",
        job: "",
        gender: EGender.female
    }
    const {personalInfos : {firstName,lastName,job,gender}} = userInfosRedux;
    if (userInfosRedux) {
        initialValues = {firstName,lastName,job,gender}
    }
    const validationSchema = Yup.object({
        firstName: Yup.string()
            .required("Required!"),
        lastName: Yup.string()
            .required("Required!"),
        job: Yup.string()
            .required("Required")
    })

    const onsubmit = async (values: FormValues, action: FormikHelpers<FormValues>) => {

    }
    return <div>
        <Modal show={show}
               onHide={handleClose}
               size="lg"
               aria-labelledby="contained-modal-title-vcenter"
               centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Changes Information
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik initialValues={initialValues} enableReinitialize validationSchema={validationSchema}
                        onSubmit={onsubmit}>
                    {
                        (formikProps: FormikProps<FormValues>) => {
                            const {values, errors, touched, handleSubmit, handleChange} = formikProps;
                            return (
                                <Form onSubmit={handleSubmit} className="form px-5">
                                    <Row className="form-top mb-2">
                                        <Col xs lg="12" className="name mb-3">
                                            <Row>
                                                <Col xs lg="6">
                                                    <Field
                                                        className={touched.firstName && errors.firstName ? "is-invalid form-control" : "form-control"}
                                                        name="firstName" type="text" placeholder="First Name"/>
                                                    <ErrorMessage name="firstName">
                                                        {msg => {
                                                            return <div className="d-block invalid-feedback">{msg}</div>
                                                        }}
                                                    </ErrorMessage>
                                                </Col>
                                                <Col xs lg="6">
                                                    <Field
                                                        className={touched.lastName && errors.lastName ? "is-invalid form-control" : "form-control"}
                                                        name="lastName" type="text" placeholder="Last Name"/>
                                                    <ErrorMessage name="lastName">
                                                        {msg => {
                                                            return <div className="d-block invalid-feedback">{msg}</div>
                                                        }}
                                                    </ErrorMessage>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xs lg="12" className="job mb-3">
                                            <Field
                                                className={touched.job && errors.job ? "is-invalid form-control" : "form-control"}
                                                name="jobs"
                                                type="text"
                                                placeholder="Jobs"/>
                                            <ErrorMessage name="jobs">
                                                {msg => {
                                                    return <div className="d-block invalid-feedback">{msg}</div>
                                                }}
                                            </ErrorMessage>
                                        </Col>
                                        <Col xs lg="12" className="mb-3" style={{fontSize:"1.2rem"}}>
                                            <label>Gender: </label>
                                            <div role="group" aria-labelledby="radio-group">
                                                <label className="mr-5">
                                                    <Field className="mr-1"
                                                           type="radio"
                                                           name="gender"
                                                           value={EGender.male}
                                                         />
                                                    Male
                                                </label>
                                                <label className="mr-5">
                                                    <Field className="mr-1"
                                                           type="radio"
                                                           name="gender"
                                                           value={EGender.female}
                                                         />
                                                    Female
                                                </label>
                                                <label>
                                                    <Field className="mr-1"
                                                           type="radio"
                                                           name="gender"
                                                           value={EGender.other}
                                                           />
                                                    Other
                                                </label>
                                            </div>
                                        </Col>
                                    </Row>
                                </Form>
                            )
                        }
                    }
                </Formik>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
}
export default LeftSideSecurityModal;