import PropTypes from 'prop-types';
import Image from 'next/image';

import Link from '../Link';
import { AlurakutProfileSidebarMenuDefaultWrapper } from './styled';

const BASE_URL = 'http://alurakut.vercel.app/';

const AlurakutProfileSidebarMenuDefault = (props) => {
  const { user, id } = props;

  return (
    <AlurakutProfileSidebarMenuDefaultWrapper>
      <nav>
        <Link href={`/profile/${user}?id=${id}`}>
          <div>
            <Image layout="fill" src={`${BASE_URL}/icons/user.svg`} alt="" />
          </div>
          Perfil
        </Link>
        <Link href={`/scrap/${user}?id=${id}`}>
          <div>
            <Image layout="fill" src={`${BASE_URL}/icons/book.svg`} alt="" />
          </div>
          Recados
        </Link>
        <Link href="/">
          <div>
            <Image layout="fill" src={`${BASE_URL}/icons/camera.svg`} alt="" />
          </div>
          Fotos
        </Link>
        <Link href="/">
          <div>
            <Image layout="fill" src={`${BASE_URL}/icons/sun.svg`} alt="" />
          </div>
          Depoimentos
        </Link>
      </nav>
      <hr />
      <nav>
        <Link href="/">
          <div>
            <Image layout="fill" src={`${BASE_URL}/icons/plus.svg`} alt="" />
          </div>
          GitHub Trends
        </Link>
        <Link href="/logout">
          <div>
            <Image layout="fill" src={`${BASE_URL}//icons/logout.svg`} alt="" />
          </div>
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

export default AlurakutProfileSidebarMenuDefault;
