import { useCallback, useReducer } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const reducer = (state, action) => {
  switch (action.type) {
    case 'SEND':
      return {
        ...state,
        status: 'pending',
      };
    case 'SUCCESS':
      return {
        isFirstLoading: false,
        data: action.data,
        error: null,
        status: 'completed',
      };
    case 'FAIL':
      return {
        ...state,
        error: action.error,
        status: 'completed',
      };

    case 'RESET':
      return {
        ...state,
        error: null,
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
    status: null,
    isFirstLoading: true,
  });

  const getData = useCallback(async ({ content, queryParams, activeToast }) => {
    let toastId = null;

    if (activeToast) {
      toastId = toast.loading('Loading');
    }

    let fullQueryParams = '?';

    for (const key in queryParams) {
      fullQueryParams += `${key}=${queryParams[key]}&`;
    }

    fullQueryParams = fullQueryParams.slice(0, fullQueryParams.length - 1);
    console.log(fullQueryParams);

    try {
      dispatch({ type: 'SEND' });

      const { data } = await axios.get(`/api/${content}${fullQueryParams}`);

      dispatch({ type: 'SUCCESS', data });

      activeToast
        ? toast.success(`${content} succesfully loaded`, { id: toastId })
        : null;
    } catch (error) {
      const { data, status } = error.response;
      dispatch({ type: 'FAIL', error: { message: data, status } });
      activeToast ? toast.error(data, { id: toastId }) : null;
    }
  }, []);

  const createData = useCallback(async ({ content, queryParams, body }) => {
    const toastId = toast.loading('Loading');

    let fullQueryParams = '?';

    for (const key in queryParams) {
      fullQueryParams += `${key}=${queryParams[key]}&`;
    }

    fullQueryParams = fullQueryParams.slice(0, fullQueryParams.length - 1);

    try {
      const createResponse = await fetch(`/api/${content}${fullQueryParams}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!createResponse.ok) {
        const { message } = await createResponse.json();
        throw new Error(message);
      }

      const getResponse = await fetch(`/api/${content}${fullQueryParams}`);
      const { data } = await getResponse.json();

      dispatch({
        type: 'SUCCESS',
        data,
      });

      toast.success(`${content.slice(0, content.length - 1)} added`, {
        id: toastId,
      });
    } catch (error) {
      dispatch({ type: 'FAIL', error });

      toast.error(error.message, { id: toastId });
    }
  }, []);

  const updateData = useCallback(async ({ content, queryParams, body }) => {
    let toastId = null;
    toastId = toast.loading('Loading');

    let fullQueryParams = '?';

    for (const key in queryParams) {
      fullQueryParams += `${key}=${queryParams[key]}&`;
    }

    fullQueryParams = fullQueryParams.slice(0, fullQueryParams.length - 1);

    try {
      dispatch({ type: 'SEND' });

      await axios.put(`/api/${content}${fullQueryParams}`, body);

      const { data } = await axios.get(`/api/${content}${fullQueryParams}`);

      dispatch({ type: 'SUCCESS', data });

      toast.success(`${content} updated successfully`, { id: toastId });
    } catch (error) {
      const { data, status } = error.response;
      dispatch({ type: 'FAIL', error: { message: data, status } });
      toast.error(data, { id: toastId });
    }
  }, []);

  const deleteData = useCallback(async ({ content, queryParams }) => {
    const toastId = toast.loading('Loading');
    let fullQueryParams = '?';

    for (const key in queryParams) {
      fullQueryParams += `${key}=${queryParams[key]}&`;
    }

    fullQueryParams = fullQueryParams.slice(0, fullQueryParams.length - 1);

    try {
      const deleteResponse = await fetch(`/api/${content}${fullQueryParams}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!deleteResponse.ok) {
        const { message } = await createResponse.json();
        throw new Error(message);
      }

      const getResponse = await fetch(`/api/${content}${fullQueryParams}`);
      const { data } = await getResponse.json();
      dispatch({ type: 'SUCCESS', data });

      toast.success(`${content.slice(0, content.length - 1)} deleted`, {
        id: toastId,
      });
    } catch (error) {
      dispatch({ type: 'FAIL', error });
      toast.error(error.message, { id: toastId });
    }
  }, []);

  const cleanErrors = useCallback(() => {
    dispatch({ type: 'RESET' });
  });

  return {
    getData,
    createData,
    updateData,
    deleteData,
    cleanErrors,
    ...state,
  };
};
