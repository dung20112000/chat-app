import { Col, Modal, Row } from "react-bootstrap"
import { useFormik } from 'formik';
import React, { MouseEvent, useEffect, useRef, useState } from "react";
import { IUserFriendsList } from "../../../../../@types/redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/reducers/RootReducer.reducer.redux";
import { Avatar } from "../../../../../common-components/avatar.common";
import "./scss/rightsidechatpage.scss"

interface IConversationBlockCommon {
    avatarUrl: string,
    friendName: string,
    active?: boolean,
    _id: string,
    conversationsId: string | null

}

const ContactsCommon: React.FC<IConversationBlockCommon> = ({ conversationsId, avatarUrl, friendName, _id }) => {
    const areaRef = useRef(null)
    const conversationDetailRedux = useSelector((state: RootState) => state.conversationDetail)
    const formik = useFormik({
        initialValues: {
            check: false,
        },
        onSubmit: values => {

        },
    });
    const { _id: id } = conversationDetailRedux
    const onMouseOverArea = (event: MouseEvent) => {
        if (areaRef.current) {
            //@ts-ignore
            areaRef.current.classList.add("hover")
            //@ts-ignore
            areaRef.current.classList.add("bg-contact-item")
        }
    }
    const onMouseOutArea = (event: MouseEvent) => {
        if (areaRef.current) {
            //@ts-ignore
            areaRef.current.classList.remove("hover")
            //@ts-ignore
            areaRef.current.classList.remove("bg-contact-item")
        }
    }
    return (
        <label className="w-100">
            <div ref={areaRef} onMouseOver={onMouseOverArea} onMouseOut={onMouseOutArea}
                className="d-flex friend-row-modal pl-5 py-3 rounded-1rem align-items-center w-100">
                <div className="checkbox-input text-center mr-4">
                    {
                        conversationsId === id ? (
                            <input
                                name="firstName"
                                type="checkbox"
                                onChange={formik.handleChange}
                                checked
                                disabled
                            />
                        ) : (
                            <input
                                name="firstName"
                                type="checkbox"
                                onChange={formik.handleChange}
                            />
                        )
                    }
                </div>
                <div className="d-flex align-items-center w-100 ml-3">
                    <div className="mr-3" style={{ width: "10%" }}>
                        <Avatar avatarUrl={avatarUrl} alt={friendName} />
                    </div>
                    <div className="">
                        <div>
                            <h5 className="mb-0" style={{ fontSize: "1.5rem" }}>{friendName}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </label>
    )
}
interface IPropsSearch {
    handleChange: (searchValue: string) => void
}
const Search = (props: IPropsSearch) => {
    const onSearchChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const target = evt.target;
        const value = target.value;
        props.handleChange(value)
    }
    return (
        <Col xs={12}>
            <form>
                <div className="form__div">
                    <input
                        name="searchValues"
                        type="text"
                        onChange={onSearchChange}
                        placeholder=" "
                        className="form__input"
                    />
                    <label htmlFor="" className="form__label">
                        Search friend by name or phone number
                    </label>
                </div>
            </form>
        </Col>
    )
}
interface ILeftSideDeleteFriendModal {
    show: boolean,
    handleClose: any,
    members: number,
}

const RightSideChatDetailModal = ({ show, handleClose, members }: ILeftSideDeleteFriendModal) => {
    const [showListFriend, setShowListFriend] = useState<IUserFriendsList[]>([])
    const friendsListRedux: IUserFriendsList[] = useSelector((state: RootState) => state.friendsList)

    useEffect(() => {
        setShowListFriend(friendsListRedux)
    }, [friendsListRedux])

    const handleSearch = (searchValues: string) => {
        if (!searchValues) {
            setShowListFriend(friendsListRedux)
        }
        const result = friendsListRedux.filter(friend => {
            const { email, personalInfos: { firstName, lastName } } = friend;
            const fullName = `${firstName} ${lastName}`;
            return email.includes(searchValues) ||
                firstName.includes(searchValues) ||
                lastName.includes(searchValues) ||
                fullName.includes(searchValues)
        })
        setShowListFriend(result)
    }
    return (
        <div>
            <Modal show={show}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add members
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="pt-0" style={{ height: "75vh" }}
                >
                    <Row className="pt-4 pb-3">
                        <Col xs={12}>
                            <h4>Invited friends to thís chat conversation ({members + 1} members)</h4>
                        </Col>
                    </Row>
                    <Row className="mb-3 search-area-input">
                        <Search handleChange={handleSearch} />
                        <Col xs={12} className="pt-2">
                            <i style={{ fontSize: "1.2rem" }}>You can add multiple members by pasting list of phone number
                                here</i>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} className="pt-2">
                            {
                                friendsListRedux && friendsListRedux.length > 0 ? (
                                    <h4>Friend List {`(${friendsListRedux.length}/50)`}</h4>
                                ) : <h4>Friend List {`(0/50)`}</h4>
                            }
                        </Col>
                        <Col xs={12}>
                            <form className="overflow-auto friend-list-add">
                                {
                                    showListFriend && showListFriend.length > 0 ?
                                        showListFriend.map((item, index: number) => {
                                            const { conversationsId, personalInfos: { firstName, lastName, avatarUrl }, _id } = item;
                                            return (
                                                <ContactsCommon key={_id} friendName={`${firstName} ${lastName}`}
                                                    _id={_id} conversationsId={conversationsId}
                                                    avatarUrl={avatarUrl} />
                                            )
                                        }) : null
                                }
                            </form>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-danger" onClick={handleClose}>
                        Cancel
                    </button>
                    <button className="btn btn-primary" form="form-edit-infos" type="submit">
                        Add
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default RightSideChatDetailModal;