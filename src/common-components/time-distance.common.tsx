import moment from "moment";
import React from "react";

interface IPropsTimeDistanceCommon {
    lastMessageTime: string,
}
const TimeDistanceCommon:React.FC<IPropsTimeDistanceCommon> = ({lastMessageTime}) => {
    const lastTime = new Date(lastMessageTime).toLocaleString("vi-vn").split(",").reverse()
    const today = new Date();
    const date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = [date, time]
    const timeDistance = moment.utc(moment(dateTime, "DD/MM/YYYY HH:mm:ss").diff(moment(lastTime, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")
    const dayDistance = (moment(dateTime, "DD/MM/YYYY").diff(moment(lastTime, "DD/MM/YYYY"),"days"))
    const seconds = (moment(dateTime, "DD/MM/YYYY HH:mm:ss").diff(moment(lastTime, "DD/MM/YYYY HH:mm:ss"),"seconds"))
    return (
        <div className="h-100">
            {
                Math.floor(seconds/3600) > 24 ? (
                    <span className="text-muted">{dayDistance} {`day${dayDistance > 1 ? "s": ""}`}</span>
                ) : +timeDistance.split(":")[0] !== 0 ? (
                    <span className="text-muted">{+timeDistance.split(":")[0]} {`hour${+timeDistance.split(":")[0] > 1 ? "s" : ""}`}</span>
                ) : +timeDistance.split(":")[1] !== 0 ? (
                    <span className="text-muted">{+timeDistance.split(":")[1]} {`minute${+timeDistance.split(":")[1] > 1 ? "s" : ""}`}</span>
                ) : (
                    <span className="text-muted">{+timeDistance.split(":")[2]} {`second${+timeDistance.split(":")[2] > 1 ? "s" : ""}`}</span>
                )
            }
        </div>
    )
}
export default TimeDistanceCommon;