import ChatAreaRoomName from "./ChatAreaRoomName";
import ChatAreaDialog from "./ChatAreaDialog";
import ChatAreaInput from "./ChatAreaInput";
import { IUserInfosReducer } from "../../../../../@types/redux";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/reducers/RootReducer.reducer.redux";
import { useEffect, useRef, useState } from "react";
import {
    emitJoinRoom,
    onServerSendMessage
} from "../../../../../server-interaction/socket-handle/socket-chat";
import { useParams } from "react-router-dom";
import { callApi } from "../../../../../server-interaction/apis/api.services";
import "./scss/chatbody.scss"
import { changeConversationDetail } from "../../../../../redux/actions/Conversation.redux";
import { toggleScrollbar } from "../../../../../helpers/functions/toggle-scrollbar";
interface IParams {
    conversationsId: string;
}
const ChatAreaMain = () => {
    const dispatch = useDispatch()
    const { conversationsId } = useParams<IParams>();
    const [conversationsInfos, setConversationsInfos] = useState<any>(null);
    const endRef = useRef(null);
    const firstRender = useRef(true);
    const chatItemsRef = useRef(null);
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
                    const { _id, room: { roomName, participants } } = response.data.conversationsInfo
                    if (participants && participants.length === 1) {
                        const { firstName, lastName, avatarUrl } = participants[0].userId.personalInfos
                        const uploadRedux = {
                            _id: _id,
                            roomName: roomName,
                            firstName: firstName,
                            lastName: lastName,
                            avatarUrl: avatarUrl,
                            members: participants.length
                        }
                        dispatch(changeConversationDetail(uploadRedux))
                    }
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
                emitJoinRoom(socketStateRedux, conversationsId, members, (response: any) => {
                    console.log(response);
                })
            }
        }
    }, [conversationsId, socketStateRedux, userInfosStateRedux?._id, friendsListStateRedux])

    useEffect(() => {
        if (socketStateRedux && conversationsInfos && conversationsId) {
            onServerSendMessage(socketStateRedux, (data: any) => {
                if (data && conversationsId === data.conversationId) {
                    console.log(data);
                    const { conversationsId, ...rest } = data;
                    const cloneDialogs = [...conversationsInfos.dialogs, { ...rest }]
                    setConversationsInfos({ ...conversationsInfos, dialogs: cloneDialogs });
                }
            })
        }
    }, [socketStateRedux, conversationsInfos, conversationsId]);

    useEffect(() => {
        if (!firstRender.current) {
            //@ts-ignore
            endRef.current.scrollIntoView({ behavior: "smooth" })
        }

    }, [conversationsInfos?.dialogs.length])
    useEffect(() => {
        toggleScrollbar(chatItemsRef.current);
    }, [])
    return (

        <div>
            <ChatAreaRoomName participants={conversationsInfos?.participants} />
            <div className="content__body">
                <div className="chat__items" ref={chatItemsRef}>
                    {
                        userInfosStateRedux && conversationsInfos && conversationsInfos.dialogs
                            && conversationsInfos.dialogs.length > 0 ? (
                            conversationsInfos.dialogs.map((dialog: any, index: number) => {
                                const { _id } = dialog;
                                if (dialog.sender._id === userInfosStateRedux._id) {
                                    return <ChatAreaDialog key={_id} dialog={dialog} me={true} />
                                }
                                return <ChatAreaDialog key={index} dialog={dialog} me={false} />
                            })
                        ) : <p></p>
                    }
                    <div ref={endRef} />
                </div>
            </div>
            <ChatAreaInput />
        </div>
    )
};
export default ChatAreaMain;