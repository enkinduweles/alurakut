import { useCallback, useEffect, useReducer, useState } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'SEND':
      return {
        profileInfo: {},
        status: 'pending',
        error: null,
      };
    case 'SUCCESS':
      return {
        profileInfo: action.profileInfo,
        status: 'completed',
        error: null,
      };
    case 'FETCH_FAILED':
      return {
        profileInfo: {},
        status: 'fetchFailed',
        error: action.errorMessage,
      };
    case 'UPDATE_FAILED':
      return {
        ...state,
        error: action.errorMessage,
        status: 'updateFailed',
      };
  }
};

export const useDatoCMS = (startWithPending = false) => {
  const [state, dispatch] = useReducer(reducer, {
    profileInfo: {},
    status: startWithPending ? 'pending' : null,
    error: null,
  });

  const updateUserProfile = useCallback(async (requestConfig) => {
    dispatch({ type: 'SEND' });

    try {
      const response = await fetch(
        `/api/datoCMSContent${requestConfig.queryParams}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestConfig.body),
        }
      );

      const { data } = await response.json();
      const parsedData = {
        id: data.id,
        city: data.city,
        state: data.state,
        profession: data.profession,
        contact: data.contact,
      };

      dispatch({ type: 'SUCCESS', profileInfo: parsedData });
    } catch (error) {
      dispatch({
        type: 'UPDATE_FAILED',
      });
    }
  }, []);

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
    } catch (error) {
      dispatch({ type: 'FETCH_FAILED', errorMessage: error });
    }
  }, []);

  return { ...state, getUserProfile, updateUserProfile };
};
