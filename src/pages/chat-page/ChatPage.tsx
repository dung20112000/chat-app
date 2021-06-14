import AppSideBarCommon from "../../common-components/app-side-bar.common";
import chatPageRoutes from "../../routes/chat-page.routes";
import { Switch, Route, useLocation, Redirect, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/reducers/RootReducer.reducer.redux";
import { useEffect } from "react";
import { createSocket, onLogout } from "../../server-interaction/socket.services";
import { addSocket } from "../../redux/actions/socket.actions.redux";
import { fetchUserInfos } from "../../redux/actions/users.actions.redux";
import { notifyNewFriendRequest, notifySuccess } from "../../helpers/functions/notify.helper";
import { IUserInfosReducer } from "../../@types/redux";
import { emitClientConnect } from "../../server-interaction/socket.services";
import { emitAcceptFriendsRequests, onAcceptInfosToSender, onComingFriendsRequests } from "../../server-interaction/socket-handle/socket-friends-requests";
import { acceptFriendRequest, fetchUserFriendList } from "../../redux/actions/FriendList.actions.redux";
import { fetchFriendRequest, removeFriendsRequest } from "../../redux/actions/FriendRequest.action.redux";
import { onStatusToOnlineFriends } from "../../server-interaction/socket-handle/socket-change-status";
import { updateFriendStatus } from './../../redux/actions/FriendList.actions.redux';

const ChatPage = () => {
    const { pathname } = useLocation();
    const history = useHistory();
    const userInfosStateRedux: IUserInfosReducer = useSelector((state: RootState) => {
        return state.userInfos;
    });
    const socketStateRedux: any = useSelector((state: RootState) => {
        return state.socket
    });
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserInfos());
        dispatch(fetchFriendRequest());
        dispatch(fetchUserFriendList());
    }, [dispatch]);

    useEffect(() => {
        if (userInfosStateRedux) {
            dispatch(addSocket(createSocket()));
            notifySuccess(`Welcome back , ${userInfosStateRedux.personalInfos.firstName}  ${userInfosStateRedux.personalInfos.lastName}`)
        }
    }, [dispatch, userInfosStateRedux?._id]);

    useEffect(() => {
        if (socketStateRedux && userInfosStateRedux && userInfosStateRedux._id) {
            emitClientConnect(socketStateRedux, userInfosStateRedux._id);
            onComingFriendsRequests(socketStateRedux, ({
                senderFullName,
                senderId,
                avatarUrl
            }: { senderFullName: string, senderId: string, avatarUrl: string }) => {
                dispatch(fetchFriendRequest());
                notifyNewFriendRequest({ senderFullName, senderId, avatarUrl }, (isAcceptedId: string) => {
                    const body = { acceptorId: userInfosStateRedux._id, isAcceptedId }
                    emitAcceptFriendsRequests(socketStateRedux, body, (response: any) => {
                        if (response.status) dispatch(acceptFriendRequest(response.newFriend));
                        dispatch(removeFriendsRequest(isAcceptedId));
                    })
                })
            })
            onAcceptInfosToSender(socketStateRedux, (response: any) => {
                if (response) dispatch(acceptFriendRequest(response.acceptorInfos));
            })
            onStatusToOnlineFriends(socketStateRedux, (response: any) => {
                if (response) dispatch(updateFriendStatus(response));
            })
            onLogout(socketStateRedux, () => {

                localStorage.removeItem("authToken");
                history.push("/");
            })
        }
    }, [dispatch, history, socketStateRedux, userInfosStateRedux?._id])

    const chatPageRoutesJSX = chatPageRoutes && chatPageRoutes.length > 0 ? (
        chatPageRoutes.map((route, index) => {
            const { main, ...rest } = route;
            return <Route key={index} {...rest} render={() => main()} />
        })
    ) : null;

    if (pathname === "/chat-page") {
        return <Redirect to={"/chat-page/conversations"} />
    }
    return (
        <div>
            <AppSideBarCommon />
            <div className="vh-100 pt-3 overflow-hidden">
                <Switch>
                    {chatPageRoutesJSX}
                </Switch>
            </div>
        </div>
    )
}
export default ChatPage;