import { Action } from "redux";
import { Socket } from "socket.io-client";
import { EOnlineStatus, EGender } from "./enums";

// Socket
export interface ISocketActions extends Action {
  socketInstance: Socket;
}
export interface IUpdatePersonalInfos extends Action {
  newPersonalInfos: {
    firstName?: string;
    gender?: EGender;
    job?: string;
    lastName?: string;
  };
}
// users-infos
export interface IUserInfosReducer {
  _id: string;
  email: string;
  friendsList: any[];
  friendsRequests: string;
  onlineStatus: EOnlineStatus;
  previousOnlineStatus: {
    status: EOnlineStatus;
    lastActive?: string;
  };
  personalInfos: {
    avatarUrl: string;
    createdAt?: string;
    firstName: string;
    gender: EGender;
    job: string;
    lastName: string;
    updatedAt?: string;
    userId: string;
    _id: string;
  };
}
export interface IUserInfosActions extends Action {
  userInfos: IUserInfosReducer;
}

export interface IUserFriendsList {
  email: string;
  onlineStatus: EOnlineStatus;
  personalInfos: {
    firstName: string;
    lastName: string;
    avatarUrl: string;
    _id: string;
  };
  previousOnlineStatus: {
    status: EOnlineStatus;
    lastActive: string;
  };
  _id: string;
}

export interface IUserFriendsListAction extends Action {
  payload: IUserFriendsList[];
}

export interface IUserFriendsAction extends Action {
  payload: IUserFriends;
}

export interface IUserFriends {
  comingRequests: IComingRequests[];
  sendingRequests: ISendingRequests[];
  updatedAt: string;
  _id: string;
}

export interface IComingRequests {
  createdAt: string;
  updatedAt: string;
  _id: string;
  requestFrom: {
    personalInfos: {
      firstName: string;
      lastName: string;
      avatarUrl: string;
    };
    _id: string;
  };
}

interface ISendingRequests {
  createdAt: string;
  updatedAt: string;
  _id: string;
  requestTo: {
    personalInfos: {
      firstName: string;
      lastName: string;
      avatarUrl: string;
    };
    _id: string;
  };
}
