import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Dropdown,
  Row,
} from 'react-bootstrap';
import { EOnlineStatus } from '../../../../../@types/enums.d';
import React, { useEffect, useState } from 'react';
import { AvatarWithStatus } from '../../../../../common-components/avatar.common';
import RightSideModal from './RightSideModal';
import ComponentTitleCommon from '../../../../../common-components/component-title.common';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/reducers/RootReducer.reducer.redux';
import {
  IComingRequests,
  IUserInfosReducer,
} from '../../../../../@types/redux';
import { Avatar } from './../../../../../common-components/avatar.common';
import {
  emitAcceptFriendsRequests,
  emitCancelFriendsRequests,
} from '../../../../../server-interaction/socket-handle/socket-friends-requests';
import { acceptFriendRequest } from '../../../../../redux/actions/FriendList.actions.redux';
import { removeFriendsRequest } from '../../../../../redux/actions/FriendRequest.action.redux';
import { emitJoinRoom } from '../../../../../server-interaction/socket-handle/socket-chat';
import { useHistory } from 'react-router-dom';
import SlideRequestAddFriendCommon from '../../../../../common-components/slide-request-add-friend.common';

interface IPropsRowFriend {
  _id: string;
  avatarUrl: string;
  status: EOnlineStatus;
  firstName: string;
  lastName: string;
  conversationsId: any;
}

