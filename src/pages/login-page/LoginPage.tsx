import LoginForm from "./login-page-child/LoginForm";
import {Route,Switch} from "react-router-dom";
import RegisterForm from "./login-page-child/RegisterForm";
import React, {useRef} from "react";
import {Col, Container, Row } from "react-bootstrap";
import "./login-page-child/scss/form.scss"
import ForgetPassword from "./login-page-child/ForgetPassword";


const LoginPage = ()=>{
    const bgPage = useRef("media/login-page/login-page-bg.svg");
    return (
        <Container fluid className="vh-100 parent-form-login-page" style={{backgroundImage:`url(${bgPage.current})`}}>
            <Row>
                <Col xs lg="6" xl="4" className="">

                   <div className="border bg-white component-form-login-page py-5">
                       <div className="text-center mb-3">
                           <img src="media/logo.svg" alt="" className="mw-100"/>
                       </div>
                       <Switch>
                           <Route exact path="/authenticate/login" component={LoginForm}  />
                           <Route exact path="/authenticate/register" component={RegisterForm}  />
                           <Route exact path="/authenticate/forget-password" component={ForgetPassword} />
                       </Switch>
                   </div>
                </Col>
            </Row>
        </Container>
    )
}
export default LoginPage;