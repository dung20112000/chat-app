import { Socket } from "socket.io-client";

export const emitJoinRoom = (
  socket: Socket,
  roomId: string,
  members: any[],
  action: any
) => {
  socket.emit("emitJoinRoom", roomId, members, (response: any) => {
    action(response);
  });
};

export const emitMessage = (
  socket: Socket,
  roomId: string,
  senderId: string,
  message: string,
  action: any
) => {
  socket.emit("emitMessage", roomId, message, senderId, (response: any) => {
    action(response);
  });
};
export const onServerSendMessage = (socket: Socket, action: any) => {
  socket.on("emitServerSendMessage", (data) => {
    action(data);
  });
};
export const onCreateConversations = (socket: Socket, action: any) => {
  socket.on("emitCreateConversations", (data) => {
    action(data);
  });
};
