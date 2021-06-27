import React, { FormEvent, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
//@ts-ignore
import InputEmoji from 'react-input-emoji';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import shortid from 'shortid';
import { IUserInfosReducer } from '../../../../../@types/redux';
import { updateLastMessage } from '../../../../../redux/actions/last-message.actions.redux';
import { RootState } from '../../../../../redux/reducers/RootReducer.reducer.redux';
import { emitMessage } from '../../../../../server-interaction/socket-handle/socket-chat';

interface IParams {
  conversationsId: string;
}

const ChatAreaInput: React.FC<any> = ({ pushMessage }) => {
  const { conversationsId } = useParams<IParams>();
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const userInfosStateRedux: IUserInfosReducer = useSelector(
    (state: RootState) => {
      return state.userInfos;
    }
  );
  const socketStateRedux: any = useSelector((state: RootState) => {
    return state.socket;
  });
  const {
    _id,
    personalInfos: { firstName, lastName, avatarUrl },
  } = userInfosStateRedux;

  const onEnter = (text: string) => {
    const sender = {
      _id,
      personalInfos: { firstName, lastName, avatarUrl },
    };
    const updatedAt = new Date().toISOString();
    const createdAt = updatedAt;
    if (text && socketStateRedux && userInfosStateRedux && conversationsId) {
      emitMessage(
        socketStateRedux,
        conversationsId,
        sender,
        text,
        (response: any) => {}
      );
      const pushObj = {
        _id: shortid.generate(),
        sender: sender,
        message: text,
        updatedAt,
        createdAt,
      };
      pushMessage(pushObj);
      dispatch(updateLastMessage({ ...pushObj, conversationsId }));
    }
  };
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onEnter(text);
  };

  return (
    <Row className="chat-area-input">
      <Col xs={12}>
        <form
          onSubmit={onSubmit}
          className="d-flex align-items-center justify-content-between"
        >
          <div className="w-100">
            <InputEmoji
              autoComplete="off"
              name="message"
              value={text}
              onChange={setText}
              onEnter={onEnter}
              cleanOnEnter
              placeholder="Enter your message here"
            />
          </div>
          <div className="message-button pr-3">
            <Button
              type="submit"
              variant="primary rounded-circle"
              className="text-white d-flex justify-content-center align-content-center"
              style={{ width: '2rem', height: '2rem' }}
            >
              <i style={{ fontSize: '1rem' }} className="fas fa-paper-plane" />
            </Button>
          </div>
        </form>
      </Col>
    </Row>
  );
};
export default React.memo(ChatAreaInput);
