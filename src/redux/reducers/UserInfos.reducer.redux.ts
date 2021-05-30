import {FETCH_USER_INFOS_SUCCESS,FETCH_USER_INFOS_FAILED} from "../types/users.types.redux";

const initialState:any = null;
const UsersInfosReducer = (state=initialState,action:any)=>{
    const {type,userInfos} = action;
    switch (type){
        case (FETCH_USER_INFOS_SUCCESS):
            return userInfos;
        case (FETCH_USER_INFOS_FAILED):
            return null;
        default:
            return state;
    }
}
export default UsersInfosReducer;