import React from "react";
import {Formik, Form, Field, ErrorMessage, FormikHelpers, FormikProps} from "formik"
import * as Yup from "yup";
import {useHistory, NavLink} from "react-router-dom";
import {Row, Col, Button} from "react-bootstrap"
import {callApi} from "../../../server-interaction/apis/api.services";
import {checkFormErrorsHelper} from "../../../helpers/functions/check-form-errors.helper";
import {notifySuccess} from "../../../helpers/functions/notify.helper";
import {EGender} from "../../../@types/enums.d";


interface FormValues {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
    gender: EGender;
}

const RegisterForm = () => {
    const history = useHistory();
    const initialValues: FormValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: EGender.male,
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

    const onsubmit = async (values: FormValues, action: FormikHelpers<FormValues>) => {
        // POST
        const {firstName, lastName, email, password, confirmPassword, gender} = values;
        if (firstName && lastName && email && password && confirmPassword && gender) {
            try {
                const response = await callApi(`/register`, "post", {
                    firstName,
                    lastName,
                    email,
                    password,
                    confirmPassword,
                    gender
                });
                if (response && response.status === 200) {
                    notifySuccess(`Welcome ${firstName} ${lastName}! You are ready now to login....`)
                    history.push("/authenticate/login");
                }
            } catch (errors) {
                checkFormErrorsHelper(errors, (field: string, error: string) => {
                    action.setFieldError(field, error)
                })
            }
        }
    }
    return (
        <Formik initialValues={initialValues} enableReinitialize validationSchema={validationSchema}
                onSubmit={onsubmit}>
            {
                (formikProps: FormikProps<FormValues>) => {
                    const {values, errors, touched, handleSubmit} = formikProps;
                    return (
                        <Form onSubmit={handleSubmit} className="form px-5">
                            <Row className="form-top mb-2">
                                <Col className="text-center mb-5" xs lg="12">
                                    <h5>Join us to have more fun NOW!</h5>
                                </Col>
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
                                <Col xs lg="12" className="email mb-3">
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
                                <Col xs lg="12" className="password  mb-3">
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
                                <Col xs lg="12" className="confirm_password mb-3">
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
                            <Row className="mb-3">
                                <Col xs lg="12">
                                    <div role="group" aria-labelledby="my-radio-group"
                                         className="d-flex justify-content-start align-items-center">
                                        <h5 className="mr-5">Gender</h5>
                                        <label className="mr-5">
                                            <Field type="radio" name="gender" value="male" className="mr-1"/>
                                            Male
                                        </label>
                                        <label className="mr-5">
                                            <Field type="radio" name="gender" value="female" className="mr-1"/>
                                            Female
                                        </label>
                                        <label>
                                            <Field type="radio" name="gender" value="other" className="mr-1"/>
                                            Other
                                        </label>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="form-bottom mb-3">
                                <Col xs lg="12" className="mb-2">
                                    <Button type="submit" variant="primary" className="w-100 mb-2"
                                            disabled={Object.values(errors).some((error) => error) || Object.values(values).some((value) => !value)}>
                                        Register
                                    </Button>
                                </Col>
                                <Col xs lg="12" className="text-center">
                                    <label htmlFor="" className="mr-2">You have already account?</label>
                                    <NavLink to="/authenticate/login" type="button" className="mb-3 font-weight-bold">
                                        Login Now!
                                    </NavLink>
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