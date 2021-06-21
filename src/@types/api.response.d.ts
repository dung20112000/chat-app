export interface IResponseConversationsList {
    _id:string,
    room:{
        roomName:string,
        participants:{
            userId:{
                _id:string,
                personalInfos: {
                    firstName: string,
                    lastName: string,
                    avatarUrl: string
                }
            }
        }[],
        dialogs:
            {
                "_id": string,
                "sender": {
                    "_id": string,
                    "personalInfos": {
                        "firstName": string,
                        "lastName": string,
                        "avatarUrl": string
                    }
                },
                "message": string,
                "updatedAt": string,
                "createdAt": string
            }[]
    updateSeen:boolean,
    },
    "createdAt": string,
    "updatedAt": string
}
export interface IResponseConversations {
    userId:string,
    conversations:IResponseConversationsList[]
}