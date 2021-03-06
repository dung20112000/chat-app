import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { Socket } from 'socket.io-client';
import AppSideBarCommon from '../../common-components/app-side-bar.common';
import ComingCallModalCommon from '../../common-components/coming-call-modal.common';
import { fetchFriendRequest } from '../../redux/actions/friends-requests.action.redux';
import { addSocket } from '../../redux/actions/socket.actions.redux';
import { fetchUserInfos } from '../../redux/actions/user-infos.actions.redux';
import { RootState } from '../../redux/reducers/root.reducer.redux';
import chatPageRoutes from '../../routes/chat-page.routes';
import { onComingCall } from '../../server-interaction/socket-handle/socket-peer.services';
import '../../server-interaction/socket-handle/socket-redux.services';
import {
  createSocket,
  emitClientConnect,
  onLogout,
} from '../../server-interaction/socket-handle/socket.services';
import { fetchUserFriendList } from '../../redux/actions/friends-list.actions.redux';

const ChatPage = () => {
  const [comingCall, setComingCall] = useState<any>(null);
  const openModalComing = (callerInfos: any) => {
    setComingCall(callerInfos);
  };
  const closeModalComing = () => setComingCall(null);
  const { pathname } = useLocation();
  const history = useHistory();
  const userId = useSelector((state: RootState) => state.userInfos?._id);
  const socketStateRedux: Socket = useSelector((state: RootState) => {
    return state.socket;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserInfos());
    dispatch(fetchFriendRequest());
    dispatch(fetchUserFriendList());
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(addSocket(createSocket()));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    const logoutListener = () => {
      socketStateRedux.disconnect();
      dispatch({ type: 'USER_LOGOUT' });
      localStorage.removeItem('authToken');
      history.push('/');
    };
    const comingCallListener = (callerInfos: any) => {
      openModalComing(callerInfos.callerInfos);
    };
    if (socketStateRedux && userId) {
      emitClientConnect(socketStateRedux, userId);
      socketStateRedux.on('emitLogout', logoutListener);
      socketStateRedux.on('emitComingCall', comingCallListener);
    }
    return () => {
      if (socketStateRedux) {
        socketStateRedux.off('emitLogout', logoutListener);
        socketStateRedux.off('emitComingCall', comingCallListener);
      }
    };
  }, [dispatch, history, socketStateRedux, userId]);

  const chatPageRoutesJSX =
    chatPageRoutes && chatPageRoutes.length > 0
      ? chatPageRoutes.map((route, index) => {
          const { main, ...rest } = route;
          return <Route key={index} {...rest} render={() => main()} />;
        })
      : null;

  if (pathname === '/chat-page') {
    return <Redirect to={'/chat-page/conversations'} />;
  }
  return (
    <div>
      <AppSideBarCommon />
      <div className="vh-100 pt-3 overflow-hidden">
        <Switch>{chatPageRoutesJSX}</Switch>
      </div>
      <ComingCallModalCommon
        callerInfos={comingCall}
        closeModalComing={closeModalComing}
      />
    </div>
  );
};
export default ChatPage;
