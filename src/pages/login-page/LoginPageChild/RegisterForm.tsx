import React, {useEffect, useState} from "react";
import {Formik, Form, Field, ErrorMessage, FormikHelpers, FormikProps, FieldArray, FieldArrayRenderProps} from "formik"
import * as Yup from "yup";
import axios from "axios";
import {useHistory, NavLink} from "react-router-dom";
import {Container , Row, Col} from "react-bootstrap"


interface FormValues {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    confirm_password: string,
}

const RegisterForm = (props: any) => {
    const history = useHistory();
    const initialValues: FormValues = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
    }
    const validationSchema = Yup.object({
        first_name: Yup.string()
            .required("Required!"),
        last_name: Yup.string()
            .required("Required!"),
        email: Yup.string()
            .email("Invalid email format")
            .required("Required!"),
        password: Yup.string()
            .min(4, "Minimum 4 characters")
            .required("Required!"),
        confirm_password: Yup.string()
            .oneOf([Yup.ref("password")], "Password's not match")
            .required("Required!")
    })

    const onsubmit = (values: FormValues, action: FormikHelpers<FormValues>) => {
        // POST
    }
    return (
        <div>
            <Formik initialValues={initialValues} enableReinitialize validationSchema={validationSchema}
                    onSubmit={onsubmit}>
                {
                    (formikProps: FormikProps<FormValues>) => {
                        const {values, errors} = formikProps;
                        const {
                            first_name: errorFirstName,
                            last_name: errorLastName,
                            email: errorEmail,
                            password: errorPassword,
                            confirm_password: errorConfirmPassword
                        } = errors;
                        return (
                            <Container fluid id="container">
                               <Row>
                                   <Col xs lg="4" >
                                       <Form id="form">
                                           <Row>
                                               <Col id="header" xs lg="12">
                                                   <h6>Join us to have more fun NOW!</h6>
                                               </Col>
                                               <Col xs lg="8" id="name">
                                                   <Row>
                                                       <Col xs lg="6">
                                                           <Field className="form-control" name="first_name" type="text" placeholder="First Name"/>
                                                           <ErrorMessage name="first_name">
                                                               {msg => {
                                                                   return <div className="d-block invalid-feedback">{msg}</div>
                                                               }}
                                                           </ErrorMessage>
                                                       </Col>
                                                       <Col xs lg="6">
                                                           <Field className="form-control" name="last_name" type="text" placeholder="Last Name"/>
                                                           <ErrorMessage name="last_name">
                                                               {msg => {
                                                                   return <div className="d-block invalid-feedback">{msg}</div>
                                                               }}
                                                           </ErrorMessage>
                                                       </Col>
                                                   </Row>
                                               </Col>
                                               <Col xs lg="8">
                                                   <Field className="form-control"
                                                          name="email"
                                                          type="email"
                                                          id="email"
                                                          placeholder="Email"/>
                                                   <ErrorMessage name="email">
                                                       {msg => {
                                                           return <div id="error" className="d-block invalid-feedback">{msg}</div>
                                                       }}
                                                   </ErrorMessage>
                                               </Col>
                                               <Col xs lg="8">
                                                   <Field name="password"
                                                          id="password"
                                                          type="password"
                                                          className="form-control"
                                                          placeholder="Password"/>
                                                   <ErrorMessage name="password">
                                                       {msg => {
                                                           return <div id="error" className="d-block invalid-feedback">{msg}</div>
                                                       }}
                                                   </ErrorMessage>
                                               </Col>
                                               <Col xs lg="8">
                                                   <Field name="confirm_password"
                                                          id="confirm_password"
                                                          type="password"
                                                          className="form-control"
                                                          placeholder="Confirm Password"/>
                                                   <ErrorMessage name="confirm_password">
                                                       {msg => {
                                                           return <div id="error" className="d-block invalid-feedback">{msg}</div>
                                                       }}
                                                   </ErrorMessage>
                                               </Col>
                                           </Row>
                                           <Row id="radio-group">
                                               <Col xs lg="12">Gender: </Col>
                                               <Col xs lg="12" role="group" aria-labelledby="my-radio-group">
                                                   <Row>
                                                       <Col xs lg="4">
                                                           <Field type="radio" name="picked" value="One" />
                                                           <label id="text">Male</label>
                                                       </Col>
                                                       <Col xs lg="4">
                                                           <Field type="radio" name="picked" value="Two" />
                                                           <label id="text">Female</label>
                                                       </Col>
                                                       <Col xs lg="4">
                                                           <Field type="radio" name="picked" value="Two" />
                                                           <label id="text">Other</label>
                                                       </Col>
                                                   </Row>
                                               </Col>
                                           </Row>
                                           <Row id="register">
                                               <Col xs lg="6">
                                                   <button id="btn-register" type="submit" className="btn btn-primary mr-2"
                                                           disabled={!!(errorEmail || errorPassword || errorConfirmPassword || errorFirstName || errorLastName ||
                                                               !values.email || !values.password || !values.confirm_password || !values.first_name || values.last_name)}>
                                                       Register
                                                   </button>
                                               </Col>
                                               <Col xs lg="6">
                                                   <button id="to-login" type="submit"
                                                           className="btn btn-success mr-2"
                                                           onClick={() => history.push(`/login`)}>Login Now!</button>
                                               </Col>
                                           </Row>
                                       </Form>
                                   </Col>
                               </Row>
                            </Container>
                        )
                    }
                }
            </Formik>
        </div>
    )
}
export default RegisterForm;