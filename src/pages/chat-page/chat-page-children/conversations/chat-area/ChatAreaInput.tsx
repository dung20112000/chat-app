import {FormikHelpers, useFormik} from "formik";
import {Row, Col} from "react-bootstrap";
import {FocusEvent, FormEventHandler, FormEvent, useRef} from "react";

interface IFormValues {
    message: string,
}

const ChatAreaInput = () => {
    const messageInputRef = useRef(null)
    const textAreaRef = useRef(null)
    const initialValues = {
        message: "",
    }
    const onSubmit = (values: IFormValues, action: FormikHelpers<IFormValues>) => {

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
                    <div className="message-input py-3 pl-3 rounded-1rem" ref={messageInputRef}>
                        <textarea ref={textAreaRef}
                                  name="message"
                                  value={values.message}
                                  onChange={handleChange}
                                  onBlur={onBlur}
                                  onInput={onInput}
                                  onFocus={onFocus}
                                  placeholder="Enter your message here"/>
                    </div>
                    <div>
                        <button className="btn btn-primary btn-lg rounded-circle"><i className="fas fa-paper-plane"/>
                        </button>
                    </div>
                </form>
            </Col>
        </Row>
    )
}
export default ChatAreaInput;