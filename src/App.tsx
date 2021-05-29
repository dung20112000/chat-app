
import axios from 'axios';
import React,{useEffect} from 'react';
import {callApi} from "./server-interaction/api.services";
import appRoutes from "./routes/app.routes"
import {Switch,Route,Redirect} from "react-router-dom"

function App() {
  useEffect(() => {
    callApi(`https://608bab9d737e470017b7514e.mockapi.io/users`,"get").then((res: any) => console.log(res))
  })
  return (
    <div className="App">
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
  );
}

export default App;
