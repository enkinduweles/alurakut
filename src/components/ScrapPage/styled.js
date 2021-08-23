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
      }

      button {
        align-self: flex-end;
      }
    }
  }
`;
