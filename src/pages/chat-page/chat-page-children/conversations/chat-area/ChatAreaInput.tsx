import {FormikHelpers, useFormik} from "formik";
import {Row, Col} from "react-bootstrap";
import {FocusEvent,FormEvent, useRef} from "react";
import {emitMessage} from "../../../../../server-interaction/socket-handle/socket-chat";
import {IUserInfosReducer} from "../../../../../@types/redux";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux/reducers/RootReducer.reducer.redux";
import {useParams} from "react-router-dom";
interface IFormValues {
    message: string,
}
interface IParams {
    conversationsId: string;
}
const ChatAreaInput = () => {
    const {conversationsId} = useParams<IParams>()
    const userInfosStateRedux: IUserInfosReducer = useSelector((state: RootState) => {
        return state.userInfos;
    });
    const socketStateRedux: any = useSelector((state: RootState) => {
        return state.socket
    });
    const messageInputRef = useRef(null)
    const textAreaRef = useRef(null)
    const initialValues = {
        message: "",
    }
    const onSubmit = (values: IFormValues, action: FormikHelpers<IFormValues>) => {
        if(values.message && socketStateRedux && userInfosStateRedux && conversationsId){
            emitMessage(socketStateRedux,conversationsId,userInfosStateRedux._id,values.message,(response:any)=>{
                console.log(response);
            })
        }
    }

    const formik = useFormik(
        {initialValues, onSubmit}
    )
    const {values, handleSubmit, handleChange, handleBlur} = formik;
    const onFocus = (event: FocusEvent) => {
        // @ts-ignore
        messageInputRef.current.classList.add("border-blue")
    }
    const onBlur = (event: FocusEvent) => {
        handleBlur(event);
        // @ts-ignore
        messageInputRef.current.classList.remove("border-blue")
    }
    const onInput = (event: FormEvent<HTMLTextAreaElement>) => {
        // @ts-ignore
        event.currentTarget.style.height = "auto";
        // @ts-ignore
        event.currentTarget.style.height = event.currentTarget.scrollHeight + "px"
    }
    return (
        <Row className="chat-area-input">
            <Col xs={12}>
                <form onSubmit={handleSubmit} className="d-flex align-items-center justify-content-between">
                    <div className="message-input py-3 pl-3 rounded-1rem d-flex justify-content-between" ref={messageInputRef}>
                        <textarea ref={textAreaRef}
                                  name="message"
                                  value={values.message}
                                  onChange={handleChange}
                                  onBlur={onBlur}
                                  onInput={onInput}
                                  onFocus={onFocus}
                                  placeholder="Enter your message here"/>
                        <div className="message-button pr-3">
                            <button type="submit" className="btn btn-primary btn-lg rounded-circle"><i className="fas fa-paper-plane"/>
                            </button>
                        </div>
                    </div>

                </form>
            </Col>
        </Row>
    )
}
export default ChatAreaInput;