import { Container, Row, Col } from 'react-bootstrap';
import qs from 'querystring';
import {
  Avatar,
  AvatarGroup,
} from '../../../../../common-components/avatar.common';
import React, { useState } from 'react';

import ComponentTitleCommon from '../../../../../common-components/component-title.common';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/reducers/root.reducer.redux';
import RightSideChatDetailModal from './RightSideChatDetailModal';
import { emitCall } from '../../../../../server-interaction/socket-handle/socket-peer.services';
import { convertArrayPeerToObject } from '../../../../../helpers/functions/convertArrayToObject';
import {
  IOpenStreamConfigs,
  openChatWindow,
} from '../../../../../server-interaction/peerjs/peer.services';
import { participantsAvatarGroup } from '../../../../../helpers/functions/function-common';
interface IChatDetailFriend {
  avatarUrlRoom: string;
  participants: any[];
  roomName: string;
}

const ChatDetailFriend: React.FC<IChatDetailFriend> = ({
  avatarUrlRoom,
  roomName,
  participants,
}) => {
  const [showAddMembers, setShowAddMembers] = useState(false);
  const handleCloseAddMembers = () => setShowAddMembers(false);
  const handleShowAddMembers = () => setShowAddMembers(true);
  const personalInfos = useSelector((state: RootState) => {
    return state.userInfos?.personalInfos;
  });
  const fullRoomName = useSelector((state: RootState) => {
    return (
      state.conversationDetail?.firstName +
      ' ' +
      state.conversationDetail?.lastName
    );
  });
  const avatarUrl = useSelector(
    (state: RootState) => state.conversationDetail?.avatarUrl
  );
  return (
    <Row className="pt-3">
      <Col xs={3} className="align-items-center">
        {roomName !== '' ? (
          <AvatarGroup
            avatarUrl={personalInfos.avatarUrl}
            avatarUrlMember={avatarUrl}
            members={participants.length}
            alt={participantsAvatarGroup(personalInfos)}
            altMembers={fullRoomName}
          />
        ) : (
          <Avatar avatarUrl={avatarUrl} alt={fullRoomName} />
        )}
      </Col>
      <Col xs={6} className=" pl-0 align-items-center">
        <div>
          {roomName ? (
            <h5 className="mb-1 pt-2 text-truncate">{roomName}</h5>
          ) : (
            <h5 className="mb-1 pt-2 text-truncate">{fullRoomName}</h5>
          )}
          <p className="m-0 text-truncate text-muted">
            {participants.length + 1} members
          </p>
        </div>
      </Col>
      <Col xs={3} className="text-right pl-0">
        <button
          type="button"
          className="btn mt-2"
          onClick={handleShowAddMembers}
        >
          <i
            style={{ fontSize: '1.8rem', color: '#76c00d' }}
            className="fas fa-plus-circle"
          />
        </button>
        <RightSideChatDetailModal
          show={showAddMembers}
          handleClose={handleCloseAddMembers}
          members={participants.length}
        />
      </Col>
    </Row>
  );
};
const RightSideChatDetail = () => {
  const conversationDetailRedux = useSelector(
    (state: RootState) => state.conversationDetail
  );
  const socketStateRedux = useSelector((state: RootState) => state.socket);
  const userIdRedux = useSelector((state: RootState) => state.userInfos._id);
  if (!conversationDetailRedux) {
    return (
      <Container>
        <Row className="align-items-center">
          <Col xs={10}>
            <ComponentTitleCommon title="Chat Detail" />
          </Col>
        </Row>
      </Container>
    );
  }
  const { avatarUrl, _id, roomName, members } = conversationDetailRedux;

  const onVideoChat = ({ video, audio }: IOpenStreamConfigs) => {
    if (socketStateRedux && userIdRedux) {
      const infosIds = {
        connectUserIds: members.map((member: any) => member.userId._id),
        callerId: userIdRedux,
      };
      const paramsObj = convertArrayPeerToObject(infosIds.connectUserIds);
      paramsObj.callerId = userIdRedux;
      paramsObj.is_caller = true;
      paramsObj.video = video;
      paramsObj.audio = audio;
      const queriesParams = qs.stringify(paramsObj);
      emitCall(socketStateRedux, infosIds, _id, (response: any) => {
        if (response && response.status) {
          openChatWindow(queriesParams);
        }
      });
    }
  };
  return (
    <Container>
      <Row className="align-items-center">
        <Col xs={10}>
          <ComponentTitleCommon title="Details" />
        </Col>
      </Row>
      <ChatDetailFriend
        roomName={roomName}
        avatarUrlRoom={avatarUrl}
        participants={members}
      />
      <Row className="align-items-center pt-3">
        <Col xs={6} className="pr-1">
          <button
            className="btn btn-primary w-100 rounded-1rem pt-2 pb-2"
            onClick={() => onVideoChat({ video: false, audio: true })}
          >
            <i className="fas fa-phone-alt" /> Voice chat
          </button>
        </Col>
        <Col xs={6} className="pl-1">
          <button
            className="btn btn-danger w-100 rounded-1rem pt-2 pb-2"
            onClick={() => onVideoChat({ video: true, audio: true })}
          >
            <i className="fas fa-video" /> Video call
          </button>
        </Col>
      </Row>
    </Container>
  );
};
export default RightSideChatDetail;
