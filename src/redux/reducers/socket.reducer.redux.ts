import {ISocketActions} from "../../@types/redux";
import {Socket} from "socket.io-client";
import {ADD_SOCKET,REMOVE_SOCKET} from "../types/socket.types.redux";

const initialState:Socket | null = null;

const SocketReducer = (state =initialState ,action:ISocketActions)=>{
    const {type,socketInstance} = action;
    switch (type){
        case (ADD_SOCKET):
            return socketInstance;
        case (REMOVE_SOCKET):
            return null;
        default:
            return state;
    }
}
export default SocketReducer;