import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import * as Yup from "yup";
import "./scss/rightsidecahtpage.scss";
import { Avatar } from './../../../../../common-components/avatar.common';
import { callApi } from '../../../../../server-interaction/api.services';
import { FormikHelpers } from 'formik';
import querystring from 'query-string';
import { checkFormErrorsHelper } from '../../../../../helpers/functions/check-form-errors.helper';
// eslint-disable-next-line no-useless-escape
const FILTER = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
interface IFormValues {
    searchQuery: string;
}

interface IResponseData {
    _id: string;
    email: string;
    personalInfos: {
        avatarUrl: string,
        firstName: string,
        lastName: string,
        gender: string,
    }
}

const initialValues: IResponseData = {
    _id: "",
    email: "",
    personalInfos: { avatarUrl: "", firstName: "", lastName: "", gender: "", }
}

const RightSideModal = (props: any) => {
    const [flag, setFlag] = useState(true);
    const [friendInfos, setFriendInfos] = useState<IResponseData>(initialValues);

    const onSubmitForm = async (value: IFormValues, action?: FormikHelpers<IFormValues>) => {
        let params = {};
        (FILTER.test(value.searchQuery)) ? params = { email: value.searchQuery } : params = { id: value.searchQuery };
        try {
            const response = await callApi(`/search/friends?${querystring.stringify(params)}`, "GET");
            if (response) {
                if (response.data && response.data.friendInfos) {

                    setFriendInfos(response.data.friendInfos);
                }
            }
            console.log(response);
        } catch (errors) {
            checkFormErrorsHelper(errors, (field: string, error: string) => {
                if (action) action.setFieldError(field, error)
            })
        }
    }

    const { handleSubmit, handleChange, touched, errors, values, resetForm } = useFormik({
        initialValues: { searchQuery: '' },
        validationSchema: Yup.object({
            searchQuery: Yup.string().required("Required"),
        }),
        enableReinitialize: true,
        onSubmit: onSubmitForm
    })

    const sendMasage = () => {
        setFlag(!flag);
    }

    const onResetForm = () => {
        const { onHide } = props;
        setFriendInfos(initialValues);
        resetForm();
        onHide();
    }

    return (
        <>
            <Modal {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add new friend
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <Row>
                            <Col xs="10">
                                <div className="form__div">
                                    <input
                                        id="searchQuery"
                                        name="searchQuery"
                                        type="text"
                                        className={`form__input form-control ${touched.searchQuery && errors.searchQuery && 'is-invalid'} shadow-none`}
                                        onChange={handleChange}
                                        value={values.searchQuery}
                                        placeholder=" "
                                    />
                                    <label htmlFor="" className={`form__label ${touched.searchQuery && errors.searchQuery && 'text-danger'}`}
                                    >Email or id</label>
                                </div>

                            </Col>
                            <Col xs="2" className="pl-0">
                                <Button variant="outline-primary" type="submit"
                                    className="w-100 h-100"
                                >
                                    <div className="d-flex justify-content-center align-items-center">
                                        <i className="fas fa-search"></i>
                                    </div>
                                </Button>
                            </Col>
                        </Row>
                        {touched.searchQuery && errors.searchQuery ? (
                            <div className="text-danger mb-3">{errors.searchQuery}</div>
                        ) : null}
                    </form>
                    {
                        friendInfos.email && friendInfos._id && (
                            <div className="result-email mt-3">
                                <Row>
                                    <Col xs="2">
                                        <Avatar avatarUrl={friendInfos?.personalInfos.avatarUrl}
                                            alt={`${friendInfos.personalInfos.firstName} ${friendInfos.personalInfos.lastName}`} />
                                    </Col>
                                    <Col xs="6">
                                        <div className="d-flex align-items-center h-100">
                                            <p className="m-0">
                                                {`${friendInfos.personalInfos.firstName} ${friendInfos.personalInfos.lastName}`}
                                            </p>
                                        </div>
                                    </Col>
                                    <Col xs="4" className="d-flex align-items-center">
                                        <Button type="button" className="w-100"
                                            variant={flag ? ("outline-primary") : ("outline-danger")}
                                            onClick={() => sendMasage()}
                                        >
                                            {
                                                flag ? (<div className="d-flex justify-content-center align-content-center">
                                                    Send Masage
                                                </div>) : (<div className="d-flex justify-content-center align-content-center">
                                                    Cancel
                                                </div>)
                                            }
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        )
                    }

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={() => onResetForm()}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default RightSideModal;