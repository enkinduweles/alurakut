import React from 'react';
import { ControlButton, Separator, ControlsWrapper } from './styled';

const PageControls = () => {
  return (
    <ControlsWrapper>
      <ControlButton outline>primeira</ControlButton>
      <Separator>|</Separator>
      <ControlButton outline>anterior</ControlButton>
      <Separator>|</Separator>
      <ControlButton outline>próxima</ControlButton>
      <Separator>|</Separator>
      <ControlButton outline>última</ControlButton>
    </ControlsWrapper>
  );
};

export default PageControls;
