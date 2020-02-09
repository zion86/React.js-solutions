import React from 'react';

export const RenderList = ({ list }) => (
  <>
    { list.map(({ id, name }) => <p key={ id }>{ name }</p>) }
  </>
);