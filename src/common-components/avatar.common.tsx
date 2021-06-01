import {EOnlineStatus} from "../@types/enums.d";
import React from "react";
import "./scss/avatar.common.scss";

interface IAvatar {
    avatarUrl: string;
    avatarUrlMember?: string;
    _id?: string;
    alt: string;
    status?: EOnlineStatus;
}
interface IAvatarGroup{
    avatarUrl: string;
    avatarUrlMember?: string;
    _id?: string;
    alt: string;
    altMember:string;
    status?: EOnlineStatus;
}

const checkStatusClass = (status: EOnlineStatus | undefined) => {
    let statusClasses = "position-absolute rounded-circle status-badge";
    switch (status) {
        case (EOnlineStatus.online):
            return `${statusClasses} bg-success`;
        case (EOnlineStatus.busy):
            return `${statusClasses} bg-warning`;
        case (EOnlineStatus.offline):
            return `${statusClasses} bg-secondary`;
        default:
            return `${statusClasses} bg-success`;
    }
}
export const Avatar: React.FC<IAvatar> = ({avatarUrl, _id, alt}) => {
    return (
        <div
            className="bg-secondary rounded-circle d-flex align-items-center justify-content-center position-relative avatar avatar-with-status"
            style={{backgroundImage: `url(${avatarUrl ? avatarUrl : ""})`}}>
            {
                avatarUrl ? null : <span>{alt.charAt(0).toUpperCase()}</span>
            }
        </div>
    )
}

export const AvatarWithStatus: React.FC<IAvatar> = ({avatarUrl, _id, alt, status}) => {
    let statusClasses = checkStatusClass(status);
    return (
        <div
            className="bg-secondary rounded-circle position-relative avatar avatar-with-status"
            style={{backgroundImage: `url(${avatarUrl ? avatarUrl : ""})`}}>
            {
                avatarUrl ? null : <span>{alt.charAt(0).toUpperCase()}</span>
            }
            <div className={statusClasses}/>
        </div>
    )
}

export const AvatarGroup: React.FC<IAvatarGroup> = ({avatarUrl, avatarUrlMember, _id, alt,altMember, status,}) => {
    return (
        <div
            className="bg-secondary rounded-circle position-relative avatar"
            style={{backgroundImage: `url(${avatarUrl ? avatarUrl : ""})`}}>
            {
                avatarUrl ? null : <span>{alt.charAt(0).toUpperCase()}</span>
            }
            <div
                className="bg-secondary position-absolute avatar-member rounded-circle"
                style={{backgroundImage: `url(${avatarUrlMember ? avatarUrlMember : ""})`}}>
                {
                    avatarUrlMember ? null : <span>{altMember.charAt(0).toUpperCase()}</span>
                }
            </div>
        </div>
    )
}


