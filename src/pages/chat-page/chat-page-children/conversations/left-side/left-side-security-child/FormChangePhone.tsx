import {ErrorMessage, Field, Form, Formik, FormikHelpers, FormikProps} from "formik";
import {Button, Col, Row} from "react-bootstrap";
import React from "react";
import * as Yup from "yup";


interface FormValues {
    defaultPhone: number,
    currentPhone: number,
    newPhone: number
}


const FormChangeEmail = () => {
    let initialValues: FormValues = {
        defaultPhone: 999999999,
        currentPhone: 123456789,
        newPhone: 0
    }


    const onsubmit = async (values: FormValues, action: FormikHelpers<FormValues>) => {
        // POST
    }
    return (
        <Formik initialValues={initialValues} enableReinitialize
                onSubmit={onsubmit}>
            {
                (formikProps: FormikProps<FormValues>) => {
                    const {values, errors, touched, handleSubmit} = formikProps;
                    return (
                        <Form onSubmit={handleSubmit} className="form px-5 py-2">
                            <Row className=" mb-2">
                                <Col xs lg="12" className="defaultPhone mb-3">
                                    <Field
                                        className={touched.currentPhone && errors.currentPhone ? "is-invalid form-control" : "form-control"}
                                        name="defaultPhone"
                                        type="number"
                                        placeholder="Default Phone"
                                        disabled/>
                                </Col>
                                <Col xs lg="12" className="currentPhone  mb-3">
                                    <Field
                                        className={touched.newPhone && errors.newPhone ? "is-invalid form-control" : "form-control"}
                                        name="currentPhone"
                                        type="number"
                                        placeholder="Current Phone"/>
                                </Col>
                                <Col xs lg="12" className="newPhone  mb-3">
                                    <Field
                                        className={touched.newPhone && errors.newPhone ? "is-invalid form-control" : "form-control"}
                                        name="newPhone"
                                        type="number"
                                        placeholder="New Phone"/>
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
export default FormChangeEmail;