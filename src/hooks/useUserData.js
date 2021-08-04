import { useEffect, useState } from 'react';

export const useUserData = (user) => {
  const [followingUsers, setFollowingUsers] = useState('');
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    const fetchUserFromGithub = async () => {
      const response = await fetch(
        `https://api.github.com/users/${user}/following`
      );
      const parsedResponse = await response.json();

      const mappedResponse = parsedResponse.map((item) => {
        const { id, avatar_url, login } = item;
        return {
          id,
          name: login,
          imageUrl: avatar_url,
        };
      });

      // setFollowingUsers(mappedResponse);
    };

    fetchUserFromGithub();
  }, [user]);

  useEffect(() => {
    const fetchCommunitiesFromDatoCMS = async () => {
      const response = await fetch('https://graphql.datocms.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: process.env.NEXT_PUBLIC_READ_ONLY_TOKEN,
        },
        body: JSON.stringify({
          query: `query {
          allCommunities (filter: {creatorSlug: {eq: ${user}}}) {
            id
            name
            imageUrl
          }
        }`,
        }),
      });

      const { data } = await response.json();

      setCommunities(data.allCommunities);
    };
    fetchCommunitiesFromDatoCMS();
  }, []);

  return { communities, followingUsers, user };
};
