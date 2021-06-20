import {Socket} from "socket.io-client";

interface ISenderInfos {
    _id: string;
    personalInfos :{
        firstName: string;
        lastName: string;
        avatarUrl: string;
    }
}
export const emitJoinRoom = (socket:Socket,roomId:string,members:any[] ,action:any)=>{
    socket.emit("emitJoinRoom",roomId,members,(response:any)=>{
        action(response);
    });
}

export const emitMessage = (socket:Socket,roomId:string,senderInfos: ISenderInfos, message:string,action:any)=>{
    socket.emit("emitMessage",roomId,message,senderInfos,(response:any)=>{
        action(response)
    })
}
export const onServerSendMessage = (socket:Socket,action:any)=>{
    socket.on("emitServerSendMessage",(data)=>{
        action(data);
    })
}