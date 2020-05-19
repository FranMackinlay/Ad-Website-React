import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './login.css';

const { login } = api();

export default class Register extends Component {
	state = {
		userInput: '',
		passInput: '',
	};

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

		const isLoginOk = await login(userInput, passInput);

		if (isLoginOk.error) {
			alert(isLoginOk.error);
			this.goToRegistration();
		} else {
			this.props.history.push('/anuncios');
		}
	};

	goToRegistration = () => {
		this.props.history.push('/register');
	};

	render() {
		return (
			<div className='login'>
				<h1>Login</h1>
				<form onSubmit={this.onSubmit}>
					<input type='text' onChange={this.userTyping} placeholder='Username..' required />
					<input type='password' onChange={this.passTyping} placeholder='Password..' required />
					<button type='submit'>Log In</button>
					<Link to='/register'>
						<button className='create-account'>Don't have an account?</button>
					</Link>
				</form>
			</div>
		);
	}
}
