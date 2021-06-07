import {
  FETCH_USER_INFOS_SUCCESS,
  FETCH_USER_INFOS_FAILED,
} from "../types/users.types.redux";
import { IUserInfosReducer, IUserInfosActions } from "../../@types/redux";

const initialState: IUserInfosReducer | null = null;
const UsersInfosReducer = (state = initialState, action: IUserInfosActions) => {
  const { type, userInfos } = action;
  switch (type) {
    case FETCH_USER_INFOS_SUCCESS:
      return userInfos;
    case FETCH_USER_INFOS_FAILED:
      return null;
    default:
      return state;
  }
};
export default UsersInfosReducer;
