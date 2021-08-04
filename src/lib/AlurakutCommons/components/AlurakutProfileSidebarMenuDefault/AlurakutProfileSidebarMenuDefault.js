import Link from 'next/link';
import { Wrapper } from './Wrapper';

const BASE_URL = 'http://alurakut.vercel.app/';

export const AlurakutProfileSidebarMenuDefault = (props) => {
  const { user } = props;

  return (
    <Wrapper>
      <nav>
        <Link href={`/profile/${user}`} passHref>
          <a>
            <img src={`${BASE_URL}/icons/user.svg`} />
            Perfil
          </a>
        </Link>
        <a href="/">
          <img src={`${BASE_URL}/icons/book.svg`} />
          Recados
        </a>
        <a href="/">
          <img src={`${BASE_URL}/icons/camera.svg`} />
          Fotos
        </a>
        <a href="/">
          <img src={`${BASE_URL}/icons/sun.svg`} />
          Depoimentos
        </a>
      </nav>
      <hr />
      <nav>
        <a href="/">
          <img src={`${BASE_URL}/icons/plus.svg`} />
          GitHub Trends
        </a>
        <a href="/logout">
          <img src={`${BASE_URL}//icons/logout.svg`} />
          Sair
        </a>
      </nav>
    </Wrapper>
  );
};
