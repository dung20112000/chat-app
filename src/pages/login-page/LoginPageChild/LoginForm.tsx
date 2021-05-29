import React from "react";
import {Formik, Form, Field, ErrorMessage, FormikHelpers, FormikProps} from "formik"
import * as Yup from "yup";
import axios from "axios";
import {NavLink} from "react-router-dom";
import {Container , Row, Col} from "react-bootstrap"
import "./LoginFormCss.css"

interface FormValues {
    email: string,
    password: string,
}

const FormLogin = (props: any) => {
    const initialValues: FormValues = {
        email: "",
        password: "",
    }
    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email format")
            .required("Required!"),
        password: Yup.string()
            .min(4, "Minimum 4 characters")
            .required("Required!"),
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
                            email: errorEmail,
                            password: errorPassword,
                        } = errors;
                        return (
                            <Container fluid id="container">
                               <Row>
                                   <Col xs lg="4">
                                       <Form id="form">
                                           <Row>
                                               <Col xs lg="12">
                                                   <Row>
                                                       <Col id="header" xs lg="12">
                                                           <h6>Login now to chat with the world !</h6>
                                                       </Col>
                                                       <Col xs lg="8">
                                                           <Field className="form-control"
                                                                  name="email"
                                                                  id="email"
                                                                  type="email"
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
                                                   </Row>
                                                   <Row id="login">
                                                       <Col xs lg="6">
                                                           <button id="btn" type="submit" className="btn btn-success mr-2"
                                                                   disabled={!!(errorEmail || errorPassword || !values.email || !values.password)}>Login
                                                           </button>
                                                       </Col>
                                                       <Col xs lg="6">
                                                           <label>Forget password?</label>
                                                       </Col>
                                                   </Row>
                                                   <Col xs lg="12" id="to-register">
                                                       <Col xs lg="12">
                                                           <label>You don't have account ?</label>
                                                       </Col>
                                                       <Col xs lg="12">
                                                           <NavLink to="/login/register">Register Now!</NavLink>
                                                       </Col>
                                                   </Col>
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
export default FormLogin;