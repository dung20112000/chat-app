import {ErrorMessage, Field, Form, Formik, FormikHelpers, FormikProps} from "formik";
import {Button, Col, Row} from "react-bootstrap";
import React from "react";
import * as Yup from "yup";

interface FormValues {
    currentPassword: string,
    newPassword: string,
    confirmPassword: string,
}


const FormChangePassword = () => {
    const initialValues: FormValues = {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    }
    const validationSchema = Yup.object({
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Password's not match"),

    })
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
                                <Col xs lg="12" className="currentPassword mb-3">
                                    <Field
                                        className={touched.currentPassword && errors.currentPassword ? "is-invalid form-control" : "form-control"}
                                        name="currentPassword"
                                        type="password"
                                        placeholder="Current Password"/>
                                </Col>
                                <Col xs lg="12" className="newPassword  mb-3">
                                    <Field name="newPassword"
                                           type="password"
                                           className={touched.newPassword && errors.newPassword ? "is-invalid form-control" : "form-control"}
                                           placeholder="New Password"/>
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
    )
}
export default FormChangePassword;