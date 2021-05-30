import { all } from "redux-saga/effects";
import watcherUserInfos from "./UserInfos.sagas.redux";
function* RootSaga() {
  yield all([watcherUserInfos()]);
}

export default RootSaga;
