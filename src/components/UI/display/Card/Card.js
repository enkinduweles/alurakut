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
  layout,
  width,
  height,
  contentId,
  onCheckCard,
  type,
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
      <Cover src={src} width={width} height={height} type />
      <CardContent>
        <TitleWrapper>
          <CardTitle href="/">{title}</CardTitle>
        </TitleWrapper>
        <Body>{bodyContent}</Body>
      </CardContent>
    </CardWrapper>
  );
};

export default memo(Card);
