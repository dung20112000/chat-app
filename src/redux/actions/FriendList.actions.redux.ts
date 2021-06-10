import {
  FETCH_USER_FRIEND_LIST,
  FETCH_USER_FRIEND_LIST_SUCCESS,
  FETCH_USER_FRIEND_LIST_FAILED,
  ACCEPT_FRIEND_REQUEST,
} from "../types/FriendList.types.redux";
import { Action, ActionCreator } from "redux";
import { IUserFriendsList } from "../../@types/redux";

export const fetchUserFriendList: ActionCreator<Action> = () => ({
  type: FETCH_USER_FRIEND_LIST,
});

export const fetchUserFriendListSuccess: ActionCreator<any> = (
  friendsList: IUserFriendsList[]
) => {
  return {
    type: FETCH_USER_FRIEND_LIST_SUCCESS,
    payload: friendsList,
  };
};
export const fetchUserFriendListFailed: ActionCreator<Action> = () => ({
  type: FETCH_USER_FRIEND_LIST_FAILED,
});

export const acceptFriendRequest: ActionCreator<Action> = (newFriend) => ({
  type: ACCEPT_FRIEND_REQUEST,
  payload: newFriend,
});
