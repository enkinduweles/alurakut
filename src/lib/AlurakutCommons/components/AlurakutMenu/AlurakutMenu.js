import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { AlurakutMenuProfileSidebar } from '../AlurakutProfileSidebarMenu/AlurakutProfileSidebarMenu';
import { Link } from '../Link';
import { Logo, AlurakutMenuWrapper } from './styled';

const BASE_URL = 'http://alurakut.vercel.app/';
const v = '1';

export const AlurakutMenu = memo(
  ({ githubUser, showMenu, isMenuOpened, id }) => {
    return (
      <AlurakutMenuWrapper isMenuOpen={isMenuOpened}>
        <div className="container">
          <Link href="/">
            <Logo src={`${BASE_URL}/logo.svg`} />
          </Link>

          <nav style={{ flex: 1 }}>
            {[
              { name: 'Inicio', slug: '/' },
              { name: 'Amigos', slug: '/amigos' },
              { name: 'Comunidades', slug: '/comunidades' },
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
            <a href={`/logout`}>Sair</a>
            <div>
              <input placeholder="Pesquisar no Orkut" />
            </div>
          </nav>

          <button onClick={showMenu}>
            {isMenuOpened && (
              <img src={`${BASE_URL}/icons/menu-open.svg?v=${v}`} />
            )}
            {!isMenuOpened && (
              <img src={`${BASE_URL}/icons/menu-closed.svg?v=${v}`} />
            )}
          </button>
        </div>
        <AlurakutMenuProfileSidebar
          githubUser={githubUser}
          id={id}
          isMenuOpened={isMenuOpened}
        />
      </AlurakutMenuWrapper>
    );
  }
);

AlurakutMenu.propTypes = {
  githubUser: PropTypes.string.isRequired,
  showMenu: PropTypes.func.isRequired,
  isMenuOpened: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};
