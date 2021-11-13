import styled, { css } from 'styled-components';

const dimensions = css`
  width: ${({ width }) => (width ? `${width / 10}rem` : '100%')};
  height: ${({ height }) => (height ? `${height / 10}rem` : 'inherit')};
`;

const WrapperImage = styled.figure`
  background-color: ${({ src }) => (src === '' ? '#dedede' : null)};
  position: relative;
  min-height: inherit;
  ${dimensions};

  img {
    border-radius: ${({ round }) => (round ? '50%' : '0')};
  }
`;

export { WrapperImage };
