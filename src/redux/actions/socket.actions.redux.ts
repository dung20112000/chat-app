import {ADD_SOCKET,REMOVE_SOCKET} from "../types/socket.types.redux";
import {ISocketActions} from "../../@types/redux";
import {Action, ActionCreator} from "redux";
import {Socket} from "socket.io-client";

export const addSocket:ActionCreator<ISocketActions> = (socketInstance:Socket)=>{
    return {
        type: ADD_SOCKET,
        socketInstance
    }
}

export const removeSocket:ActionCreator<Action> = ()=> ({type:REMOVE_SOCKET});
