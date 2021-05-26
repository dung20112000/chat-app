import {createStore,applyMiddleware,} from "redux"
import createSagaMiddleware from "redux-saga";
const sagaMiddleware = createSagaMiddleware();
import RootReducer from "./reducers/RootReducer.reducer.redux";
import RootSaga from "./sagas/RootSaga.sagas.redux";
const middlewares = [sagaMiddleware];
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(RootReducer, composeEnhancers(applyMiddleware(...middlewares)));
sagaMiddleware.run(RootSaga);
export default store;