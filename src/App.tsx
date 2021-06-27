import React from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import appRoutes from './routes/app.routes';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from './redux/reducers/RootReducer.reducer.redux';
import LoadingCommon from './common-components/loading.common';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';
import './server-interaction/peerjs/peer.services';

function App() {
  const loading = useSelector((state: RootState) => state.loading);
  const appRouters = appRoutes.map((route, index) => {
    const { main, ...rest } = route;
    return <Route key={index} {...rest} render={() => main()} />;
  });

  return (
    <div className="App">
      <Switch>
        <Redirect exact from="/" to="/authenticate/login" />
        {appRouters}
      </Switch>
      <ToastContainer />
      {loading ? <LoadingCommon /> : null}
    </div>
  );
}

export default App;
