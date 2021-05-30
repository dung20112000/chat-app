import {Action} from "redux"
import {Socket} from "socket.io-client";
// Socket
export interface ISocketActions extends Action  {
    socketInstance: Socket
}

// users/infos
