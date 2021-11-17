import React, { memo } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import axios from 'axios';

import NextImage from '../../../../components/NextImage/NextImage';
import Link from '../../../../components/ui/navigation/Link/Link';
import { Logo, AlurakutMenuWrapper, LogoutButton } from './styled';

const BASE_URL = 'http://alurakut.vercel.app/';
const v = '1';

const AlurakutMenu = ({ userName, showMenu, isMenuOpened, id }) => {
  const router = useRouter();
  const logout = async () => {
    await axios.post('/api/logout');
    router.replace('/login');
  };

  return (
    <AlurakutMenuWrapper isMenuOpen={isMenuOpened}>
      <div className="container">
        <Link href="/">
          <Logo src={`${BASE_URL}/logo.svg`} />
        </Link>

        <nav style={{ flex: 1 }}>
          {[
            { name: 'Inicio', slug: '/' },
            { name: 'Amigos', slug: `/friends/${userName}?userId=${id}` },
            {
              name: 'Comunidades',
              slug: `/communities/${userName}?userId=${id}`,
            },
          ].map((menuItem) => (
            <Link
              key={`key__${menuItem.name.toLocaleLowerCase()}`}
              href={`${menuItem.slug.toLocaleLowerCase()}`}
            >
              {menuItem.name}
            </Link>
          ))}
        </nav>
        <nav>
          <LogoutButton outline onClick={logout}>
            Sair
          </LogoutButton>
          <div>
            <input placeholder="Pesquisar no Orkut" />
          </div>
        </nav>

        <button onClick={showMenu} className="mobileMenu">
          {!isMenuOpened && (
            <div>
              <NextImage
                layout="fill"
                src={`${BASE_URL}/icons/menu-closed.svg?v=${v}`}
                alt=""
              />
            </div>
          )}
        </button>
      </div>
    </AlurakutMenuWrapper>
  );
};

AlurakutMenu.propTypes = {
  userName: PropTypes.string.isRequired,
  showMenu: PropTypes.func.isRequired,
  isMenuOpened: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export default memo(AlurakutMenu);
