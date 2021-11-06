import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

import { ControlButton, Separator, ControlsWrapper } from './styled';

const PageControls = ({
  userName,
  userId,
  currentPage,
  lastPage,
  requestProcess,
  rootPath,
  getData,
}) => {
  const [buttonsDisabled, setButtonsDisabled] = useState({
    previous: false,
    next: false,
  });

  const router = useRouter();
  useEffect(() => {
    if (requestProcess === 'pending') {
      toast.loading('Loading...');
    } else {
      setButtonsDisabled({
        previous: currentPage === 1,
        next: currentPage === lastPage,
      });
    }
    return () => {
      toast.dismiss();
    };
  }, [requestProcess, currentPage, lastPage]);

  const nextPageHandler = (isLastPage) => {
    getData({
      content: rootPath.slice(0, rootPath.length - 1),
      queryParams: { userId, page: isLastPage ? lastPage : currentPage + 1 },
    });
    router.push(
      `/${rootPath}/${userName}?userId=${userId}&page=${currentPage + 1}`
    );
  };
  const previousPageHandler = (isFirstPage) => {
    getData({
      content: rootPath.slice(0, rootPath.length - 1),
      queryParams: { userId, page: isFirstPage ? 1 : currentPage + 1 },
    });
    router.push(
      `/${rootPath}/${userName}?userId=${userId}&page=${currentPage - 1}`
    );
  };

  return (
    <ControlsWrapper>
      <ControlButton
        outline
        disabled={buttonsDisabled.previous}
        onClick={() => previousPageHandler(true)}
      >
        primeira
      </ControlButton>
      <Separator>|</Separator>
      <ControlButton
        outline
        disabled={buttonsDisabled.previous}
        onClick={previousPageHandler}
      >
        anterior
      </ControlButton>
      <Separator>|</Separator>
      <ControlButton
        outline
        disabled={buttonsDisabled.next}
        onClick={nextPageHandler}
      >
        próxima
      </ControlButton>
      <Separator>|</Separator>
      <ControlButton
        outline
        disabled={buttonsDisabled.next}
        onClick={() => nextPageHandler(true)}
      >
        última
      </ControlButton>
    </ControlsWrapper>
  );
};

export default PageControls;
