import React, { Component } from 'react';
import api from '../../services/api';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import Loading from '../Loading/Loading';
import { Growl } from 'primereact/growl';

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
	componentDidUpdate() {
		if (this.props.location.state) {
			switch (this.props.location.state.isAdCreatedSuccesfully) {
				case true:
					this.showSuccess();
					break;
				case false:
					this.showError();
					break;
				default:
					break;
			}
		}
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

	showSuccess = () => {
		console.log(this);

		this.growl.show({ severity: 'success', summary: 'Congratulations!', detail: 'Ad Created successfully!' });
	};

	showError = () => {
		this.growl.show({ severity: 'error', summary: 'Error', detail: 'An error ocurred, try again.' });
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
				<div className='header-navbar-container'>
					<Navbar onSubmit={this.onSubmit} onResetFilter={this.onResetFilter} />
					<Header />
				</div>
				<div className='ads-container'>
					<ul className='p-grid p-justify-center'>{filteredAdsList === null ? this.renderAdList(adsList) : this.renderFilteredAdsList(filteredAdsList)}</ul>
				</div>
				<Growl ref={el => (this.growl = el)} />
			</div>
		);
	}
}
