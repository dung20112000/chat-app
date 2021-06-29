import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ERoomType } from '../../../../../@types/enums.d';
import { toggleScrollbar } from '../../../../../helpers/functions/toggle-scrollbar';
import {
  changeConversationDetail,
  changeRoomType,
} from '../../../../../redux/actions/conversation.actions.redux';
import { setConversationsIdChangeRoomType } from '../../../../../redux/actions/friends-list.actions.redux';
import { RootState } from '../../../../../redux/reducers/root.reducer.redux';
import { callApi } from '../../../../../server-interaction/apis/api.services';
import { emitJoinRoom } from '../../../../../server-interaction/socket-handle/socket-chat.services';
import ChatAreaDialog from './ChatAreaDialog';
import ChatAreaInput from './ChatAreaInput';
import ChatAreaRoomName from './ChatAreaRoomName';
import './scss/chatbody.scss';

interface IParams {
  conversationsId: string;
}
function isInViewport(el: any) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
const ChatAreaMain = () => {
  const dispatch = useDispatch();
  const { conversationsId } = useParams<IParams>();
  const [conversationsInfos, setConversationsInfos] = useState<any>(null);
  const [dialogs, setDialogs] = useState<any>([]);
  const [scrollLoading, setScrollLoading] = useState(true);
  const [newMessageNotify, setNewMessageNotify] = useState(0);
  const endRef = useRef(null);
  const firstRender = useRef(true);
  const chatItemsRef = useRef(null);
  const roomNameRef = useRef(null);
  const contentBodyRef = useRef(null);
  const dialogsSizeRef = useRef(0);
  const msgCheckPointRef = useRef('');
  const userId = useSelector((state: RootState) => state.userInfos?._id);
  const socketStateRedux: any = useSelector((state: RootState) => {
    return state.socket;
  });
  const friendsListRedux = useSelector((state: RootState) => state.friendsList);
  const currentRoomType = useSelector(
    (state: RootState) => state.conversationDetail?.roomType
  );
  const currentRoomMembers: any[] = useSelector(
    (state: RootState) => state.conversationDetail?.members
  );
  const conversationDetailNewMembers: any = useSelector(
    (state: RootState) => state.conversationDetail?.newMembers
  );
  const lastMessageRedux = useSelector((state: RootState) => state.lastMessage);
  useEffect(() => {
    if (conversationsId) {
      callApi(`/conversations/${conversationsId}`, 'GET').then(
        (response: any) => {
          if (response && response.data && response.data.conversationsInfo) {
            const { room, _id } = response.data.conversationsInfo;
            const { dialogs, roomName, participants, roomType, dialogsSize } =
              room;
            dialogsSizeRef.current = dialogsSize;
            msgCheckPointRef.current = dialogs[0]?._id;
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
            setScrollLoading(false);
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
    const listener = (data: any) => {
      if (
        data &&
        conversationsId === data.conversationId &&
        data.sender._id !== userId
      ) {
        const { conversationId, ...rest } = data;
        if (!isInViewport(endRef.current)) {
          setNewMessageNotify((prev) => prev + 1);
        }
        setDialogs((dialogs: any) => {
          let clone = [...dialogs];
          if (clone.length > 1000) {
            clone = [];
          }
          return [...clone, { ...rest }];
        });
      }
    };
    if (socketStateRedux && conversationsId && userId) {
      socketStateRedux.on('emitServerSendMessage', listener);
    }
    return () => {
      if (socketStateRedux) {
        socketStateRedux.off('emitServerSendMessage', listener);
      }
    };
  }, [socketStateRedux, conversationsId, userId]);
  useEffect(() => {
    if (
      endRef.current &&
      chatItemsRef.current &&
      isInViewport(endRef.current)
    ) {
      //@ts-ignore
      endRef.current.scrollIntoView({ behavior: 'smooth' });
      //@ts-ignore
      chatItemsRef.current.classList.remove('pr-0');
    }
  }, [dialogs]);

  useEffect(() => {
    if (chatItemsRef.current) {
      //@ts-ignore
      chatItemsRef.current.onscroll = (event: any) => {
        event.target.classList.remove('pr-0');
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
    const listener = (data: any) => {
      const { conversationsId: responseId, newParticipantsInfos, addBy } = data;
      if (
        currentRoomType === ERoomType.private &&
        currentRoomMembers.length < 2
      ) {
        dispatch(changeRoomType(ERoomType.group));
        dispatch(
          setConversationsIdChangeRoomType(currentRoomMembers[0].userId._id)
        );
      }
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
    };
    if (socketStateRedux && conversationsId && userId) {
      socketStateRedux.on('emitNotifyNewMembers', listener);
    }
    return () => {
      if (socketStateRedux) {
        socketStateRedux.off('emitNotifyNewMembers', listener);
      }
    };
  }, [
    socketStateRedux,
    conversationsId,
    userId,
    dispatch,
    currentRoomType,
    currentRoomMembers,
  ]);
  useEffect(() => {
    if (roomNameRef.current && contentBodyRef.current) {
      // @ts-ignore
      const roomNameHeight = roomNameRef.current.offsetHeight;
      // @ts-ignore

      contentBodyRef.current.style.top = roomNameHeight;
    }
  }, []);
  useEffect(() => {
    if (lastMessageRedux && endRef.current) {
      //@ts-ignore
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [lastMessageRedux]);
  const pushOwnMessageDialogs = useCallback((data: any) => {
    if (data) {
      if (endRef.current) {
        //@ts-ignore
        endRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      setDialogs((dialogs: any) => {
        let clone = [...dialogs];
        if (clone.length > 1000) {
          clone = [];
        }

        return [...clone, data];
      });
    }
  }, []);
  if (!conversationsInfos) {
    return null;
  }
  const onScrollLoading = (event: any) => {
    const target = event.target;
    if (endRef.current && isInViewport(endRef.current)) {
      setNewMessageNotify(0);
    }
    if (target.scrollTop === 0 && dialogs.length < dialogsSizeRef.current) {
      setScrollLoading(true);
      callApi(
        `/conversations/${conversationsId}?checkpoint=${msgCheckPointRef.current}&limit=10`,
        'GET'
      )
        .then((response) => {
          if (response && response.status === 200) {
            const {
              room: { dialogs: oldDialogs },
            } = response.data;
            msgCheckPointRef.current = oldDialogs[0]?._id;

            setScrollLoading(false);

            setDialogs((dialogs: any) => {
              const clone = [...oldDialogs, ...dialogs];
              return clone;
            });
          }
        })
        .catch((error) => console.log(error));
    }
  };
  const onScrollBottom = () => {
    if (endRef.current) {
      //@ts-ignore
      endRef.current.scrollIntoView({ behavior: 'smooth' });
      setNewMessageNotify(0);
    }
  };
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
        <div
          className="chat__items"
          ref={chatItemsRef}
          onScroll={onScrollLoading}
        >
          {scrollLoading ? (
            <div className="text-center d-flex align-items-center justify-content-center">
              <img
                src="media/spinner.svg"
                alt="spinner"
                width="32"
                height="32"
              />
            </div>
          ) : null}
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
      {newMessageNotify > 0 ? (
        <div
          onClick={onScrollBottom}
          className="position-absolute text-center w-25 btn btn-outline-primary mx-auto rounded-pill shake-vertical"
          style={{ bottom: '6rem', right: '1rem', left: '1rem' }}
        >
          {newMessageNotify} new messages
          <i className="fas fa-angle-double-down ml-3"></i>
        </div>
      ) : null}
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
