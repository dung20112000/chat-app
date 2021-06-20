import React from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import {Switch, Route, Redirect} from "react-router-dom"

import appRoutes from "./routes/app.routes";
import {ToastContainer} from "react-toastify";

function App() {

    const appRouters = appRoutes.map((route, index) => {
        const {main, ...rest} = route;
        return <Route key={index} {...rest} render={() => main()}/>
    })

    return (
        <div className="App">
            <Switch>
                <Redirect exact from="/" to="/authenticate/login"/>
                {appRouters}
            </Switch>
            <ToastContainer/>
        </div>
    );
}

export default App;
