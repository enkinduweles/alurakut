import React from 'react';

import { Button } from '../UI/inputs/Button/styled';

const Pagination = () => {
  return (
    <div>
      <div>
        <span>mostrando 1-6 de 6</span>
      </div>
      <div>
        <Button outline>primeira</Button>
        <Button outline>anterior</Button>
        <Button outline>próxima</Button>
        <Button outline>última</Button>
      </div>
    </div>
  );
};

export default Pagination;
