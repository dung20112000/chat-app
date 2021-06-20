import moment from "moment";
import React, {useCallback, useEffect, useRef} from "react";
import {Col} from "react-bootstrap";

interface IPropsTimeDistanceCommon {
    lastMessageTime: string,
}

const TimeDistanceCommon: React.FC<IPropsTimeDistanceCommon> = ({lastMessageTime}) => {
    const showRefTime = useRef(null);
    const getDateTime = useCallback(() => {
        const today = new Date();
        return [today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear(), today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()]
    },[]);
    const makeRound = useCallback((val:number)=> Math.floor(val),[])
    const convertSeconds = useCallback((seconds:number) => {
        return (
                    makeRound(seconds / 3600) > 24 ? (
                       `${makeRound(seconds / 86400)}d`
                    ) : makeRound(seconds / 3600) !== 0 ? (
                        ` ${makeRound(seconds / 3600)}h`
                    ) : makeRound(seconds / 60) !== 0 ? (
                       `${makeRound(seconds / 60)}m`
                    ) : (
                        "just now"
                    )
    )

    },[makeRound])
    useEffect(() => {
        const lastTime = new Date(lastMessageTime).toLocaleString("vi-vn").split(",").reverse();
        let seconds = (moment(getDateTime(), "DD/MM/YYYY HH:mm:ss").diff(moment(lastTime, "DD/MM/YYYY HH:mm:ss"), "seconds"))
        let timeLoop:number = 30*1000;
        if (makeRound(seconds/3600) > 24) {
            timeLoop = 86400*1000
        } else if (makeRound(seconds/3600) > 0) {
            timeLoop = 3600*1000
        } else if (makeRound(seconds/60) > 0) {
            timeLoop = 60 * 1000
        } else {
            timeLoop = 30 * 1000
        }
        //@ts-ignore
        showRefTime.current.innerHTML = convertSeconds(seconds);
        const interval = setInterval(() => {
            // @ts-ignore
            showRefTime.current.innerHTML = convertSeconds(seconds);
            seconds += timeLoop/1000
            console.log(seconds)
        },timeLoop);
        return ()=> {
            if(interval){
                clearInterval(interval);
            }
        }
    },[lastMessageTime,convertSeconds,getDateTime,makeRound])
    return (
        <Col ref={showRefTime} xs={3} className="text-right pt-2 pl-0 text-muted">

        </Col>
    )
}
export default TimeDistanceCommon;