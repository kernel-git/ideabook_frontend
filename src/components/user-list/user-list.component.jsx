import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setCurrentUser } from '../../redux/user/user.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import ObjectWidget from '../object-widget/object-widget.component';

import './user-list.styles.scss';

class UserList extends React.Component {
  state = {
    users: [],
  };

  componentDidMount() {
    const { currentUser, setCurrentUser } = this.props;

    let status = 0;

    fetch(`${process.env.REACT_APP_BACKEND_PATH}/users`, {
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
            this.setState({
              users: data.map(
                ({ id, avatar_url, first_name, last_name, birth_date }) => ({
                  id,
                  avatarUrl: avatar_url,
                  firstName: first_name,
                  lastName: last_name,
                  age:
                    new Date(
                      new Date() - Date.parse(birth_date)
                    ).getFullYear() -
                    1970 +
                    ' years',
                })
              ),
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
    const { users } = this.state;
    const { history } = this.props;
    return (
      <div className='user-list'>
        {users.map(({ id, avatarUrl, firstName, lastName, age }) => (
          <ObjectWidget
            key={id}
            logoUrl={avatarUrl}
            upperGroup={[firstName, lastName, age]}
            handleClick={() => history.push(`/users/${id}`)}
            handleEdit={() => history.push(`/users/${id}/edit`)}
          />
        ))}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserList));
