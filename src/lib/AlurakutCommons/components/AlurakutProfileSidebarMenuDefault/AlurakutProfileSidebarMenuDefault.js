import PropTypes from 'prop-types';
import Image from 'next/image';

import { Link } from '../Link';
import { AlurakutProfileSidebarMenuDefaultWrapper } from './styled';

const BASE_URL = 'http://alurakut.vercel.app/';

export const AlurakutProfileSidebarMenuDefault = (props) => {
  const { user, id } = props;

  return (
    <AlurakutProfileSidebarMenuDefaultWrapper>
      <nav>
        <Link href={`/profile/${user}?id=${id}`}>
          <Image src={`${BASE_URL}/icons/user.svg`} alt="" />
          Perfil
        </Link>
        <Link href={`/scrap/${user}?id=${id}`}>
          <Image src={`${BASE_URL}/icons/book.svg`} alt="" />
          Recados
        </Link>
        <Link href="/">
          <Image src={`${BASE_URL}/icons/camera.svg`} alt="" />
          Fotos
        </Link>
        <Link href="/">
          <Image src={`${BASE_URL}/icons/sun.svg`} alt="" />
          Depoimentos
        </Link>
      </nav>
      <hr />
      <nav>
        <Link href="/">
          <Image src={`${BASE_URL}/icons/plus.svg`} alt="" />
          GitHub Trends
        </Link>
        <Link href="/logout">
          <Image src={`${BASE_URL}//icons/logout.svg`} alt="" />
          Sair
        </Link>
      </nav>
    </AlurakutProfileSidebarMenuDefaultWrapper>
  );
};

AlurakutProfileSidebarMenuDefault.propTypes = {
  user: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
