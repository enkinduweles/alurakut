import { AlurakutProfileSidebarMenuDefault } from '../AlurakutProfileSidebarMenuDefault/AlurakutProfileSidebarMenuDefault';
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
