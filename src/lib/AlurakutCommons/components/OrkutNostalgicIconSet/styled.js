import styled from 'styled-components';

import { List, ListItem } from '../../../../components/ui/display/List/styled';

export const OrkutNostalgicIconSetList = styled(List)`
  display: flex;
  margin-top: 1.5rem;
`;

export const OrkutNostalgicIconSetItem = styled(ListItem)`
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;

  > a {
    width: 60px;

    > div {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }
`;

export const Header = styled.h2`
  margin-top: 3rem;
  font-size: 2rem;
`;

export const IconWrapper = styled.div`
  width: 15px;
  height: 15px;
`;
