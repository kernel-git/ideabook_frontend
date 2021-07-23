import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { setCurrentUser } from '../../redux/user/user.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import CustomButton from '../custom-button/custom-button.component';

import './header.styles.scss';
import StatusWidget from '../status-widget/status-widget.component';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { currentUser, setCurrentUser } = this.props;

    fetch(`${process.env.REACT_APP_BACKEND_PATH}/ssign_out`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: currentUser['jwtData'],
      },
    })
      .catch((e) => {
        alert('Request cannot reach ideabook API');
        console.log(e);
      })
      .then((response) => {
        if (response.status === 200) {
          setCurrentUser(null);
        } else {
          alert('Log out failed (possibly because you are already logged out)');
          setCurrentUser(null);
        }
      });
  }

  render() {
    const { currentUser, ...otherProps } = this.props;
    return (
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
            <StatusWidget />
            <CustomButton handleClick={this.handleClick}>Log out</CustomButton>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
