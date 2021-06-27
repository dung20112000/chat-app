import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { EOnlineStatus } from '../@types/enums';
import { participantsAvatarGroup } from '../helpers/functions/function-common';
import { RootState } from '../redux/reducers/RootReducer.reducer.redux';
import { AvatarGroup, AvatarWithStatus } from './avatar.common';
import './scss/conversation-block.common.scss';
import TimeDistanceCommon from './time-distance.common';

interface IConversationBlockCommon {
  avatarUrl: string;
  friendName: string;
  lastMessage: string;
  active?: boolean;
  id: string;
  status: EOnlineStatus;
  lastMessageTime: any;
  updateSeen: boolean;
  seenAction: (conversationsId: string) => void;
}

interface IConversationsBlockGroup {
  participants: any[];
  groupName: string;
  lastMessage: {
    sender: string;
    message: string;
  };
  id: string;
  active?: boolean;
  members: number;
  updateSeen: boolean;
  lastMessageTime: any;
  seenAction: (conversationsId: string) => void;
}

const dotSeen = (
  <div
    className="rounded-circle bg-primary"
    style={{ width: '0.75rem', height: '0.75rem' }}
  />
);

export const ConversationBlock: React.FC<IConversationBlockCommon> = ({
  lastMessageTime,
  status,
  id,
  avatarUrl,
  friendName,
  lastMessage,
  active,
  updateSeen,
  seenAction,
}) => {
  const history = useHistory();

  const onClickConversations = () => {
    seenAction(id);
    history.push(`/chat-page/conversations/${id}`);
  };
  return (
    <Row
      style={{ boxSizing: 'border-box' }}
      className={
        active
          ? 'm-1 py-3 rounded-1rem align-items-stretch active conversation-block-common mb-2'
          : 'm-1 py-3 mb-2 rounded-1rem align-items-stretch conversation-block-common'
      }
      onClick={onClickConversations}
    >
      <Col xs={3}>
        <AvatarWithStatus
          status={status}
          avatarUrl={avatarUrl}
          alt={friendName}
        />
      </Col>
      <Col xs={6} className="pt-2 pl-0">
        <div>
          <h5
            className={`mb-1 text-truncate ${!updateSeen ? 'font-weight-bold' : ''
              }`}
          >
            {friendName}{' '}
          </h5>
          <p
            className={`m-0 text-truncate  ${!updateSeen ? 'font-weight-bold text-dark' : 'text-muted'
              }`}
          >
            {lastMessage}{' '}
          </p>
        </div>
      </Col>
      {!updateSeen ? (
        <Col>
          <div className="d-flex align-items-center justify-content-end h-100">
            {dotSeen}
          </div>
        </Col>
      ) : (
        <TimeDistanceCommon lastMessageTime={lastMessageTime} />
      )}
    </Row>
  );
};
export const ConversationBlockCommon = React.memo(
  ConversationBlock,
  (prevProps, nextProps) => {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps);
  }
);
export const ConversationGroup: React.FC<IConversationsBlockGroup> = ({
  participants,
  updateSeen,
  active,
  id,
  groupName,
  lastMessage,
  lastMessageTime,
  seenAction,
}) => {
  const personalInfos = useSelector((state: RootState) => {
    return state.userInfos?.personalInfos;
  });
  const history = useHistory();

  const onClickConversations = () => {
    seenAction(id);
    history.push(`/chat-page/conversations/${id}`);
  };

  return (
    <Row
      onClick={onClickConversations}
      className={
        active
          ? 'm-1 py-3 rounded-1rem align-items-stretch active conversation-block-common mb-2'
          : 'm-1 py-3 mb-2 rounded-1rem align-items-stretch conversation-block-common'
      }
    >
      <Col xs={3}>
        <AvatarGroup
          avatarUrl={personalInfos.avatarUrl}
          avatarUrlMember={participants[0].userId.personalInfos.avatarUrl}
          members={participants.length}
          alt={participantsAvatarGroup(personalInfos)}
          altMembers={participants[0].userId.personalInfos.firstName}
        />
      </Col>
      <Col xs={6} className="pt-2 pl-0">
        <div>
          <h5 className={`mb-1 text-truncate ${!updateSeen ? 'font-weight-bold' : ''}`}>{groupName}</h5>
          <p className={`m-0 text-truncate  ${!updateSeen ? 'font-weight-bold text-dark' : 'text-muted'
            }`}>
            {lastMessage.sender} : {lastMessage.message}
          </p>
        </div>
      </Col>
      {!updateSeen ? (
        <Col>
          <div className="d-flex align-items-center justify-content-end h-100">
            {dotSeen}
          </div>
        </Col>
      ) : (
        <TimeDistanceCommon lastMessageTime={lastMessageTime} />
      )}
    </Row>
  );
};
export const ConversationBlockGroup = React.memo(
  ConversationGroup,
  (prevProps, nextProps) => {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps);
  }
);
