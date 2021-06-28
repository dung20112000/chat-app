import { Socket } from 'socket.io-client';
import { notifyNewFriendRequest } from '../../helpers/functions/notify.helper';
import {
  acceptFriendRequest,
  updateConversationIdOfFriends,
  updateFriendStatus,
} from '../../redux/actions/friends-list.actions.redux';
import {
  fetchFriendRequest,
  removeFriendsRequest,
} from '../../redux/actions/friends-requests.action.redux';
import store from '../../redux/store';
import { onStatusToOnlineFriends } from './socket-change-status';
import { onCreateConversations } from './socket-chat';
import {
  emitAcceptFriendsRequests,
  onAcceptInfosToSender,
  onComingFriendsRequests,
} from './socket-friends-requests';

let socket: Socket;
let userId: string;

function friendsRequestsRedux() {
  if (socket && userId) {
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
            const body = { acceptorId: userId, isAcceptedId };
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
  if (socket && userId) {
    onAcceptInfosToSender(socket, (response: any) => {
      if (response) {
        response.acceptorInfos.conversationsId = null;
        store.dispatch(acceptFriendRequest(response.acceptorInfos));
      }
    });

    onStatusToOnlineFriends(socket, (response: any) => {
      if (response) store.dispatch(updateFriendStatus(response));
    });
  }
}

function conversationRedux() {
  if (socket && userId) {
    onCreateConversations(socket, (response: any) => {
      if (response.conversationsId)
        store.dispatch(updateConversationIdOfFriends(response));
    });
  }
}

store.subscribe(() => {
  let socketPreviousValue: any = socket;
  let userInfosPreviousValue = userId;

  socket = store.getState().socket;
  userId = store.getState().userInfos?._id;

  if (
    socket !== socketPreviousValue ||
    JSON.stringify(userId) !== JSON.stringify(userInfosPreviousValue)
  ) {
    friendsRequestsRedux();
    friendsListRedux();
    conversationRedux();
  }
});
