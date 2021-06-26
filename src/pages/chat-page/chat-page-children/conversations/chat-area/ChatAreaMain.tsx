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
import React from 'react';
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
  const userId = useSelector((state: RootState) => state.userInfos?._id);
  const socketStateRedux: any = useSelector((state: RootState) => {
    return state.socket;
  });

  useEffect(() => {
    if (conversationsId) {
      callApi(`/conversations/${conversationsId}`, 'GET').then(
        (response: any) => {
          if (response && response.data && response.data.conversationsInfo) {
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
    if (socketStateRedux && conversationsInfos && conversationsId && userId) {
      const { participants } = conversationsInfos;
      const members: any = participants.map((participant: any) => ({
        userId: participant.userId._id,
      }));
      members.push({ userId: userId });
      emitJoinRoom(
        socketStateRedux,
        conversationsId,
        members,
        (response: any) => {}
      );
    }
  }, [conversationsId, socketStateRedux, userId, conversationsInfos]);

  useEffect(() => {
    if (socketStateRedux && conversationsId) {
      onServerSendMessage(socketStateRedux, (data: any) => {
        if (
          data &&
          conversationsId === data.conversationId &&
          data.sender._id !== userId
        ) {
          const { conversationsId, ...rest } = data;
          setDialogs((dialogs: any) => {
            const clone = [...dialogs];
            if (clone.length > 10) {
              for (let i = 0; i < 2; i++) {
                clone.shift();
              }
            }
            clone.push({ ...rest });
            return [...clone];
          });
        }
      });
    }
  }, [socketStateRedux, conversationsId, userId]);
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
    dialogsLength.current = dialogs.length > 2 ? dialogs.length - 2 : 0;
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

  const pushOwnMessageDialogs = useCallback((data: any) => {
    if (data) {
      setDialogs((dialogs: any) => {
        const clone = [...dialogs];
        if (clone.length > 10) {
          for (let i = 0; i < 2; i++) {
            clone.shift();
          }
        }
        clone.push(data);
        return [...clone];
      });
    }
  }, []);
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
          {userId && conversationsInfos && dialogs.length > 0 ? (
            dialogs.map((dialog: any, index: number) => {
              const { _id } = dialog;
              const lastSenderId =
                index > 0
                  ? dialogs[index - 1].sender._id === dialog.sender._id
                  : false;
              if (dialog.sender._id === userId) {
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
