import ChatAreaRoomName from "./ChatAreaRoomName";
import ChatAreaDialog from "./ChatAreaDialog";
import ChatAreaInput from "./ChatAreaInput";
import {IUserInfosReducer} from "../../../../../@types/redux";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux/reducers/RootReducer.reducer.redux";
import {useEffect} from "react";
import {
    emitJoinRoom,
    onServerSendMessage
} from "../../../../../server-interaction/socket-handle/socket-chat";
import {useParams} from "react-router-dom";
interface IParams {
    conversationsId: string;
}
const ChatAreaMain = ()=>{
    const {conversationsId} = useParams<IParams>()
    const userInfosStateRedux: IUserInfosReducer = useSelector((state: RootState) => {
        return state.userInfos;
    });
    const socketStateRedux: any = useSelector((state: RootState) => {
        return state.socket
    });

    useEffect(()=>{
        if(socketStateRedux && userInfosStateRedux){
            onServerSendMessage(socketStateRedux,(data:any)=>{
                console.log(data);
            })
        }
    },[socketStateRedux,userInfosStateRedux?._id]);
    return (
        <>
            <ChatAreaRoomName/>
            <ChatAreaDialog/>
            <ChatAreaInput/>
        </>
    )
};
export default ChatAreaMain;