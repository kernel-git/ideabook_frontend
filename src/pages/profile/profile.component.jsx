import React from 'react';
import { withRouter } from 'react-router';
import UserDetails from '../../components/user-details/user-details.component';

import './profile.styles.scss';

const ProfilePage = ({ match }) => {
  return(
    <div className='profile-page'>
      <UserDetails id={match.params.id} />
    </div>
  );
}

export default withRouter(ProfilePage);
