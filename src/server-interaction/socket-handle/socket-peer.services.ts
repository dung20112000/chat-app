import {Socket} from "socket.io-client";

export const emitCall = (socketInstance:Socket,{connectUserIds,callerId}:{connectUserIds:string[],callerId:string},roomId:string,action:any)=>{
    console.log("alo");
    socketInstance.emit("emitCall", {connectUserIds,callerId},roomId,(response:any)=>{
      action(response);
    })
}

export const onComingCall = (socketInstance:Socket,action:any)=>{
    socketInstance.on("emitComingCall",(callerInfos:any)=>{
        action(callerInfos)
    })
}