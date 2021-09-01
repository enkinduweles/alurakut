import { memo } from 'react';
import styled from 'styled-components';
import Box from '../Box/Box';

export const ProfileGridItem = memo(styled.div`
  display: ${({ templateArea }) =>
    templateArea === 'profileArea' ? 'none' : 'block'};
  @media (min-width: 860px) {
    grid-area: ${({ templateArea }) => templateArea};
    display: block;
  }
`);

export const Profile = styled(Box)`

  header {
    border-bottom: 1px solid purple;
    margin-bottom: 16px;
  }

  article {
    > div {
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
}
  }
  
  

  .profileHeaderContainer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 8px;
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
        align-items: flex-start;
        flex-direction: column;
        /* justify-content: */
        padding: 8px 8px;

        label {
          margin-bottom: 8px;
          font-weight:bold;
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
          width: auto;
          margin: 0;
          padding: 8px;
          background-color: transparent !important;
          border-bottom: 2px solid #565857;
          border-radius: 0;
          color: black;
          box-shadow: none;

          &:hover, &:focus{
            border-bottom: 2px solid #F14D89;
            
          }
        }
      }

      div:not(.formControls):nth-child(odd) {
        background-color: var(--backgroundPrimary);
      }
      div:not(.formControls):nth-child(even) {
        background-color: var(--backgroundSecondary);
      }

      .formControls {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        gap: 8px;

        button:first-child {
          background-color: transparent;
          color: black
        }
      }
    }
    
  }
`;
