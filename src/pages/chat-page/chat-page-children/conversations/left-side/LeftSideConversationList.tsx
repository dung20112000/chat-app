import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { IResponseConversationsList } from '../../../../../@types/api.response';
import { EOnlineStatus } from '../../../../../@types/enums.d';
import { IUserFriendsList } from '../../../../../@types/redux';
import {
  ConversationBlockCommon,
  ConversationBlockGroup,
} from '../../../../../common-components/conversation-block.common';
import { toggleScrollbar } from '../../../../../helpers/functions/toggle-scrollbar';
import { RootState } from '../../../../../redux/reducers/RootReducer.reducer.redux';
import { callApi } from '../../../../../server-interaction/apis/api.services';
import {
  emitSeenMessage,
  onServerSendMessage,
} from '../../../../../server-interaction/socket-handle/socket-chat';
import SlideRequestAddFriendCommon from '../../../../../common-components/slide-request-add-friend.common';
import { onAddedToConversation } from '../../../../../server-interaction/socket-handle/socket-conversations';
import { participantsNames } from '../../../../../helpers/functions/function-common';

interface IPropsShowConversations extends IResponseConversationsList {
  seenAction: (conversationId: string) => void;
}

const ShowConversations: React.FC<IPropsShowConversations> = (props) => {
  const { pathname } = useLocation();
  const urlConversationsId = pathname.replace('/chat-page/conversations/', '');

  const friendsListStateRedux: IUserFriendsList[] = useSelector(
    (state: RootState) => state.friendsList
  );
  const { _id: conversationsId, seenAction } = props;
  const { participants, roomName, dialogs, updateSeen } = props.room;
  if (!dialogs || dialogs.length === 0) return null;

  const {
    sender: {
      personalInfos: { firstName: senderFirstName, lastName: senderLastName },
    },
    message,
    updatedAt,
  } = dialogs[0];

  const senderLastMessage = senderFirstName + senderLastName;
  if (!friendsListStateRedux) return null;
  if (participants.length > 1) {
    return (
      <ConversationBlockGroup
        lastMessageTime={updatedAt}
        participants={participants}
        id={conversationsId}
        updateSeen={updateSeen}
        seenAction={seenAction}
        groupName={
          roomName ? roomName : participantsNames(participants, roomName)
        }
        lastMessage={{ sender: senderLastMessage, message }}
        members={participants.length + 1}
        active={urlConversationsId === conversationsId}
      />
    );
  }
  const {
    userId: {
      _id: partnerId,
      personalInfos: {
        firstName: partnerFirstName,
        lastName: partnerLastName,
        avatarUrl: partnerAvatarUrl,
      },
    },
  } = participants[0];
  const partnerName = `${partnerFirstName} ${partnerLastName}`;
  const isFriend = friendsListStateRedux.find(
    (friend) => friend._id === partnerId
  );
  if (!isFriend) {
    return (
      <ConversationBlockCommon
        lastMessageTime={updatedAt}
        status={EOnlineStatus.offline}
        key={partnerId}
        id={conversationsId}
        friendName={partnerName}
        avatarUrl={partnerAvatarUrl}
        lastMessage={message}
        active={urlConversationsId === conversationsId}
        updateSeen={updateSeen}
        seenAction={seenAction}
      />
    );
  }
  return (
    <ConversationBlockCommon
      lastMessageTime={updatedAt}
      status={isFriend.onlineStatus}
      key={partnerId}
      id={conversationsId}
      friendName={partnerName}
      avatarUrl={partnerAvatarUrl}
      lastMessage={message}
      active={urlConversationsId === conversationsId}
      updateSeen={updateSeen}
      seenAction={seenAction}
    />
  );
};
const ShowConversationsMemo = React.memo(ShowConversations);
interface IPropsSearch {
  handleChange: (searchValue: string) => void;
}

