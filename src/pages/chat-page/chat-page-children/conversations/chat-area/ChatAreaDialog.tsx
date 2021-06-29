import React from 'react';
import { Avatar } from '../../../../../common-components/avatar.common';
const ChatAreaDialog = (props: any) => {
  const { isLastSenderId, me } = props;
  const {
    message,
    sender: {
      personalInfos: { avatarUrl, firstName, lastName },
    },
  } = props.dialog;
  return (
    <div className={`chat__item d-flex align-items-end ${me ? 'me' : 'other'}`}>
      <div className="chat__item__content">
        <div className="chat__msg">{message}</div>
      </div>
      <div
        className={!isLastSenderId && me ? 'ml-2' : 'mr-2'}
        style={{ width: '3rem', order: !isLastSenderId && me ? 1 : 0 }}
      >
        {props.isLastSenderId ? null : (
          <Avatar avatarUrl={avatarUrl} alt={`${firstName} ${lastName}`} />
        )}
      </div>
    </div>
  );
};
export default React.memo(ChatAreaDialog, (prevProps, nextProps) => {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
});
