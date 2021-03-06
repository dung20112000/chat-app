import { Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {
  Avatar,
  AvatarGroup
} from '../../../../../common-components/avatar.common';
import { RootState } from '../../../../../redux/reducers/root.reducer.redux';
import React from 'react';
import {
  participantsAvatarGroup,
  participantsNames,
} from '../../../../../helpers/functions/function-common';
interface IPropsChatAreaRoomName {
  participants: any[];
  roomName: string;
}
const ChatAreaRoomName = ({
  participants,
  roomName,
}: IPropsChatAreaRoomName) => {
  const personalInfos = useSelector((state: RootState) => {
    return state.userInfos?.personalInfos;
  });
  if (!personalInfos) {
    return null;
  }

  const participantsAvatar = () => {
    return participants.length === 1
      ? `${participants[0].userId.personalInfos.avatarUrl}`
      : '';
  };

  return (
    <Row
      style={{ zIndex: 3 }}
      className="px-3 py-3 align-items-center border-bottom bg-light-secondary chat-area-room-name"
    >
      <Col xs={6}>
        <Row className="d-flex align-items-center">
          <Col xs={3}>
            {participants.length > 1 ? (
              <AvatarGroup
                avatarUrl={personalInfos.avatarUrl}
                avatarUrlMember={participants[0].userId.personalInfos.avatarUrl}
                members={participants.length}
                alt={participantsAvatarGroup(personalInfos)}
                altMembers={participants[0].userId.personalInfos.firstName}
              />
            ) : (
              <Avatar
                avatarUrl={participantsAvatar()}
                alt={participantsNames(participants, roomName)}
              />
            )}
          </Col>
          <Col className="pl-0">
            <h4>{participantsNames(participants, roomName)}</h4>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default React.memo(ChatAreaRoomName, (prevProps, nextProps) => {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
});
