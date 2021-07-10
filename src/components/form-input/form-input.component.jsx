import React from 'react';

import './form-input.styles.scss';

const FormInput = ({ label, handleChange, ...otherProps }) => (
  <div className='form-input'>
    {label ? <span className='form-input__label'>{label}</span> : null}
    <input
      className='form-input__input-field'
      onChange={handleChange}
      {...otherProps}
    />
  </div>
);

export default FormInput;
