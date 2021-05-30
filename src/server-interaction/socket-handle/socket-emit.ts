import { Socket } from "socket.io-client";

export const emitFriendRequest = (
  socket: Socket,
  requestSender: string,
  requestReceiver: string
) => {
  socket.emit("emitFriendRequest", {
    requestSender,
    requestReceiver,
  });
};
