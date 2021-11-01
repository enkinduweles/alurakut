import React from 'react';

import { InputWrapper, InputBase, Label } from './styled';

const Input = ({ label, htmlFor, className, ...remainingProps }) => {
  return (
    <InputWrapper className={className}>
      {label && <Label htmlFor={label}>{label}</Label>}
      <InputBase {...remainingProps} />
    </InputWrapper>
  );
};

export default Input;
