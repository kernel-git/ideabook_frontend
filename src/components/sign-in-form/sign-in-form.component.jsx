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

  handleSubmit = (event) => {
    event.preventDefault();

    const { email, password } = this.state;
    console.log('email:', email);
    console.log('pass:', password);

    this.props.setCurrentUser(true);
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
        <CustomButton type='submit' handleClick={this.handleSubmit}>Submit</CustomButton>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(SignInForm);
