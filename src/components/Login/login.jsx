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

  handleInput = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    });
  };

  onSubmit = async event => {
    event.preventDefault();
    const { email, password } = this.state;

    const { token, message } = await login(email, password);

    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', email);
    }
    if (message) {
      alert(message);
      this.goToRegistration();
    } else {
      this.props.history.push({
        pathname: '/anuncios',
        state: { token }
      })
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
          <input type='text' onChange={this.handleInput} name='email' placeholder='Username..' required />
          <input type='password' onChange={this.handleInput} name='password' placeholder='Password..' required />
          <button type='submit'>Log In</button>
          <Link to='/register'>
            <button className='create-account'>Don't have an account?</button>
          </Link>
        </form>
      </div>
    );
  }
}
