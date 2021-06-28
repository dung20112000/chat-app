import {
  FETCH_USER_INFOS,
  FETCH_USER_INFOS_SUCCESS,
  FETCH_USER_INFOS_FAILED,
  UPDATE_USER_PERSONAL_INFOS,
  UPDATE_USER_SECURITY_INFOS,
  UPDATE_USER_STATUS,
  UPDATE_AVATAR_USER,
} from "../types/user-infos.types.redux";
import { Action, ActionCreator } from "redux";
import {
  IUpdatePersonalInfos,
  IUserInfosActions,
  IUserInfosReducer,
} from "../../@types/redux";
import { EOnlineStatus } from "../../@types/enums.d";

interface changeStatus {
  onlineStatus: EOnlineStatus;
  previousOnlineStatus: {
    status: EOnlineStatus;
    lastActive: string;
  };
}

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

export const updateUserPersonalInfos: ActionCreator<IUpdatePersonalInfos> = (
  newPersonalInfos
) => ({
  type: UPDATE_USER_PERSONAL_INFOS,
  newPersonalInfos,
});

export const updateUserSecurityInfos: ActionCreator<any> = (
  newSecurityInfos
) => {
  return {
    type: UPDATE_USER_SECURITY_INFOS,
    newSecurityInfos,
  };
};

export const updateUserStatus: ActionCreator<any> = (payload: changeStatus) => {
  return {
    type: UPDATE_USER_STATUS,
    payload,
  };
};

export const updateAvatarUser: ActionCreator<any> = (payload: string) => {
  return {
    type: UPDATE_AVATAR_USER,
    payload,
  };
};
