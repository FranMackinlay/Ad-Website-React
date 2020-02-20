import React, { Component } from 'react';
import api from '../../services/api'

const { login } = api();

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


  onSubmit = event => {
    event.preventDefault();
    const { userInput, passInput } = this.state;
    console.log(userInput, passInput);
    login(userInput, passInput);
  }

  render() {

    return (
      <div>
        <h1>Iniciar Sesion</h1>
        <form onSubmit={this.onSubmit}>
          <input type="text" onChange={this.userTyping} placeholder="Username.." />
          <input type="password" onChange={this.passTyping} placeholder="Password.." />
          <button type="submit">Iniciar Sesion</button>
        </form>
      </div>
    )
  }
}
