import React, { useState, useEffect } from 'react';
import { MdFileUpload } from 'react-icons/md';
import axios from 'axios';

import NextImage from '../NextImage/NextImage';
import Input from '../ui/inputs/Input/Input';
import Spinner from '../Spinner/Spinner';

import {
  PreviewPickedImage,
  CreateCommunity,
  FileInputWrapper,
  RegisterCommunityForm,
} from './styled';

const CommunityCreator = ({
  showModal,
  onCreateCommunity,
  error,
  status,
  userName,
  userId,
  rootPath,
}) => {
  const [communityName, setCommunityName] = useState('');
  const [communityDescription, setCommunityDescription] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!error && status === 'completed') {
      showModal();
    }
  }, [showModal, error, status]);

  console.log(error);
  const createCommunityHandler = (event) => {
    event.preventDefault();

    const thumbnailValue = uploadedImage ? uploadedImage.id : null;

    const community = {
      name: communityName,
      description: communityDescription,
      thumbnail: { uploadId: thumbnailValue },
      userId,
      author: userName,
    };

    onCreateCommunity({
      content: rootPath,
      queryParams: { userId },
      body: community,
    });
  };

  const pickUpImage = async (event) => {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append('file', file);

    setIsLoading(true);

    try {
      const { data } = await axios.post('/api/upload', formData);
      const { upload } = data;

      setUploadedImage({ id: upload.id, url: upload.url });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setUploadedImage('');
    }
  };

  return (
    <RegisterCommunityForm onSubmit={createCommunityHandler}>
      <PreviewPickedImage hasImage={uploadedImage} isLoading={isLoading}>
        {isLoading ? (
          <Spinner />
        ) : (
          <FileInputWrapper htmlFor="fileInput" hasImage={uploadedImage}>
            {uploadedImage ? null : 'Selecionar arquivo'}
            <MdFileUpload />
            <input type="file" id="fileInput" onChange={pickUpImage} />
          </FileInputWrapper>
        )}
        {uploadedImage && <NextImage src={uploadedImage.url} />}
      </PreviewPickedImage>
      <Input
        label="Nome"
        placeholder="digite um nome para sua comunidade"
        type="text"
        value={communityName}
        onChange={(event) => setCommunityName(event.target.value)}
      />
      <Input
        label="Descrição"
        placeholder="digite uma descrição para sua comunidade"
        type="text"
        value={communityDescription}
        onChange={(event) => setCommunityDescription(event.target.value)}
      />

      <CreateCommunity
        disabled={
          communityName.length === 0 || communityDescription.length === 0
        }
      >
        Finalizar
      </CreateCommunity>
    </RegisterCommunityForm>
  );
};

export default CommunityCreator;
