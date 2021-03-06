import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

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
  rootPath,
}) => {
  const [foundUser, setFoundUser] = useState({});
  const [username, setUsername] = useState('');

  const { query } = useRouter();
  const { userId } = query;

  useEffect(() => {
    if (error) {
      setFoundUser({});
    }
  }, [error]);

  useEffect(() => {
    if (!error && status === 'completed') {
      showModal();
    }
  }, [error, status, showModal]);

  const fetchData = async (event) => {
    event.preventDefault();
    if (username.trim() !== '') {
      try {
        const { data: responseData } = await axios.get(
          `https://api.github.com/users/${username}`
        );

        const { name, id, login, bio } = responseData;

        const foundUser = {
          name: name ? name : login,
          githubId: id.toString(),
          avatar: `https://github.com/${username}.png`,
          statusMessage: bio,
        };

        setFoundUser(foundUser);
        cleanErrors();
      } catch (error) {
        setFoundUser({ error: true });
      }
    }
  };

  const cancelFriendAddHandler = (event) => {
    event.stopPropagation();
    setFoundUser({});
  };

  const onAddFriend = () => {
    addFriendHandler({
      content: rootPath,
      queryParams: {
        userId,
        page: currentPage,
      },
      body: foundUser,
    });
  };

  return (
    <>
      {Object.keys(foundUser).length !== 0 && !foundUser.error ? (
        <>
          <PreviewWrapper>
            <Avatar src={foundUser.avatar} height="100" width="100" />
            <Username>{foundUser.name}</Username>
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
            placeholder="nome de usu??rio do github"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          {foundUser.error && <WarningMessage>User not found</WarningMessage>}
          <SearchButton disabled={!username.length > 0}>Pesquisar</SearchButton>
        </SearchForm>
      )}
    </>
  );
};

export default Preview;
