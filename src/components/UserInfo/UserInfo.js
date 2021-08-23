import { memo } from 'react';
import PropTypes from 'prop-types';

import { Box } from '../Box/Box';

import { AlurakutProfileSidebarMenuDefault } from '../../lib/AlurakutCommons';

export const UserInfo = memo((props) => {
  const { githubUser, id } = props;

  return (
    <Box>
      <figure>
        <img
          src={`https://github.com/${githubUser}.png`}
          style={{ borderRadius: '8px' }}
        />
      </figure>

      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${githubUser}`}>
          @{githubUser}
        </a>
      </p>

      <hr />
      <AlurakutProfileSidebarMenuDefault user={githubUser} id={id} />
    </Box>
  );
});

UserInfo.propTypes = {
  githubUser: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
