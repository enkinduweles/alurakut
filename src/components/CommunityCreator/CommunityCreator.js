import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { MdRemoveRedEye } from 'react-icons/md';
import { toast } from 'react-hot-toast';

import Input from '../ui/inputs/Input/Input';

import {
  PreviewPickedImage,
  CreateCommunity,
  FileInput,
  FileInputWrapper,
  RegisterCommunityForm,
  PreviewButton,
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
  const [urlImage, setUrlImage] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [showThumbnail, setShowThumbnail] = useState(false);

  useEffect(() => {
    if (!error && status === 'completed') {
      showModal();
    }
  }, [showModal, error, status]);

  console.log(error);
  const createCommunityHandler = async (event) => {
    event.preventDefault();

    let thumbnailId = null;
    if (thumbnail) {
      toast.loading('Loading...');
      const { data: responseData } = await axios.post('/api/upload', {
        thumbnail,
      });
      thumbnailId = responseData.upload.id;
    }

    toast.remove();

    const community = {
      name: communityName,
      description: communityDescription,
      thumbnail: thumbnailId ? { uploadId: thumbnailId } : null,
      userId,
      author: userName,
    };

    onCreateCommunity({
      content: rootPath,
      queryParams: { userId },
      body: community,
    });
  };

  const previewThumbnail = () => {
    setThumbnail(urlImage);
  };

  const imageURLChange = (event) => {
    event.preventDefault();
    const valueInput = event.target.value;

    if (valueInput.trim() !== '') {
      setUrlImage(event.target.value);
    }
  };

  return (
    <RegisterCommunityForm onSubmit={createCommunityHandler}>
      <PreviewPickedImage showImage={showThumbnail}>
        {!thumbnail && (
          <span>Coloque a URL da imagem e clique no botão de visualizar</span>
        )}
        {thumbnail && <img src={thumbnail} alt="" />}
      </PreviewPickedImage>

      <FileInputWrapper>
        <FileInput placeholder="Url da imagem" onChange={imageURLChange} />
        <PreviewButton type="button">
          <MdRemoveRedEye onClick={previewThumbnail} />
        </PreviewButton>
      </FileInputWrapper>
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
