import React from 'react';

import './custom-button.styles.scss'

const CustomButton = ({ children, negative, handleClick }) => (
  <div
    className={`custom-button ${negative ? 'custom-button_negative' : ''}`}
    onClick={handleClick}
  >
    {children}
  </div>
);

export default CustomButton;
