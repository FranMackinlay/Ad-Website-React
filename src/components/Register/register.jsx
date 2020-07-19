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
    const { error } = await register(email, password);

    if (error) {
      this.setState({
        error: true,
      });
    } else {
      alert('User created successfully');
      this.goToLogin();
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
          <input type='text' onChange={this.handleInput} name='email' placeholder='Username..' required />
          <p className={this.state.error ? 'user-taken' : 'user'}>User already taken, try another one</p>
          <input type='password' onChange={this.handleInput} name='password' placeholder='Password..' required />
          <button type='submit'>Register</button>
          <Link to='/login'>
            <button className='has-account'>Already have an account?</button>
          </Link>
        </form>
      </div>
    );
  }
}
