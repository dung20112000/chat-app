import {ErrorMessage, Field, Form, Formik, FormikHelpers, FormikProps} from "formik";
import {Button, Col, Row} from "react-bootstrap";
import React from "react";
import * as Yup from "yup";
import {callApi} from "../../../../../../server-interaction/apis/api.services";
import {updateUserSecurityInfos} from "../../../../../../redux/actions/user-infos.actions.redux";
import {useDispatch} from "react-redux";
import {checkFormErrorsHelper} from "../../../../../../helpers/functions/check-form-errors.helper";
import {notifySuccess} from "../../../../../../helpers/functions/notify.helper";

interface FormValues {
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
}


const FormChangePassword = () => {
    const dispatch = useDispatch()
    const initialValues: FormValues = {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    }
    const validationSchema = Yup.object({
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("newPassword")], "Password's not match"),

    })
    const onsubmit = async (values: FormValues, action: FormikHelpers<FormValues>) => {
        // PUT
        const {oldPassword, newPassword} = values;
        if (oldPassword && newPassword) {
            try {
                const password = {oldPassword,newPassword}
                const response = await callApi(`/users/security`, "put", {password});
                if(response && response.data && response.data.success) {
                    notifySuccess("change password successfully")
                    dispatch(updateUserSecurityInfos(response.data.newInfos))
                }
            } catch (errors) {
                if (errors) {
                    console.log(errors.response)
                    checkFormErrorsHelper(errors, (field: string, error: string) => {
                        action.setFieldError(field, error)
                    })
                }
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
                        <Form onSubmit={handleSubmit} className="form px-5 py-2">
                            <Row className=" mb-2">
                                <Col xs lg="12" className="oldPassword mb-3">
                                    <Field
                                        className={touched.oldPassword && errors.oldPassword ? "is-invalid form-control" : "form-control"}
                                        name="oldPassword"
                                        type="password"
                                        placeholder="Old Password"/>
                                    <ErrorMessage name="oldPassword">
                                        {msg => {
                                            return <div className="d-block invalid-feedback">{msg}</div>
                                        }}
                                    </ErrorMessage>
                                </Col>
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
    )
}
export default FormChangePassword;