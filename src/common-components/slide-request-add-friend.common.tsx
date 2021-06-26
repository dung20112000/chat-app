import React, {useState} from "react";
import RightSideModal from "../pages/chat-page/chat-page-children/conversations/right-side/RightSideModal";

interface ISlideRequestAddFriendCommon {
    imageUrl:string,
    text: string,
    maxWidth: string,
    hidden: boolean,
    description: string,
}
const SlideRequestAddFriendCommon:React.FC<ISlideRequestAddFriendCommon> = ({text,imageUrl,maxWidth,hidden,description}) => {
    const [showModal, setShowModal] = useState(false)
    const onModalShow = () => {
        setShowModal(true);
    };
    return (
        <div className="text-center">
            <img src={imageUrl} alt="Loading" style={{maxWidth:maxWidth}}/>
            <h2 className="w-75 mx-auto">You have no {text}</h2>
            {
                !hidden ? (
                    <div>
                        <p className="w-75 mx-auto">{description}</p>
                        <button type="button" className="btn btn-primary" onClick={onModalShow}>
                            Add Friend Now!
                        </button>
                    </div>
                ) : null
            }
            <RightSideModal show={showModal} onHide={() => setShowModal(false)} />
        </div>
    )
}
export default SlideRequestAddFriendCommon;