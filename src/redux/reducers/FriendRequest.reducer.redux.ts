import {
  FETCH_FRIEND_REQUEST_SUCCESS,
  FETCH_FRIEND_REQUEST_FAILED,
  REMOVE_FRIENDS_REQUEST,
} from "../types/FriendRequest.types.redux";

const initialState: any | null = null;
const UsersFriendsReducer = (state = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_FRIEND_REQUEST_SUCCESS:
      return payload;
    case FETCH_FRIEND_REQUEST_FAILED:
      return null;
    case REMOVE_FRIENDS_REQUEST:
      const { comingRequests } = state;
      const newComingRequests = comingRequests.filter((item: any) => {
        return item.requestFrom._id !== payload;
      });
      return {
        ...state,
        comingRequests: newComingRequests,
      };
    default:
      return state;
  }
};
export default UsersFriendsReducer;
