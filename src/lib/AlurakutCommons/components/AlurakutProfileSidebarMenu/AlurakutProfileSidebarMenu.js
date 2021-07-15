import { AlurakutProfileSidebarMenuDefault } from '../AlurakutProfileSidebarMenuDefault/AlurakutProfileSidebarMenuDefault';

export const AlurakutMenuProfileSidebar = ({ githubUser }) => {
  return (
    <div className="alurakutMenuProfileSidebar">
      <div>
        <figure>
          <img
            src={`https://github.com/${githubUser}.png`}
            style={{ borderRadius: '8px' }}
          />
        </figure>

        <hr />
        <p>
          <a className="boxLink" href={`/user/${githubUser}`}>
            @{githubUser}
          </a>
        </p>
        <hr />

        <AlurakutProfileSidebarMenuDefault />
      </div>
    </div>
  );
};
