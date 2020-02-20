import React, { Component } from 'react';
import api from '../../services/api';
import '../../App.css';

const { getAds } = api();

export default class Ads extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adsList: []
    }
    this.getAdsList();

  }


  getAdsList = async () => {
    const ads = await getAds();
    console.log(ads);
    this.setState({
      adsList: ads
    })
    return ads;
  }

  render() {
    const { adsList } = this.state;

    return (
      <div>
        <h1>Anuncios</h1>
        <ul>
          {adsList.map(ad => {
            return (
              <li key={ad._id}>
                <p>{ad.name}</p>
                <p>{ad.price}</p>
                <p>{ad.type}</p>
                <p>{ad.description}</p>
              </li>
            )
          }
          )}
        </ul>
      </div>
    )
  }


}
