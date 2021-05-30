import React from "react";
import {Formik, Form, Field, ErrorMessage, FormikHelpers, FormikProps} from "formik"
import * as Yup from "yup";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {Row, Col, Button} from "react-bootstrap"
import {callApi} from "../../../server-interaction/api.services";


interface FormValues {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
}

const RegisterForm = () => {
    const history = useHistory();
    const initialValues: FormValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    }
    const validationSchema = Yup.object({
        firstName: Yup.string()
            .required("Required!"),
        lastName: Yup.string()
            .required("Required!"),
        email: Yup.string()
            .email("Invalid email format")
            .required("Required!"),
        password: Yup.string()
            .required("Required!"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Password's not match")
            .required("Required!")
    })

    const onsubmit = (values: FormValues, action: FormikHelpers<FormValues>) => {
        // POST
        const {firstName, lastName, email, password, confirmPassword} = values;
        if (firstName && lastName && email && password && confirmPassword) {
            callApi(`/register`, "post", {firstName, lastName, email, password, confirmPassword})
                .then(res => console.log(res))
                .catch(err => {
                    if (err) {
                        console.log(err.response)
                    }
                })
        }
    }
    return (
        <Formik initialValues={initialValues} enableReinitialize validationSchema={validationSchema}
                onSubmit={onsubmit}>
            {
                (formikProps: FormikProps<FormValues>) => {
                    const {values, errors, touched, handleSubmit} = formikProps;
                    const {
                        firstName: errorFirstName,
                        lastName: errorLastName,
                        email: errorEmail,
                        password: errorPassword,
                        confirmPassword: errorConfirmPassword
                    } = errors;
                    return (
                        <Form onSubmit={handleSubmit} className="form px-5">
                            <Row className="form-top mb-2">
                                <Col className="text-center mb-3 mt-5" xs lg="12">
                                    <h6>Join us to have more fun NOW!</h6>
                                </Col>
                                <Col xs lg="12" className="name mt-2 mb-2">
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
                                <Col xs lg="12" className="email mt-2 mb-2">
                                    <Field
                                        className={touched.email && errors.email ? "is-invalid form-control" : "form-control"}
                                        name="email"
                                        type="email"
                                        placeholder="Email"/>
                                    <ErrorMessage name="email">
                                        {msg => {
                                            return <div className="d-block invalid-feedback">{msg}</div>
                                        }}
                                    </ErrorMessage>
                                </Col>
                                <Col xs lg="12" className="password mt-2 mb-2">
                                    <Field name="password"
                                           type="password"
                                           className={touched.password && errors.password ? "is-invalid form-control" : "form-control"}
                                           placeholder="Password"/>
                                    <ErrorMessage name="password">
                                        {msg => {
                                            return <div className="d-block invalid-feedback">{msg}</div>
                                        }}
                                    </ErrorMessage>
                                </Col>
                                <Col xs lg="12" className="confirm_password mt-2 mb-2">
                                    <Field name="confirmPassword"
                                           type="password"
                                           className={touched.confirmPassword && errors.confirmPassword ? "is-invalid form-control" : "form-control"}
                                           placeholder="Confirm Password"/>
                                    <ErrorMessage name="confirmPassword">
                                        {msg => {
                                            return <div className="d-block invalid-feedback">{msg}</div>
                                        }}
                                    </ErrorMessage>
                                </Col>
                            </Row>
                            <Row className="form-bottom mb-3">
                                <Col xs lg="12" className="mb-2">
                                    <Button type="submit" variant="primary" className="w-100 mb-2">
                                        Register
                                    </Button>
                                </Col>
                                <Col xs lg="12">
                                    <Button type="button" variant="light-secondary" className="w-100 mb-3"
                                            onClick={() => history.push(`/authenticate/login`)}>Login Now!</Button>
                                </Col>
                            </Row>
                        </Form>

                    )
                }
            }
        </Formik>
    )
}
export default RegisterForm;