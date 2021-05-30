

import axios from 'axios';


import React,{useEffect} from 'react';
import {callApi} from "./server-interaction/api.services";
import appRoutes from "./routes/app.routes"
import {Switch,Route,Redirect} from "react-router-dom"

function App() {
  return (
    <div className="App" >
        <div style={{backgroundColor:"black"}}>
            <Switch>
                <Redirect exact from="/" to="/login" />

                {
                    appRoutes && appRoutes.length > 0 ? (
                        appRoutes.map((route,index)=>
                            {
                                const {main,...rest} = route;
                                return <Route key={index} {...rest} render={()=> main()}/>
                            }
                        )
                    ): null
                }
            </Switch>
        </div>
    </div>
  );
}

export default App;
