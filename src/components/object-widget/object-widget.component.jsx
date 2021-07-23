import React from 'react';
import CustomButton from '../custom-button/custom-button.component';

import './object-widget.styles.scss';

const ObjectWidget = ({ logoUrl, upperGroup, lowerGroup, handleClick, handleEdit }) => (
  <div className='object-widget'>
    <div className='object-widget__data-group' onClick={handleClick}>
      {logoUrl ? (
        <img className='object-widget__logo' alt='logo' src={logoUrl} />
      ) : null}
      <div className='object-widget__group'>
        <div className='object-widget__data'>
          {upperGroup.map((item, index) => <div key={index}>{item}</div>)}
        </div>
        {lowerGroup ? (
          <div className='object-widget__data object-widget__data_gray'>
            {lowerGroup.map((item, index) => <div key={index}>{item}</div>)}
          </div>
        ) : null}
      </div>
    </div>
    <CustomButton handleClick={handleEdit}>Edit</CustomButton>
  </div>
);

export default ObjectWidget;
