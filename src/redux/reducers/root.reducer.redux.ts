import { combineReducers } from 'redux';
import UsersFriendsListReducer from './friends-list.reducer.redux';
import UsersFriendsReducer from './friends-requests.reducer.redux';
import SocketReducer from './socket.reducer.redux';
import UsersInfosReducer from './user-infos.reducer.redux';
import LoadingReducer from './loading.reducer.redux';
import ConversationDetailReducer from './conversation.reducer.redux';
import LastMessageReducer from './lastMessage.reducer.redux';
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
