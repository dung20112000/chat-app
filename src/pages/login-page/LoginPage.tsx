import LoginForm from "./LoginPageChild/LoginForm";
import {Route,Switch} from "react-router-dom";
import RegisterForm from "./LoginPageChild/RegisterForm";
import React from "react";


const LoginPage = ()=>{
    return (
        <div id="main">
            <Switch>
                <Route exact path="/login" component={LoginForm}  />
                <Route exact path="/login/register" component={RegisterForm}  />
            </Switch>
        </div>
    )
}
export default LoginPage;