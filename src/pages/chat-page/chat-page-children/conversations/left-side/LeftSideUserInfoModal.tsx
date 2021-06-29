import React from "react";
import {Button, Col, Modal, Row} from "react-bootstrap";
import {ErrorMessage, Field, Form, Formik, FormikHelpers, FormikProps} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../redux/reducers/root.reducer.redux";
import {IUserInfosReducer} from "../../../../../@types/redux";
import {EGender} from "../../../../../@types/enums.d";
import {callApi} from "../../../../../server-interaction/apis/api.services";
import {updateUserPersonalInfos} from "../../../../../redux/actions/user-infos.actions.redux";

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
    const dispatch = useDispatch()
    const {show, handleClose} = props;
    const userInfosRedux:IUserInfosReducer = useSelector((state:RootState) => state.userInfos)
        let initialValues: FormValues = {
            firstName: "",
            lastName: "",
            job: "",
            gender: EGender.female
        }
    const validationSchema = Yup.object({
        firstName: Yup.string()
            .required("Required!"),
        lastName: Yup.string()
            .required("Required!"),
        gender: Yup.string().oneOf([EGender.male,EGender.female,EGender.other],"Invalid gender")
            .required("Required!")
    })
    const {personalInfos : {firstName,lastName,job,gender}} = userInfosRedux;
    if (userInfosRedux) {
        initialValues = {firstName,lastName,job,gender}
    }

    const onsubmit = async (values: FormValues, action: FormikHelpers<FormValues>) => {
        const {firstName, lastName, job, gender} = values;
        if (firstName || lastName || job || gender) {
            try {
                const response = await callApi(`/users/personal-infos`, "put", {
                    firstName,
                    lastName,
                    job,
                });
                if(response && response.data && response.data.success) {
                    dispatch(updateUserPersonalInfos(response.data.personalInfos))
                    handleClose()
                }
            } catch (errors) {
                if (errors) {
                    console.log(errors.response)
                }
            }
        }
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
                            const { errors, touched, handleSubmit } = formikProps;
                            return (
                                <Form onSubmit={handleSubmit} className="form px-5" id="form-edit-infos">
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
                                                name="job"
                                                type="text"
                                                placeholder="Jobs"/>
                                            <ErrorMessage name="job">
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
                                                <ErrorMessage name="gender">
                                                    {msg => {
                                                        return <div className="d-block invalid-feedback">{msg}</div>
                                                    }}
                                                </ErrorMessage>
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
                <Button variant="primary" form="form-edit-infos" type="submit">
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
}
export default LeftSideSecurityModal;