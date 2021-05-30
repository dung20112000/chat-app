import { createStore, applyMiddleware, compose } from "redux"
import createSagaMiddleware from "redux-saga";
import RootReducer from "./reducers/RootReducer.reducer.redux";
import RootSaga from "./sagas/RootSaga.sagas.redux";
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(RootReducer, composeEnhancers(applyMiddleware(...middlewares)));
sagaMiddleware.run(RootSaga);
export default store;
