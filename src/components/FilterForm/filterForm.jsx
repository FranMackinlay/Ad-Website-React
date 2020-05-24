import React, { Component, Fragment } from 'react';
import filterParams from '../../const/filterParams';
import './filterForm.css';

export default class FilterForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filterSelect: filterParams[0].id,
			filterInput: '',
		};
	}

	submit = event => {
		event.preventDefault();
		this.props.onSubmit(this.state);
	};

	onSelect = event => {
		this.setState({
			filterSelect: event.target.value,
		});
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

	reset = () => {
		this.props.onResetFilter();
	};

	render() {
		return (
			<div className='form-container'>
				<form className='ads-form' onSubmit={this.submit}>
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
				</form>
				<button className='reset-form' onClick={this.reset}>
					Reset
				</button>
			</div>
		);
	}
}
