import React, { Component } from 'react';
import api from '../../services/api';

const { getAds } = api();

export default class Ads extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ads: []
    }

  }


  getAdsList = async () => {
    const ads = await getAds();
    this.setState({
      adList: ads
    })
    return ads;
  }

  render() {
    const { ads } = this.state;

    console.log(ads);


    return (
      <div>
        <h1>Anuncios</h1>
        <ul>

        </ul>
      </div>
    )
  }


}
