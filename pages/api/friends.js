import { SiteClient } from 'datocms-client';
import sendRequest from '../../src/utils/requestHandler';
import axios from '../../src/utils/axiosConfig';

const TOKEN = process.env.PRIVATE_KEY;
const client = new SiteClient(TOKEN);

const USER_CONTENT = '1083247';
const FRIENDS = '1210491';

sendRequest.get(async (request, response) => {
  // console.log(request.query);
  const { userId, limitBy, page = 1, items = '', slug } = request.query;
  const start = page ? (page - 1) * limitBy : 0;

  const { data: responseData } = await axios.post('/', {
    query: `query {
        allUsers(filter: {githubId: {eq: "${userId}"}}, first: "${limitBy}", skip: "${start}") {
          friends {
            id
            name
            avatar
          }
        }
        _allUsersMeta(filter: {friends: {allIn: "${slug}"}}) {
          count
        }
      }`,
  });
  console.log(responseData);

  if (responseData.errors) {
    const error = new Error('Ops something went wrong');
    error.status = 400;

    throw error;
  }

  const { user, _allUsersMeta } = responseData.data;
  const friends = user;
  const total = _allUsersMeta.count;
  const lastPage = Math.ceil(total / limitBy);
  const firstCountMark = page * limitBy - 5;
  const lastCountMark = page * limitBy - 5 + (total - 1);

  const data = {
    friends,
    counters: {
      total,
      firstCountMark,
      lastCountMark,
      lastPage,
    },
  };

  response.json({ data });
});

sendRequest.post(async (request, response) => {
  if (request.body.githubId === userId) {
    response.status(400).json({
      message: 'Why do you want add yourself as a friend?',
    });
    return;
  }

  const allFriends = await client.items.all({
    filter: {
      type: FRIENDS,
    },
  });

  const parsedAllFriends = allFriends.map((friend) => {
    return {
      id: friend.id,
      githubId: friend.githubId,
    };
  });

  const [foundUser] = parsedAllFriends.filter((item) => {
    return request.body.githubId === item.githubId;
  });

  let newRegister = null;

  if (foundUser) {
    const isFriendExists = record[0].friends.some((friend) => {
      return friend === foundUser.id;
    });

    if (isFriendExists) {
      response.status(400).json({
        message: 'You already added this user!',
      });
      return;
    }

    newRegister = await client.items.find(foundUser.id);
  } else {
    newRegister = await client.items.create({
      itemType: FRIENDS,
      ...request.body,
    });
  }

  const updatedRecords = await client.items.update(record[0].id, {
    friends: [...record[0].friends, newRegister.id],
  });

  response.status(201).json({
    data: updatedRecords,
  });
  return;
  // }
});

// const record = await client.items.all({
//   filter: {
//     type: USER_CONTENT,
//     fields: {
//       user_id: {
//         eq: `${userId}`,
//       },
//     },
//   },
// });

//   if (false) {
//     if (request.method === 'GET') {
//       const lastPage = Math.ceil(record[0].friends.length / limitBy);
//       const firstCountMark = page * limitBy - 5;

//       let filteredFriends = [...record[0].friends];
//       filteredFriends = filteredFriends.splice(start, limitBy);

//       const lastCountMark = page * limitBy - 5 + (filteredFriends.length - 1);

//       const friends = await Promise.all(
//         filteredFriends.map(async (friendId) => {
//           return await client.items.find(friendId);
//         })
//       );

//       const parsedFriends = friends.map((friend) => {
//         const { name, avatar, githubId, location, id } = friend;

//         return {
//           id,
//           name,
//           avatar,
//           githubId,
//           location,
//         };
//       });

//       response.json({
//         data: {
//           friends: parsedFriends,
//           counters: {
//             firstCountMark,
//             lastCountMark,
//             lastPage,
//             totalFriends: record[0].friends.length,
//           },
//         },
//       });
//       return;
//     }

//     if (request.method === 'POST') {
//       if (request.body.githubId === userId) {
//         response.status(400).json({
//           message: 'Why do you want add yourself as a friend?',
//         });
//         return;
//       }

//       const allFriends = await client.items.all({
//         filter: {
//           type: FRIENDS,
//         },
//       });

//       const parsedAllFriends = allFriends.map((friend) => {
//         return {
//           id: friend.id,
//           githubId: friend.githubId,
//         };
//       });

//       const [foundUser] = parsedAllFriends.filter((item) => {
//         return request.body.githubId === item.githubId;
//       });

//       let newRegister = null;

//       if (foundUser) {
//         const isFriendExists = record[0].friends.some((friend) => {
//           return friend === foundUser.id;
//         });

//         if (isFriendExists) {
//           response.status(400).json({
//             message: 'You already added this user!',
//           });
//           return;
//         }

//         newRegister = await client.items.find(foundUser.id);
//       } else {
//         newRegister = await client.items.create({
//           itemType: FRIENDS,
//           ...request.body,
//         });
//       }

//       const updatedRecords = await client.items.update(record[0].id, {
//         friends: [...record[0].friends, newRegister.id],
//       });

//       response.status(201).json({
//         data: updatedRecords,
//       });
//       return;
//       // }
//     }

//     if (request.method === 'DELETE') {
//       const parsedItems = items.split(',');
//       const deletedRegisters = await client.items.bulkDestroy({
//         items: parsedItems,
//       });

//       response.json({
//         data: deletedRegisters,
//       });

//       return;
//     }

//     response.status(501).json({
//       message: 'Sorry, method not implemented',
//     });
//     return;
//   }

//   response.status(404).json({
//     message: 'Sorry, user not found!',
//   });
// }

export default sendRequest;
