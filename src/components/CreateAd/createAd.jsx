import React, { Component } from 'react';
import api from '../../services/api';

const { createAd } = api();

const tagsArray = [];

export default class CreateAd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: 0,
      description: '',
      tags: null,
      type: '',
      photo: ''
    }
  }

  handleInput = event => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === 'tags') {
      const splittedValue = value.split(',');
      console.log(splittedValue);
      this.setState({
        tags: splittedValue
      })
    } else {
      this.setState({
        [name]: value
      });
    }
  }



  onSubmit = async event => {
    event.preventDefault();
    console.log(this.state);
    const { name, price, description, type, photo } = this.state;
    await createAd(name, price, description, type, photo);
  }

  render() {

    return (
      <form onSubmit={this.onSubmit}>
        <input onChange={this.handleInput} name="name" type="text" placeholder="Ad Name" />
        <input onChange={this.handleInput} name="price" type="text" placeholder="Ad Price" />
        <input onChange={this.handleInput} name="description" type="text" placeholder="Ad Description" />
        <input onChange={this.handleInput} name="tags" type="text" placeholder="Ad Tags" />
        <input onChange={this.handleInput} name="type" type="text" placeholder="Ad Type" />
        <input onChange={this.handleInput} name="photo" type="text" placeholder="Ad Photo" />
        <button type="submit">Crear Anuncio</button>
      </form>

    )
  }
}