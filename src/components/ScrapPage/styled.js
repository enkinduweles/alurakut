import { memo } from 'react';
import styled from 'styled-components';

import { Box } from '../Box/Box';

export const ScrapGridItem = memo(styled.div`
  display: ${({ templateArea }) =>
    templateArea === 'profileArea' ? 'none' : 'block'};
  @media (min-width: 860px) {
    grid-area: ${({ templateArea }) => templateArea};
    display: block;
  }
`);

export const ScrapsWrapper = styled(Box)`
  padding: 12px;

  > div {
    display: flex;
    justify-content: center;
  }

  .noScrap {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    font-size: 20px;
    color: #f368e0;
    > svg {
      margin-right: 8px;
    }
  }
  .sectionForm {
    form {
      width: 100%;
      display: flex;
      flex-direction: column;
      textarea {
        width: 100%;
        font-size: 16px;
        padding: 8px;
        margin-bottom: 8px;
        resize: none;
        border: none;
        border-bottom: 2px solid black;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.4);
        outline: none;
      }

      button {
        align-self: flex-end;
      }
    }
  }
`;
