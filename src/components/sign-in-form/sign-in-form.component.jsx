import React from 'react';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/user/user.actions';
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';

import './sign-in-form.styles.scss';

class SignInForm extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = this.state;
    console.log('email:', email);
    console.log('pass:', password);

    console.log('Waiting for API response...');

    let status = 0
    let jwtData = ''

    fetch(`${process.env.REACT_APP_BACKEND_SIGN_IN_PATH}`, {
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
        status = response.status
        if (status === 200) {
          jwtData = response.headers.get('authorization');
        }
        return response.json();
      })
      .then((data) => {
        switch(status) {
          case 200:
            this.props.setCurrentUser({ id: data['user_id'], jwtData });
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
      <div className='form'>
        <div className='form__title'>Sign in</div>
        <div className='form__content'>
          <FormInput
            name='email'
            type='email'
            label='email'
            handleChange={this.handleChange}
          />
          <FormInput
            name='password'
            type='password'
            label='password'
            handleChange={this.handleChange}
          />
        </div>
        <CustomButton type='submit' handleClick={this.handleSubmit}>
          Submit
        </CustomButton>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(SignInForm);
