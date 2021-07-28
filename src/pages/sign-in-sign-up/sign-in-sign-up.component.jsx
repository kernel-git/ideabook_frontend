import React from 'react';
import { connect } from 'react-redux';
import CustomForm from '../../components/custom-form/custom-form.component';
import { setCurrentUser } from '../../redux/user/user.actions';

import './sign-in-sign-up.styles.scss';

class SignInSignUpPage extends React.Component {
  handleSubmit = async (event, innerState) => {
    event.preventDefault();

    const { email, password } = innerState;
    console.log('email:', email);
    console.log('pass:', password);

    console.log('Waiting for API response...');

    let status = 0;
    let jwtData = '';

    fetch(`${process.env.REACT_APP_BACKEND_PATH}/sign_in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ user: { email, password } }),
    })
      .catch((e) => {
        alert('Request cannot reach ideabook API');
        console.log(e);
      })
      .then((response) => {
        status = response.status;
        if (status === 200) {
          jwtData = response.headers.get('authorization');
        }
        return response.json();
      })
      .then((data) => {
        switch (status) {
          case 200:
            this.props.setCurrentUser({ id: data['user_id'], role: data['user_role'], jwtData });
            break;
          case 401:
            console.log(data);
            alert('Login failed');
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
    return (
      <div className='sign-in-sign-up'>
        <CustomForm
          title='Sign in'
          fields={{ email: { type: 'email' }, password: { type: 'password' } }}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(SignInSignUpPage);
