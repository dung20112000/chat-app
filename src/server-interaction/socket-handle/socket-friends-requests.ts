import {Socket} from "socket.io-client";

export const emitFriendsRequests = (socket: Socket, senderId: string, receiverId: string,action: any) => {
    socket.emit("emitFriendsRequests",{senderId, receiverId},(response:{status:boolean})=>{
            if(response.status){
                action()
            }
    })
}