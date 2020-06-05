import React, { Component } from 'react';
import api from '../../services/api';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Growl } from 'primereact/growl';
import './createAd.css';

const { createAd } = api();

export default class CreateAd extends Component {
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
	}

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
		const { error } = await createAd(name, price, description, tags, type, photo);
		if (error) {
			this.props.history.push({
				pathname: '/anuncios',
				state: { isAdCreatedSuccesfully: false },
			});
		} else {
			this.props.history.push({
				pathname: '/anuncios',
				state: { isAdCreatedSuccesfully: true },
			});
		}
	};

	render() {
		return (
			<div>
				<Link className='back-to-ads' to='/anuncios'>
					<Button id='back-btn' label='Back' className='p-button-raised p-button-rounded p-button-secondary' />
				</Link>
				<form className='create-ad-form' onSubmit={this.onSubmit}>
					<div className='create-name'>
						<label htmlFor='name'>Ad Name:</label>
						<InputText id='name' onChange={this.handleInput} name='name' type='text' placeholder='Ad Name' required />
					</div>
					<div className='create-price'>
						<label htmlFor='price'>Price:</label>
						<InputText id='price' keyfilter='pint' onChange={this.handleInput} name='price' type='text' placeholder='Ad Price' required />
					</div>
					<div className='create-description'>
						<label htmlFor='description'>Description:</label>
						<InputText id='description' onChange={this.handleInput} name='description' type='text' placeholder='Ad Description' required />
					</div>
					<div className='create-tags'>
						<label htmlFor='tags'>Tags:</label>
						<InputText id='tags' onChange={this.handleInput} name='tags' type='text' placeholder='Ad Tags' />
					</div>
					<div className='create-type'>
						<label htmlFor='type'>Type:</label>
						<InputText id='type' onChange={this.handleInput} name='type' type='text' placeholder='Buy or Sell' required />
					</div>
					<div className='create-photo'>
						<label htmlFor='photo'>Photo:</label>
						<InputText id='photo' onChange={this.handleInput} name='photo' type='text' placeholder='Ad Photo' required />
					</div>
					<Button id='create-ad-btn' label='Create Ad' type='submit' className='p-button-raised p-button-success' />
				</form>
				<br />
				<Growl ref={el => console.log(this.growl)} />
			</div>
		);
	}
}
