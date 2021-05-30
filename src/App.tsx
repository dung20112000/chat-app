import React, { useEffect } from 'react';
import { callApi } from "./server-interaction/api.services";
import { Button, Container } from "react-bootstrap";
import appRoutes from "./routes/app.routes";
import { Route, Switch } from "react-router-dom";

function App() {

  const appRouters = appRoutes.map((route, index) => {
    const { main, ...rest } = route;
    return <Route key={index} {...rest} render={() => main()} />
  })

  return (
    <div className="App">
      <Switch>
        {
          appRouters
        }
      </Switch>
    </div>
  );
}

export default App;
