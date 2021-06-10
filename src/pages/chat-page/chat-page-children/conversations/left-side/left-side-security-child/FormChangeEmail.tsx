import {ErrorMessage, Field, Form, Formik, FormikHelpers, FormikProps} from "formik";
import {Button, Col, Row} from "react-bootstrap";
import React from "react";
import * as Yup from "yup";
import {IUserInfosReducer} from "../../../../../../@types/redux";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../redux/reducers/RootReducer.reducer.redux";

interface FormValues {
    defaultEmail: string,
    currentEmail: string,
    newEmail: string,
}


const FormChangeEmail = () => {
    const userInfosRedux:IUserInfosReducer = useSelector((state:RootState) => state.userInfos)
    let initialValues: FormValues = {
        defaultEmail: "",
        currentEmail: "",
        newEmail: "",
    }
    const validationSchema = Yup.object({
        currentEmail: Yup.string()
            .email("Invalid email format"),
        newEmail: Yup.string()
            .email("Invalid email format")
    })
    const {email} = userInfosRedux;
    if (userInfosRedux) {
        initialValues = {defaultEmail: email,currentEmail:"", newEmail: ""}
    }
    const onsubmit = async (values: FormValues, action: FormikHelpers<FormValues>) => {
        // POST
    }
    return (
        <Formik initialValues={initialValues} enableReinitialize validationSchema={validationSchema}
                onSubmit={onsubmit}>
            {
                (formikProps: FormikProps<FormValues>) => {
                    const {values, errors, touched, handleSubmit} = formikProps;
                    return (
                        <Form onSubmit={handleSubmit} className="form px-5 py-2">
                            <Row className=" mb-2">
                                <Col xs lg="12" className="defaultEmail mb-3">
                                    <Field
                                        className={touched.defaultEmail && errors.defaultEmail ? "is-invalid form-control" : "form-control"}
                                        name="defaultEmail"
                                        type="email"
                                        placeholder="Default Email"
                                        disabled/>
                                </Col>
                                <Col xs lg="12" className="currentEmail  mb-3">
                                    <Field
                                        className={touched.currentEmail && errors.currentEmail ? "is-invalid form-control" : "form-control"}
                                        name="currentEmail"
                                        type="email"
                                        placeholder="Current Email"/>
                                    <ErrorMessage name="newEmail">
                                        {msg => {
                                            return <div className="d-block invalid-feedback">{msg}</div>
                                        }}
                                    </ErrorMessage>
                                </Col>
                                <Col xs lg="12" className="newEmail  mb-3">
                                    <Field
                                        className={touched.newEmail && errors.newEmail ? "is-invalid form-control" : "form-control"}
                                        name="newEmail"
                                        type="email"
                                        placeholder="New Email"/>
                                    <ErrorMessage name="newEmail">
                                        {msg => {
                                            return <div className="d-block invalid-feedback">{msg}</div>
                                        }}
                                    </ErrorMessage>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs lg="12" className="mb-2">
                                    <Button type="submit"
                                            variant="primary"
                                            disabled={Object.values(errors).some((error) => error) || Object.values(values).some((value) => !value)}>
                                        Save
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    )
                }
            }
        </Formik>
    )
}
export default FormChangeEmail;