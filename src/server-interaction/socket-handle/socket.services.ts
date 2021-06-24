import { io, Socket } from "socket.io-client";


const ioURL = process.env.REACT_APP_SOCKET_URL;

export const createSocket = () => io(ioURL as string);

export const emitClientConnect = (socketInstance: Socket, userId: string) => {
   socketInstance.on("connect",()=>{
     socketInstance.emit("client-connect", {
       socketId: socketInstance.id,
       userId,
     });
   })
};

export const emitClientLogout = (socketInstance: Socket, userId: string) => {
  socketInstance.emit("emitClientLogout", userId);
};
export const onLogout = (socket: Socket, action: any) => {
  socket.on("emitLogout", () => {
    action();
  });
};
