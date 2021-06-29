import { all } from "redux-saga/effects";
import watcherUserFriendsList from "./friends-list.saga.redux";
import watcherUserFriends from "./friends-requests.saga.redux";
import watcherUserInfos from "./user-infos.sagas.redux";

function* RootSaga() {
  yield all([
    watcherUserInfos(),
    watcherUserFriendsList(),
    watcherUserFriends(),
  ]);
}

export default RootSaga;
