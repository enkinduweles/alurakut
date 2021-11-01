import { SiteClient } from 'datocms-client';
import sendRequest from '../../src/utils/requestHandler';
import axios from '../../src/utils/axiosConfig';

const TOKEN = process.env.PRIVATE_KEY;
const client = new SiteClient(TOKEN);

const USER = '1317096';
const COMMUNITIES = '975326';

sendRequest.get(async (request, response) => {
  const { userId, limitBy, page = 1 } = request.query;

  const start = page ? (page - 1) * limitBy : 0;

  const { data: responseData } = await axios.post('/', {
    query: `query {
      allCommunities(filter: {githubId: {eq: "${userId}"}}, first: "${limitBy}", skip: "${start}") {
        id
        name
        thumbnail {
          url
        }
      }
      _allCommunitiesMeta(filter: {githubId: {eq: "${userId}"}}) {
        count
      }
    }`,
  });

  if (responseData.errors) {
    const error = new Error('Ops something went wrong');
    error.status = 400;

    throw error;
  }
  console.log(responseData.data.allCommunities);
  const { allCommunities, _allCommunitiesMeta } = responseData.data;
  const communities = allCommunities;
  const total = _allCommunitiesMeta.count;
  const lastPage = Math.ceil(total / limitBy);
  const firstCountMark = page * limitBy - 5;
  const lastCountMark = page * limitBy - 5 + (total - 1);

  const data = {
    communities,
    counters: {
      total,
      firstCountMark,
      lastCountMark,
      lastPage,
    },
  };

  response.json(data);
});

sendRequest.post(async (request, response) => {
  const { name: communityName } = request.body;

  const community = await client.items.all({
    filter: {
      type: COMMUNITIES,
      fields: {
        name: {
          matches: { pattern: communityName },
        },
      },
    },
  });

  if (communities.length !== 0) {
    const updatedCommunityMembers = await client.items.update(community.id, {
      member: community.member + 1,
    });

    // await client.items.update(record[0].id, {
    //     communities: [...record[0].communities, community.id]
    // })
  }

  // if (request.body.githubId === userId) {
  //   response.status(400).json({
  //     message: 'Why do you want add yourself as a friend?',
  //   });
  //   return;
  // }

  // const allFriends = await client.items.all({
  //   filter: {
  //     type: FRIENDS,
  //   },
  // });

  // const parsedAllFriends = allFriends.map((friend) => {
  //   return {
  //     id: friend.id,
  //     githubId: friend.githubId,
  //   };
  // });

  // const [foundUser] = parsedAllFriends.filter((item) => {
  //   return request.body.githubId === item.githubId;
  // });

  // let newRegister = null;

  // if (foundUser) {
  //   const isFriendExists = record[0].friends.some((friend) => {
  //     return friend === foundUser.id;
  //   });

  //   if (isFriendExists) {
  //     response.status(400).json({
  //       message: 'You already added this user!',
  //     });
  //     return;
  //   }

  //   newRegister = await client.items.find(foundUser.id);
  // } else {
  //   newRegister = await client.items.create({
  //     itemType: FRIENDS,
  //     ...request.body,
  //   });
  // }

  // const updatedRecords = await client.items.update(record[0].id, {
  //   friends: [...record[0].friends, newRegister.id],
  // });

  response.status(201).json({
    data: communities,
  });
  // }
});

sendRequest.delete(async (request, response) => {
  const parsedItems = items.split(',');
  const deletedRegisters = await client.items.bulkDestroy({
    items: parsedItems,
  });

  response.json({
    data: deletedRegisters,
  });
});

export default sendRequest;
