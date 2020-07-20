import React, { Component } from 'react';
import api from '../../services/api';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import Loading from '../Loading/Loading';

import CardItem from '../Card/CardItem';

import './ads.css';

const { getAds, filterAd } = api();

export const listOfAds = async () => {
  const ads = await getAds();
  return ads;
};

export default class Ads extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adsList: false,
      filteredAdsList: null,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.setState({
        token
      });
    }
    this.getAdsList(token);
  }

  getAdsList = async token => {
    const result = await getAds(token);
    console.log('RESULT', result);
    if (!result) {
      return this.setState({
        adList: false,
      });
    } else {
      return this.setState({
        adsList: result,
      });
    }
  };

  onSubmit = async data => {
    this.onResetFilter();
    const { filterSelect, filterInput } = data;
    const { results, error } = await filterAd(`${filterSelect}`, `${filterInput}`);

    if (error) {
      alert('Please type a valid filter');
    } else {
      this.setState({
        filteredAdsList: results,
      });
    }
  };


  onResetFilter = event => {
    if (event) {
      event.preventDefault();
    }
    this.setState({
      filteredAdsList: null,
    });
  };

  renderAdList = adsList => adsList.map(ad => {
    return <CardItem key={ad._id} ad={ad} {...this.props} />
  });

  renderFilteredAdsList = filteredAdsList => filteredAdsList.map(ad => <CardItem key={ad._id} ad={ad} {...this.props} />);

  render() {
    const { adsList, filteredAdsList } = this.state;
    if (!adsList) {
      return <Loading onSubmit={this.onSubmit} onResetFilter={this.onResetFilter} {...this.props} />;
    }
    return (
      <div className='content-container'>
        <div className='header-navbar-container'>
          <Navbar onSubmit={this.onSubmit} onResetFilter={this.onResetFilter} />
          <Header />
        </div>
        <div className='ads-container'>
          <ul className='p-grid p-justify-center'>{filteredAdsList === null ? this.renderAdList(adsList) : this.renderFilteredAdsList(filteredAdsList)}</ul>
        </div>
      </div>
    );
  }
}
