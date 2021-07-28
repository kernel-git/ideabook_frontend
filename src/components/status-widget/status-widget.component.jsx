import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setCurrentUser } from '../../redux/user/user.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import './status-widget.styles.scss';

class StatusWidget extends React.Component {
  state = {
    user: {},
  };

  componentDidMount() {
    const { currentUser, setCurrentUser } = this.props;

    let status = 0;
    fetch(`${process.env.REACT_APP_BACKEND_PATH}/users/${currentUser.id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: currentUser.jwtData,
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
            const { avatar_url, first_name, last_name, role } = data;
            console.log(data);
            let color = 'inherit';
            if (role === 'superadmin') color = 'red';
            else if (role === 'admin') color = 'blue';

            this.setState({
              user: {
                avatarUrl: avatar_url,
                firstName: first_name,
                lastName: last_name,
                color: color,
              },
            });
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
    const { currentUser, history } = this.props;
    const {
      user: { avatarUrl, firstName, lastName, color },
    } = this.state;
    return (
      <div
        className='status-widget'
        onClick={() => history.push(`/users/${currentUser.id}`)}
      >
        <img className='status-widget__logo' alt='avatar' src={avatarUrl} />
        <div
          className='status-widget__data'
          style={{ color: color ? color : '' }}
        >
          {firstName} {lastName}
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(StatusWidget)
);
