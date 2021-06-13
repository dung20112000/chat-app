import {
  FETCH_USER_FRIEND,
  FETCH_USER_FRIEND_SUCCESS,
  FETCH_USER_FRIEND_FAILED,
  REMOVE_FRIENDS_REQUEST,
} from "../types/FriendRequest.types.redux";
import { Action, ActionCreator } from "redux";
import { IUserFriends, IUserFriendsAction } from "../../@types/redux";

export const fetchUserFriend: ActionCreator<Action> = () => ({
  type: FETCH_USER_FRIEND,
});

export const fetchUserFriendSuccess: ActionCreator<IUserFriendsAction> = (
  friends: IUserFriends
) => ({
  type: FETCH_USER_FRIEND_SUCCESS,
  payload: friends,
});

export const fetchUserFriendFailed: ActionCreator<Action> = () => ({
  type: FETCH_USER_FRIEND_FAILED,
});

export const removeFriendsRequest: ActionCreator<Action> = (_id: string) => ({
  type: REMOVE_FRIENDS_REQUEST,
  payload: _id,
});
