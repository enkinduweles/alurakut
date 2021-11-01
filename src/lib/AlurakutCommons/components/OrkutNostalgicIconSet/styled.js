import styled, { css } from 'styled-components';

const listItemStyle = css`
  li {
    font-size: 1.4rem;
    color: #5a5a5a;
    display: flex;
    flex-direction: column;

    .OrkutNostalgicIconSet__title {
      display: block;
      font-style: italic;
    }
    .OrkutNostalgicIconSet__number {
      min-width: 15px;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .OrkutNostalgicIconSet__iconComplex {
        position: relative;

        min-width: 1.5rem;
        min-height: 1.5rem;
        margin-right: 5px;
      }

      .OrkutNostalgicIconSet__iconSample {
        position: relative;

        min-width: 1.5rem;
        min-height: 1.5rem;
        margin-right: 7px;
      }
    }
  }
`;

export const OrkutNostalgicIconSetList = styled.ul`
  list-style: none;
  display: flex;
  gap: 20px;

  ${listItemStyle}
`;

export const PersonalityIconSet = styled.ul`
  display: flex;
  gap: 20px;
  cursor: pointer;
  ${listItemStyle}
`;

export const IconsSetContainer = styled.div`
  margin-top: 3.2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;

  @media (min-width: 860px) {
    justify-content: initial;
  }
`;
