import ChatAreaRoomName from './ChatAreaRoomName';
import ChatAreaDialog from './ChatAreaDialog';
import ChatAreaInput from './ChatAreaInput';
import { IUserInfosReducer } from '../../../../../@types/redux';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/reducers/RootReducer.reducer.redux';
import { useEffect, useRef, useState, useCallback } from 'react';
import {
  emitJoinRoom,
  onServerSendMessage,
} from '../../../../../server-interaction/socket-handle/socket-chat';
import { useParams } from 'react-router-dom';
import { callApi } from '../../../../../server-interaction/apis/api.services';
import './scss/chatbody.scss';
import { changeConversationDetail } from '../../../../../redux/actions/Conversation.redux';
import { toggleScrollbar } from '../../../../../helpers/functions/toggle-scrollbar';
interface IParams {
  conversationsId: string;
}

const ChatAreaMain = () => {
  const dispatch = useDispatch();
  const { conversationsId } = useParams<IParams>();
  const [conversationsInfos, setConversationsInfos] = useState<any>(null);
  const [dialogs, setDialogs] = useState<any>([]);
  const endRef = useRef(null);
  const firstRender = useRef(true);
  const chatItemsRef = useRef(null);
  const dialogsLength = useRef(dialogs.length);
  const userInfosStateRedux: IUserInfosReducer = useSelector(
    (state: RootState) => {
      return state.userInfos;
    }
  );
  const socketStateRedux: any = useSelector((state: RootState) => {
    return state.socket;
  });

  useEffect(() => {
    if (conversationsId) {
      callApi(`/conversations/${conversationsId}`, 'GET').then(
        (response: any) => {
          console.log(response);
          if (response && response.data && response.data.conversationsInfo) {
            console.log(response);
            const { room, _id } = response.data.conversationsInfo;
            const { dialogs, roomName, participants } = room;
            if (participants && participants.length < 2) {
              const { firstName, lastName, avatarUrl } =
                participants[0].userId.personalInfos;
              dispatch(
                changeConversationDetail({
                  _id: _id,
                  roomName: roomName,
                  firstName: firstName,
                  lastName: lastName,
                  avatarUrl: avatarUrl,
                  members: participants,
                })
              );
            } else {
              dispatch(
                changeConversationDetail({
                  _id: _id,
                  roomName: roomName,
                  firstName: '',
                  lastName: '',
                  avatarUrl: '',
                  members: participants,
                })
              );
            }
            setConversationsInfos(room);
            setDialogs(dialogs);
            firstRender.current = false;
          }
        }
      );
    }
  }, [conversationsId, dispatch]);

  useEffect(() => {
    if (
      userInfosStateRedux &&
      socketStateRedux &&
      conversationsInfos &&
      conversationsId
    ) {
      const { participants } = conversationsInfos;
      const members: any = participants.map((participant: any) => ({
        userId: participant.userId._id,
      }));
      members.push({ userId: userInfosStateRedux._id });
      emitJoinRoom(
        socketStateRedux,
        conversationsId,
        members,
        (response: any) => {}
      );
    }
  }, [
    conversationsId,
    socketStateRedux,
    userInfosStateRedux?._id,
    conversationsInfos,
  ]);

  useEffect(() => {
    if (socketStateRedux && conversationsId) {
      onServerSendMessage(socketStateRedux, (data: any) => {
        if (
          data &&
          conversationsId === data.conversationId &&
          data.sender._id !== userInfosStateRedux._id
        ) {
          const { conversationsId, ...rest } = data;
          dialogs.push({ ...rest });
          setDialogs([...dialogs]);
        }
      });
    }
  }, [socketStateRedux, dialogs, conversationsId, userInfosStateRedux?._id]);
  useEffect(() => {
    if (
      endRef.current &&
      chatItemsRef.current &&
      dialogs.length > dialogsLength.current
    ) {
      //@ts-ignore
      endRef.current.scrollIntoView({ behavior: 'smooth' });
      //@ts-ignore
      chatItemsRef.current.classList.remove('pr-0');
    }
    dialogsLength.current = dialogs.length;
  }, [dialogs]);

  useEffect(() => {
    if (chatItemsRef.current) {
      //@ts-ignore
      chatItemsRef.current.onscroll = (event: any) => {
        event.target.classList.add('pr-0');
        toggleScrollbar(event.target);
      };
    }
  }, []);

  const pushOwnMessageDialogs = useCallback(
    (data: any) => {
      dialogs.push(data);
      setDialogs([...dialogs]);
    },
    [dialogs]
  );
  if (!conversationsInfos) {
    return null;
  }
  return (
    <div>
      <ChatAreaRoomName
        participants={conversationsInfos?.participants}
        roomName={conversationsInfos?.roomName}
      />
      <div className="content__body">
        <div className="chat__items" ref={chatItemsRef}>
          {userInfosStateRedux && conversationsInfos && dialogs.length > 0 ? (
            dialogs.map((dialog: any, index: number) => {
              const { _id } = dialog;
              const lastSenderId =
                index > 0
                  ? dialogs[index - 1].sender._id === dialog.sender._id
                  : false;
              if (dialog.sender._id === userInfosStateRedux._id) {
                return (
                  <ChatAreaDialog
                    isLastSenderId={lastSenderId}
                    key={_id}
                    dialog={dialog}
                    me={true}
                  />
                );
              }
              return (
                <ChatAreaDialog
                  isLastSenderId={lastSenderId}
                  key={index}
                  dialog={dialog}
                  me={false}
                />
              );
            })
          ) : (
            <p></p>
          )}
          <div ref={endRef} />
        </div>
      </div>
      <ChatAreaInput pushMessage={pushOwnMessageDialogs} />
    </div>
  );
};
export default ChatAreaMain;
