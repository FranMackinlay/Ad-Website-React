import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from "react-router-dom";
import filterParams from '../../const/filterParams'
import '../../App.css';

const { getAds, filterAd } = api();

export const listOfAds = async () => {
  const ads = await getAds();
  return ads;
}

let filteredAdsArray = [];

export default class Ads extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adsList: [],
      filterInput: '',
      filterSelect: filterParams[0].id,
      filteredAdsList: null
    }
    this.fetchAds();
  }

  fetchAds = async () => {
    this.getAdsList();
  }

  getAdsList = async () => {
    const ads = await getAds();
    this.setState({
      adsList: ads
    })
    return ads;
  }
  onType = event => {
    this.setState({
      filterInput: event.target.value
    });
  };

  filterAds = async (query, value) => {
    const filteredAds = await filterAd(query, value);
    return filteredAds;
  }
  onSelect = event => {
    this.setState({
      filterSelect: event.target.value
    });
  };
  onSubmit = async event => {
    event.preventDefault();
    const adsWithFilter = await this.filterAds(`${this.state.filterSelect}`, `${this.state.filterInput}`);
    console.log(adsWithFilter);
    adsWithFilter.map(adFiltered => {
      filteredAdsArray.push(adFiltered);
    });
    this.setState({
      filteredAdsList: filteredAdsArray
    });
    console.log(this.state.filteredAdsList);


  }
  onResetFilter = event => {
    event.preventDefault();
    this.setState({
      filteredAdsList: null
    });
    filteredAdsArray = [];
    console.log(this.state.filteredAdsList);
  }

  render() {
    this.fetchAds();
    const { adsList, filteredAdsList } = this.state;

    if (filteredAdsList === null) {
      return (
        <div>
          <h1>Anuncios</h1>
          <Link to="/createAd">
            <button className="create-ad">Crear Anuncio</button>
          </Link>
          <form onSubmit={this.onSubmit}>
            <select name="" id="" onChange={this.onSelect}>
              {filterParams.map(param => {
                return <option value={param.id}>{param.param}</option>
              })}
            </select>
            <input onChange={this.onType} type="text" />
            <button type="submit">Buscar</button>
          </form>
          <button onClick={this.onResetFilter}>Eliminar Filtro</button>
          <ul>

            {adsList.map(ad => {
              return (
                <Link to={`/detail/${ad._id}`}>
                  <li key={ad._id}>
                    <img src={ad.photo} alt="AdImage" />
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
    } else {
      return (
        <div>
          <h1>Anuncios</h1>
          <Link to="/createAd">
            <button className="create-ad">Crear Anuncio</button>
          </Link>
          <form onSubmit={this.onSubmit}>
            <select name="" id="" onChange={this.onSelect}>
              {filterParams.map(param => {
                return <option value={param.id}>{param.param}</option>
              })}
            </select>
            <input onChange={this.onType} type="text" />
            <button type="submit">Buscar</button>
          </form>
          <button onClick={this.onResetFilter}>Eliminar Filtro</button>
          <ul>

            {filteredAdsList.map(ad => {
              return (
                <Link to={`/detail/${ad._id}`}>
                  <li key={ad._id}>
                    <img src={ad.photo} alt="AdImage" />
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


}