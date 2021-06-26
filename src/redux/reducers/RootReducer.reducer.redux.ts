import { combineReducers } from 'redux';
import UsersFriendsListReducer from './FriendList.reducer.redux';
import UsersFriendsReducer from './FriendRequest.reducer.redux';
import SocketReducer from './SocketReducer.reducer.redux';
import UsersInfosReducer from './UserInfos.reducer.redux';
import LoadingReducer from './loading.reducer.redux';
import ConversationDetailReducer from './Conversation.reducer.redux';
import LastMessageReducer from './LastMessage.reducer.redux';
const appReducer = combineReducers({
  socket: SocketReducer,
  userInfos: UsersInfosReducer,
  friendsList: UsersFriendsListReducer,
  friendsRequests: UsersFriendsReducer,
  loading: LoadingReducer,
  conversationDetail: ConversationDetailReducer,
  lastMessage: LastMessageReducer,
});

const RootReducer = (state: any, action: any) => {
  if (action.type === 'USER_LOGOUT') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof RootReducer>;
export default RootReducer;
