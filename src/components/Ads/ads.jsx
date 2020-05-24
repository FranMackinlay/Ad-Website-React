import React, { Component } from 'react';
import api from '../../services/api';
import Header from '../Header/header';

import Card from '../Card/card';
import FilterForm from '../FilterForm/filterForm';
import './ads.css';

const { getAds, filterAd } = api();

export const listOfAds = async () => {
	const ads = await getAds();
	return ads;
};

let filteredAdsArray = [];

export default class Ads extends Component {
	constructor(props) {
		super(props);
		this.state = {
			adsList: [],
			filteredAdsList: null,
		};
	}

	componentDidMount() {
		this.getAdsList();
	}

	getAdsList = async () => {
		const ads = await getAds();
		if (ads.error) {
			alert('No se ha encontrado la lista de anuncios');
			return this.props.history.push('/login');
		} else {
			return this.setState({
				adsList: ads.results,
			});
		}
	};

	filterAds = async (query, value) => {
		const filteredAds = await filterAd(query, value);
		return filteredAds;
	};

	onSubmit = async data => {
		this.onResetFilter();
		const { filterSelect, filterInput } = data;
		console.log(filterSelect, filterInput);
		const adsWithFilter = await this.filterAds(`${filterSelect}`, `${filterInput}`);
		if (adsWithFilter.error) {
			alert('Please type a valid filter');
		} else {
			adsWithFilter.results.forEach(adFiltered => filteredAdsArray.push(adFiltered));
			this.setState({
				filteredAdsList: filteredAdsArray,
			});
		}
		console.log(data);
	};

	onResetFilter = event => {
		console.log('reset filter');

		if (event) {
			event.preventDefault();
		}
		this.setState({
			filteredAdsList: null,
		});

		filteredAdsArray = [];
	};

	renderAdList = adsList => adsList.map(ad => <Card key={ad._id} ad={ad} />);

	renderFilteredAdsList = filteredAdsList => filteredAdsList.map(ad => <Card key={ad._id} ad={ad} />);

	render() {
		console.log('render');
		const { adsList, filteredAdsList } = this.state;
		console.log(adsList, filteredAdsList);
		if (!adsList) return <h1>Loading Ads...</h1>;
		return (
			<div className='content-container'>
				<Header />
				<FilterForm onSubmit={this.onSubmit} onResetFilter={this.onResetFilter} />
				<div className='ads-container'>
					<ul>{filteredAdsList === null ? this.renderAdList(adsList) : this.renderFilteredAdsList(filteredAdsList)}</ul>
				</div>
			</div>
		);
	}
}
