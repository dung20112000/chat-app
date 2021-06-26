import { UPDATE_LAST_MESSAGE } from './../types/last-message.types.redux';
const initialState: any = null;

const LastMessageReducer = (state = initialState, action: any) => {
  const { type, messageInfos } = action;
  switch (type) {
    case UPDATE_LAST_MESSAGE:
      return messageInfos;
    default:
      return state;
  }
};

export default LastMessageReducer;
