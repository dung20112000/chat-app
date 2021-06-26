import {FormikHelpers, useFormik} from 'formik';
import {Row, Col} from 'react-bootstrap';
import {FocusEvent, FormEvent, useRef} from 'react';
import {emitMessage} from '../../../../../server-interaction/socket-handle/socket-chat';
import {IUserInfosReducer} from '../../../../../@types/redux';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../../redux/reducers/RootReducer.reducer.redux';
import {useParams} from 'react-router-dom';
import shortid from 'shortid';
import React from 'react';
import {updateLastMessage} from '../../../../../redux/actions/last-message.actions.redux';

interface IFormValues {
    message: string;
}

interface IParams {
    conversationsId: string;
}

const ChatAreaInput: React.FC<any> = ({pushMessage}) => {
    const {conversationsId} = useParams<IParams>();
    const dispatch = useDispatch();
    const userInfosStateRedux: IUserInfosReducer = useSelector(
        (state: RootState) => {
            return state.userInfos;
        }
    );
    const socketStateRedux: any = useSelector((state: RootState) => {
        return state.socket;
    });
    const {
        _id,
        personalInfos: {firstName, lastName, avatarUrl},
    } = userInfosStateRedux;
    const messageInputRef = useRef(null);
    const textAreaRef = useRef(null);
    const initialValues = {
        message: '',
    };
    const onSubmit = (
        values: IFormValues,
        action: FormikHelpers<IFormValues>
    ) => {
        const sender = {
            _id,
            personalInfos: {firstName, lastName, avatarUrl},
        };
        const updatedAt = new Date().toISOString();
        const createdAt = updatedAt;
        if (
            values.message &&
            socketStateRedux &&
            userInfosStateRedux &&
            conversationsId
        ) {
            emitMessage(
                socketStateRedux,
                conversationsId,
                sender,
                values.message,
                (response: any) => {
                }
            );
        }
        const pushObj = {
            _id: shortid.generate(),
            sender: sender,
            message: values.message,
            updatedAt,
            createdAt,
        };
        action.resetForm();
        pushMessage(pushObj);
        dispatch(updateLastMessage({...pushObj, conversationsId}));
    };

    const formik = useFormik({initialValues, onSubmit});
    const {values, handleSubmit, handleChange, handleBlur} = formik;
    const onFocus = (event: FocusEvent) => {
        // @ts-ignore
        messageInputRef.current.classList.add('border-blue');
    };
    const onBlur = (event: FocusEvent) => {
        handleBlur(event);
        // @ts-ignore
        messageInputRef.current.classList.remove('border-blue');
    };
    const onInput = (event: FormEvent<HTMLInputElement>) => {
        // @ts-ignore
        event.currentTarget.style.height = 'auto';
        // @ts-ignore
        event.currentTarget.style.height = event.currentTarget.scrollHeight + 'px';
    };
    return (
        <Row className="chat-area-input">
            <Col xs={12}>
                <form
                    onSubmit={handleSubmit}
                    className="d-flex align-items-center justify-content-between"
                >
                    <div
                        className="message-input pl-3 rounded-1rem d-flex justify-content-between"
                        ref={messageInputRef}
                    >
                        <div className="w-100 mt-2 pt-1">
                            <input
                                autoComplete="off"
                                ref={textAreaRef}
                                name="message"
                                value={values.message}
                                onChange={handleChange}
                                onBlur={onBlur}
                                onInput={onInput}
                                onFocus={onFocus}
                                placeholder="Enter your message here"
                            />
                        </div>
                        <div className="message-button pr-3">
                            <button
                                type="submit"
                                className="btn btn-lg rounded-circle"
                            >
                                <i style={{color: "#76c00d"}} className="fas fa-paper-plane"/>
                            </button>
                        </div>
                    </div>
                </form>
            </Col>
        </Row>
    );
};
export default React.memo(ChatAreaInput);
