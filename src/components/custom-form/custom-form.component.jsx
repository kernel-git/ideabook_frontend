import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';

import './custom-form.styles.scss';

class CustomForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = Object.fromEntries(
      Object.entries(props.fields).map(([name, { value }]) => ([name, '']))
    );
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fields !== this.props.fields) {
      this.setState(Object.fromEntries(
        Object.entries(this.props.fields).map(([name, { value }]) => {
          value = value ? value : '';
          return [name, value];
        })
      ));
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { title, fields, submitText, handleSubmit } = this.props;
    return (
      <div className='form'>
        {title ? <div className='form__title'>{title}</div> : null}
        <div className='form__content'>
          {Object.entries(fields).map(([name, { label, type, value }]) => (
            <FormInput
              key={name}
              name={name}
              type={type ? type : 'text'}
              label={label ? label : name}
              value={this.state[name]}
              handleChange={this.handleChange}
            />
          ))}
        </div>
        <CustomButton type='submit' handleClick={(event) => handleSubmit(event, this.state)}>
          {submitText ? submitText : 'Submit'}
        </CustomButton>
      </div>
    );
  }
}

export default CustomForm;
