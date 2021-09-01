import styled from 'styled-components';
import Box from '../Box/Box';

const ProfileRelations = styled(Box)`
  .noFriends,
  .noCommunities {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    font-size: 20px;
    color: #f368e0;
    > svg {
      margin-right: 8px;
    }
  }
  ul {
    display: grid;
    grid-gap: 8px;
    grid-template-columns: 1fr 1fr 1fr;
    max-height: 220px;
    list-style: none;
  }

  ul li a {
    display: inline-block;
    height: 102px;
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    width: 100%;
    > div {
      height: 100%;
      width: 100%;
      position: relative;
    }

    span {
      color: #ffffff;
      font-size: 10px;
      position: absolute;
      left: 0;
      bottom: 10px;
      z-index: 2;
      padding: 0 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    &:after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      z-index: 1;
      background-image: linear-gradient(0deg, #00000073, transparent);
    }
  }
`;

export default ProfileRelations;
