import React, { Component } from 'react';
import api from '../../services/api';
import Navbar from '../Navbar/Navbar';
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
		this.getAdsList();
	}

	getAdsList = async () => {
		const { results, error } = await getAds();
		if (error) {
			return this.setState({
				adList: false,
			});
		} else {
			return this.setState({
				adsList: results,
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

	renderAdList = adsList => adsList.map(ad => <CardItem key={ad._id} ad={ad} {...this.props} />);

	renderFilteredAdsList = filteredAdsList => filteredAdsList.map(ad => <CardItem key={ad._id} ad={ad} {...this.props} />);

	render() {
		const { adsList, filteredAdsList } = this.state;
		if (!adsList) {
			return <Loading onSubmit={this.onSubmit} onResetFilter={this.onResetFilter} {...this.props} />;
		}
		return (
			<div className='content-container'>
				<Navbar onSubmit={this.onSubmit} onResetFilter={this.onResetFilter} />

				<div className='ads-container'>
					<ul className='p-grid p-justify-center'>{filteredAdsList === null ? this.renderAdList(adsList) : this.renderFilteredAdsList(filteredAdsList)}</ul>
				</div>
			</div>
		);
	}
}
