import styled from 'styled-components';

const Figure = styled.figure`
  background-color: ${({ src }) => (src === '' ? '#dedede' : null)};
  border-radius: 50%;

  > div {
    width: ${({ width }) => `${width / 10}rem`};
    height: ${({ height }) => `${height / 10}rem`};
  }
`;

export { Figure };
