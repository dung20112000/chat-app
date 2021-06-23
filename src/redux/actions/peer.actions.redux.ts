import {ActionCreator} from "redux";
import {ADD_PEER, REMOVE_PEER} from "../types/peer.types.redux";

export const addPeer:ActionCreator<any> = (payload)=>{
    return {
        type:ADD_PEER,
        payload
    }
}

export const removePeer:ActionCreator<any> = ()=>{
    return {
        type: REMOVE_PEER
    }
}