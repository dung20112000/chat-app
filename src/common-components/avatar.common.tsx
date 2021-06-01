import { EOnlineStatus } from "../@types/enums";
import React from "react";
import "./scss/avatar.common.scss";

interface IAvatar {
    avatarUrl: string;
    avatarUrlMember?: string;
    _id?: string;
    alt: string;
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
export const Avatar: React.FC<IAvatar> = ({ avatarUrl, _id, alt }) => {
    return (
        <div className="bg-secondary rounded-circle d-flex align-items-center justify-content-center position-relative avatar avatar-with-status"
            style={{ backgroundImage: `url(${avatarUrl ? avatarUrl : ""})` }}>
            {
                avatarUrl ? null : <span>{alt.charAt(0).toUpperCase()}</span>
            }
        </div>
    )
}

export const AvatarWithStatus: React.FC<IAvatar> = ({ avatarUrl, _id, alt, status }) => {
    let statusClasses = checkStatusClass(status);
    return (
        <div className="bg-secondary rounded-circle d-flex align-items-center justify-content-center position-relative avatar avatar-with-status"
            style={{ backgroundImage: `url(${avatarUrl ? avatarUrl : ""})` }}>
            {
                avatarUrl ? null : <span>{alt.charAt(0).toUpperCase()}</span>
            }
            <div className={statusClasses} />
        </div>
    )
}

export const AvatarGroup: React.FC<IAvatar> = ({ avatarUrl, avatarUrlMember, _id, alt, status, }) => {
    const statusClasses = checkStatusClass(status);
    return (
        <div className="rounded-circle position-relative avatar">
            <div className="bg-info position-absolute avatar avatar-key rounded-circle d-flex align-items-center justify-content-center text-dark"
                style={{ backgroundImage: `url(${avatarUrl ? avatarUrl : ""})` }}>
                {
                    avatarUrl ? null : <span>{alt.charAt(0).toUpperCase()}</span>
                }
            </div>
            <div className="bg-danger position-absolute avatar avatar-member rounded-circle d-flex align-items-center justify-content-center text-light"
                style={{ backgroundImage: `url(${avatarUrlMember ? avatarUrlMember : ""})` }}>
                {
                    avatarUrlMember ? null : <span>{alt.charAt(0).toUpperCase()}</span>
                }
            </div>
            <div className={statusClasses} />
        </div>
    )
}


