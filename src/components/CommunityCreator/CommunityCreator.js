import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { MdFileUpload } from 'react-icons/md';

import Avatar from '../ui/display/Avatar/Avatar';
import Input from '../ui/inputs/Input/Input';
import { Button } from '../ui/inputs/Button/styled';
import { Divider } from '../ui/display/Divider/styled';
import Spinner from '../Spinner/Spinner';

import {
  PreviewPickedImage,
  CreateCommunity,
  FileInputWrapper,
  RegisterCommunityForm,
  ControlsWrapper,
  PreviewWrapper,
  Username,
  WarningMessage,
} from './styled';

const CommunityCreator = ({
  showModal,
  onCreateCommunity,
  cleanErrors,
  currentPage,
  error,
  status,
}) => {
  const [foundCommunity, setFoundCommunity] = useState({});
  const [communityName, setCommunityName] = useState('');
  const [communityDescription, setCommunityDescription] = useState('');
  const [uploadedImage, setUploadedImage] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { query } = useRouter();
  const { userCommunities, id: userId } = query;
  console.log(query);
  // useEffect(() => {
  //   if (!error && status === 'pending') {
  //     showModal();
  //   }
  // }, [showModal, error, status]);

  const createCommunityHandler = () => {
    const community = {
      name: communityName,
      description: communityDescription,
      thumbnail: uploadedImage.id,
      githubId: userId,
      author: userCommunities,
      member: 1,
    };

    onCreateCommunity({
      content: 'communities',
      queryParams: { userId, limitBy: 6 },
    });
  };

  const cancelCommunityHandler = (event) => {
    event.stopPropagation();
    setFoundCommunity({});
  };

  const addCommunityHandler = async () => {
    await onCreateCommunity({
      content: 'communities',
      queryParams: {
        userId,
        limitBy: 6,
        page: currentPage,
      },
      body: foundCommunity,
    });
  };

  const pickUpImage = async (event) => {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append('file', file);

    setIsLoading(true);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Something went wrong, upload failed!');
      }

      const {
        data: { url, id },
      } = await response.json();

      setUploadedImage({ id, url });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setUploadedImage('');
    }
  };

  return (
    <>
      {Object.keys(foundCommunity).length !== 0 ? (
        <>
          <PreviewWrapper>
            <Avatar
              src={`https://github.com/${communityName}.png`}
              height="100"
              width="100"
            />
            <Username>{foundCommunity.name}</Username>

            {error && <WarningMessage>{error.message}</WarningMessage>}
          </PreviewWrapper>
          <Divider />
          <ControlsWrapper>
            <Button outline type="button" onClick={cancelCommunityHandler}>
              Cancelar
            </Button>
            <Button disabled={error} onClick={addCommunityHandler}>
              Adicionar
            </Button>
          </ControlsWrapper>
        </>
      ) : (
        <RegisterCommunityForm onSubmit={createCommunityHandler}>
          <PreviewPickedImage hasImage={uploadedImage}>
            {isLoading ? (
              <Spinner />
            ) : (
              <FileInputWrapper htmlFor="fileInput">
                Selecionar arquivo
                <MdFileUpload />
                <input type="file" id="fileInput" onChange={pickUpImage} />
              </FileInputWrapper>
            )}
            {Object.keys(uploadedImage).length !== 0 && (
              <Avatar src={uploadedImage.url} layout="fill" />
            )}
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
      )}
    </>
  );
};

export default CommunityCreator;
