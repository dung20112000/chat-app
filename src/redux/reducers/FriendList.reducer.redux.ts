import {
  FETCH_USER_FRIEND_LIST_SUCCESS,
  FETCH_USER_FRIEND_LIST_FAILED,
  ACCEPT_FRIEND_REQUEST,
} from "../types/FriendList.types.redux";

const initialState: any | null = [];
const UsersFriendsListReducer = (state = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_USER_FRIEND_LIST_SUCCESS:
      return payload;
    case FETCH_USER_FRIEND_LIST_FAILED:
      return null;
    case ACCEPT_FRIEND_REQUEST: {
      return [...state, payload];
    }
    default:
      return state;
  }
};
export default UsersFriendsListReducer;
