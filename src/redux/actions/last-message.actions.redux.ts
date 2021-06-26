import { UPDATE_LAST_MESSAGE } from './../types/last-message.types.redux';
import { ActionCreator } from 'redux';
export const updateLastMessage: ActionCreator<any> = (messageInfos: any) => {
  return {
    type: UPDATE_LAST_MESSAGE,
    messageInfos,
  };
};
