import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ObjectDetails from '../../components/object-details/object-details.component';
import ObjectWidget from '../../components/object-widget/object-widget.component';
import { setCurrentUser } from '../../redux/user/user.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import './user-profile.styles.scss';

class UserProfilePage extends React.Component {
  state = {
    user: { company: {} },
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
            const {
              avatar_url,
              first_name,
              last_name,
              birth_date,
              email,
              created_at,
              company,
            } = data;
            this.setState({
              user: {
                avatarUrl: avatar_url,
                firstName: first_name,
                lastName: last_name,
                birthDate: birth_date,
                createdAt: created_at,
                email,
                company: {
                  id: company.id,
                  avatarUrl: company.avatar_url,
                  name: company.name,
                  slogan: company.slogan,
                },
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
    const {
      user: {
        avatarUrl,
        firstName,
        lastName,
        birthDate,
        createdAt,
        email,
        company,
      },
    } = this.state;
    const { history } = this.props;
    return (
      <div className='user-profile-page'>
        <ObjectDetails
          logoUrl={avatarUrl}
          mainGroup={[
            { label: 'First name', data: firstName },
            { label: 'Last name', data: lastName },
          ]}
          extraGroup={[
            { label: 'Email', data: email },
            { label: 'Date of birth', data: birthDate },
            { label: 'Created at', data: createdAt },
          ]}
          additional={[
            {
              label: 'Company-employer',
              data: (
                <ObjectWidget
                  key={company.id}
                  logoUrl={company.avatarUrl}
                  upperGroup={[company.name]}
                  lowerGroup={[company.slogan]}
                  handleClick={() => history.push(`/companies/${company.id}`)}
                  handleEdit={() =>
                    history.push(`/companies/${company.id}/edit`)
                  }
                />
              ),
            },
          ]}
        />
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
  connect(mapStateToProps, mapDispatchToProps)(UserProfilePage)
);
