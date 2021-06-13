import { all } from "redux-saga/effects";
import watcherUserFriendsList from "./FriendList.saga.redux";
import watcherUserFriends from "./FriendRequest.saga.redux";
import watcherUserInfos from "./UserInfos.sagas.redux";

function* RootSaga() {
  yield all([
    watcherUserInfos(),
    watcherUserFriendsList(),
    watcherUserFriends(),
  ]);
}

export default RootSaga;
