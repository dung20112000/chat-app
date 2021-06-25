import { useLocation } from 'react-router-dom';
import qs from 'query-string';
import { useEffect, useRef } from 'react';
import {
  createPeer,
  onAnswerPeer,
  onCallPeer,
  onCloseCall,
} from '../../server-interaction/peerjs/peer.services';
import { Button } from 'react-bootstrap';
import './scss/videochat.scss';

const VideoChat = () => {
  const { search } = useLocation();
  const localRef = useRef(null);
  const remoteRef = useRef(null);
  const paramsObj = qs.parse(search.replace('?', ''));
  let { video, audio, is_caller, callerId, ...rest } = paramsObj;
  const videoConfig = JSON.parse(video as string) as boolean;
  const audioConfig = JSON.parse(audio as string) as boolean;
  is_caller = JSON.parse(is_caller as string);
  const callIds = Object.values({ ...rest }) as string[];

  useEffect(() => {
    //@ts-ignore
    localRef.current.volume = 0;
    //@ts-ignore
    localRef.current.muted = 1;
    //@ts-ignore
    remoteRef.current.muted = 0;
    //@ts-ignore
    remoteRef.current.volume = 1;
    const appPeer = createPeer(callerId as string);
    if (search) {
      appPeer.on('open', (id) => {
        if (is_caller) {
          onCallPeer(
            appPeer,
            {
              video: videoConfig,
              audio: audioConfig,
            },
            callIds,
            localRef.current,
            remoteRef.current
          );
        }
        if (!is_caller) {
          onAnswerPeer(
            appPeer,
            {
              video: videoConfig,
              audio: audioConfig,
            },
            callIds,
            localRef.current,
            remoteRef.current
          );
        }
      });
    }
    return () => {
      appPeer.disconnect();
    };
  }, [audioConfig, callIds, callerId, is_caller, search, videoConfig]);

  return (
    <div className="position-relative vw-100 vh-100 bg-dark">
      <video
        className="position-absolute remote-stream w-100 h-100"
        ref={remoteRef}
        autoPlay={true}
      ></video>
      <video
        className="position-absolute local-stream w-25 h-25 rounded-1rem"
        autoPlay={true}
        ref={localRef}
      ></video>
      <Button
        variant="danger"
        onClick={() => onCloseCall(callIds)}
        className="rounded-circle text-white d-flex align-items-center justify-content-center p-3 position-absolute btn-close-video"
      >
        <i className="fas fa-times"></i>
      </Button>
    </div>
  );
};

export default VideoChat;
