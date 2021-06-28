import { takeLatest, put, call } from "redux-saga/effects";
import * as types from "../types/FriendList.types.redux";
import { callApi } from "../../server-interaction/apis/api.services";

import {
  fetchUserFriendListSuccess,
  fetchUserFriendListFailed,
} from "../actions/friends-list.actions.redux";
import { IResponseGenerator } from "../../@types/redux-saga";

const USER_FRIENDS_LIST = "/users/friends-list";

function* workerUserFriendsList(): any {
  try {
    const response: IResponseGenerator = yield call((): any => {
      return callApi(USER_FRIENDS_LIST, "GET");
    });
    if (response && response.status === 200) {
      yield put(fetchUserFriendListSuccess(response.data.user.friends));
    }
  } catch (error) {
    yield put(fetchUserFriendListFailed());
  }
}

function* watcherUserFriendsList() {
  yield takeLatest(types.FETCH_USER_FRIEND_LIST, workerUserFriendsList);
}

export default watcherUserFriendsList;
