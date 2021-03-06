import {
  FETCH_USER_INFOS_SUCCESS,
  FETCH_USER_INFOS_FAILED,
  UPDATE_USER_PERSONAL_INFOS,
  UPDATE_USER_SECURITY_INFOS,
  UPDATE_USER_STATUS,
  UPDATE_AVATAR_USER,
} from "../types/user-infos.types.redux";
import { IUserInfosReducer } from "../../@types/redux";

const initialState: IUserInfosReducer | null = null;
const UsersInfosReducer = (state = initialState, action: any) => {
  const { type, userInfos, newPersonalInfos, newSecurityInfos, payload } =
    action;
  switch (type) {
    case FETCH_USER_INFOS_SUCCESS:
      return userInfos;
    case FETCH_USER_INFOS_FAILED:
      return null;
    case UPDATE_USER_PERSONAL_INFOS:
      const newStatePersonalInfos = {
        // @ts-ignore
        ...state,
        personalInfos: newPersonalInfos,
      };
      return newStatePersonalInfos;
    case UPDATE_USER_SECURITY_INFOS:
      // @ts-ignore
      const newStateSecurity = { ...state };
      if (newSecurityInfos.email) {
        newStateSecurity.email = newSecurityInfos.email;
      }
      if (newSecurityInfos.mobile) {
        newStateSecurity.mobile = newSecurityInfos.mobile;
      }
      return newStateSecurity;

    case UPDATE_USER_STATUS:
      const newState = {
        // @ts-ignore
        ...state,
        onlineStatus: payload.onlineStatus,
        previousOnlineStatus: payload.previousOnlineStatus,
      };
      return newState;
    case UPDATE_AVATAR_USER:
      // @ts-ignore
      state.personalInfos.avatarUrl = payload;
      // @ts-ignore
      return { ...state };
    default:
      return state;
  }
};
export default UsersInfosReducer;
