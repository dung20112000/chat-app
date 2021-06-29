import React from "react";
import { useSelector } from "react-redux";
import { IUserInfosReducer } from "../../../../../../@types/redux";
import { Avatar } from "../../../../../../common-components/avatar.common";
import { RootState } from "../../../../../../redux/reducers/root.reducer.redux";

export const ModalItemFriendInGroup = (props: any) => {
    const { info: { id, personalInfos: { firstName, lastName, avatarUrl } }, onChooseFriend } = props;
    const userInfosStateRedux: IUserInfosReducer = useSelector((state: RootState) => {
        return state.userInfos;
    });

    const onRemoveFriend = (id: string) => {
        onChooseFriend(id);
    }
    return (
        <div className="bg-info text-white p-2 d-flex align-items-center m-2 w-20 item-friend-group">
            <div className="w-25 mr-2">
                <Avatar avatarUrl={avatarUrl} alt={`${firstName} ${lastName}`} />
            </div>
            <div className="name-friend">
                <h6 className="m-0">{`${firstName} ${lastName}`}</h6>
            </div>
            {
                userInfosStateRedux._id !== id && (
                    <div className="remove-friend text-danger" onClick={() => onRemoveFriend(id)}>
                        <i className="fas fa-times"></i>
                    </div>
                )
            }
        </div>
    )
}