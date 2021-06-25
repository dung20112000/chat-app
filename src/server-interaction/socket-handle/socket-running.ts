import { Socket } from "socket.io-client";
import { notifyNewFriendRequest } from "../../helpers/functions/notify.helper";
import {
  acceptFriendRequest,
  updateConversationIdOfFriends,
  updateFriendStatus,
} from "../../redux/actions/FriendList.actions.redux";
import {
  fetchFriendRequest,
  removeFriendsRequest,
} from "../../redux/actions/FriendRequest.action.redux";
import store from "../../redux/store";
import { onStatusToOnlineFriends } from "./socket-change-status";
import { onCreateConversations } from "./socket-chat";
import {
  emitAcceptFriendsRequests,
  onAcceptInfosToSender,
  onComingFriendsRequests,
} from "./socket-friends-requests";
import { emitClientConnect } from "./socket.services";

let socket: Socket;
let friendsList: any;
let userInfos: any;
let friendsRequests: any;
let conversationDetail: any;

function friendsRequestsRedux() {
  if (socket && userInfos && userInfos._id) {
    onComingFriendsRequests(
      socket,
      ({
        senderFullName,
        senderId,
        avatarUrl,
      }: {
        senderFullName: string;
        senderId: string;
        avatarUrl: string;
      }) => {
        store.dispatch(fetchFriendRequest());
        notifyNewFriendRequest(
          {
            senderFullName,
            senderId,
            avatarUrl,
          },
          (isAcceptedId: string) => {
            const body = { acceptorId: userInfos._id, isAcceptedId };
            emitAcceptFriendsRequests(socket, body, (response: any) => {
              response.newFriend.conversationsId = null;
              if (response.status)
                store.dispatch(acceptFriendRequest(response.newFriend));
              store.dispatch(removeFriendsRequest(isAcceptedId));
            });
          }
        );
      }
    );
  }
}

function friendsListRedux() {
  if (socket && userInfos && userInfos._id) {
    console.log(socket);
    onAcceptInfosToSender(socket, (response: any) => {
      if (response) {
        response.acceptorInfos.conversationsId = null;
        store.dispatch(acceptFriendRequest(response.acceptorInfos));
      }
    });

    onStatusToOnlineFriends(socket, (response: any) => {
      console.log(response);
      if (response) store.dispatch(updateFriendStatus(response));
    });
  }
}

function conversationRedux() {
  if (socket && userInfos && userInfos._id) {
    onCreateConversations(socket, (response: any) => {
      if (response.conversationsId)
        store.dispatch(updateConversationIdOfFriends(response));
    });
  }
}

store.subscribe(() => {
  let socketPreviousValue: any = socket;
  let friendsListPreviousValue = friendsList;
  let userInfosPreviousValue = userInfos;
  let friendsRequestsPreviousValue = friendsRequests;
  let conversationDetailPreviousValue = conversationDetail;

  socket = store.getState().socket;
  friendsList = store.getState().friendsList;
  userInfos = store.getState().userInfos;
  friendsRequests = store.getState().friendsRequests;
  conversationDetail = store.getState().conversationDetail;
  //   if (
  //     JSON.stringify(socket) === JSON.stringify(socketPreviousValue) ||
  //     JSON.stringify(friendsList) !== JSON.stringify(friendsListPreviousValue) ||
  //     JSON.stringify(userInfos) !== JSON.stringify(userInfosPreviousValue) ||
  //     JSON.stringify(friendsRequests) !==
  //       JSON.stringify(friendsRequestsPreviousValue) ||
  //     JSON.stringify(conversationDetail) !==
  //       JSON.stringify(conversationDetailPreviousValue)
  //   ) {
  //   }

  if (
    socket !== socketPreviousValue ||
    JSON.stringify(userInfos) !== JSON.stringify(userInfosPreviousValue)
  ) {
    friendsRequestsRedux();
    friendsListRedux();
    conversationRedux();
  }
});
