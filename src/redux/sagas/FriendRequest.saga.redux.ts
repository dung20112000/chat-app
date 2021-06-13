import { takeLatest, put, call } from "redux-saga/effects";
import * as types from "../types/FriendRequest.types.redux";
import { callApi } from "../../server-interaction/api.services";

import {
  fetchUserFriendSuccess,
  fetchUserFriendFailed,
} from "./../actions/FriendRequest.action.redux";
import { IResponseGenerator } from "../../@types/redux-saga";

const USER_FRIENDS = "/users/friends-requests";

function* workerUserFriends(): any {
  try {
    const response: IResponseGenerator = yield call((): any => {
      return callApi(USER_FRIENDS, "GET");
    });
    if (response && response.status === 200) {
      yield put(fetchUserFriendSuccess(response.data.user.friendsRequests));
    }
  } catch (error) {
    yield put(fetchUserFriendFailed());
  }
}

function* watcherUserFriends() {
  yield takeLatest(types.FETCH_USER_FRIEND, workerUserFriends);
}

export default watcherUserFriends;
