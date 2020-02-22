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


  onSubmit = async event => {
    event.preventDefault();
    const { userInput, passInput } = this.state;

    const isLoginOk = await login(userInput, passInput);

    if (isLoginOk === 'Error: User not found') {
      alert(isLoginOk);
      this.props.history.push('/register');
    } else {
      this.props.history.push('/anuncios');
    }

  }
  goToRegistration = () => {
    this.props.history.push('/register');
  }

  render() {

    return (
      <div className="login">
        <h1>Iniciar Sesion</h1>
        <form onSubmit={this.onSubmit}>
          <input type="text" onChange={this.userTyping} placeholder="Username.." />
          <input type="password" onChange={this.passTyping} placeholder="Password.." />
          <button type="submit">Iniciar Sesion</button>
          <button onClick={this.goToRegistration}>No tienes una cuenta?</button>
        </form>
      </div>
    )
  }
}
