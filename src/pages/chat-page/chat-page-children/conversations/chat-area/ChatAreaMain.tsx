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
  }, [conversationsId]);

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
        (response: any) => {
          console.log(response);
        }
      );
    }
  }, [
    conversationsId,
    socketStateRedux,
    userInfosStateRedux?._id,
    conversationsInfos?.participants,
  ]);

  useEffect(() => {
    if (socketStateRedux && conversationsId) {
      onServerSendMessage(socketStateRedux, (data: any) => {
        if (data && conversationsId === data.conversationId) {
          const { conversationsId, ...rest } = data;
          dialogs.push({ ...rest });
          setDialogs([...dialogs]);
        }
      });
    }
  }, [socketStateRedux, dialogs, conversationsId]);

  useEffect(() => {
    if (!firstRender.current) {
      //@ts-ignore
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversationsInfos?.dialogs.length]);
  useEffect(() => {
    toggleScrollbar(chatItemsRef.current);
  }, []);

  const pushOwnMessageDialogs = useCallback(
    (data: any) => {
      dialogs.push(data);
      setDialogs([...dialogs]);
    },
    [dialogs]
  );
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
              if (dialog.sender._id === userInfosStateRedux._id) {
                return <ChatAreaDialog key={_id} dialog={dialog} me={true} />;
              }
              return <ChatAreaDialog key={index} dialog={dialog} me={false} />;
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
