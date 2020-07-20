import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import api from '../../services/api';
import Loading from '../Loading/Loading';
import CardItem from '../Card/CardItem';
import './profile.css';

const { getUser, getUserAds } = api();

export default class Profile extends Component {
  // let header2;
  // if (ad.photo?.includes('data')) {
  //   header2 = <img className='card-image' alt='Ad' src={``} />;
  // }
  constructor(props) {
    super(props);
    this.state = {
      loggedUser: localStorage?.getItem('user'),
      token: localStorage?.getItem('token'),
    }
  }

  componentDidMount() {
    this.findUser();
    this.findUserAds();
  }

  findUser = async () => {
    const { loggedUser } = this.state;
    const { user } = await getUser(loggedUser);
    this.setState({
      user: user.email.split('@')[0],
    });
  }

  findUserAds = async () => {
    const { token, loggedUser } = this.state;
    const { userAds } = await getUserAds(token, loggedUser);
    console.log('USERADS', userAds);
    this.setState({
      ads: userAds,
    });
  }

  renderUserAds = userAds => userAds.map(ad => <CardItem isUserAd={true} key={ad._id} ad={ad} {...this.props} />);

  render() {
    const { user, ads } = this.state;
    console.log('ADS', ads)
    if (!ads) return <Loading></Loading>;
    return (
      <Card className="user-card">
        <div className="username">
          <h1>Username: {user}</h1>
          <h4>My Ads:</h4>
          <div className="user-ads-card">
            {ads ? this.renderUserAds(ads) : ''}
          </div>
        </div>
      </Card>
    );
  }
}
