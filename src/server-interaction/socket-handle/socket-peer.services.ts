import {Socket} from "socket.io-client";

export const emitCall = (socketInstance:Socket,{connectUserId,callerId}:{connectUserId:string,callerId:string},action:any)=>{
    socketInstance.emit("emitCall", {connectUserId,callerId},(response:any)=>{
        if(response.status){
            const {connected,connectPeerIds} = response;
            if(connected && connectPeerIds.length > 0){
              return action(connectPeerIds)
            }
            return action(null);
        }

    })
}