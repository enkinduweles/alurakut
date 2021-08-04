import { useCallback, useEffect, useReducer, useState } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'SEND':
      return { profileInfo: {}, status: 'pending', error: null };
    case 'SUCCESS':
      return {
        profileInfo: action.profileInfo,
        status: 'completed',
        error: null,
      };
    case 'FAILED':
      return {
        profileInfo: {},
        status: 'failed',
        error: action.errorMessage,
      };
  }
};

export const useDatoCMS = (startWithPending = false) => {
  const [state, dispatch] = useReducer(reducer, {
    profileInfo: {},
    status: startWithPending ? 'pending' : null,
    error: null,
  });

  const getUserProfile = useCallback(async (queryToFilter) => {
    dispatch({ type: 'SEND' });
    try {
      const response = await fetch('https://graphql.datocms.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: process.env.NEXT_PUBLIC_READ_ONLY_TOKEN,
        },
        body: JSON.stringify({
          query: queryToFilter,
        }),
      });
      const { data } = await response.json();
      dispatch({ type: 'SUCCESS', profileInfo: data.profileInfo });
      console.log('getUserProfile');
    } catch (error) {
      dispatch({ type: 'FAILED', errorMessage: error });
    }
  }, []);
  console.log('useDato');
  return { ...state, getUserProfile };
};

// `query {
//   allCommunities (filter: {creatorSlug: {eq: ${user}}}) {
//     id
//     name
//     imageUrl
//   }
// }`
