import {useLocation} from "react-router-dom";
import qs from "querystring";
import {useEffect, useRef} from "react";
import {onAnswerPeer, onCallPeer} from "../../server-interaction/peerjs/peer.services";
const VideoAnswer  = ()=>{
    const {search} = useLocation();
    const localRef = useRef(null);
    const remoteRef = useRef(null);
    // useEffect(() =>{
    //     onAnswerPeer({video:true,audio:false},localRef.current,remoteRef.current)
    // },[])
    return (
          <div>
              <video src="" ref={remoteRef}></video>
              <video src="" ref={localRef}></video>
          </div>
    )
}

export default VideoAnswer;