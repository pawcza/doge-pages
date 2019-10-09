import React from 'react';

import css from './Corner.module.scss'

const Corner = ({left, top, right, bottom, click }) => {
  return (
    <div
      style={{left, top, right, bottom}}
      className={css.Wrapper}
      onClick={() => click(left, top, right, bottom)}
    >
    </div>
  );
};

export default Corner;
