

import React,{useEffect} from 'react';

import {Switch,Route,Redirect} from "react-router-dom"

import appRoutes from "./routes/app.routes";


function App() {

  const appRouters = appRoutes.map((route, index) => {
    const { main, ...rest } = route;
    return <Route key={index} {...rest} render={() => main()} />
  })

  return (
    <div className="App">
      <Switch>
          <Redirect exact from="/" to="/authenticate/login" />
        {
          appRouters
        }
      </Switch>
    </div>
  );
}

export default App;
