import { Socket } from 'socket.io-client';
export const emitAddFriendConversation = (
  socketInstance: Socket,
  conversationsId: string,
  newParticipantsIds: string[],
  addBy: string,
  action: any
) => {
  socketInstance.emit(
    'emitAddFriendConversation',
    conversationsId,
    newParticipantsIds,
    addBy,
    (response: any) => {
      if (response.status) {
        action(response);
      }
    }
  );
};

export const onAddedToConversation = (socketInstance: Socket, action: any) => {
  socketInstance.on('emitAddedToConversation', ({ conversationsId, addBy }) => {
    action({ conversationsId, addBy });
  });
};
