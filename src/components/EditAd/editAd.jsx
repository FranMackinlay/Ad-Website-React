import React, { Component } from 'react';
import api from '../../services/api';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Growl } from 'primereact/growl';
import Loading from '../Loading/Loading';
import './editAd.css';

const { getAdDetail, editAd } = api();

export default class EditAd extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			price: 0,
			description: '',
			tags: null,
			type: '',
			photo: '',
		};
		const id = this.props.match.params._id;
		this.getDetailAd(id);
	}

	getDetailAd = async id => {
		const detailAd = await getAdDetail(id);
		this.setState({
			name: detailAd.result.name,
			price: detailAd.result.price,
			description: detailAd.result.description,
			tags: detailAd.result.tags,
			type: detailAd.result.type,
			photo: detailAd.result.photo,
		});
		return detailAd;
	};

	handleInput = event => {
		const name = event.target.name;
		const value = event.target.value;

		if (name === 'tags') {
			const splittedValue = value.split(',');
			this.setState({
				tags: splittedValue,
			});
		} else {
			this.setState({
				[name]: value,
			});
		}
	};

	onSubmit = async event => {
		event.preventDefault();
		const { name, price, description, tags, type, photo } = this.state;
		const { error } = await editAd(this.props.match.params._id, name, price, description, tags, type, photo);
		if (error) {
			this.props.history.push({
				pathname: '/anuncios',
				state: { isAdEditedSuccesfully: false },
			});
		} else {
			this.props.history.push({
				pathname: '/anuncios',
				state: { isAdEditedSuccesfully: true },
			});
		}
	};

	render() {
		const { name, price, description, tags, type, photo } = this.state;
		if (!photo) return <Loading></Loading>;
		return (
			<div>
				<Link className='back-to-ads' to='/anuncios'>
					<Button id='back-btn' label='Back' className='p-button-raised p-button-rounded p-button-secondary' />
				</Link>
				<form className='edit-ad-form' onSubmit={this.onSubmit}>
					<div className='edit-name'>
						<label htmlFor='name'>Ad Name:</label>
						<InputText id='name' value={name} onChange={this.handleInput} name='name' type='text' placeholder='Ad Name' required />
					</div>
					<div className='edit-price'>
						<label htmlFor='price'>Price:</label>
						<InputText id='price' value={price} keyfilter='pint' onChange={this.handleInput} name='price' type='text' placeholder='Ad Price' required />
					</div>
					<div className='edit-description'>
						<label htmlFor='description'>Description:</label>
						<InputText id='description' value={description} onChange={this.handleInput} name='description' type='text' placeholder='Ad Description' required />
					</div>
					<div className='edit-tags'>
						<label htmlFor='tags'>Tags:</label>
						<InputText id='tags' value={tags} onChange={this.handleInput} name='tags' type='text' placeholder='Ad Tags' />
					</div>
					<div className='edit-type'>
						<label htmlFor='type'>Type:</label>
						<InputText id='type' value={type} onChange={this.handleInput} name='type' type='text' placeholder='Buy or Sell' required />
					</div>
					<div className='edit-photo'>
						<label htmlFor='photo'>Photo:</label>
						<InputText id='photo' value={photo} onChange={this.handleInput} name='photo' type='text' placeholder='Ad Photo' required />
					</div>
					<Button id='edit-ad-btn' label='Save Changes' type='submit' className='p-button-raised p-button-success' />
				</form>
				<br />
				<Growl ref={el => (this.growl = el)} />
			</div>
		);
	}
}
