import {Container} from "react-bootstrap";
import {
    ConversationBlockCommon,
    ConversationBlockGroup
} from "../../../../../common-components/conversation-block.common";
import {useEffect, useState} from "react";
import {callApi} from "../../../../../server-interaction/api.services";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux/reducers/RootReducer.reducer.redux";

const LeftSideConversationList = () => {
    const [conversationsList, setConversationsList] = useState<any[]>([])
    const idUserRedux = useSelector((state: RootState) => state.userInfos._id)
    const friendsListRedux = useSelector((state: RootState) => state.friendsList)
    useEffect(() => {
        callApi(`/conversations`, "get")
            .then(res => {
                if (res.data && res.data.userConversations && res.data.userConversations.conversations) {
                    setConversationsList(res.data.userConversations.conversations)
                }
            })
            .catch(err => console.log(err.response))
    }, [])
    return (
        <Container fluid>
            {
                conversationsList.length > 0 ? conversationsList.map((item, index) => {
                    const {_id, room, updatedAt} = item;
                    const {participants, roomName, dialogs} = room;
                    if (dialogs.length === 0) return;
                    const {message} = dialogs.length > 0 && dialogs[dialogs.length - 1]
                    if (participants.length === 2) {
                        const idFriend = participants.find((item: any) => item.userId !== idUserRedux)
                        if (idFriend && friendsListRedux) {
                            const friendChat = friendsListRedux.find((item: any) => item._id === idFriend.userId)
                            if (friendChat) {
                                const {
                                    onlineStatus,
                                    personalInfos: {firstName, lastName, avatarUrl}
                                } = friendChat
                                return <ConversationBlockCommon
                                    lastMessageTime={new Date(updatedAt).toLocaleString("vi-vn")}
                                    status={onlineStatus} key={_id} id={_id}
                                    friendName={`${firstName} ${lastName}`} avatarUrl={avatarUrl}
                                    lastMessage={message}/>
                            }
                        }
                    }
                    if (participants.length > 2){
                        return <ConversationBlockGroup currentUserAvatarUrl={""} groupName={"Huy"}
                                                       lastMessage={{sender: "Huy", message: "abc"}}
                                                       members={6}/>
                    }
                    return null;
                }) : null
            }
        </Container>
    )
}
export default LeftSideConversationList;