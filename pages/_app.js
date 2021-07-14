import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { AlurakutStyles } from '../src/lib/AlurakutCommons';

const GlobalStyle = createGlobalStyle`

* {
  margin: 0;
    padding: 0;
    box-sizing: border-box;
}

  body {
    font-family: sans-serif;
    background-color: #D9E6F6;
  }

  #__next {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }


  ${AlurakutStyles}
`;

const theme = {
  aluraImmersion: {
    mainBackground: 'linearGradient(180deg,#02192F .13%,#010505 88.51%)',
    secondaryBackground: '#021026',
  },
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
