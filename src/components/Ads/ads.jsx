import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from "react-router-dom";
import '../../App.css';

const { getAds } = api();

export const listOfAds = async () => {
  const ads = await getAds();
  return ads;
}

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
              <Link to={`/detail/${ad._id}`}>
                <li key={ad._id}>
                  <img src={ad.photo} alt="Ad Image" />
                  <p>{ad.name}</p>
                  <p>{ad.price}</p>
                  <p>{ad.type}</p>
                  <p>{ad.description}</p>
                </li>
              </Link>
            )
          }
          )}
        </ul>
      </div>
    )
  }


}
