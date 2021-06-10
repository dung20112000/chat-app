import { all } from "redux-saga/effects";
import watcherUserFriendsList from "./FriendList.saga.redux";
import watcherUserInfos from "./UserInfos.sagas.redux";

function* RootSaga() {
  yield all([watcherUserInfos(), watcherUserFriendsList()]);
}

export default RootSaga;
