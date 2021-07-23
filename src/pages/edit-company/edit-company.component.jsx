import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CustomForm from '../../components/custom-form/custom-form.component';

import { selectCurrentUser } from '../../redux/user/user.selectors';

import './edit-company.styles.scss';

class EditCompanyPage extends React.Component {
  state = {
    avatarUrl: '',
    name: '',
    slogan: '',
    description: '',
  };

  componentDidMount() {
    const { match, currentUser, setCurrentUser } = this.props;

    let status = 0;

    fetch(`${process.env.REACT_APP_BACKEND_PATH}/companies/${match.params.id}`, {
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
            const { avatar_url, name, slogan, description } = data;
            this.setState({
                avatarUrl: avatar_url,
                name,
                slogan,
                description,
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
    const { avatarUrl, name, slogan, description } =
      innerState;

    let status = 0;

    fetch(`${process.env.REACT_APP_BACKEND_PATH}/companies/${match.params.id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        Authorization: currentUser['jwtData'],
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        company: {
          avatar_url: avatarUrl,
          name: name,
          slogan: slogan,
          description: description,
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
            history.push(`/companies/${match.params.id}`);
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
    const { avatarUrl, name, slogan, description } = this.state;
    return (
      <div className='edit-company-page'>
        <CustomForm
          title='Edit company data'
          fields={{
            avatarUrl: { label: 'avatar url', value: avatarUrl },
            name: { value: name },
            slogan: { value: slogan },
            description: { value: description },
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
  connect(mapStateToProps, mapDispatchToProps)(EditCompanyPage)
);
