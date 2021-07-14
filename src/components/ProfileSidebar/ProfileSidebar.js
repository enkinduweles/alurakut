import { Box } from '../Box/Box';

export const ProfileSidebar = (props) => {
  return (
    <Box>
      <img
        src={`https://github.com/${props.githubUser}.png`}
        style={{ borderRadius: '8px' }}
      />
    </Box>
  );
};
