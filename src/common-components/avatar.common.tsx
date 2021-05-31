import {EOnlineStatus} from "../@types/enums.d";
import React from "react";
import "./scss/avatar.common.scss";
interface IAvatar {
    avatarUrl: string;
    _id?: string;
    alt: string;
    status?: EOnlineStatus;
}

export const Avatar = () => {

}

export const AvatarWithStatus: React.FC<IAvatar> = ({avatarUrl, _id, alt, status}) => {
    let statusClasses = "position-absolute rounded-circle status-badge";
    switch (status){
        case (EOnlineStatus.online):
            statusClasses+= " bg-success";
            break;
        case (EOnlineStatus.busy):
            statusClasses += " bg-warning";
            break;
        case (EOnlineStatus.offline):
            statusClasses += " bg-secondary";
            break;
        default:
            statusClasses+= " bg-success"
            break;
    }
    return (
        <div className="bg-secondary rounded-circle d-flex align-items-center justify-content-center position-relative avatar avatar-with-status"
        style={{backgroundImage:`url(${avatarUrl? avatarUrl : ""})`}}>
            {
                avatarUrl ? null : <span>{alt.charAt(0).toUpperCase()}</span>
            }
            <div className={statusClasses}/>
        </div>
    )
}

export const AvatarGroup = () => {

}
