import { Col, Modal, Row } from 'react-bootstrap';
import React, {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { IUserFriendsList } from '../../../../../@types/redux';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../../redux/reducers/root.reducer.redux';
import { Avatar } from '../../../../../common-components/avatar.common';
import './scss/rightsidechatpage.scss';
import { emitAddFriendConversation } from '../../../../../server-interaction/socket-handle/socket-conversations';
import {
  addMembers,
  changeRoomType,
} from '../../../../../redux/actions/conversation.actions.redux';
import { ERoomType } from '../../../../../@types/enums.d';
import { setConversationsIdChangeRoomType } from '../../../../../redux/actions/friends-list.actions.redux';

interface IConversationBlockCommon {
  avatarUrl: string;
  friendName: string;
  active?: boolean;
  participantsId: string;
  checked: boolean;
  addParticipant: (participantsId: string) => void;
  removeParticipant: (participantsId: string) => void;
}

const ContactsCommon: React.FC<IConversationBlockCommon> = ({
  avatarUrl,
  friendName,
  participantsId,
  checked,
  addParticipant,
  removeParticipant,
}) => {
  const conversationDetail = useSelector(
    (state: RootState) => state.conversationDetail
  );
  const areaRef = useRef(null);
  if (!conversationDetail) return null;
  const { members } = conversationDetail;
  const onMouseOverArea = (event: MouseEvent) => {
    if (areaRef.current) {
      //@ts-ignore
      areaRef.current.classList.add('hover');
      //@ts-ignore
      areaRef.current.classList.add('bg-contact-item');
    }
  };
  const onMouseOutArea = (event: MouseEvent) => {
    if (areaRef.current) {
      //@ts-ignore
      areaRef.current.classList.remove('hover');
      //@ts-ignore
      areaRef.current.classList.remove('bg-contact-item');
    }
  };
  const onHandleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const checked = target.checked;
    if (checked) {
      addParticipant(participantsId);
    }
    if (!checked) {
      removeParticipant(participantsId);
    }
  };
  return (
    <label className="w-100">
      <div
        ref={areaRef}
        onMouseOver={onMouseOverArea}
        onMouseOut={onMouseOutArea}
        className="d-flex friend-row-modal pl-5 py-3 rounded-1rem align-items-center w-100"
      >
        <div className="checkbox-input text-center mr-4">
          {members &&
          members.length > 0 &&
          members.find(
            (member: any) => member.userId._id === participantsId
          ) ? (
            <input name="firstName" type="checkbox" checked disabled />
          ) : (
            <input
              name="firstName"
              type="checkbox"
              onChange={onHandleInputChange}
              checked={checked}
            />
          )}
        </div>
        <div className="d-flex align-items-center w-100 ml-3">
          <div className="mr-3" style={{ width: '10%' }}>
            <Avatar avatarUrl={avatarUrl} alt={friendName} />
          </div>
          <div className="">
            <div>
              <h5 className="mb-0" style={{ fontSize: '1.5rem' }}>
                {friendName}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </label>
  );
};

interface IPropsSearch {
  handleChange: (searchValue: string) => void;
}
const Search = (props: IPropsSearch) => {
  const onSearchChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const target = evt.target;
    const value = target.value;
    props.handleChange(value);
  };
  return (
    <Col xs={12}>
      <form>
        <div className="py-2 rounded-1rem search-input">
          <input
            name="searchValues"
            type="text"
            onChange={onSearchChange}
            placeholder="Search friend by name or phone number"
            className="form-control"
          />
        </div>
      </form>
    </Col>
  );
};
interface ILeftSideDeleteFriendModal {
  show: boolean;
  handleClose: any;
  members: number;
}

