import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Avatar from '../ui/display/Avatar/Avatar';
import Input from '../ui/inputs/Input/Input';
import { Button } from '../ui/inputs/Button/styled';
import { Divider } from '../ui/display/Divider/styled';

import {
  SearchForm,
  SearchButton,
  ControlsWrapper,
  PreviewWrapper,
  Username,
  WarningMessage,
} from './styled';

const Preview = ({
  showModal,
  addFriendHandler,
  cleanErrors,
  currentPage,
  error,
  status,
}) => {
  const [foundUser, setFoundUser] = useState({});
  const [username, setUsername] = useState('');

  const { query } = useRouter();
  const { id: userId } = query;

  useEffect(() => {
    if (!error && status === 'pending') {
      showModal();
    }
  }, [showModal, error, status]);

  const fetchData = (event) => {
    event.preventDefault();

    const getUser = async () => {
      const response = await fetch(`https://api.github.com/users/${username}`);

      if (!response.ok) {
        console.log('User not found');
        return;
      }

      const { name, id, login, location } = await response.json();

      const data = {
        name: name ? name : login,
        githubId: id.toString(),
        avatar: `https://github.com/${username}.png`,
        location,
      };

      setFoundUser(data);
      cleanErrors();
    };

    try {
      if (username.trim() !== '') {
        getUser();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancelFriendAddHandler = (event) => {
    event.stopPropagation();
    setFoundUser({});
  };

  const onAddFriend = () => {
    addFriendHandler({
      content: 'friends',
      queryParams: {
        userId,
        page: currentPage,
      },
      body: foundUser,
    });
  };

  return (
    <>
      {Object.keys(foundUser).length !== 0 ? (
        <>
          <PreviewWrapper>
            <Avatar
              src={`https://github.com/${username}.png`}
              height="100"
              width="100"
            />
            <Username>{foundUser.name}</Username>

            {error && <WarningMessage>{error.message}</WarningMessage>}
          </PreviewWrapper>
          <Divider />
          <ControlsWrapper>
            <Button outline type="button" onClick={cancelFriendAddHandler}>
              Cancelar
            </Button>
            <Button disabled={error} onClick={onAddFriend}>
              Adicionar
            </Button>
          </ControlsWrapper>
        </>
      ) : (
        <SearchForm onSubmit={fetchData}>
          <Input
            label="Pesquisar contato"
            placeholder="nome de usuário do github"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <SearchButton disabled={!username.length > 0}>Pesquisar</SearchButton>
        </SearchForm>
      )}
    </>
  );
};

export default Preview;
