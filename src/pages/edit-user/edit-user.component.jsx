import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CustomForm from '../../components/custom-form/custom-form.component';

import { selectCurrentUser } from '../../redux/user/user.selectors';

import './edit-user.styles.scss';

class EditUserPage extends React.Component {
  state = {
    avatarUrl: '',
    firstName: '',
    lastName: '',
    email: '',
  };

  componentDidMount() {
    const { match, currentUser, setCurrentUser } = this.props;

    let status = 0;

    fetch(`${process.env.REACT_APP_BACKEND_PATH}/users/${match.params.id}`, {
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
            const { avatar_url, first_name, last_name, email } = data;
            this.setState({
                avatarUrl: avatar_url,
                firstName: first_name,
                lastName: last_name,
                email: email,
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

  handleSubmit = async (event, innerState) => {
    event.preventDefault();

    const { match, currentUser, setCurrentUser, history } = this.props;
    const { avatarUrl, email, firstName, lastName } =
      innerState;

    let status = 0;

    fetch(`${process.env.REACT_APP_BACKEND_PATH}/users/${match.params.id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        Authorization: currentUser['jwtData'],
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          avatar_url: avatarUrl,
          first_name: firstName,
          last_name: lastName,
          email: email,
        },
      }),
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
            alert('Changed');
            history.push(`/users/${match.params.id}`);
            break;
          default:
            console.log(`Unexpected response status: ${status}`);
            console.log(data);
            alert(
              `Unexpected response status: ${status}. More info in console`
            );
        }
      });
  };

  render() {
    const { avatarUrl, firstName, lastName, email } = this.state;
    return (
      <div className='edit-user-page'>
        <CustomForm
          title='Edit user'
          fields={{
            avatarUrl: { label: 'avatar url', value: avatarUrl },
            firstName: { label: 'first name', value: firstName },
            lastName: { label: 'last name', value: lastName },
            email: { type: 'email', value: email },
          }}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(selectCurrentUser(user)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditUserPage)
);
