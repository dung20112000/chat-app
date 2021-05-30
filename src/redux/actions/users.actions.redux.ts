import {
  FETCH_USER_INFOS,
  FETCH_USER_INFOS_SUCCESS,
  FETCH_USER_INFOS_FAILED,
} from "../types/users.types.redux";
import { Action, ActionCreator } from "redux";

export const fetchUserInfos: ActionCreator<Action> = () => ({
  type: FETCH_USER_INFOS,
});

export const fetchUserInfosSuccess: ActionCreator<Action> = (
  userInfos: any
) => {
  return {
    type: FETCH_USER_INFOS_SUCCESS,
    userInfos,
  };
};
export const fetchUserInfosFailed: ActionCreator<Action> = () => ({
  type: FETCH_USER_INFOS_FAILED,
});
