import { CHANGE_CONVERSATION_DETAIL } from "../types/Conversations.types.redux";

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
    default:
      return state;
  }
};
export default ConversationDetailReducer;
