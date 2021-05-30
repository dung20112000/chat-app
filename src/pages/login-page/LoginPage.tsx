import LoginForm from "./login-page-child/LoginForm";
import {Route,Switch} from "react-router-dom";
import RegisterForm from "./login-page-child/RegisterForm";
import React, {useRef} from "react";
import {Col, Container, Row } from "react-bootstrap";
import "./login-page-child/scss/form.scss"


const LoginPage = ()=>{
    const bgPage = useRef("media/login-page/login-page-bg.svg");
    return (
        <Container fluid className="vh-100 parent-form-login-page" style={{backgroundImage:`url(${bgPage.current})`}}>
            <Row>
                <Col xs lg="6" xl="4" className="">
                   <div className="border bg-white component-form-login-page py-5">
                       <Switch>
                           <Route exact path="/authenticate/login" component={LoginForm}  />
                           <Route exact path="/authenticate/register" component={RegisterForm}  />
                       </Switch>
                   </div>
                </Col>
            </Row>
        </Container>
    )
}
export default LoginPage;