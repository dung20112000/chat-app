import React from 'react';
import { Col, Modal, Row } from 'react-bootstrap';
import { Avatar } from '../../../../../common-components/avatar.common';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/reducers/root.reducer.redux';
import { useHistory } from 'react-router-dom';
import { emitJoinRoom } from '../../../../../server-interaction/socket-handle/socket-chat.services';
import { IUserInfosReducer } from '../../../../../@types/redux';

interface ILeftSideUserInfoModal {
  show: boolean;
  handleClose: any;
  _id: string;
  itemFriend: any;
}

const LeftSideFriendInfosModal = ({
  show,
  handleClose,
  _id,
  itemFriend,
}: ILeftSideUserInfoModal) => {
  const history = useHistory();

  const userInfosStateRedux: IUserInfosReducer = useSelector(
    (state: RootState) => {
      return state.userInfos;
    }
  );
  const socketStateRedux: any = useSelector((state: RootState) => {
    return state.socket;
  });

  const onChat = (conversationsId: string) => {
    if (userInfosStateRedux && socketStateRedux) {
      const members: any = [];
      members.push({ userId: userInfosStateRedux._id });
      members.push({ userId: _id });

      emitJoinRoom(
        socketStateRedux,
        conversationsId,
        members,
        (response: any) => {
          console.log(response);
          if (response.status && response.roomId) {
            history.push(`/chat-page/conversations/${response.roomId}`);
          }
        }
      );
    }
  };

  if (itemFriend) {
    const {
      email,
      personalInfos: { firstName, lastName, avatarUrl, gender },
      conversationsId,
    } = itemFriend;
    return (
      <div>
        <Modal
          show={show}
          onHide={handleClose}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Profile
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="pt-0">
            <Row className="bg-very-light-secondary friend-row rounded-1rem text-center mb-2">
              <Col xs={12} className="pt-3">
                <div className="d-flex justify-content-center align-items-center w-25 mx-auto">
                  <Avatar avatarUrl={avatarUrl} alt={firstName} />
                </div>
              </Col>
              <Col xs={12} className="pt-2">
                <div>
                  <h3>
                    {firstName} {lastName}
                  </h3>
                </div>
              </Col>
              <Col xs={12} className="mb-3">
                <div className="text-muted" style={{ fontSize: '1.2rem' }}>
                  <p className="mb-0">Description </p>
                </div>
              </Col>
              <Col xs={12} className="pb-4">
                {conversationsId ? (
                  <button
                    type="button"
                    onClick={() =>
                      history.push(
                        `/chat-page/conversations/${conversationsId}`
                      )
                    }
                    className="btn btn-primary w-25"
                  >
                    Chat
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onChat(conversationsId)}
                    className="btn btn-primary w-25"
                  >
                    Chat
                  </button>
                )}
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <div className="my-2 d-flex align-items-center justify-content-between infomation">
                  <span className="mr-5">Email</span>
                  <span>{email}</span>
                </div>
                <div className=" my-2 d-flex align-items-center justify-content-between infomation">
                  <span className="mr-5">Gender</span>
                  <span>{gender}</span>
                </div>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
  return null;
};
export default LeftSideFriendInfosModal;
