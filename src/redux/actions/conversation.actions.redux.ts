import {
  ADD_NEW_MEMBERS,
  CHANGE_ROOM_TYPE,
} from '../types/conversation.types.redux';
import { ActionCreator } from 'redux';
import { CHANGE_CONVERSATION_DETAIL } from '../types/conversation.types.redux';

export const changeConversationDetail: ActionCreator<any> = (payload) => {
  return {
    type: CHANGE_CONVERSATION_DETAIL,
    payload,
  };
};

export const addMembers: ActionCreator<any> = (payload) => {
  return {
    type: ADD_NEW_MEMBERS,
    payload,
  };
};

export const changeRoomType: ActionCreator<any> = (payload) => {
  return {
    type: CHANGE_ROOM_TYPE,
    payload,
  };
};
