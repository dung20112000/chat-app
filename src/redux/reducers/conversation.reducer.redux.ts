import { CHANGE_ROOM_TYPE } from '../types/Conversations.types.redux';
import {
  CHANGE_CONVERSATION_DETAIL,
  ADD_NEW_MEMBERS,
} from '../types/Conversations.types.redux';

const initialState: any | null = null;
const ConversationDetailReducer = (state = initialState, action: any) => {
  const { payload, type } = action;
  switch (type) {
    case CHANGE_CONVERSATION_DETAIL:
      if (payload) {
        const newState = { ...state, ...payload };
        return newState;
      }
      return state;
    case ADD_NEW_MEMBERS:
      if (payload) {
        const newMembersList = payload.newMembers.map((member: any) => ({
          userId: member,
        }));
        const newState = {
          ...state,
          members: [...state.members, ...newMembersList],
          newMembers: { members: payload.newMembers, addBy: payload.addBy },
        };
        return newState;
      }
      return state;
    case CHANGE_ROOM_TYPE:
      if (payload) {
        const newState = { ...state, roomType: payload };
        return newState;
      }
      return state;
    default:
      return state;
  }
};
export default ConversationDetailReducer;
