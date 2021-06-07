import {
  FETCH_USER_FRIEND_LIST,
  FETCH_USER_FRIEND_LIST_SUCCESS,
  FETCH_USER_FRIEND_LIST_FAILED,
} from "../types/FriendList.types.redux";
import { Action, ActionCreator } from "redux";
import { IUserInfosActions, IUserInfosReducer } from "../../@types/redux";

export const fetchUserFriendList: ActionCreator<Action> = () => ({
  type: FETCH_USER_FRIEND_LIST,
});

export const fetchUserFriendListSuccess: ActionCreator<any> = (
  friendsList: any
) => {
  return {
    type: FETCH_USER_FRIEND_LIST_SUCCESS,
    friendsList,
  };
};
export const fetchUserFriendListFailed: ActionCreator<Action> = () => ({
  type: FETCH_USER_FRIEND_LIST_FAILED,
});
