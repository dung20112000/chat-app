import {toast,ToastOptions,ToastProps} from "react-toastify";
import {Button, Col, Row} from "react-bootstrap";

const options:ToastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}
// success notify
export const notifySuccess = (message: string) => {
    return toast.success(message,{
        toastId: "success",
        ...options
    })
}

// failed notify
export const notifyFailed = (message: string)=>{
    return toast.error(message,{
        toastId:"failed",
        ...options
    })
}

// friends Request notify
interface IRequestData {
    name: string;
    _id: string;
    avatarUrl: string;
}
export const notifyNewFriendRequest = (data:IRequestData, action:any) => {
    const {name,_id,avatarUrl} = data;
    const body = ({closeToast}:ToastProps) => {
        const onAcceptFriend = ()=>{
            action(_id);
            closeToast()
        }
        return (
            <div className="p-2">
                <Row>
                    <Col xs={12}>
                        <Row>
                            <Col xs={3}>
                                {/*<AvatarPure alt={name} src={avatarUrl}/>*/}
                            </Col>
                            <Col xs={9}>
                                <p className="m-0">
                                    <strong>{`${name}`}</strong> has send you a friend request?
                                </p>
                            </Col>
                        </Row>
                    </Col>
                    <Col  xs={12}>
                        <div className="mt-3 d-flex justify-content-around">
                            <Button variant="primary" onClick={onAcceptFriend}>Accept</Button>
                            <Button variant="outline-secondary" onClick={closeToast}>Later</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
    return toast(body,{
        toastId:"friendsRequest",
        ...options
    })
}