const SearchConversation = (props: IPropsSearch) => {
  const onSearchChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const target = evt.target;
    const value = target.value;
    props.handleChange(value);
  };
  return (
    <Row className="mb-3">
      <Col xs={12}>
        <div className="form__div">
          <input
            id="searchValues"
            name="searchValues"
            type="text"
            onChange={onSearchChange}
            placeholder=" "
            className="form__input"
          />
          <label htmlFor="" className="form__label">
            Search Conversation
          </label>
        </div>
      </Col>
    </Row>
  );
};
const SearchConversationMemo = React.memo(SearchConversation);
const LeftSideConversationList = () => {
  const [conversationsList, setConversationsList] = useState<
    null | IResponseConversationsList[]
  >(null);
  const socketStateRedux: Socket = useSelector(
    (state: RootState) => state.socket
  );
  const userId = useSelector((state: RootState) => {
    return state.userInfos?._id;
  });
  const lastUserMessage = useSelector((state: RootState) => state.lastMessage);
  const allConversationsRef = useRef<any[]>([]);
  const conversationItemRef = useRef(null);

  useEffect(() => {
    toggleScrollbar(conversationItemRef.current);
  }, []);

  useEffect(() => {
    (async () => {
      const response = await callApi('/conversations', 'GET');
      if (
        response &&
        response.status === 200 &&
        response.data &&
        response.data.conversations
      ) {
        const { conversations } = response.data;
        allConversationsRef.current = conversations;
        setConversationsList(conversations);
      }
    })();
  }, []);

  const isMatchParticipants = useCallback(
    (participants: any[], searchValue: string) => {
      for (const participant of participants) {
        const {
          userId: {
            personalInfos: { firstName, lastName },
          },
        } = participant;
        const fullName = `${firstName} ${lastName}`;
        if (
          firstName.includes(searchValue) ||
          lastName.includes(searchValue) ||
          fullName.includes(searchValue)
        ) {
          return true;
        }
      }
      return false;
    },
    []
  );
  const handleSearch = useCallback(
    (searchValue: string) => {
      let debounce: any;
      if (allConversationsRef.current.length > 0 && conversationsList) {
        if (debounce) {
          clearTimeout(debounce);
        }
        debounce = setTimeout(() => {
          if (!searchValue) {
            return setConversationsList(allConversationsRef.current);
          }
          const result = allConversationsRef.current.filter((conversation) => {
            return (
              conversation.room.roomName.includes(searchValue) ||
              isMatchParticipants(conversation.room.participants, searchValue)
            );
          });
          return setConversationsList(result);
        }, 1500);
      }
    },
    [conversationsList, isMatchParticipants, allConversationsRef]
  );
  const getNewConversation = useCallback(async (conversationsId: string) => {
    const response = await callApi(`/conversations/${conversationsId}`, 'GET');
    if (response && response.status === 200) {
      return response.data.conversationsInfo;
    }
    return null;
  }, []);

  const updateDialogs = useCallback(
    (currentUserId: string, socketData: any, conversationsList: any[]) => {
      const indexModify = conversationsList.findIndex(
        (conversation) => conversation._id === socketData.conversationId
      );
      const { conversationId, ...rest } = socketData;
      if (indexModify < 0) return null;
      if (currentUserId !== socketData.sender._id) {
        conversationsList[indexModify].room.updateSeen = false;
      } else {
        conversationsList[indexModify].room.updateSeen = true;
      }
      conversationsList[indexModify].room.dialogs = [{ ...rest }];
      const topPushing = conversationsList[indexModify];
      conversationsList.splice(indexModify, 1);
      conversationsList.unshift(topPushing);
      return conversationsList;
    },
    []
  );
  const seenAction = (conversationsId: string) => {
    if (conversationsList && conversationsList.length > 0 && socketStateRedux) {
      const indexIdInList = conversationsList.findIndex(
        (conversation) => conversation._id === conversationsId
      );
      if (indexIdInList >= 0) {
        conversationsList[indexIdInList].room.updateSeen = true;
        emitSeenMessage(socketStateRedux, conversationsId);
        setConversationsList([...conversationsList]);
      }
    }
  };
  useEffect(() => {
    if (socketStateRedux && conversationsList && userId) {
      onServerSendMessage(socketStateRedux, async (data: any) => {
        if (data) {
          const isConversationInList = allConversationsRef.current.find(
            (conversation) => conversation._id === data.conversationId
          );
          if (!isConversationInList) {
            const newConversation = await getNewConversation(
              data.conversationId
            );
            if (newConversation) {
              if (data.sender._id === userId) {
                newConversation.room.updateSeen = true;
              }
              conversationsList.unshift(newConversation);
              setConversationsList([...conversationsList]);
            }
          }
          if (isConversationInList) {
            if (data.sender._id !== userId) {
              const newState = await updateDialogs(
                userId,
                data,
                conversationsList
              );
              if (newState) setConversationsList([...newState]);
            }
          }
        }
      });
    }
  }, [
    socketStateRedux,
    userId,
    updateDialogs,
    conversationsList,
    getNewConversation,
  ]);
  useEffect(() => {
    if (socketStateRedux && conversationsList) {
      onAddedToConversation(
        socketStateRedux,
        async ({
          conversationsId,
          addBy,
        }: {
          conversationsId: string;
          addBy: string;
        }) => {
          const response = await callApi(
            `/conversations/${conversationsId}`,
            'GET'
          );
          if (response && response.status === 200) {
            const newConversation = { ...response.data.conversationsInfo };
            newConversation.room.dialogs[0] = {
              ...newConversation.room.dialogs[0],
              message: `You was added by ${addBy}`,
              sender: {
                personalInfos: {
                  firstName: '',
                  lastName: '',
                },
              },
            };
            newConversation.room.updateSeen = false;
            conversationsList.unshift(newConversation);
            setConversationsList([...conversationsList]);
          }
        }
      );
    }
  }, [socketStateRedux, conversationsList]);
  useEffect(() => {
    if (lastUserMessage) {
      const { conversationsId, ...rest } = lastUserMessage;
      setConversationsList((conversationsList) => {
        if (!conversationsList) {
          return conversationsList;
        }
        const indexModify = conversationsList.findIndex(
          (conversation) => conversation._id === conversationsId
        );
        if (indexModify >= 0) {
          conversationsList[indexModify].room.dialogs = [{ ...rest }];
          const topPushing = conversationsList[indexModify];
          conversationsList[indexModify].room.updateSeen = true;
          conversationsList.splice(indexModify, 1);
          conversationsList.unshift(topPushing);
          return [...conversationsList];
        }
        return conversationsList;
      });
    }
  }, [lastUserMessage]);
  return (
    <div>
      <SearchConversationMemo handleChange={handleSearch} />
      <div className="conversation-area">
        <div ref={conversationItemRef} className="conversation-item">
          {conversationsList && conversationsList.length > 0 ? (
            conversationsList.map((conversation, index) => {
              const { _id } = conversation;
              return (
                <ShowConversationsMemo
                  seenAction={seenAction}
                  {...conversation}
                  key={_id}
                />
              );
            })
          ) : (
            <SlideRequestAddFriendCommon
              text="conversations"
              imageUrl="media/welcome-slides/5231.jpg"
              maxWidth="100%"
              hidden={false}
              description="Create a new conversation to say love to your friends"
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default React.memo(LeftSideConversationList);
