import axios from 'axios';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Input from '../src/components/ui/inputs/Input/Input';
import Link from '../src/components/ui/navigation/Link/Link';
import NextImage from '../src/components/NextImage/NextImage';
import { Button } from '../src/components/ui/inputs/Button/styled';
import { Grid, GridItem } from '../src/components/ui/layout/Grid/styled';

import { validateToken } from '../src/utils/auth';

import {
  DescribeWrapper,
  FooterWrapper,
  Highlight,
  JoinUs,
  Login,
  LogoWrapper,
  MemberLogin,
  MemberWrapper,
  PageWrapper,
  Typograph,
} from '../src/components/LoginPages/styled';

const LoginScreen = () => {
  const [userName, setUserName] = useState('');
  const router = useRouter();

  const submitLoginForm = async (event) => {
    event.preventDefault();

    const toastId = toast.loading('Loading...');

    try {
      await axios.post('/api/authentication', {
        userName,
      });

      toast.remove();
      router.push('/');
    } catch (error) {
      const { data: message } = error.response;

      toast.error(message, { id: toastId });
    }
  };

  return (
    <PageWrapper>
      <Grid type="login">
        <GridItem templateArea="logoArea" as="section">
          <DescribeWrapper>
            <LogoWrapper>
              <NextImage
                src="https://alurakut.vercel.app/logo.svg"
                alt="Logo"
                layout="fill"
                priority
              />
            </LogoWrapper>

            <Typograph>
              <Highlight>Conecte-se</Highlight> aos seus amigos e familiares
              usando recados e mensagens instantâneas
            </Typograph>
            <Typograph>
              <Highlight>Conheça</Highlight> novas pessoas através de amigos de
              seus amigos e comunidades
            </Typograph>
            <Typograph>
              <Highlight>Compartilhe</Highlight> seus vídeos, fotos e paixões em
              um só lugar
            </Typograph>
          </DescribeWrapper>
        </GridItem>

        <GridItem templateArea="mainArea" as="section">
          <MemberWrapper>
            <MemberLogin>
              <Login onSubmit={submitLoginForm}>
                <Typograph>
                  Acesse agora mesmo com seu usuário do{' '}
                  <Highlight>GitHub</Highlight>!
                </Typograph>

                <Input
                  placeholder="Usuário"
                  value={userName}
                  onChange={(evento) => {
                    setUserName(evento.target.value);
                  }}
                />
                <Button type="submit" disabled={userName.length === 0}>
                  Login
                </Button>
              </Login>
            </MemberLogin>

            <JoinUs>
              <Typograph>
                Ainda não é membro? <br />
                <Link href="/login">
                  <Highlight>ENTRAR JÁ</Highlight>
                </Link>
              </Typograph>
            </JoinUs>
          </MemberWrapper>
        </GridItem>

        <GridItem templateArea="footerArea" as="footer">
          <FooterWrapper>
            <Typograph>
              © 2021 alura.com.br - <Link href="/">Sobre o Orkut.br</Link> -{' '}
              <Link href="/">Centro de segurança</Link> -{' '}
              <Link href="/">Privacidade</Link> - <Link href="/">Termos</Link> -{' '}
              <Link href="/">Contato</Link>
            </Typograph>
          </FooterWrapper>
        </GridItem>
      </Grid>
      <Toaster position="bottom-right" />
    </PageWrapper>
  );
};

export default LoginScreen;

export async function getServerSideProps(context) {
  const { isAuthorized } = validateToken(context.req.headers.cookie);

  if (isAuthorized) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
