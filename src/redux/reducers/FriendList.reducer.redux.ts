import {
  UPDATE_FRIEND_STATUS,
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
    case UPDATE_FRIEND_STATUS: {
      const index = findFriendById(payload?.justChangeStatusFriend, state);
      if (index !== -1) {
        state[index] = {
          ...state[index],
          onlineStatus: payload.onlineStatus,
          previousOnlineStatus: payload.previousOnlineStatus,
        };
        return [...state];
      }
      return state;
    }
    default:
      return state;
  }
};

function findFriendById(id: string, friendsList: any[]) {
  if (!friendsList || !id) {
    return -1;
  }
  return friendsList.findIndex((friend) => friend._id === id);
}

export default UsersFriendsListReducer;
