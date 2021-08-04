import styled from 'styled-components';
import { Box } from '../Box/Box';

export const Wrapper = styled.div`
  display: ${({ templateArea }) =>
    templateArea === 'profileArea' ? 'none' : 'block'};
  @media (min-width: 860px) {
    grid-area: ${({ templateArea }) => templateArea};
    display: block;
  }
`;

export const Profile = styled(Box)`

  header {
    border-bottom: 1px solid purple;
    margin-bottom: 16px;
  }

  .profileHeaderContainer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 8px;
    }

    article {
      text-align: center;
      .profileError {
        button {
          margin-top: 12px;
        }
      }
    }

    .userInfoForm {
      display: flex;
      flex-direction: column;
      justify-content: center;


      button {
        margin-top: 8px;
        align-self:flex-end;
       }

      div {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 8px 0;

        label {
          margin-right: 8px;
          width: 15%;
          text-align: left;
          color: rgba(0, 0, 0, 0.6);
        }

        .editMode {
          &:hover,
          &:focus {
            box-shadow: none;
          }
        }

        .viewMode:disabled {
          border-bottom: 0;
          cursor: default;
          
        }

        input {
          width: initial;
          margin: 0;
          padding: 8px 12px;
          background-color: transparent;
          border-bottom: 2px solid #70a1ff;
          border-radius: 0;
          color: black;
          box-shadow: none;
          
          &:hover, &:focus{
            border-bottom: 2px solid #5352ed;
            
          }
        }
      }

      div:nth-child(odd) {
        background-color: var(--backgroundPrimary);
      }
      div:nth-child(even) {
        background-color: var(--backgroundSecondary);
      }
    }
  }
`;