const RightSideChatDetailModal = ({
  show,
  handleClose,
  members,
}: ILeftSideDeleteFriendModal) => {
  const dispatch = useDispatch();
  const socketStateRedux = useSelector((state: RootState) => state.socket);
  const friendsListRedux: IUserFriendsList[] = useSelector(
    (state: RootState) => state.friendsList
  );
  const currentConversationsId = useSelector(
    (state: RootState) => state.conversationDetail?._id
  );
  const currentRoomType = useSelector(
    (state: RootState) => state.conversationDetail?.roomType
  );
  const currentRoomMembers: any[] = useSelector(
    (state: RootState) => state.conversationDetail?.members
  );
  const userFullName = useSelector((state: RootState) => {
    if (state.userInfos) {
      const {
        personalInfos: { firstName, lastName },
      } = state.userInfos;
      return firstName + ' ' + lastName;
    }
    return '';
  });
  const [showListFriend, setShowListFriend] = useState<IUserFriendsList[]>([]);
  const [newParticipantsIds, setNewParticipantsIds] = useState<string[]>([]);
  //   const newParticipantsIds = useRef<string[]>([]);
  useEffect(() => {
    setShowListFriend(friendsListRedux);
  }, [friendsListRedux]);

  const handleSearch = (searchValues: string) => {
    if (!searchValues) {
      setShowListFriend(friendsListRedux);
    }
    const result = friendsListRedux.filter((friend) => {
      const {
        email,
        personalInfos: { firstName, lastName },
      } = friend;
      const fullName = `${firstName} ${lastName}`;
      return (
        email.includes(searchValues) ||
        firstName.includes(searchValues) ||
        lastName.includes(searchValues) ||
        fullName.includes(searchValues)
      );
    });
    setShowListFriend(result);
  };
  const addParticipant = useCallback(
    (participantsId: string) => {
      const indexInList = newParticipantsIds.findIndex(
        (id) => id === participantsId
      );
      if (indexInList < 0) {
        newParticipantsIds.push(participantsId);
        setNewParticipantsIds([...newParticipantsIds]);
      }
    },
    [newParticipantsIds]
  );
  const removeParticipant = useCallback(
    (participantsId: string) => {
      const indexInList = newParticipantsIds.findIndex(
        (id) => id === participantsId
      );
      if (indexInList >= 0) {
        newParticipantsIds.splice(indexInList, 1);
        setNewParticipantsIds([...newParticipantsIds]);
      }
    },
    [newParticipantsIds]
  );
  const onAddParticipants = () => {
    if (
      socketStateRedux &&
      currentConversationsId &&
      currentRoomType &&
      currentRoomMembers.length > 0 &&
      userFullName &&
      newParticipantsIds &&
      newParticipantsIds.length > 0
    ) {
      emitAddFriendConversation(
        socketStateRedux,
        currentConversationsId,
        newParticipantsIds,
        userFullName,
        (response: any) => {
          if (
            response.status &&
            response.newParticipants &&
            response.newParticipants.length > 0
          ) {
            dispatch(
              addMembers({
                newMembers: response.newParticipants,
                addBy: response.addBy,
              })
            );
            if (
              currentRoomType === ERoomType.private &&
              currentRoomMembers.length < 2
            ) {
              dispatch(changeRoomType(ERoomType.group));
              dispatch(
                setConversationsIdChangeRoomType(
                  currentRoomMembers[0].userId._id
                )
              );
            }
          }
        }
      );
    }
    setNewParticipantsIds([]);
    handleClose();
  };
  const onClose = () => {
    setNewParticipantsIds([]);
    handleClose();
  };
  return (
    <div>
      <Modal
        show={show}
        onHide={onClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add members
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-0" style={{ height: '75vh' }}>
          <Row>
            <Col xs={12} className="pt-4">
              <h4>
                Invited friends to thís chat conversation ({members + 1}{' '}
                members)
              </h4>
            </Col>
          </Row>
          <Row className="mb-3 search-area-input">
            <Search handleChange={handleSearch} />
            <Col xs={12} className="pt-2">
              <i style={{ fontSize: '1.2rem' }}>
                You can add multiple members by pasting list of phone number
                here
              </i>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="pt-2">
              <h4>Friend List</h4>
            </Col>
            <Col xs={12}>
              <form className="overflow-auto friend-list-add">
                {showListFriend && showListFriend.length > 0
                  ? showListFriend.map((item, index: number) => {
                      const {
                        personalInfos: { firstName, lastName, avatarUrl },
                        _id,
                      } = item;
                      return (
                        <ContactsCommon
                          addParticipant={addParticipant}
                          removeParticipant={removeParticipant}
                          checked={newParticipantsIds.indexOf(_id) >= 0}
                          key={_id}
                          friendName={`${firstName} ${lastName}`}
                          participantsId={_id}
                          avatarUrl={avatarUrl}
                        />
                      );
                    })
                  : null}
              </form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            form="form-edit-infos"
            type="button"
            onClick={onAddParticipants}
          >
            Add
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default RightSideChatDetailModal;
