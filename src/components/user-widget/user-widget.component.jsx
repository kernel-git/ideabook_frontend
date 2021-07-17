import React from 'react';

import './user-widget.styles.scss';

class UserWidget extends React.Component {
  constructor(props) {
    super(props);

    this.handleWidgetClick = this.handleWidgetClick.bind(this);
    this.handleCompanyClick = this.handleCompanyClick.bind(this);
    console.log(props);
  }

  handleWidgetClick() {
    console.log('Widget clicked');
  }

  handleCompanyClick() {
    console.log('Company clicked');
  }

  render() {
    const { avatar_url, first_name, last_name, birth_date } = this.props;
    // const { id, name } = company;
    const age = new Date(new Date() - Date.parse(birth_date)).getFullYear() - 1970;
    return (
      <div className='user-widget'>
        <img
          className='user-widget__logo'
          alt='avatar'
          src={avatar_url}
        />
        <div className='user-widget__group'>
          <div className='user-widget__data'>
            {first_name} {last_name} {age} years
          </div>
        </div>
      </div>
    );
  }
}

export default UserWidget;
