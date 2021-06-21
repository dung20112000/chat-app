import {Avatar, AvatarWithStatus, IAvatar} from "./avatar.common";
import React, {useRef, useState} from "react";
import {callApi} from "../server-interaction/apis/api.services";
import {updateAvatarUser} from "../redux/actions/users.actions.redux";
import {useDispatch} from "react-redux";
import {axiosCloudinary} from "../server-interaction/apis/api-cloudinary.services";
import {Dropdown} from "react-bootstrap"
import "./scss/avatar-upload.common.scss";

interface IPropsAvatarUploadCommon extends IAvatar {

}

const AvatarUploadCommon: React.FC<IPropsAvatarUploadCommon> = ({avatarUrl, status, alt}) => {
    const dispatch = useDispatch();
    const [showDelete,setShowDelete] = useState(false);
    const [showViewImage,setShowViewImage] = useState(false);
    const fileInputRef = useRef(null);
    const postCloudinary = (formData: any) => {
        return axiosCloudinary.post("/", formData);
    };
    const putServer = (avatarUrl: string) => {
        return callApi("/users/avatar", "PUT", {
            avatarUrl: avatarUrl,
        });
    }

    const uploadFile = async (file: any) => {
        const formData = new FormData();
        formData.append("file", file[0]);
        formData.append("upload_preset", "upload-image-fpt");
        try {
            const cloudinaryResponse = await postCloudinary(formData);
            if (cloudinaryResponse.status === 200) {
                const {secure_url} = cloudinaryResponse.data;
                const responseServer = await putServer(secure_url);
                if (responseServer.status === 200 && responseServer.data.success) {
                    dispatch(updateAvatarUser(responseServer.data.avatarUrl));
                }
            }
        } catch (error) {
            if (error) {
                return Promise.reject(error);
            }
        }
    }
    const onOpenInputFile = () => {
        // @ts-ignore
        fileInputRef.current.click()
    }


    return (
        (<div>
            <div className="upload-image">
                <Dropdown className="py-0">
                    <Dropdown.Toggle as={"div"} id="dropdown-change-avatar">
                        {
                            status ? <AvatarWithStatus
                                avatarUrl={avatarUrl}
                                status={status} alt={alt}/> : <Avatar avatarUrl={avatarUrl} alt={alt}/>
                        }
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="1">View avatar</Dropdown.Item>
                        <Dropdown.Item as={"div"} eventKey="2" onClick={onOpenInputFile}>
                            <input ref={fileInputRef} type='file' id="imageUpload"
                                   accept=".png, .jpg, .jpeg" className="input-change-avatar d-none"
                                   onChange={(event) => uploadFile(event.target.files)}/>
                            Upload Avatar
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="3" className="bg-danger text-white">
                            <div>Remove avatar</div>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>)
    )
};

export default AvatarUploadCommon;