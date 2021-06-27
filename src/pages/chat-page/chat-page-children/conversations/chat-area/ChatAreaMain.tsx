import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toggleScrollbar } from '../../../../../helpers/functions/toggle-scrollbar';
import { changeConversationDetail } from '../../../../../redux/actions/Conversation.redux';
import { RootState } from '../../../../../redux/reducers/RootReducer.reducer.redux';
import { callApi } from '../../../../../server-interaction/apis/api.services';
import {
  emitJoinRoom,
  onServerSendMessage,
} from '../../../../../server-interaction/socket-handle/socket-chat';
import { onNotifyNewMembers } from '../../../../../server-interaction/socket-handle/socket-conversations';
import ChatAreaDialog from './ChatAreaDialog';
import ChatAreaInput from './ChatAreaInput';
import ChatAreaRoomName from './ChatAreaRoomName';
import './scss/chatbody.scss';

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
  const roomNameRef = useRef(null);
  const contentBodyRef = useRef(null);
  const userId = useSelector((state: RootState) => state.userInfos?._id);
  const socketStateRedux: any = useSelector((state: RootState) => {
    return state.socket;
  });
  const friendsListRedux = useSelector((state: RootState) => state.friendsList);
  const conversationDetailNewMembers: any = useSelector(
    (state: RootState) => state.conversationDetail?.newMembers
  );
  useEffect(() => {
    if (conversationsId) {
      callApi(`/conversations/${conversationsId}`, 'GET').then(
        (response: any) => {
          if (response && response.data && response.data.conversationsInfo) {
            const { room, _id } = response.data.conversationsInfo;
            const { dialogs, roomName, participants, roomType } = room;
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
                  roomType,
                })
              );
            } else {
              const fullName = participants.reduce(
                (allNames: string, participant: any) => {
                  if (!participant || !participant.userId) return allNames;
                  const { firstName, lastName } =
                    participant.userId.personalInfos;
                  allNames += `${firstName} ${lastName}, `;
                  return allNames;
                },
                ''
              );
              const { avatarUrl } = participants[0].userId.personalInfos;
              dispatch(
                changeConversationDetail({
                  _id: _id,
                  roomName: roomName,
                  firstName: fullName,
                  lastName: '',
                  avatarUrl: avatarUrl,
                  members: participants,
                  roomType,
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
  }, [
    conversationsId,
    socketStateRedux,
    userId,
    conversationsInfos,
    friendsListRedux,
  ]);

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
              //   clone.shift();
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

  useEffect(() => {
    if (
      conversationDetailNewMembers &&
      conversationDetailNewMembers.members &&
      conversationDetailNewMembers.members.length > 0 &&
      chatItemsRef.current &&
      endRef.current
    ) {
      const { members, addBy } = conversationDetailNewMembers;

      setDialogs((dialogs: any) => {
        const newMembersInfos = members.map((member: any) => ({
          notify: true,
          newMember: member.personalInfos,
          addBy,
          sender: {
            _id:
              dialogs.length > 0
                ? dialogs[dialogs.length - 1].sender._id
                : userId,
          },
        }));
        const clone = [...dialogs];
        return [...clone, ...newMembersInfos];
      });
    }
  }, [conversationDetailNewMembers, userId]);
  useEffect(() => {
    if (socketStateRedux && conversationsId) {
      onNotifyNewMembers(socketStateRedux, (data: any) => {
        const {
          conversationsId: responseId,
          newParticipantsInfos,
          addBy,
        } = data;
        if (responseId === conversationsId) {
          setDialogs((dialogs: any[]) => {
            const newMembersInfos = newParticipantsInfos.map((member: any) => ({
              notify: true,
              newMember: member.personalInfos,
              addBy,
              sender: {
                _id:
                  dialogs.length > 0
                    ? dialogs[dialogs.length - 1].sender._id
                    : userId,
              },
            }));
            const clone = [...dialogs];
            return [...clone, ...newMembersInfos];
          });
        }
      });
    }
  }, [socketStateRedux, conversationsId, userId]);
  useEffect(() => {
    if (roomNameRef.current && contentBodyRef.current) {
      // @ts-ignore
      const roomNameHeight = roomNameRef.current.offsetHeight;
      // @ts-ignore

      contentBodyRef.current.style.top = roomNameHeight;
    }
  }, []);
  const pushOwnMessageDialogs = useCallback((data: any) => {
    if (data) {
      setDialogs((dialogs: any) => {
        const clone = [...dialogs];
        if (clone.length > 10) {
          //   clone.shift();
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
      <div ref={roomNameRef}>
        {conversationsInfos ? (
          <ChatAreaRoomName
            participants={conversationsInfos.participants}
            roomName={conversationsInfos.roomName}
          />
        ) : null}
      </div>
      <div ref={contentBodyRef} className="content__body">
        <div className="chat__items" ref={chatItemsRef}>
          {userId && conversationsInfos && dialogs.length > 0 ? (
            dialogs.map((dialog: any, index: number) => {
              if (dialog.notify) {
                const {
                  newMember: { firstName, lastName },
                  addBy,
                } = dialog;
                return (
                  <h6 className="mt-3 w-75 mx-auto text-center">
                    <strong>{`${firstName} ${lastName}`} </strong>
                    was added by
                    <strong> {addBy}</strong>
                  </h6>
                );
              }
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
      <div
        className="position-absolute"
        style={{ bottom: '2rem', right: '1rem', left: '1rem' }}
      >
        <ChatAreaInput pushMessage={pushOwnMessageDialogs} />
      </div>
    </div>
  );
};
export default ChatAreaMain;
