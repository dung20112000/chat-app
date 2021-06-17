import React from "react";
const ChatAreaDialog = (props: any) => {
    const { message } = props.dialog;
    return (
        <div
            className={`chat__item ${props.me ? "me" : "other"}`}
        >
            <div className="chat__item__content">
                <div className="chat__msg">{message}</div>
                {/* <div className="chat__meta">
                    <span>16 mins ago</span>
                    <span>Seen 1.03PM</span>
                </div> */}
            </div>
        </div>
    )
}
export default React.memo(ChatAreaDialog, (prevProps, nextProps) => {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps);
});