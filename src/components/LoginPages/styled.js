import styled, { css } from 'styled-components';

import { Box } from '../ui/layout/Box/styled';
import { Form } from '../ui/layout/Form/styled';

const flexConfig = css``;

export const PageWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const DescribeWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 26.3rem;
  padding: 1.6rem;
  height: 100%;

  > div {
    margin-bottom: 0;
  }

  @media (min-width: 860px) {
    min-height: 36rem;
  }
`;

export const LogoWrapper = styled.figure`
  position: relative;
  height: 100%;
  width: 100%;
  max-height: 4.5rem;
  margin-bottom: 3.6rem;
`;

export const MemberWrapper = styled.div`
  height: 100%;

  min-height: 26.3rem;
  background-color: transparent;
  display: flex;
  flex-direction: column;

  > div {
    padding: 1.6rem 5rem;
    background-color: var(--backgroundSecondary);
  }

  p {
    font-size: 1.4rem;
  }

  @media (min-width: 860px) {
    min-height: 36rem;
  }
`;

export const MemberLogin = styled(Box)`
  min-height: 22.4rem;
  /* padding: 1.6rem 5rem; */
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 860px) {
    min-height: 28.2rem;
  }
`;

export const Login = styled(Form)`
  display: flex;
  flex-direction: column;
  text-align: center;

  div {
    margin: 2.4rem 0 1.6rem 0;
  }

  button {
    padding: 1.2rem;
  }
`;

export const JoinUs = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  margin-bottom: 0;
  text-align: center;
`;

export const FooterWrapper = styled(Box)`
  background-color: var(--backgroundQuarternary);
  text-align: center;
`;

export const Typograph = styled.p`
  font-size: 1.2rem;
  line-height: 1.2;
  &:not(:last-child) {
    margin-bottom: 1.2rem;
  }
`;

export const Highlight = styled.strong`
  color: var(--colorQuarternary);
`;

const LoginPageMain = styled.main`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;

  .loginScreen {
    padding: 16px;
    max-width: 1110px;
    display: grid;
    --gap: 12px;
    --gutter: 16px;
    grid-gap: var(--gap);
    grid-template-areas:
      'logoArea'
      'formArea'
      'footerArea';
    @media (min-width: 860px) {
      grid-template-columns: 2fr 1fr;
      grid-template-areas:
        'logoArea formArea'
        'logoArea formArea'
        'footerArea footerArea';
    }
    .logoArea {
      grid-area: logoArea;
      background-color: var(--backgroundTertiary);
      border-radius: var(--commonRadius);
      padding: var(--gutter);
      text-align: center;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      min-height: 263px;
      @media (min-width: 860px) {
        min-height: 368px;
      }
      p {
        font-size: 12px;
        line-height: 1.2;
        &:not(:last-child) {
          margin-bottom: 12px;
        }
        strong {
          color: var(--colorQuarternary);
        }
      }
      .nextImage {
        position: relative;
        height: 100%;
        width: 100%;
        max-height: 45px;
        margin-bottom: 36px;
      }
    }
    .formArea {
      grid-area: formArea;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      .box {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: var(--gutter);
        padding-left: 50px;
        padding-right: 50px;
        background-color: var(--backgroundSecondary);
        border-radius: var(--commonRadius);
        flex: 1;
        &:not(:last-child) {
          margin-bottom: var(--gap);
        }
        &:first-child {
          min-height: 224px;
          @media (min-width: 860px) {
            min-height: 282px;
          }
        }
        p {
          font-size: 14px;
        }
        a {
          text-decoration: none;
          color: var(--colorPrimary);
        }

        > div {
          width: 100%;
          margin-top: 24px;
          margin-bottom: 16px;

          input {
            width: 100%;
            display: block;
            border: 1px solid var(--textQuarternaryColor);
            padding: 12px;
            background-color: var(--backgroundTertiary);
            border-radius: var(--commonRadius);
          }

          .inputFieldInvalid {
            background-color: #fab1a0;
          }

          span {
            margin-top: 8px;
            text-align: left;
            color: tomato;
            display: block;
          }
        }

        button {
          width: 100%;
          display: block;
          border: 0;
          padding: 12px;
          border-radius: var(--commonRadius);
          background-color: var(--colorPrimary);
          color: var(--textSecondaryColor);
        }
      }
    }
    .footerArea {
      grid-area: footerArea;
      background-color: var(--backgroundQuarternary);
      border-radius: var(--commonRadius);
      padding: 8px;
      p {
        font-size: 12px;
        text-align: center;
        a {
          text-decoration: none;
          color: var(--colorPrimary);
        }
      }
    }
  }
`;

export default LoginPageMain;
