import { Socket } from "socket.io-client";

export const onServerAcceptedRequest = (socket: Socket, action: any) => {
  socket.on("emitServerAcceptedRequest", (data) => {
    action(data);
  });
};
