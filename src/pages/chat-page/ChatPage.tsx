import AppSideBarCommon from "../../common-components/app-side-bar.common";
import chatPageRoutes from "../../routes/chat-page.routes";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/reducers/RootReducer.reducer.redux";
import { useEffect } from "react";
import { createSocket } from "../../server-interaction/socket.services";
import { addSocket } from "../../redux/actions/socket.actions.redux";
import { fetchUserInfos } from "../../redux/actions/users.actions.redux";
import { notifyNewFriendRequest, notifySuccess } from "../../helpers/functions/notify.helper";
import { IUserInfosReducer } from "../../@types/redux";
import { emitClientConnect } from "../../server-interaction/socket.services";
import { emitAcceptFriendsRequests, onComingFriendsRequests } from "../../server-interaction/socket-handle/socket-friends-requests";
import { acceptFriendRequest, fetchUserFriendList } from "../../redux/actions/FriendList.actions.redux";

const ChatPage = () => {
    const { pathname } = useLocation();
    const userInfosStateRedux: IUserInfosReducer = useSelector((state: RootState) => {
        return state.userInfos;
    });
    const socketStateRedux: any = useSelector((state: RootState) => {
        return state.socket
    });
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserInfos());
    }, [dispatch]);

    useEffect(() => {
        if (userInfosStateRedux) {
            dispatch(addSocket(createSocket()));
            notifySuccess(`Welcome back , ${userInfosStateRedux.personalInfos.firstName}  ${userInfosStateRedux.personalInfos.lastName}`)
        }
    }, [dispatch, userInfosStateRedux]);

    useEffect(() => {
        if (socketStateRedux && userInfosStateRedux && userInfosStateRedux._id) {
            emitClientConnect(socketStateRedux, userInfosStateRedux._id);
            onComingFriendsRequests(socketStateRedux, ({
                senderFullName,
                senderId,
                avatarUrl
            }: { senderFullName: string, senderId: string, avatarUrl: string }) => {
                notifyNewFriendRequest({ senderFullName, senderId, avatarUrl }, (isAcceptedId: string) => {
                    const body = { acceptorId: userInfosStateRedux._id, isAcceptedId }
                    emitAcceptFriendsRequests(socketStateRedux, body, (response: any) => {
                        if (response.status) dispatch(acceptFriendRequest(response));
                    })
                })
            })
        }
    }, [dispatch, socketStateRedux, userInfosStateRedux, userInfosStateRedux?._id])

    useEffect(() => {
        dispatch(fetchUserFriendList());
    }, [dispatch])

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