import React, { Component, Fragment } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import filterParams from '../../const/filterParams';
import './filterForm.css';

export default class FilterForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filterSelect: filterParams[0].value,
			filterInput: '',
		};
	}

	submit = event => {
		event.preventDefault();
		this.props.onSubmit(this.state);
		this.setState({
			filterInput: '',
		});
	};

	onSelect = event => {
		this.setState({
			filterSelect: event.target.value,
		});
	};

	onType = event => {
		this.setState({
			filterInput: event.target.value,
		});
	};

	reset = () => {
		this.props.onResetFilter();
	};

	render() {
		return (
			<Fragment>
				<form className='search-form' onSubmit={this.submit}>
					<Dropdown value={this.state.filterSelect} options={filterParams} onChange={this.onSelect} />
					<span className='p-float-label'>
						<InputText id='float-input' value={this.state.filterInput} type='text' size={30} onChange={this.onType} />
						<label htmlFor='float-input'>Search..</label>
					</span>
					<Button label='Search' className='p-button-raised p-button-rounded' type='submit' />
				</form>
				<Button label='Clear' className='p-button-raised p-button-rounded' onClick={this.reset} />
			</Fragment>
		);
	}
}
