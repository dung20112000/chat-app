import { Socket } from "socket.io-client";

interface changeStatus {
  userId: string;
  newStatus: string;
  currentStatus: string;
}

export const emitChangeStatus = (
  socket: Socket,
  body: changeStatus,
  action: any
) => {
  socket.emit("emitChangeStatus", body, (response: any) => {
    action(response);
  });
};

export const onStatusToOnlineFriends = (socket: Socket, action: any) => {
  socket.on("emitStatusToOnlineFriends", (response: any) => {
    action(response);
  });
};
