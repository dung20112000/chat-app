import React, {ReactNode, useCallback, useRef, useState} from "react";
import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import FormChangePassword from "./left-side-security-child/FormChangePassword";
import FormChangeEmail from "./left-side-security-child/FormChangeEmail";
import FormChangePhone from "./left-side-security-child/FormChangePhone";

interface ILeftSideSecurityModal {
    show: boolean,
    handleClose: any,
}


interface IPropsSectionSecurity {
    sectionName: string,
    actionOpen: (form:string) => void,
    icon: () => React.ReactNode,
    description: string,
    actionClose: (form:string) => void,
    isFormOpen: boolean,
}
const SectionSecurity:React.FC<IPropsSectionSecurity> = ({sectionName,actionOpen,icon,description,actionClose,isFormOpen}) => {
    return (
        <Row className="pt-4">
            <Col xs={1} className="align-items-center" style={{fontSize:"1.5rem"}}>
                {icon()}
            </Col>
            <Col xs={8} className="pl-0 align-items-center" >
                <div>
                    <h5 className="mb-1 text-truncate">Change {sectionName}</h5>
                    <p className="m-0 text-truncate text-muted">{description} </p>
                </div>
            </Col>
            <Col xs={3} className="text-right">
                {
                    isFormOpen ? (
                        <Button type="button"
                                variant="outline-danger"
                                className="pt-2"
                                onClick={() =>  actionClose(sectionName)}>
                            Cancel
                        </Button>
                    ) : (
                        <Button type="button"
                                variant="link"
                                className="pt-2"
                                onClick={() => actionOpen(sectionName)}>
                            Change
                        </Button>
                    )
                }
            </Col>
        </Row>
    )
}

const LeftSideSecurityModal = (props: ILeftSideSecurityModal) => {
    const {show, handleClose} = props;
    const formList = useRef(["email","phone","password"])
    const [openFormChange, setOpenFormChange] = useState({email:false,password:false,phone:false})
    const changeForm = useCallback((form:string)=>{
        if(formList.current.indexOf(form) !== -1 ){
            const otherForms = formList.current.filter(item => item !== form )
            const newState:any = {};
            newState[form] = true;
            otherForms.forEach((item)=>{
                newState[item] = false;
            })
            setOpenFormChange(newState);
        }
    },[])
    const closeForm = useCallback((form:string)=>{
        if(formList.current.indexOf(form) !== -1 ){
            const otherForms = formList.current.filter(item => item !== form )
            const newState:any = {};
            newState[form] = false;
            setOpenFormChange(newState);
        }
    },[])
    return <div>
        <Modal show={show}
               onHide={handleClose}
               size="lg"
               aria-labelledby="contained-modal-title-vcenter"
               centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Security Change
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <SectionSecurity sectionName="password" isFormOpen={openFormChange.password}
                                     actionClose={closeForm}
                                     actionOpen={changeForm}
                                     icon={() => <i className="fas fa-key"/>}
                                     description="It's a good idea to use a strong password that you're not using elsewhere" />
                    <div className="pt-3">
                        {
                            openFormChange.password ? (
                                <FormChangePassword />
                            ) : null
                        }
                    </div>
                    <SectionSecurity sectionName="email" isFormOpen={openFormChange.email}
                                     actionClose={closeForm}
                                     actionOpen={changeForm}
                                     icon={() => <i className="fas fa-envelope-square"/>}
                                     description="You can change to another email" />
                    <div className="pt-3">
                        {
                            openFormChange.email ? (
                                <FormChangeEmail />
                            ) : null
                        }
                    </div>
                    <SectionSecurity sectionName="phone" isFormOpen={openFormChange.phone}
                                     actionClose={closeForm}
                                     actionOpen={changeForm}
                                     icon={() => <i className="fas fa-phone"/>}
                                     description="You can change to another phone" />
                    <div className="pt-3">
                        {
                            openFormChange.phone ? (
                                <FormChangePhone />
                            ) : null
                        }
                    </div>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => {
                    handleClose();
                    setOpenFormChange({email:false ,phone:false, password:false})
                }}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
}
export default LeftSideSecurityModal;