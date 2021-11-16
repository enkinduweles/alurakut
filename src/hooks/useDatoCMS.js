import { useCallback, useReducer } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const axiosCustom = axios.create();

axiosCustom.defaults.params = { limitBy: 6 };

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
    case 'DONE':
      return {
        ...state,
        status: null,
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
      toastId = toast.loading('Loading...');
    }

    let fullQueryParams = '?';

    for (const key in queryParams) {
      fullQueryParams += `${key}=${queryParams[key]}&`;
    }

    fullQueryParams = fullQueryParams.slice(0, fullQueryParams.length - 1);

    try {
      dispatch({ type: 'SEND' });

      const { data } = await axiosCustom.get(
        `/api/${content}${fullQueryParams}`
      );

      dispatch({ type: 'SUCCESS', data });
      dispatch({ type: 'DONE' });
      activeToast
        ? toast.success(`${content} succesfully loaded`, { id: toastId })
        : null;
    } catch (error) {
      const { data, status } = error.response;
      dispatch({ type: 'FAIL', error: { message: data, status } });
      dispatch({ type: 'DONE' });
      activeToast ? toast.error(data, { id: toastId }) : null;
    }
  }, []);

  const createData = useCallback(async ({ content, queryParams, body }) => {
    const toastId = toast.loading('Loading...');

    let fullQueryParams = '?';

    for (const key in queryParams) {
      fullQueryParams += `${key}=${queryParams[key]}&`;
    }

    fullQueryParams = fullQueryParams.slice(0, fullQueryParams.length - 1);

    try {
      dispatch({ type: 'SEND' });

      await axiosCustom.post(`/api/${content}${fullQueryParams}`, body);

      const { data } = await axiosCustom.get(
        `/api/${content}${fullQueryParams}`
      );

      toast.success(`${content} created successfully`, { id: toastId });
      dispatch({ type: 'SUCCESS', data });
      dispatch({ type: 'DONE' });
    } catch (error) {
      const { data, status } = error.response;
      dispatch({ type: 'FAIL', error: { message: data, status } });
      dispatch({ type: 'DONE' });
      toast.error(data, { id: toastId });
    }
  }, []);

  const updateData = useCallback(async ({ content, queryParams, body }) => {
    let toastId = null;
    toastId = toast.loading('Loading...');

    let fullQueryParams = '?';

    for (const key in queryParams) {
      fullQueryParams += `${key}=${queryParams[key]}&`;
    }

    fullQueryParams = fullQueryParams.slice(0, fullQueryParams.length - 1);

    try {
      dispatch({ type: 'SEND' });

      await axiosCustom.put(`/api/${content}${fullQueryParams}`, body);

      const { data } = await axiosCustom.get(
        `/api/${content}${fullQueryParams}`
      );

      dispatch({ type: 'SUCCESS', data });
      dispatch({ type: 'DONE' });

      toast.success(`${content} updated successfully`, { id: toastId });
    } catch (error) {
      const { data, status } = error.response;
      dispatch({ type: 'FAIL', error: { message: data, status } });
      dispatch({ type: 'DONE' });
      toast.error(data, { id: toastId });
    }
  }, []);

  const deleteData = useCallback(async ({ content, queryParams, items }) => {
    const toastId = toast.loading('Loading...');
    let fullQueryParams = '?';
    const itemsString = items.join(',');

    for (const key in queryParams) {
      fullQueryParams += `${key}=${queryParams[key]}&`;
    }
    fullQueryParams = fullQueryParams.slice(0, fullQueryParams.length - 1);

    try {
      dispatch({ type: 'SEND' });

      await axiosCustom.delete(
        `/api/${content}${fullQueryParams}&items=${itemsString}`
      );

      const { data } = await axiosCustom.get(
        `/api/${content}${fullQueryParams}`
      );

      dispatch({ type: 'SUCCESS', data });
      dispatch({ type: 'DONE' });
      toast.success(`${content} deleted successfully`, { id: toastId });
    } catch (error) {
      const { data, status } = error.response;
      dispatch({ type: 'FAIL', error: { message: data, status } });
      dispatch({ type: 'DONE' });
      toast.error(data, { id: toastId });
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
