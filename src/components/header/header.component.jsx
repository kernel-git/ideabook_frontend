import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { setCurrentUser } from '../../redux/user/user.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import CustomButton from '../custom-button/custom-button.component';

import './header.styles.scss';

const Header = ({ currentUser, setCurrentUser, ...otherProps }) => (
  <div className={`header ${!currentUser ? 'header_centered' : ''}`}>
    <div
      className='header__logo'
      onClick={() => {
        if (currentUser) otherProps.history.push('/');
      }}
    >
      IdeaBook
    </div>
    {currentUser ? (
      <div className='header__user-group'>
        <div className='header__status'>You are logged in</div>
        <CustomButton handleClick={() => setCurrentUser(null)}>
          Log out
        </CustomButton>
      </div>
    ) : null}
  </div>
);

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
