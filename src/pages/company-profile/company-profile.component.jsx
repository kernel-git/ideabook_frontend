import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ObjectDetails from '../../components/object-details/object-details.component';
import { setCurrentUser } from '../../redux/user/user.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import './company-profile.styles.scss';

class CompanyProfilePage extends React.Component {
  state = {
    company: {},
  };

  componentDidMount() {
    const { match, currentUser, setCurrentUser } = this.props;

    let status = 0;

    fetch(
      `${process.env.REACT_APP_BACKEND_PATH}/companies/${match.params.id}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: currentUser['jwtData'],
        },
      }
    )
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
              company: {
                avatarUrl: avatar_url,
                name,
                slogan,
                description,
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
      company: { avatarUrl, name, slogan, description },
    } = this.state;
    return (
      <div className='company-profile-page'>
        <ObjectDetails
          logoUrl={avatarUrl}
          mainGroup={[{ data: name }]}
          extraGroup={[
            { label: 'Slogan', data: slogan },
            { label: 'Description', data: description },
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
  connect(mapStateToProps, mapDispatchToProps)(CompanyProfilePage)
);
