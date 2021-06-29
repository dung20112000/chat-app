import {ErrorMessage, Field, Form, Formik, FormikProps} from 'formik';
import {Button, Col, Container, Modal, Row} from 'react-bootstrap';
import {NavLink, useHistory} from 'react-router-dom';
import * as Yup from 'yup';
import React, {useState} from "react";
import {callApi} from "../../../server-interaction/apis/api.services";
import {checkFormErrorsHelper} from "../../../helpers/functions/check-form-errors.helper";
import {notifySuccess} from "../../../helpers/functions/notify.helper";

interface IValues {
    email: string,
    firstName: string,
    lastName: string,
}
interface  IPassword {
    newPassword:string,
    confirmPassword:string
}
const ForgetPassword = () => {
    const history = useHistory();
    const [serverEmail, setServerEmail] = useState(null)
    const initialValues: IValues = {
        email: '',
        firstName: "",
        lastName: "",
    };
    const initialValuesPassword:IPassword = {
        newPassword:"",
        confirmPassword:""
    }
    const onSubmit = (values: any, action: any) => {
        const {email, firstName, lastName} = values
        if (email && firstName && lastName) {
            callApi(`/forget-password/email`, "post", {
                email, firstName, lastName
            }).then((res) => {
                if (res && res.status === 200) {
                    setServerEmail(res.data.email)
                }
            }).catch((err) => {
                checkFormErrorsHelper(err, (field: string, error: string) => {
                    action.setFieldError(field, error)
                })
            })
        }
    };
    const onSubmitPassword = (values:any,action:any)=>{
        const {newPassword,confirmPassword} = values;
        if(newPassword && confirmPassword && serverEmail){
            callApi("/forget-password/password","POST",{newPassword,confirmPassword,email:serverEmail})
                .then((response)=> {
                    if(response && response.data && response.data.success){
                        notifySuccess("New password changed successfully")
                        history.push("/");
                    }
                }).catch((error)=>{
                    if(error){
                        checkFormErrorsHelper(error, (field: string, error: string) => {
                            action.setFieldError(field, error)
                        })
                    }
            })
        }
    }

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Required!'),
        firstName: Yup.string()
            .required("Required!"),
        lastName: Yup.string()
            .required("Required!"),
    });
    const handleClose = ()=>{
        setServerEmail(null)
    }
    const validationSchemaPassword = Yup.object({
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("newPassword")], "Password's not match"),

    })
    return (
        <Row>
            <Col xs={12} className="pb-2 text-center">
                <i style={{fontSize: '2.5rem'}} className="fas fa-user-lock"/>
            </Col>
            <Col xs={12} className="pb-2 text-center">
                <h4>Trouble Logging In?</h4>
            </Col>
            <Col xs={12}>
                <p style={{fontSize: '1.2rem'}} className="w-75 mx-auto text-muted">
                    Enter your email and we will send you a link to get back into your
                    account.
                </p>
            </Col>
            <Col xs={12}>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    enableReinitialize
                    validationSchema={validationSchema}
                >
                    {(formikProps: FormikProps<IValues>) => {
                        const {errors, touched, handleSubmit, values} = formikProps;
                        return (
                            <Form onSubmit={handleSubmit} className="rounded-1rem px-5">
                                <Col xs lg="12" className="mb-3">
                                    <Field
                                        className={
                                            touched.email && errors.email
                                                ? 'is-invalid form-control'
                                                : 'form-control'
                                        }
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                    />
                                    <ErrorMessage name="email">
                                        {(msg) => {
                                            return (
                                                <div className="d-block invalid-feedback">{msg}</div>
                                            );
                                        }}
                                    </ErrorMessage>
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
                                <Col xs lg="12" className="mb-2">
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        className="w-100 mb-2"
                                        disabled={
                                            Object.values(errors).some((error) => error) ||
                                            Object.values(values).some((value) => !value)
                                        }
                                    >
                                        Send Login Link
                                    </Button>
                                </Col>
                                <Col>
                                    <div className="d-flex flex-row align-items-center justify-content-between mt-3 mb-3">
                                        <div className="bg-dark w-100" style={{height: "0.1vh"}}/>
                                        <div className="w-50">OR</div>
                                        <div className="bg-dark w-100" style={{height: "0.1vh"}}/>
                                    </div>
                                </Col>
                                <Col xs={12}>
                                    <div
                                        className="d-flex justify-content-around"
                                        style={{fontSize: '1.3rem'}}
                                    >
                                        <NavLink
                                            to="/authenticate/register"
                                            className="w-100 text-primary"
                                        >
                                            Create New Account
                                        </NavLink>
                                        <NavLink
                                            to="/authenticate/login"
                                            className="w-100  text-primary"
                                        >
                                            Back To Login
                                        </NavLink>
                                    </div>
                                </Col>
                            </Form>
                        );
                    }}
                </Formik>
            </Col>
            <Col>
                {
                    <Modal show={serverEmail}
                           onHide={handleClose}
                           size="lg"
                           aria-labelledby="contained-modal-title-vcenter"
                           centered>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                New password
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Container>
                                <Row>
                                    <Col xs={12}>
                                        <Formik initialValues={initialValuesPassword} onSubmit={onSubmitPassword} validationSchema={validationSchemaPassword}>
                                            {
                                                (formikProps: FormikProps<any>) => {
                                                    const {values, errors, touched, handleSubmit} = formikProps;
                                                    return (
                                                        <Form onSubmit={handleSubmit} className="form px-5 py-2">
                                                            <Row className=" mb-2">
                                                                <Col xs lg="12" className="newPassword  mb-3">
                                                                    <Field name="newPassword"
                                                                           type="password"
                                                                           className={touched.newPassword && errors.newPassword ? "is-invalid form-control" : "form-control"}
                                                                           placeholder="New Password"/>
                                                                    <ErrorMessage name="newPassword">
                                                                        {msg => {
                                                                            return <div className="d-block invalid-feedback">{msg}</div>
                                                                        }}
                                                                    </ErrorMessage>
                                                                </Col>
                                                                <Col xs lg="12" className="confirmPassword mb-3">
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
                                                            <Row>
                                                                <Col xs lg="12">
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
                                    </Col>
                                </Row>
                            </Container>
                        </Modal.Body>
                    </Modal>
                }
            </Col>
        </Row>
    );
};
export default ForgetPassword;
