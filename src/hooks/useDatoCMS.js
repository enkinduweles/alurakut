import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export const useDatoCMS = () => {
  const [datoContent, setDataDatoContent] = useState([]);
  const [isFirstLoading, setIsFirtstLoading] = useState(null);

  useEffect(() => {
    setIsFirtstLoading(true);
  }, []);

  const getData = useCallback(async ({ content, queryParams }) => {
    try {
      const response = await fetch(`/api/${content}${queryParams.userId}`);
      const { data } = await response.json();
      setDataDatoContent(data);
      setIsFirtstLoading(false);
    } catch (error) {}
  }, []);

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
        throw new Error('Create operation failed');
      }

      const getResponse = await fetch(`/api/${content}${queryParams.userId}`);
      const { data } = await getResponse.json();
      setDataDatoContent(data);

      toast.success('Scrap added!', { id: toastId });
    } catch (error) {
      console.log(error);

      toast.error('Scrap could not be crated', { id: toastId });
    }
  }, []);

  const updateData = useCallback(async ({ content, queryParams, body }) => {
    try {
      let response = await fetch(`/api/${content}${queryParams.itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Profile could not be updated');
      }

      response = await fetch(`/api/${content}${queryParams.userId}`);
      const { data } = await response.json();
      setDataDatoContent(data);
    } catch (error) {}
  }, []);

  const deleteData = useCallback(async ({ content, queryParams }) => {
    const toastId = toast.loading('Loading');
    try {
      const deleteResponse = await fetch(
        `/api/${content}${queryParams.itemId}`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (!deleteResponse.ok) {
        throw new Error('Delete operation failed');
      }

      const getResponse = await fetch(`/api/${content}${queryParams.userId}`);
      const { data } = await getResponse.json();
      setDataDatoContent(data);

      toast.success('Scrap deleted!', { id: toastId });
    } catch (error) {
      console.log(error);

      toast.error('Scrap could not be deleted', { id: toastId });
    }
  }, []);

  return {
    getData,
    createData,
    updateData,
    deleteData,
    datoContent,
    isFirstLoading,
  };
};
