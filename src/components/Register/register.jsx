import React, { Component } from 'react';
import api from '../../services/api'
import './App.css';

const { register } = api();

export default class Register extends Component {
  state = {
    userInput: '',
    passInput: ''
  }

  userTyping = event => {
    this.setState({
      userInput: event.target.value
    });

  };
  passTyping = event => {
    this.setState({
      passInput: event.target.value
    });

  };


  onSubmit = async event => {
    event.preventDefault();
    const { userInput, passInput } = this.state;
    const isRegistered = await register(userInput, passInput);
    console.log(isRegistered);

    if (isRegistered == true) {
      this.props.history.push('/login');
    } else {

    }

  }

  render() {

    return (
      <div>
        <h1>Crear una cuenta</h1>
        <p className="user-taken">Usuario ya registrado</p>
        <form onSubmit={this.onSubmit}>
          <input type="text" onChange={this.userTyping} placeholder="Username.." />
          <input type="password" onChange={this.passTyping} placeholder="Password.." />
          <button type="submit">Registrarse</button>
        </form>
      </div>
    )
  }
}
