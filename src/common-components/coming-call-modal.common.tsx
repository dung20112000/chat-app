import React from "react";
import {Button, Modal} from "react-bootstrap";
import qs from "querystring";
import {RootState} from "../redux/reducers/RootReducer.reducer.redux";
import {useSelector} from "react-redux";
import {openChatWindow} from "../server-interaction/peerjs/peer.services";

const ComingCallModalCommon:React.FC<any> = ({callerInfos,closeModalComing})=>{
    const userInfosStateRedux = useSelector((state:RootState) => state.userInfos);
    const onAcceptCall = ()=>{
        if(callerInfos){
            const paramsObj:any = {};
            paramsObj.peer0 = callerInfos._id;
            paramsObj.callerId = userInfosStateRedux._id;
            paramsObj.is_caller = false;
            paramsObj.video = true;
            paramsObj.audio = false;
            const queriesParams = qs.stringify(paramsObj);
            openChatWindow(queriesParams);
            closeModalComing()
        }
    }

    return (
        <Modal show={callerInfos} onHide={closeModalComing}>
            <Modal.Header closeButton>
                <Modal.Title>Calling</Modal.Title>
            </Modal.Header>
            <Modal.Body>{callerInfos? (callerInfos.personalInfos.firstName + callerInfos.personalInfos.lastName ): null} is calling you?</Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={closeModalComing}>
                    Decline
                </Button>
                <Button variant="primary" onClick={onAcceptCall}>
                    Accept
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default ComingCallModalCommon;