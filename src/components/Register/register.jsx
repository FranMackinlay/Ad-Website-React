import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './register.css';

const { register } = api();

export default class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userInput: '',
			passInput: '',
			error: false,
		};
	}

	userTyping = event => {
		this.setState({
			userInput: event.target.value,
		});
	};

	passTyping = event => {
		this.setState({
			passInput: event.target.value,
		});
	};

	onSubmit = async event => {
		event.preventDefault();
		const { userInput, passInput } = this.state;
		const isRegistered = await register(userInput, passInput);

		if (isRegistered.error) {
			this.setState({
				error: true,
			});
			alert(isRegistered.error);
		} else {
			this.props.history.push('/login');
		}
	};

	goToLogin = () => {
		this.props.history.push('/login');
	};

	render() {
		return (
			<div className='registration'>
				<h1>Create Account</h1>

				<form onSubmit={this.onSubmit}>
					<input type='text' onChange={this.userTyping} placeholder='Username..' required />
					<p className={this.state.error ? 'user-taken' : 'user'}>User already taken, try another one</p>
					<input type='password' onChange={this.passTyping} placeholder='Password..' required />
					<button type='submit'>Register</button>
					<Link to='/login'>
						<button className='has-account'>Already have an account?</button>
					</Link>
				</form>
			</div>
		);
	}
}
