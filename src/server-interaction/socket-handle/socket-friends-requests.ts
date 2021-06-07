import {Socket} from "socket.io-client";

export const emitFriendsRequests = (socket: Socket, senderId: string, receiverId: string,senderFullName:string,avatarUrl:string,action: any) => {
    socket.emit("emitFriendsRequests",{senderId, receiverId},{senderFullName,avatarUrl},(response:{status:boolean})=>{
            if(response.status){
                action()
            }
    })
}

export const onComingFriendsRequests = (socket:Socket,action:any)=>{
    socket.on("emitComingFriendsRequest",({senderFullName,avatarUrl,senderId}:{senderFullName:string, avatarUrl:string, senderId:string})=>{
        action({senderFullName,avatarUrl,senderId})
    })
}