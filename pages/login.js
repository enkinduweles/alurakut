import React from 'react';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import { validateToken } from '../src/utils/auth';

const LoginScreen = (props) => {
  const router = useRouter();
  const [githubUser, setGithubUser] = React.useState('');
  const [isFocused, setIsFocused] = React.useState(false);

  const submitLoginForm = async (event) => {
    event.preventDefault();
    const toastId = toast.loading('Loading...');

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ githubUser: githubUser }),
    });

    const { error } = await response.json();

    if (error) {
      toast.error('User not found', { id: toastId });
    } else {
      toast.remove();
      router.push('/');
    }
  };

  const inputFocusHandler = () => {
    setIsFocused(true);
  };
  const inputBlurHandler = () => {
    setIsFocused(false);
  };

  const invalidClass =
    isFocused && githubUser.length === 0 ? 'inputFieldInvalid' : '';

  return (
    <main
      style={{
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="loginScreen">
        <section className="logoArea">
          <img src="https://alurakut.vercel.app/logo.svg" />

          <p>
            <strong>Conecte-se</strong> aos seus amigos e familiares usando
            recados e mensagens instantâneas
          </p>
          <p>
            <strong>Conheça</strong> novas pessoas através de amigos de seus
            amigos e comunidades
          </p>
          <p>
            <strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só
            lugar
          </p>
        </section>

        <section className="formArea">
          <form className="box" onSubmit={submitLoginForm}>
            <p>
              Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
            </p>
            <div>
              <input
                className={invalidClass}
                placeholder="Usuário"
                value={githubUser}
                onChange={(evento) => {
                  setGithubUser(evento.target.value);
                }}
                onFocus={inputFocusHandler}
                onBlur={inputBlurHandler}
              />
              {githubUser.length === 0 && isFocused ? (
                <span>Preencha o campo</span>
              ) : (
                ''
              )}
            </div>
            <button type="submit" disabled={githubUser.length === 0}>
              Login
            </button>
            <Toaster position="bottom-right" />
          </form>

          <footer className="box">
            <p>
              Ainda não é membro? <br />
              <a href="/login">
                <strong>ENTRAR JÁ</strong>
              </a>
            </p>
          </footer>
        </section>

        <footer className="footerArea">
          <p>
            © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> -{' '}
            <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> -{' '}
            <a href="/">Termos</a> - <a href="/">Contato</a>
          </p>
        </footer>
      </div>
    </main>
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
