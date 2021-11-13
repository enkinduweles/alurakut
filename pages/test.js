import React from 'react';
import styled from 'styled-components';
import NextImage from 'next/image';

const Main = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MyContainer = styled.div`
  width: 150px;
  height: 150px;
  position: relative;
`;

const Test = () => {
  return (
    <Main>
      <MyContainer>
        <NextImage src="https://github.com/enkinduweles.png" layout="fill" />
      </MyContainer>
    </Main>
  );
};

export default Test;
