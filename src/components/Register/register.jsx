import React, { Component } from 'react';
import api from '../../services/api'
import '../../App.css';

const { register } = api();

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      passInput: '',
      error: false
    }
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

    if (isRegistered.error) {
      alert(isRegistered.error);
    } else {
      this.props.history.push('/login');
    }



  }
  goToLogin = () => {
    this.props.history.push('/login');
  }

  render() {

    return (
      <div className="registration">
        <h1>Crear una cuenta</h1>

        <form onSubmit={this.onSubmit}>
          <input type="text" onChange={this.userTyping} placeholder="Username.." />
          <input type="password" onChange={this.passTyping} placeholder="Password.." />
          <button type="submit">Registrarse</button>
          <button onClick={this.goToLogin}>Ya tienes una cuenta?</button>
        </form>
        <p className={this.state.error ? 'user-taken' : 'user'}>Usuario ya registrado,
          intente con otro.</p>
      </div>
    )
  }
}
