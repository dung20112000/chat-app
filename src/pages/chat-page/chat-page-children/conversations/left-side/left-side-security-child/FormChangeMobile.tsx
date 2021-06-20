import {Field, Form, Formik, FormikHelpers, FormikProps} from "formik";
import {Button, Col, Row} from "react-bootstrap";
import React from "react";


interface FormValues {
    defaultMobile: number,
    mobile: number
}


const FormChangeEmail = () => {
    let initialValues: FormValues = {
        defaultMobile: 999999999,
        mobile: 0
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
                                        className={touched.defaultMobile&& errors.defaultMobile ? "is-invalid form-control" : "form-control"}
                                        name="defaultMobile"
                                        type="number"
                                        placeholder="Default Mobile"
                                        disabled/>
                                </Col>
                                <Col xs lg="12" className="mobile  mb-3">
                                    <Field
                                        className={touched.mobile && errors.mobile ? "is-invalid form-control" : "form-control"}
                                        name="mobile"
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