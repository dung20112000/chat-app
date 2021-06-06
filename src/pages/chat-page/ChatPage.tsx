import AppSideBarCommon from "../../common-components/app-side-bar.common";
import chatPageRoutes from "../../routes/chat-page.routes";
import {Switch, Route, useLocation, Redirect} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../../redux/reducers/RootReducer.reducer.redux";
import {useEffect} from "react";
import {createSocket} from "../../server-interaction/socket.services";
import {addSocket} from "../../redux/actions/socket.actions.redux";
import {fetchUserInfos} from "../../redux/actions/users.actions.redux";
import {notifySuccess} from "../../helpers/functions/notify.helper";
import {IUserInfosReducer} from "../../@types/redux";
import {emitClientConnect} from "../../server-interaction/socket.services";

const ChatPage = () => {
    const {pathname} = useLocation();
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
    }, [userInfosStateRedux]);
    useEffect(() => {
        if (socketStateRedux && userInfosStateRedux && userInfosStateRedux._id) {
            emitClientConnect(socketStateRedux, userInfosStateRedux._id);
        }
    }, [socketStateRedux, userInfosStateRedux?._id])
    const chatPageRoutesJSX = chatPageRoutes && chatPageRoutes.length > 0 ? (
        chatPageRoutes.map((route, index) => {
            const {main, ...rest} = route;
            return <Route key={index} {...rest} render={() => main()}/>
        })
    ) : null;

    if (pathname === "/chat-page") {
        return <Redirect to={"/chat-page/conversations"}/>
    }
    return (
        <div>
            <AppSideBarCommon/>
            <Switch>
                {chatPageRoutesJSX}
            </Switch>
        </div>
    )
}
export default ChatPage;