import Peer from "peerjs";
import store from "../../redux/store";
import {addPeer} from "../../redux/actions/peer.actions.redux";

export interface IOpenStreamConfigs {
    video: boolean;
    audio: boolean;
}
let chatWindow:any;
export const openChatWindow = (connectPeerId:string)=>{
    chatWindow = window.open(`http://localhost:3000/video-chat/${connectPeerId}`,"chatWindow", "width=500,height=500");
}
export const closeChatWindow = ()=>{
    chatWindow.close()
}
const appPeer = new Peer();
appPeer.on("open", peerId=>{
    store.dispatch(addPeer(peerId));
})
export const openStream = (config: IOpenStreamConfigs) => {
    return navigator.mediaDevices.getUserMedia(config);
}

export const playStream = (videoRef: any, stream: any) => {
    if (videoRef) {
        videoRef.srcObject = stream;
        videoRef.play();
    }
}

export const onCallPeer = (streamConfigs: IOpenStreamConfigs, callId: string, localRef: any, remoteRef: any) => {
    openStream(streamConfigs).then(stream => {
        playStream(localRef, stream);
        const call = appPeer.call(callId, stream);
        if (!callId){
            return setTimeout(()=> {
                call.close();
            },1000 )
        }
        return  call.on("stream", (remoteStream) => playStream(remoteRef, remoteStream));
    })
}

export const onAnswerPeer = (streamConfigs: IOpenStreamConfigs, localRef: any, remoteRef: any) => {
    appPeer.on("call", (call) => {
        openStream(streamConfigs).then(stream => {
            call.answer(stream);
            playStream(localRef, stream);
            call.on("stream", remoteStream => playStream(remoteRef, remoteStream))
        })
    })
}