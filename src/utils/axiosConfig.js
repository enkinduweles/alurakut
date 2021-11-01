import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://graphql.datocms.com/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: process.env.PRIVATE_KEY,
  },
});

export default instance;
