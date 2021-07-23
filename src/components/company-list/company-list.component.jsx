import React from 'react';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/user/user.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import ObjectWidget from '../object-widget/object-widget.component';

import './company-list.styles.scss';

class CompanyList extends React.Component {
  state = {
    companies: [],
  };

  componentDidMount() {
    const { currentUser, setCurrentUser } = this.props;

    let status = 0;

    fetch(`${process.env.REACT_APP_BACKEND_PATH}/companies`, {
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
              companies: data.map(({ id, avatar_url, name, slogan }) => ({
                id,
                avatarUrl: avatar_url,
                name,
                slogan,
              })),
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
    const { companies } = this.state;
    return (
      <div className='company-list'>
        {companies.map(({ id, avatarUrl, name, slogan }) => (
          <ObjectWidget
            key={id}
            logoUrl={avatarUrl}
            upperGroup={[name]}
            lowerGroup={[slogan]}
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

export default connect(mapStateToProps, mapDispatchToProps)(CompanyList);
