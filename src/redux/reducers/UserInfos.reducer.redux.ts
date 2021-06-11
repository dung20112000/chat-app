import {
    FETCH_USER_INFOS_SUCCESS,
    FETCH_USER_INFOS_FAILED,
    UPDATE_USER_PERSONAL_INFOS
} from "../types/users.types.redux";
import {IUserInfosReducer, IUserInfosActions} from "../../@types/redux";

const initialState: IUserInfosReducer | null = null;
const UsersInfosReducer = (state = initialState, action: any) => {
    const {type, userInfos, newPersonalInfos} = action;
    switch (type) {
        case (FETCH_USER_INFOS_SUCCESS):
            return userInfos;
        case (FETCH_USER_INFOS_FAILED):
            return null;
        case (UPDATE_USER_PERSONAL_INFOS):
            // @ts-ignore
            const newState = {...state,personalInfos:newPersonalInfos};
            return newState
        default:
            return state;
    }
}
export default UsersInfosReducer;