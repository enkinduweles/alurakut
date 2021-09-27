import React from 'react';

import { InputWrapper, InputBase, Label } from './styled';

const Input = ({ label, htmlFor, className, ...props }) => {
  console.log({ ...props });
  return (
    <InputWrapper className={className}>
      {label && <Label htmlFor={label}>{label}</Label>}
      <InputBase {...props} />
    </InputWrapper>
  );
};

export default Input;
