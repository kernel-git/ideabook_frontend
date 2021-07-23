import React from 'react';

import './object-widget.styles.scss';

const ObjectWidget = ({ logoUrl, upperGroup, lowerGroup }) => (
  <div className='object-widget'>
    {logoUrl ? (
      <img className='object-widget__logo' alt='logo' src={logoUrl} />
    ) : null}
    <div className='object-widget__group'>
      <div className='object-widget__data'>
        {upperGroup.map((item) => <div>{item}</div>)}
      </div>
      {lowerGroup ? (
        <div className='object-widget__data object-widget__data_gray'>
          {lowerGroup.map((item) => <div>{item}</div>)}
        </div>
      ) : null}
    </div>
  </div>
);

export default ObjectWidget;
