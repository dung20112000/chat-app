import { combineReducers } from "redux";
import UsersFriendsListReducer from "./FriendList.reducer.redux";
import SocketReducer from "./SocketReducer.reducer.redux";
import UsersInfosReducer from "./UserInfos.reducer.redux";
const RootReducer = combineReducers({
  socket: SocketReducer,
  userInfos: UsersInfosReducer,
  friendsList: UsersFriendsListReducer,
});
export type RootState = ReturnType<typeof RootReducer>;
export default RootReducer;
