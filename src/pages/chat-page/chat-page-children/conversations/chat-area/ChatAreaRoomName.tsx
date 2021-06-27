import { Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {
  AvatarGroup,
  AvatarWithStatus,
} from '../../../../../common-components/avatar.common';
import { RootState } from '../../../../../redux/reducers/RootReducer.reducer.redux';
import React from 'react';
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
  const participantsNames = () => {
    if (!roomName) {
      return participants.length > 1
        ? participants.reduce((allNames: string, member) => {
            const {
              userId: {
                personalInfos: { firstName, lastName },
              },
            } = member;
            if (firstName && lastName) {
              allNames += `${firstName} ${lastName},`;
            }
            return allNames;
          }, '')
        : `${participants[0].userId.personalInfos.firstName} ${participants[0].userId.personalInfos.lastName}`;
    } else {
      return roomName;
    }
  };
  const participantsAvatar = () => {
    return participants.length === 1
      ? `${participants[0].userId.personalInfos.avatarUrl}`
      : '';
  };

  const participantsAvatarGroup = () => {
    if (personalInfos) {
      const { firstName, lastName } = personalInfos;
      return `${firstName} ${lastName}`;
    }
    return '';
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
                alt={participantsAvatarGroup()}
                altMembers={participants[0].userId.personalInfos.firstName}
              />
            ) : (
              <AvatarWithStatus
                avatarUrl={participantsAvatar()}
                alt={participantsNames()}
              />
            )}
          </Col>
          <Col className="pl-0">
            <h4>{participantsNames()}</h4>
          </Col>
        </Row>
      </Col>
      <Col className="text-right">
        <div>
          <i className="fas fa-ellipsis-v" />
        </div>
      </Col>
    </Row>
  );
};
export default React.memo(ChatAreaRoomName, (prevProps, nextProps) => {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
});
