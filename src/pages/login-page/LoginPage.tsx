import LoginForm from "./login-page-child/LoginForm";
import {Route,Switch} from "react-router-dom";
import RegisterForm from "./login-page-child/RegisterForm";
import React from "react";


const LoginPage = ()=>{
    return (
        <div>
            <div>
                <Switch>
                    <Route exact path="/login" component={LoginForm}  />
                    <Route exact path="/login/register" component={RegisterForm}  />
                </Switch>
            </div>
        </div>
    )
}
export default LoginPage;