import PropTypes from 'prop-types';

import { UserInfo } from '../../../../components/UserInfo/UserInfo';

import { AlurakutMenuProfileSidebarWrapper } from './styled';

export const AlurakutMenuProfileSidebar = ({
  githubUser,
  id,
  isMenuOpened,
}) => {
  return (
    <AlurakutMenuProfileSidebarWrapper isMenuOpened={isMenuOpened}>
      <UserInfo githubUser={githubUser} id={id} />
    </AlurakutMenuProfileSidebarWrapper>
  );
};

AlurakutMenuProfileSidebar.propTypes = {
  githubUser: PropTypes.string.isRequired,
  isMenuOpened: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};
