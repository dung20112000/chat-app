import React from "react";
import { Avatar } from './../../../../../../common-components/avatar.common';

export const ModalItemFriend = (props: any) => {
    const { id, personalInfos: { firstName, lastName, avatarUrl }, onChooseFriend, checked } = props;

    const onChoose = (event: any) => {
        const target = event.target;
        const value = target.value;
        target.checked ? onChooseFriend(value) : onChooseFriend(value)
    }

    return (
        <label htmlFor={id} className="d-block">
            <div className="d-flex friend-row-modal pl-5 py-3 rounded-1rem align-items-center w-100">
                <div className="checkbox-input text-center mr-4">
                    <input
                        name="firstName"
                        type="checkbox"
                        id={id}
                        value={id}
                        onChange={onChoose}
                        checked={checked}
                    />
                </div>
                <div className="d-flex align-items-center w-100 ml-3">
                    <div className="mr-3" style={{ width: "10%" }}>
                        <Avatar avatarUrl={avatarUrl} alt={`${firstName} ${lastName}`} />
                    </div>
                    <div className="">
                        <div>
                            <h5 className="mb-0" style={{ fontSize: "1.5rem" }}>
                                {`${firstName} ${lastName}`}
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        </label>
    )
}