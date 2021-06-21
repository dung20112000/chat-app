import {
  FETCH_USER_FRIEND_LIST,
  FETCH_USER_FRIEND_LIST_SUCCESS,
  FETCH_USER_FRIEND_LIST_FAILED,
  ACCEPT_FRIEND_REQUEST,
  UPDATE_FRIEND_STATUS,
  UPDATE_CONVERSATION_ID, DELETE_FRIEND,
} from "../types/FriendList.types.redux";
import { Action, ActionCreator } from "redux";
import { IUserFriendsList, IUserFriendsListAction } from "../../@types/redux";

export const fetchUserFriendList: ActionCreator<Action> = () => ({
  type: FETCH_USER_FRIEND_LIST,
});

export const fetchUserFriendListSuccess: ActionCreator<IUserFriendsListAction> =
  (friendsList: IUserFriendsList[]) => {
    return {
      type: FETCH_USER_FRIEND_LIST_SUCCESS,
      payload: friendsList,
    };
  };
export const fetchUserFriendListFailed: ActionCreator<Action> = () => {
  return {
    type: FETCH_USER_FRIEND_LIST_FAILED,
  };
};

export const acceptFriendRequest: ActionCreator<Action> = (newFriend) => {
  return {
    type: ACCEPT_FRIEND_REQUEST,
    payload: newFriend,
  };
};

export const updateFriendStatus: ActionCreator<Action> = (payload) => {
  return {
    type: UPDATE_FRIEND_STATUS,
    payload,
  };
};

export const updateConversationIdOfFriends: ActionCreator<Action> = (
  payload
) => {
  return {
    type: UPDATE_CONVERSATION_ID,
    payload,
  };
};

export const deleteFriend: ActionCreator<Action> = (payload) => {
  return {
    type: DELETE_FRIEND,
    payload
  };
};
