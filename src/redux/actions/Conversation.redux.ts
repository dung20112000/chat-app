import {ActionCreator} from "redux";
import {CHANGE_CONVERSATION_DETAIL} from "../types/Conversations.types.redux";

export const changeConversationDetail: ActionCreator<any> = (payload) => {
    return {
        type: CHANGE_CONVERSATION_DETAIL,
        payload,
    }
}