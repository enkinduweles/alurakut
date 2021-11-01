import PropTypes from 'prop-types';

import UserInfo from '../../../../components/UserInfo/UserInfo';

import { AlurakutMenuProfileSidebarWrapper } from './styled';

const AlurakutMenuProfileSidebar = ({ userName, id, isMenuOpened }) => {
  return (
    <AlurakutMenuProfileSidebarWrapper isMenuOpened={isMenuOpened}>
      <UserInfo userName={userName} id={id} />
    </AlurakutMenuProfileSidebarWrapper>
  );
};

AlurakutMenuProfileSidebar.propTypes = {
  userName: PropTypes.string.isRequired,
  isMenuOpened: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export default AlurakutMenuProfileSidebar;
