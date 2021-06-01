import {Action} from "redux"
import {Socket} from "socket.io-client";
import {EOnlineStatus,EGender} from "./enums";

// Socket
export interface ISocketActions extends Action  {
    socketInstance: Socket
}

// users-infos
export interface IUserInfosReducer {
    _id: string;
    email: string;
    friendsList: any[];
    friendsRequests:string;
    onlineStatus: EOnlineStatus;
    previousOnlineStatus:{
        status: EOnlineStatus,
        lastActive?: string
    };
    personalInfos:{
        avatarUrl:string,
        createdAt?:string,
        firstName:string,
        gender: EGender,
        job:string,
        lastName:string,
        updatedAt?:string,
        userId: string,
        _id: string
    }
}
export interface IUserInfosActions extends Action {
    userInfos: IUserInfosReducer
}