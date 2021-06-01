import { takeLatest, put, call } from "redux-saga/effects";
import * as types from "../types/users.types.redux";
import { callApi } from "../../server-interaction/api.services";
import { IResponseGenerator } from "../../@types/redux-saga";
import {
  fetchUserInfosSuccess,
  fetchUserInfosFailed,
} from "./../actions/users.actions.redux";

const USER = "/users";

function* workerUserInfos() {
  try {
    const response: IResponseGenerator = yield call((): any => {
      return callApi(USER, "GET");
    });
    if (response && response.status === 200) {
      console.log(response.data);
      yield put(fetchUserInfosSuccess(response.data?.user));
    }
  } catch (error) {
    yield put(fetchUserInfosFailed());
  }
}

function* watcherUserInfos() {
  yield takeLatest(types.FETCH_USER_INFOS, workerUserInfos);
}

export default watcherUserInfos;