const RowFriend: React.FC<IPropsRowFriend> = ({
  _id,
  avatarUrl,
  firstName,
  lastName,
  status,
  conversationsId,
}) => {
  const history = useHistory();
  const userInfosStateRedux: IUserInfosReducer = useSelector(
    (state: RootState) => {
      return state.userInfos;
    }
  );
  const socketStateRedux: any = useSelector((state: RootState) => {
    return state.socket;
  });

  const onChat = () => {
    if (conversationsId) {
      return history.push(`/chat-page/conversations/${conversationsId}`);
    }
    if (userInfosStateRedux && socketStateRedux) {
      const members: any = [];
      members.push({ userId: userInfosStateRedux._id });
      members.push({ userId: _id });

      emitJoinRoom(
        socketStateRedux,
        conversationsId,
        members,
        (response: any) => {
          if (response.status && response.roomId) {
            history.push(`/chat-page/conversations/${response.roomId}`);
          }
        }
      );
    }
  };
  return (
    <div className="item-friends" onClick={onChat}>
      <Row className="my-2">
        <Col xs="3">
          <AvatarWithStatus
            avatarUrl={avatarUrl}
            alt={`${firstName} ${lastName}`}
            status={status}
          />
        </Col>
        <Col>
          <div className="d-flex align-items-center h-100 name-friend">
            <span>{`${firstName} ${lastName}`}</span>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const ItemFriendRequest: React.FC<IComingRequests> = (props) => {
  const {
    requestFrom: {
      _id: requestId,
      personalInfos: { firstName, lastName, avatarUrl },
    },
  } = props;

  const socketStateRedux: any = useSelector((state: RootState) => {
    return state.socket;
  });

  const userInfosStateRedux: IUserInfosReducer = useSelector(
    (state: RootState) => {
      return state.userInfos;
    }
  );

  const dispatch = useDispatch();
  const bodyAccept = {
    acceptorId: userInfosStateRedux._id,
    isAcceptedId: requestId,
  };
  const bodyCancel = {
    acceptorId: userInfosStateRedux._id,
    isRejectedId: requestId,
  };
  const onAcceptRequest = () => {
    if (socketStateRedux) {
      emitAcceptFriendsRequests(
        socketStateRedux,
        bodyAccept,
        (response: any) => {
          response.newFriend.conversationsId = null;
          if (response.status)
            dispatch(acceptFriendRequest(response.newFriend));
          dispatch(removeFriendsRequest(requestId));
        }
      );
    }
  };

  const onCancelRequest = () => {
    if (socketStateRedux) {
      emitCancelFriendsRequests(
        socketStateRedux,
        bodyCancel,
        (response: any) => {
          if (response.status) dispatch(removeFriendsRequest(requestId));
        }
      );
    }
  };

  return (
    <Row className="py-2">
      <Col xs="4">
        <Avatar avatarUrl={avatarUrl} alt={`${firstName} ${lastName}`} />
      </Col>
      <Col xs="6" className="pl-0">
        <Row>
          <Col xs="12">
            <h5>{`${firstName} ${lastName}`}</h5>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <Button
              variant="primary"
              className="mr-2"
              onClick={onAcceptRequest}
            >
              Accept
            </Button>
            <Button variant="danger" onClick={onCancelRequest}>
              Cancel
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

const RowFriendsMemo = React.memo(RowFriend);

const FriendsRequests = () => {
  const friendsRequests = useSelector((state: RootState) => {
    return state.friendsRequests;
  });

  return (
    <div className="friends-requests">
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle className="bg-light border-0 text-dark p-0">
          <i className="fas fa-user"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu className="super-colors">
          {friendsRequests &&
            friendsRequests.comingRequests.length > 0 &&
            friendsRequests.comingRequests.map((request: any) => {
              const { _id } = request;
              return (
                <Dropdown.Item key={_id} eventKey="1">
                  <ItemFriendRequest {...request} />
                </Dropdown.Item>
              );
            })}
        </Dropdown.Menu>
      </Dropdown>
      <span className="requests-quantity">
        {friendsRequests &&
          friendsRequests.comingRequests &&
          friendsRequests.comingRequests.length}
      </span>
    </div>
  );
};

const RightSideOnlineFriendsList = () => {
  const [modalShow, setModalShow] = useState(false);
  const [userFriendsOnline, setUserFriendsOnline] = useState([]);
  const friendsListStateRedux = useSelector((state: RootState) => {
    return state.friendsList;
  });

  useEffect(() => {
    if (friendsListStateRedux && friendsListStateRedux.length > 0) {
      const userFriendsOnline = friendsListStateRedux.filter((friend: any) => {
        return friend.onlineStatus !== EOnlineStatus.offline;
      });
      setUserFriendsOnline(userFriendsOnline);
    }
  }, [friendsListStateRedux]);

  const changeSearchFriend = (event: any) => {
    const textInput = event.target.value.toUpperCase();
    if (textInput === '') {
      const userFriendsOnline = friendsListStateRedux.filter((friend: any) => {
        return friend.onlineStatus !== EOnlineStatus.offline;
      });
      setUserFriendsOnline(userFriendsOnline);
    } else {
      // eslint-disable-next-line array-callback-return
      const searchFriends = friendsListStateRedux.filter((friend: any) => {
        const { personalInfos } = friend;
        if (
          personalInfos.firstName.toUpperCase().includes(textInput) ||
          personalInfos.lastName.toUpperCase().includes(textInput)
        ) {
          return friend;
        }
      });
      setUserFriendsOnline(searchFriends);
    }
  };

  const onModalShow = () => {
    setModalShow(true);
  };

  return (
    <Container>
      <Row className="mb-3 vh-10">
        <Col xs="6">
          <div className="friend-request d-flex align-items-center">
            <ComponentTitleCommon title={'Friends'} />
            <FriendsRequests />
          </div>
        </Col>
        <Col xs="6" className="text-right">
          <div className="add-friend" onClick={onModalShow}>
            <button className="btn text-primary d-flex align-items-center justify-content-end w-100">
              <i className="fas fa-plus-square mr-1"></i> Add friends
            </button>
          </div>
          <RightSideModal show={modalShow} onHide={() => setModalShow(false)} />
        </Col>
      </Row>
      <Row className="mb-3 vh-10">
        <Col>
          <div className="form__div">
            <input
              type="text"
              className="form__input"
              placeholder=" "
              onChange={(e) => changeSearchFriend(e)}
            />
            <label htmlFor="" className="form__label">
              Search Name
            </label>
          </div>
        </Col>
      </Row>
      <Row>
        <Col id="custom-scroll">
          <div className="list-friend">
            {friendsListStateRedux && friendsListStateRedux.length === 0 ? (
              <SlideRequestAddFriendCommon
                imageUrl="media/welcome-slides/7495.jpg"
                text="friends"
                maxWidth="70%"
                hidden={false}
                description="Add more friends to connect with the people you love"
              />
            ) : userFriendsOnline && userFriendsOnline.length > 0 ? (
              userFriendsOnline.map((friend: any) => {
                const { onlineStatus, personalInfos, _id, conversationsId } =
                  friend;
                return (
                  <RowFriendsMemo
                    key={_id}
                    _id={_id}
                    conversationsId={conversationsId}
                    avatarUrl={personalInfos.avatarUrl}
                    status={onlineStatus}
                    firstName={personalInfos.firstName}
                    lastName={personalInfos.lastName}
                  />
                );
              })
            ) : (
              <SlideRequestAddFriendCommon
                imageUrl="media/welcome-slides/5270.jpg"
                text="friends online"
                maxWidth="100%"
                hidden={true}
                description=""
              />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default React.memo(RightSideOnlineFriendsList);
