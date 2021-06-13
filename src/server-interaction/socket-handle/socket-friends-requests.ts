import { Socket } from "socket.io-client";

interface IEmitAcceptFriendsRequests {
  acceptorId: string;
  isAcceptedId: string;
}
interface IEmitCancelFriendsRequests {
  acceptorId: string;
  isRejectedId: string;
}

export const emitFriendsRequests = (
  socket: Socket,
  senderId: string,
  receiverId: string,
  senderFullName: string,
  avatarUrl: string,
  action: any
) => {
  socket.emit(
    "emitFriendsRequests",
    { senderId, receiverId },
    { senderFullName, avatarUrl },
    (response: { status: boolean }) => {
      if (response.status) {
        action();
      }
    }
  );
};

export const onComingFriendsRequests = (socket: Socket, action: any) => {
  socket.on(
    "emitComingFriendsRequest",
    ({
      senderFullName,
      avatarUrl,
      senderId,
    }: {
      senderFullName: string;
      avatarUrl: string;
      senderId: string;
    }) => {
      action({ senderFullName, avatarUrl, senderId });
    }
  );
};

export const emitAcceptFriendsRequests = (
  socket: Socket,
  body: IEmitAcceptFriendsRequests,
  action: any
) => {
  socket.emit("emitAcceptFriendsRequests", body, (response: any) => {
    action(response);
  });
};

export const emitCancelFriendsRequests = (
  socket: Socket,
  body: IEmitCancelFriendsRequests,
  action: any
) => {
  socket.emit("emitCancelFriendsRequests", body, (response: any) => {
    action(response);
  });
};

export const onAcceptInfosToSender = (socket: Socket, action: any) => {
  socket.on("emitAcceptInfosToSender", (acceptorInfos: any) => {
    action(acceptorInfos);
  });
};
