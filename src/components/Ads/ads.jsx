import React, { Component } from 'react';
import api from '../../services/api';
import Header from '../Header/header';
import filterParams from '../../const/filterParams';
import Card from '../Card/card';
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
			filterInput: '',
			filterSelect: filterParams[0].id,
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

	onType = event => {
		const value = event.target.value;
		if (value === 'buy') {
			this.setState({
				filterInput: false,
			});
		} else if (value === 'sell') {
			this.setState({
				filterInput: true,
			});
		} else {
			this.setState({
				filterInput: event.target.value,
			});
		}
	};

	filterAds = async (query, value) => {
		const filteredAds = await filterAd(query, value);
		return filteredAds;
	};

	onSelect = event => {
		this.setState({
			filterSelect: event.target.value,
		});
	};

	onSubmit = async event => {
		event.preventDefault();
		this.onResetFilter();
		const adsWithFilter = await this.filterAds(`${this.state.filterSelect}`, `${this.state.filterInput}`);
		if (adsWithFilter.error) {
			alert('Please type a valid filter');
		} else {
			adsWithFilter.results.map(adFiltered => {
				return filteredAdsArray.push(adFiltered);
			});
			this.setState({
				filteredAdsList: filteredAdsArray,
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

		filteredAdsArray = [];
	};

	renderAdList = adsList => adsList.map(ad => <Card key={ad._id} ad={ad} />);

	renderFilteredAdsList = filteredAdsList => filteredAdsList.map(ad => <Card key={ad._id} ad={ad} />);

	render() {
		const { adsList, filteredAdsList } = this.state;
		if (!adsList) return <h1>Loading Ads...</h1>;
		return (
			<div className='content-container'>
				<Header />
				<form className='ads-form' onSubmit={this.onSubmit}>
					<select className='select-form' onChange={this.onSelect}>
						{filterParams.map(({ id, param }) => {
							return (
								<option key={id} value={id}>
									{param}
								</option>
							);
						})}
					</select>
					<input className='input-form' onChange={this.onType} type='text' />
					<button className='search-form' type='submit'>
						Search
					</button>
					<button className='reset-form' onClick={this.onResetFilter}>
						Reset
					</button>
				</form>
				<div className='ads-container'>
					<ul>{filteredAdsList === null ? this.renderAdList(adsList) : this.renderFilteredAdsList(filteredAdsList)}</ul>
				</div>
			</div>
		);
	}
}
