import React, { useState, memo } from 'react';
import Cover from '../Avatar/Avatar';

import {
  CardWrapper,
  CardTitle,
  CardContent,
  TitleWrapper,
  Body,
  Checkbox,
  Overlay,
} from './styled';

const Card = ({
  title,
  bodyContent,
  href,
  src,
  width,
  height,
  contentId,
  onCheckCard,
  type,
  round,
}) => {
  const [checkboxValue, setCheckboxValue] = useState(false);

  const selectCardHandler = (event) => {
    const checkBoxValue = event.target.checked;
    setCheckboxValue(checkBoxValue);
    onCheckCard(contentId, checkBoxValue);
  };

  return (
    <CardWrapper>
      {checkboxValue && <Overlay />}

      <Checkbox
        type="checkbox"
        value={checkboxValue}
        onChange={selectCardHandler}
      />
      <Cover src={src} width={width} height={height} type round={round} />
      <CardContent>
        <TitleWrapper>
          <CardTitle href="/">{title}</CardTitle>
        </TitleWrapper>
        {bodyContent && <Body>{bodyContent}</Body>}
      </CardContent>
    </CardWrapper>
  );
};

export default memo(Card);
