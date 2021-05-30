import React from "react";
import {Formik, Form, Field, ErrorMessage, FormikHelpers, FormikProps} from "formik"
import * as Yup from "yup";
import {useHistory, NavLink} from "react-router-dom";
import {Row, Col, Button} from "react-bootstrap"
import {callApi} from "../../../server-interaction/api.services";

interface FormValues {
    email: string,
    password: string,
}

const FormLogin = () => {
    const history = useHistory();
    const initialValues: FormValues = {
        email: "",
        password: "",
    }
    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email format")
            .required("Required!"),
        password: Yup.string()
            .required("Required!"),
    })
    const onsubmit = (values: FormValues, action: FormikHelpers<FormValues>) => {
        // POST
        const {email,password} = values
        if (email && password) {
            callApi(`/login`, "post", {email,password})
                .then(res => {
                    if(res){
                        if(res.data && res.data.authToken){
                            localStorage.setItem("authToken",JSON.stringify(res.data.authToken));
                            history.push("/chat-page")
                        }
                    }
                })
                .catch(err => {
                if(err) {
                    console.log(err.response);
                        action.setErrors({password:err.response?.data?.errors[0]?.errors[0]})
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
                        email: errorEmail,
                        password: errorPassword,
                    } = errors;
                    return (
                        <Form onSubmit={handleSubmit} className="form px-5">
                            <Row>
                                <Col xs lg="12">
                                    <Row className="form-top">
                                        <Col className="text-center mb-3 mt-5" xs lg="12">
                                            <h6>Login now to chat with the world !</h6>
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
                                    </Row>
                                    <Row className=" mt-2 mb-3">
                                        <Col xs lg="12">
                                            <Button type="submit" variant="primary" className="w-100 mb-2"
                                                    disabled={!!(errorEmail || errorPassword || !values.email || !values.password)}>Login
                                            </Button>
                                        </Col>
                                        <Col xs lg="12" className="forget-password mt-1">
                                            <NavLink className="d-block w-100 text-center text-link-blue"
                                                     to="/authenticate/forget-password">Forget password?</NavLink>
                                        </Col>
                                        <Col xs lg="12" className="to-create-account mt-3">
                                            <label className="d-block w-100 text-center">You don't have account
                                                ?</label>
                                        </Col>
                                        <Col xs lg="12">
                                            <Button variant="dark-yellow" className="w-100 mb-3"
                                                    onClick={() => history.push(`/authenticate/register`)}> Register
                                                Now! </Button>
                                        </Col>
                                    </Row>

                                </Col>
                            </Row>
                        </Form>
                    )
                }
            }
        </Formik>
    )
}
export default FormLogin;