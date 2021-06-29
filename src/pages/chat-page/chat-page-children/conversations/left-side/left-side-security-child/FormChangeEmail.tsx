import {ErrorMessage, Field, Form, Formik, FormikHelpers, FormikProps} from "formik";
import {Button, Col, Row} from "react-bootstrap";
import React from "react";
import * as Yup from "yup";
import {IUserInfosReducer} from "../../../../../../@types/redux";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../../redux/reducers/root.reducer.redux";
import {callApi} from "../../../../../../server-interaction/apis/api.services";
import {updateUserSecurityInfos} from "../../../../../../redux/actions/user-infos.actions.redux";
import {notifySuccess} from "../../../../../../helpers/functions/notify.helper";
import {checkFormErrorsHelper} from "../../../../../../helpers/functions/check-form-errors.helper";

interface FormValues {
    defaultEmail: string,
    email: string,
}


const FormChangeEmail = () => {
    const dispatch = useDispatch()
    const userInfosRedux:IUserInfosReducer = useSelector((state:RootState) => state.userInfos)
    let initialValues: FormValues = {
        defaultEmail: "",
        email: "",
    }
    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email format")
    })
    const {email} = userInfosRedux;
    if (userInfosRedux) {
        initialValues = {defaultEmail: email, email: ""}
    }
    const onsubmit = async (values: FormValues, action: FormikHelpers<FormValues>) => {
        // PUT
        const {email} = values;
        if (email) {
            try {
                const response = await callApi(`/users/security`, "put", {
                    email,
                });
                if(response && response.data && response.data.success) {
                    notifySuccess("change email successfully")
                    dispatch(updateUserSecurityInfos(response.data.newInfos))
                }
            } catch (errors) {
                if (errors) {
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
                                <Col xs lg="12" className="defaultEmail mb-3">
                                    <Field
                                        className={touched.defaultEmail && errors.defaultEmail ? "is-invalid form-control" : "form-control"}
                                        name="defaultEmail"
                                        type="email"
                                        placeholder="Default Email"
                                        disabled/>
                                </Col>
                                <Col xs lg="12" className="newEmail  mb-3">
                                    <Field
                                        className={touched.email && errors.email ? "is-invalid form-control" : "form-control"}
                                        name="email"
                                        type="email"
                                        placeholder="New Email"/>
                                    <ErrorMessage name="email">
                                        {msg => {
                                            return <div className="d-block invalid-feedback">{msg}</div>
                                        }}
                                    </ErrorMessage>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs lg="12" className="mb-2">
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