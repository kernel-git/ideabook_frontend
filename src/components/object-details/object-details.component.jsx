import React from 'react';

import './object-details.styles.scss';

class ObjectDetails extends React.Component {
  state = {
    logoUrl: '',
    mainGroup: [],
    extraGroup: [],
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const { logoUrl, mainGroup, extraGroup } = this.props;
      this.setState(
        {
          logoUrl: logoUrl,
          mainGroup: mainGroup,
          extraGroup: extraGroup,
        },
        () => console.log('state changed', this.state)
      );
    }
  }

  render() {
    const { logoUrl, mainGroup, extraGroup } = this.state;
    console.log('state in render', this.state);
    return (
      <div className='object-details'>
        <div className='object-details__logo-group'>
          {logoUrl ? (
            <img className='object-details__logo' alt='logo' src={logoUrl} />
          ) : null}
          <div className='object-details__group'>
            {mainGroup.map(({ label, data }, index) => (
              <div key={index} className='object-details__data-wrapper'>
                {label ? (
                  <div className='object-details__label'>{label}:</div>
                ) : null}
                <div className='object-details__data'>{data}</div>
              </div>
            ))}
          </div>
        </div>
        {extraGroup ? (
          <div className='object-details__group'>
            {extraGroup.map(({ label, data }, index) => (
              <div key={index} className='object-details__data-wrapper'>
                {label ? (
                  <div className='object-details__label'>{label}:</div>
                ) : null}
                <div className='object-details__data'>{data}</div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

export default ObjectDetails;