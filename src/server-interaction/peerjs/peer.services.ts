import Peer from 'peerjs';

export interface IOpenStreamConfigs {
  video: boolean;
  audio: boolean;
}

const myUrl = process.env.REACT_APP_LOCAL_URL as string;
let callingUsers: any = {};
export const openChatWindow = (querystring: string) => {
  window.open(
    `${myUrl}/video-chat?${querystring}`,
    'chatWindow',
    'width=700,height=700'
  );
};
export const closeChatWindow = () => {
  window.close();
};

export const createPeer = (userId: string) =>
  new Peer(userId, { secure: true });
export const openStream = (config: IOpenStreamConfigs) => {
  return navigator.mediaDevices.getUserMedia(config);
};

export const playStream = (videoRef: any, stream: any) => {
  if (videoRef) {
    videoRef.srcObject = stream;
    videoRef.play();
  }
};

export const onCallPeer = (
  appPeer: Peer,
  streamConfigs: IOpenStreamConfigs,
  callIds: string[],
  localRef: any,
  remoteRef: any
) => {
  openStream(streamConfigs).then((stream) => {
    playStream(localRef, stream);
    if (!callIds || callIds.length === 0) {
      return setTimeout(() => {
        closeChatWindow();
      }, 1000);
    }
    for (const callId of callIds) {
      let waitTime: any;
      const call = appPeer.call(callId, stream);
      callingUsers[callId] = call;
      call.on('stream', (remoteStream) => {
        if (waitTime) {
          clearTimeout(waitTime);
        }
        playStream(remoteRef, remoteStream);
      });
      waitTime = setTimeout(() => {
        if (!call.open) {
          call.close();
          closeChatWindow();
        }
      }, 10000);
      call.on('close', () => {
        setTimeout(() => {
          closeChatWindow();
        }, 2000);
      });
      call.on('error', (error) => {
        if (error) {
          console.log('error');
          onCloseCall(callIds);
          closeChatWindow();
        }
      });
    }
  });
};

export const onAnswerPeer = (
  appPeer: Peer,
  streamConfigs: IOpenStreamConfigs,
  callIds: string[],
  localRef: any,
  remoteRef: any
) => {
  appPeer.on('call', (call) => {
    openStream(streamConfigs).then((stream) => {
      call.answer(stream);
      playStream(localRef, stream);
      for (const callId of callIds) {
        callingUsers[callId] = call;
      }

      call.on('stream', (remoteStream) => {
        if (!stream) {
          console.log('no stream');
        }
        playStream(remoteRef, remoteStream);
      });
      call.on('close', () => {
        // onCloseCall(callIds);
        closeChatWindow();
      });
      call.on('error', (error) => {
        if (error) {
          closeChatWindow();
        }
      });
    });
  });
};

export const onCloseCall = (callIds: string[]) => {
  for (const callId of callIds) {
    if (callingUsers[callId]) {
      callingUsers[callId].close();
    }
  }
};
