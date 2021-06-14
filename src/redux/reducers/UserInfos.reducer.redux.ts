import {
  FETCH_USER_INFOS_SUCCESS,
  FETCH_USER_INFOS_FAILED,
  UPDATE_USER_PERSONAL_INFOS,
  UPDATE_USER_SECURITY_INFOS,
  UPDATE_USER_STATUS,
} from "../types/users.types.redux";
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
    default:
      return state;
  }
};
export default UsersInfosReducer;
