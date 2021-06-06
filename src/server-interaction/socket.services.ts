import {io, Socket} from "socket.io-client";

const {
    NODE_ENV,
    REACT_APP_SOCKET_URL_DEV,
    REACT_APP_SOCKET_URL_BUILD,
    REACT_APP_SOCKET_URL_TEST,
} = process.env;
const ioURL =
    NODE_ENV === "development"
        ? REACT_APP_SOCKET_URL_DEV
        : NODE_ENV === "production"
        ? REACT_APP_SOCKET_URL_BUILD
        : REACT_APP_SOCKET_URL_TEST;

export const createSocket = () => io(ioURL as string);

export const emitClientConnect = (socketInstance: Socket, userId: string) => {
    socketInstance.on("connect", () => {
        socketInstance.emit("client-connect", {socketId: socketInstance.id, userId})
    })
}