import { IUserFriendsList } from "../../@types/redux";

export const participantsAvatarGroup = (personalInfos: any) => {
  if (personalInfos) {
    const { firstName, lastName } = personalInfos;
    return `${firstName} ${lastName}`;
  }
  return "";
};

export const participantsNames = (participants: any, roomName: string) => {
  if (!roomName) {
    return participants.length > 1
      ? participants.reduce(
          (
            allNames: string,
            member: {
              userId: { personalInfos: { firstName: any; lastName: any } };
            }
          ) => {
            const {
              userId: {
                personalInfos: { firstName, lastName },
              },
            } = member;
            if (firstName && lastName) {
              allNames += `${firstName} ${lastName},`;
            }
            return allNames;
          },
          ""
        )
      : `${participants[0].userId.personalInfos.firstName} ${participants[0].userId.personalInfos.lastName}`;
  } else {
    return roomName;
  }
};

export const searchName = (listName: any[], value: string) => {
  if (!value) return listName;

  const result = listName.filter((friend: IUserFriendsList) => {
    const {
      email,
      personalInfos: { firstName, lastName },
    } = friend;
    const fullName = `${firstName} ${lastName}`;
    return (
      email.toLowerCase().includes(value.toLowerCase()) ||
      firstName.toLowerCase().includes(value.toLowerCase()) ||
      lastName.toLowerCase().includes(value.toLowerCase()) ||
      fullName.toLowerCase().includes(value.toLowerCase())
    );
  });
  return result;
};
