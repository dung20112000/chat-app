import {
  FETCH_USER_INFOS,
  FETCH_USER_INFOS_SUCCESS,
  FETCH_USER_INFOS_FAILED, UPDATE_USER_PERSONAL_INFOS,
} from "../types/users.types.redux";
import { Action, ActionCreator } from "redux";
import {IUpdatePersonalInfos, IUserInfosActions, IUserInfosReducer} from "../../@types/redux";


export const fetchUserInfos: ActionCreator<Action> = () => ({
  type: FETCH_USER_INFOS,
});

export const fetchUserInfosSuccess: ActionCreator<IUserInfosActions> = (
  userInfos: IUserInfosReducer
) => {
  return {
    type: FETCH_USER_INFOS_SUCCESS,
    userInfos,
  };
};
export const fetchUserInfosFailed: ActionCreator<Action> = () => ({
  type: FETCH_USER_INFOS_FAILED,
});
export  const updateUserPersonalInfos: ActionCreator<IUpdatePersonalInfos> = (newPersonalInfos) => ({
  type : UPDATE_USER_PERSONAL_INFOS,
  newPersonalInfos
})