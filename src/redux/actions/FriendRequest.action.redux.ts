import {
  FETCH_FRIEND_REQUEST,
  FETCH_FRIEND_REQUEST_SUCCESS,
  FETCH_FRIEND_REQUEST_FAILED,
  REMOVE_FRIENDS_REQUEST,
} from "../types/FriendRequest.types.redux";
import { Action, ActionCreator } from "redux";
import { IUserFriends, IUserFriendsAction } from "../../@types/redux";

export const fetchFriendRequest: ActionCreator<Action> = () => ({
  type: FETCH_FRIEND_REQUEST,
});

export const fetchFriendRequestSuccess: ActionCreator<IUserFriendsAction> = (
  friends: IUserFriends
) => ({
  type: FETCH_FRIEND_REQUEST_SUCCESS,
  payload: friends,
});

export const fetchFriendRequestFailed: ActionCreator<Action> = () => ({
  type: FETCH_FRIEND_REQUEST_FAILED,
});

export const removeFriendsRequest: ActionCreator<Action> = (_id: string) => ({
  type: REMOVE_FRIENDS_REQUEST,
  payload: _id,
});
