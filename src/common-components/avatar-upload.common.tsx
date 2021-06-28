import { Avatar, AvatarWithStatus, IAvatar } from './avatar.common';
import React, { useRef, useState } from 'react';
import { callApi } from '../server-interaction/apis/api.services';
import { updateAvatarUser } from '../redux/actions/users.actions.redux';
import { useDispatch } from 'react-redux';
import { axiosCloudinary } from '../server-interaction/apis/api-cloudinary.services';
import { Button, Dropdown } from 'react-bootstrap';
import './scss/avatar-upload.common.scss';
import { Modal } from 'react-bootstrap';

interface IPropsAvatarUploadCommon extends IAvatar { }
const AvatarUploadCommon: React.FC<IPropsAvatarUploadCommon> = ({
  avatarUrl,
  status,
  alt,
}) => {
  const dispatch = useDispatch();
  const [showDelete, setShowDelete] = useState(false);
  const fileInputRef = useRef(null);
  const postCloudinary = (formData: any) => {
    return axiosCloudinary.post('/', formData);
  };
  const putServer = (avatarUrl: string) => {
    return callApi('/users/avatar', 'PUT', {
      avatarUrl: avatarUrl,
    });
  };

  const uploadFile = async (file: any) => {
    const formData = new FormData();
    formData.append('file', file[0]);
    formData.append('upload_preset', 'upload-image-fpt');
    try {
      const cloudinaryResponse = await postCloudinary(formData);
      if (cloudinaryResponse.status === 200) {
        const { secure_url } = cloudinaryResponse.data;
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
  };
  const onOpenInputFile = () => {
    // @ts-ignore
    fileInputRef.current.click();
  };
  const onOpenDeleteModal = () => {
    setShowDelete(true);
  };
  const onCloseDeleteModal = () => {
    setShowDelete(false);
  };
  const removeAvatar = async () => {
    if (!avatarUrl) {
      return;
    }
    const response = await putServer('');
    if (response.status === 200 && response.data.success) {
      dispatch(updateAvatarUser(response.data.avatarUrl));
      onCloseDeleteModal();
    }
  };
  return (
    <div>
      <div className="upload-image">
        <Dropdown className="py-0">
          <Dropdown.Toggle as={'div'} id="dropdown-change-avatar">
            {status ? (
              <AvatarWithStatus
                avatarUrl={avatarUrl}
                status={status}
                alt={alt}
              />
            ) : (
              <Avatar avatarUrl={avatarUrl} alt={alt} />
            )}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={'div'} eventKey="2" onClick={onOpenInputFile}>
              <input
                ref={fileInputRef}
                type="file"
                id="imageUpload"
                accept=".png, .jpg, .jpeg"
                className="input-change-avatar d-none"
                onChange={(event) => uploadFile(event.target.files)}
              />
              <i className="fas fa-cloud-upload-alt"></i>
              <span className="ml-2">Upload</span>
            </Dropdown.Item>
            {!avatarUrl ? null : (
              <Dropdown.Item
                eventKey="3"
                className="bg-danger text-white"
                onClick={onOpenDeleteModal}
              >
                <i className="fas fa-trash"></i>
                <span className="ml-2">Remove</span>
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <Modal show={showDelete} onHide={onCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Remove</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to remove avatar</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onCloseDeleteModal}>
            Close
          </Button>
          <Button variant="danger" onClick={removeAvatar}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default React.memo(AvatarUploadCommon);
