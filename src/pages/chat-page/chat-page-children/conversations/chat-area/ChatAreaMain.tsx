import ChatAreaRoomName from "./ChatAreaRoomName";
import ChatAreaDialog from "./ChatAreaDialog";
import ChatAreaInput from "./ChatAreaInput";
import { IUserInfosReducer } from "../../../../../@types/redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/reducers/RootReducer.reducer.redux";
import { useEffect, useRef, useState } from "react";
import {
    emitJoinRoom,
    onServerSendMessage
} from "../../../../../server-interaction/socket-handle/socket-chat";
import { useParams } from "react-router-dom";
import { callApi } from "../../../../../server-interaction/api.services";
import "./scss/chatbody.scss"
interface IParams {
    conversationsId: string;
}
const ChatAreaMain = () => {
    const { conversationsId } = useParams<IParams>();
    const [conversationsInfos, setConversationsInfos] = useState<any>(null);
    const endRef = useRef(null);
    const firstRender = useRef(true);
    const userInfosStateRedux: IUserInfosReducer = useSelector((state: RootState) => {
        return state.userInfos;
    });
    const socketStateRedux: any = useSelector((state: RootState) => {
        return state.socket
    });
    const friendsListStateRedux = useSelector((state: RootState) => {
        return state.friendsList;
    });

    useEffect(() => {
        if (conversationsId) {
            callApi(`/conversations/${conversationsId}`, "GET").then((response: any) => {
                if (response && response.data) {
                    setConversationsInfos(response.data.conversationsInfo?.room);
                    firstRender.current = false;
                }
            })
        }
    }, [conversationsId])

    useEffect(() => {
        if (userInfosStateRedux && socketStateRedux && friendsListStateRedux && conversationsId) {
            const findFriend = friendsListStateRedux.find((friend: any) => friend.conversationsId === conversationsId);
            if (findFriend) {
                const members: any = [];
                members.push({ userId: userInfosStateRedux._id });
                members.push({ userId: findFriend._id });
                emitJoinRoom(socketStateRedux,conversationsId ,members, (response: any) => {
                    console.log(response);
                })
            }
        }
    }, [conversationsId, socketStateRedux, userInfosStateRedux?._id,friendsListStateRedux])

    useEffect(() => {
        if (socketStateRedux && conversationsInfos) {
            onServerSendMessage(socketStateRedux, (data: any) => {
                if (data) {
                    const { conversationsId, ...rest } = data;
                    // conversationsInfos.dialogs.push({ ...rest });
                    const cloneDialogs = [...conversationsInfos.dialogs, { ...rest }]
                    setConversationsInfos({ ...conversationsInfos, dialogs: cloneDialogs });
                }
            })
        }
    }, [socketStateRedux, conversationsInfos]);

    useEffect(() => {
        if (!firstRender.current) {
            //@ts-ignore
            endRef.current.scrollIntoView({ behavior: "smooth" })
        }

    }, [conversationsInfos?.dialogs.length])

    return (
        <>
            <ChatAreaRoomName />
            <div style={{ minHeight: "72vh" }}>
                <div className="content__body">
                    <div className="chat__items">
                        {
                            userInfosStateRedux && conversationsInfos && conversationsInfos.dialogs
                                && conversationsInfos.dialogs.length > 0 ? (
                                conversationsInfos.dialogs.map((dialog: any, index: number) => {
                                    if (dialog.sender === userInfosStateRedux._id) {
                                        return <ChatAreaDialog key={index} dialog={dialog} me={true} />
                                    }
                                    return <ChatAreaDialog key={index} dialog={dialog} me={false} />
                                })
                            ) : <p></p>
                        }
                        <div ref={endRef} />
                    </div>
                </div>
            </div>
            <ChatAreaInput />
        </>
    )
};
export default ChatAreaMain;