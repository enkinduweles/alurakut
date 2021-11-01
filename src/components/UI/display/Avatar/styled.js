import styled from 'styled-components';

const Figure = styled.figure`
  background-color: ${({ src }) => (src === '' ? '#dedede' : null)};

  > div {
    width: ${({ width }) => `${width / 10}rem`};
    height: ${({ height }) => `${height / 10}rem`};
  }

  img {
    border-radius: ${({ round }) => (round ? '50%' : '0')};
  }
`;

export { Figure };
