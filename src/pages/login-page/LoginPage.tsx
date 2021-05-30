import LoginForm from "./login-page-child/LoginForm";
import {Route,Switch} from "react-router-dom";
import RegisterForm from "./login-page-child/RegisterForm";
import React from "react";
import {Col, Container, Row } from "react-bootstrap";
import "./login-page-child/scss/form.scss"


const LoginPage = ()=>{
    return (
        <Container fluid className="vh-100 parent-form-login-page pl-5">
            <Row>
                <Col xs lg="4" className="p-0">
                   <div className="border bg-white component-form-login-page">
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