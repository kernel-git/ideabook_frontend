import React from 'react';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/user/user.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import './user-details.styles.scss';

class UserDetails extends React.Component {
  state = {
    user: {},
  };

  componentDidMount() {
    const { id, currentUser, setCurrentUser } = this.props;

    let status = 0;

    console.log(id);

    fetch(`${process.env.REACT_APP_BACKEND_USERS_SHOW}/${id}`, {
      method: 'GET',
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
        status = response.status;
        return response.json();
      })
      .then((data) => {
        switch (status) {
          case 401:
            setCurrentUser(null);
            break;
          case 200:
            this.setState({ user: data });
            break;
          default:
            console.log(`Unexpected response status: ${status}`);
            console.log(data);
            alert(
              `Unexpected response status: ${status}. More info in console`
            );
        }
      });
  }

  render() {
    const {
      user: {
        avatar_url,
        first_name,
        last_name,
        birth_date,
        email,
        created_at,
      },
    } = this.state;
    return (
      <div className='user-details'>
        <div className='user-details__logo-group'>
          <img className='user-details__logo' alt='avatar' src={avatar_url} />
          <div className='user-details__group'>
            <div className='user-details__data-wrapper'>
              <div className='user-details__label'>First name:</div>
              <div className='user-details__data'>{first_name}</div>
            </div>
            <div className='user-details__data-wrapper'>
              <div className='user-details__label'>Last name:</div>
              <div className='user-details__data'>{last_name}</div>
            </div>
          </div>
        </div>
        <div className='user-details__group'>
          <div className='user-details__data-wrapper'>
            <div className='user-details__label'>Email:</div>
            <div className='user-details__data'>{email}</div>
          </div>
          <div className='user-details__data-wrapper'>
            <div className='user-details__label'>Date of birth:</div>
            <div className='user-details__data'>{birth_date}</div>
          </div>
          <div className='user-details__data-wrapper'>
            <div className='user-details__label'>Created account at:</div>
            <div className='user-details__data'>{created_at}</div>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
