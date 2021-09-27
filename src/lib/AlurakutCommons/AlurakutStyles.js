import { css } from 'styled-components';

export const AlurakutStyles = css`
  :root {
    --backgroundPrimary: #d9e6f6;
    --backgroundSecondary: #f1f9fe;
    --backgroundTertiary: #ffffff;
    --backgroundQuarternary: #bbcde8;
    --colorPrimary: #2e7bb4;
    --colorSecondary: #388bb0;
    --colorTertiary: #2f4a71;
    --colorQuarternary: #d81d99;
    --textPrimaryColor: #333333;
    --textSecondaryColor: #ffffff;
    --textTertiaryColor: #5a5a5a;
    --textQuarternaryColor: #c5c6ca;
    --commonRadius: 8px;
  }
  /* *::-webkit-scrollbar {
    width: 8px;
  }
  *::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  *::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }
  *::-webkit-scrollbar-thumb:hover {
    background: #555;
  } */
  a,
  button {
    cursor: pointer;
    transition: 0.3s;
    outline: 0;
    &:hover,
    &:focus {
      opacity: 0.8;
    }
    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
  /* input {
    transition: 0.3s;
    outline: 0;
    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
    &:hover,
    &:focus {
      box-shadow: 0px 0px 5px #33333357;
    } */
  }
`;
