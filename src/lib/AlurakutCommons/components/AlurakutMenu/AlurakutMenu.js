import React, { useState } from 'react';

import { AlurakutMenuProfileSidebar } from '../AlurakutProfileSidebarMenu/AlurakutProfileSidebarMenu';
import { Link } from '../Link';
import { Logo } from './Logo';
import { Wrapper } from './Wrapper';

const BASE_URL = 'http://alurakut.vercel.app/';
const v = '1';

export const AlurakutMenu = ({ githubUser }) => {
  const [isMenuOpen, setMenuState] = useState(false);

  return (
    <Wrapper isMenuOpen={isMenuOpen}>
      <div className="container">
        <Logo src={`${BASE_URL}/logo.svg`} />

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

        <button onClick={() => setMenuState(!isMenuOpen)}>
          {isMenuOpen && <img src={`${BASE_URL}/icons/menu-open.svg?v=${v}`} />}
          {!isMenuOpen && (
            <img src={`${BASE_URL}/icons/menu-closed.svg?v=${v}`} />
          )}
        </button>
      </div>
      <AlurakutMenuProfileSidebar githubUser={githubUser} />
    </Wrapper>
  );
};
