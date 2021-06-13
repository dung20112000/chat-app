import { takeLatest, put, call } from "redux-saga/effects";
import * as types from "../types/FriendRequest.types.redux";
import { callApi } from "../../server-interaction/api.services";

import {
  fetchFriendRequestSuccess,
  fetchFriendRequestFailed,
} from "./../actions/FriendRequest.action.redux";
import { IResponseGenerator } from "../../@types/redux-saga";

const USER_FRIENDS = "/users/friends-requests";

function* workerUserFriends(): any {
  try {
    const response: IResponseGenerator = yield call((): any => {
      return callApi(USER_FRIENDS, "GET");
    });
    if (response && response.status === 200) {
      yield put(fetchFriendRequestSuccess(response.data.user.friendsRequests));
    }
  } catch (error) {
    yield put(fetchFriendRequestFailed());
  }
}

function* watcherUserFriends() {
  yield takeLatest(types.FETCH_FRIEND_REQUEST, workerUserFriends);
}

export default watcherUserFriends;
