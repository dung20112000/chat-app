import {ADD_PEER,REMOVE_PEER} from "../types/peer.types.redux";

const initialState:any = null;

const PeerReducer = (state = initialState,action:any)=>{
    const {type,payload} = action;
    switch(type){
        case(ADD_PEER):
            return payload;
        case(REMOVE_PEER):
            return null;
        default:
            return state;
    }
}
export default PeerReducer;