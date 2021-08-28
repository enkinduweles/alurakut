import { useCallback, useReducer, useState } from 'react';
import { toast } from 'react-hot-toast';

const reducer = (state, action) => {
  switch (action.type) {
    case 'SUCCESS':
      return {
        data: action.data,
        error: {
          message: '',
          status: 200,
        },
        isFirstLoading: false,
      };
    case 'FAIL':
      return {
        data: null,
        error: action.error,
        isFirstLoading: false,
      };

    default:
      throw new Error(
        'Action type invalid, please make sure to send a valid action type!'
      );
  }
};

export const useDatoCMS = () => {
  const [state, dispatch] = useReducer(reducer, {
    data: null,
    error: {},
    isFirstLoading: true,
  });

  const getData = useCallback(
    async ({ content, queryParams, activeHotToast }) => {
      let toastId = null;

      if (activeHotToast) {
        toastId = toast.loading('Loading');
      }

      try {
        const response = await fetch(`/api/${content}${queryParams.userId}`);

        if (!response.ok) {
          console.log('response not ok');
          throw {
            message: `${content} could not be loaded!`,
            status: response.status,
          };
        }

        const { data } = await response.json();

        dispatch({ type: 'SUCCESS', data });

        activeHotToast
          ? toast.success(`${content} succesfully loaded`, { id: toastId })
          : '';
      } catch (error) {
        dispatch({ type: 'FAIL', error });

        activeHotToast ? toast.error(error.message, { id: toastId }) : '';
      }
    },
    []
  );

  const createData = useCallback(async ({ content, queryParams, body }) => {
    const toastId = toast.loading('Loading');

    try {
      const createResponse = await fetch(
        `/api/${content}${queryParams.userId}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );

      if (!createResponse.ok) {
        throw {
          message: `${content} could not be created`,
          status: createResponse.status,
        };
      }

      const getResponse = await fetch(`/api/${content}${queryParams.userId}`);
      const { data } = await getResponse.json();

      dispatch({ type: 'SUCCESS', data });

      toast.success(`${content} added`, { id: toastId });
    } catch (error) {
      dispatch({ type: 'FAIL', error });

      toast.error(error.message, { id: toastId });
    }
  }, []);

  const updateData = useCallback(async ({ content, queryParams, body }) => {
    let toastId = null;
    toasId = toast.loading('Loading');
    try {
      let response = await fetch(`/api/${content}${queryParams.userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw {
          message: `${content} could not be updated`,
          status: response.status,
        };
      }

      response = await fetch(`/api/${content}${queryParams.userId}`);
      const { data } = await response.json();

      dispatch({ type: 'SUCCESS', data });

      toast.success(`${content} updated successfully`, { id: toastId });
    } catch (error) {
      dispatch({ type: 'FAIL', error });

      toast.error(error.message, { id: toastId });
    }
  }, []);

  const deleteData = useCallback(async ({ content, queryParams }) => {
    const toastId = toast.loading('Loading');
    let queryParamsJoined = '?';

    for (const key in queryParams) {
      queryParamsJoined += `${key}=${queryParams[key]}&`;
    }
    const queryParamsSliced = queryParamsJoined.slice(
      0,
      queryParamsJoined.length - 1
    );
    try {
      const deleteResponse = await fetch(
        `/api/${content}${queryParamsSliced}`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (!deleteResponse.ok) {
        throw {
          message: `${content} could not be deleted`,
          status: deleteResponse.status,
        };
      }

      const getResponse = await fetch(
        `/api/${content}?userId=${queryParams.userId}`
      );
      const { data } = await getResponse.json();
      dispatch({ type: 'SUCCESS', data });

      toast.success(`${content} deleted`, { id: toastId });
    } catch (error) {
      dispatch({ type: 'FAIL', error });
      toast.error(error.message, { id: toastId });
    }
  }, []);

  return {
    getData,
    createData,
    updateData,
    deleteData,
    ...state,
  };
};
