import styled from 'styled-components';

export const List = styled.ul`
  list-style: none;
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  margin-top: 8px;
  padding: 8px;
  background-color: var(--backgroundPrimary);

  > div {
    margin-right: 12px;
  }

  .userScrap {
    width: 100%;
    > p {
      font-size: 16px;
    }
  }

  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    > h3 {
      font-size: 16px;
      margin-bottom: 8px;
    }
    > svg {
      font-size: 20px;
    }
  }
`;

export const ScrapListWrapper = styled.section`
  margin-top: 8px;

  > div {
    margin-bottom: 8px;
  }
`;
