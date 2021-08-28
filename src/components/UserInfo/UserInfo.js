import { memo } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

import { Box } from '../Box/Box';

import { AlurakutProfileSidebarMenuDefault } from '../../lib/AlurakutCommons';

const UserInfo = (props) => {
  const { githubUser, id } = props;

  return (
    <Box>
      <figure>
        <Image
          src={`https://github.com/${githubUser}.png`}
          style={{ borderRadius: '8px' }}
          alt={`Github user ${githubUser}`}
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
};

UserInfo.propTypes = {
  githubUser: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default memo(UserInfo);
