import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from "react-router-dom";
import './createAd.css';

const { createAd } = api();

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
    const { name, price, description, tags, type, photo } = this.state;
    const isAdCreated = await createAd(name, price, description, tags, type, photo);
    if (isAdCreated.error) {
      alert('No se ha podido crear el anuncio, intente nuevamente');
    } else {
      this.props.history.push('/anuncios');
    }
  }

  render() {

    return (
      <div>
        <Link className="back-to-ads" to="/anuncios">
          <button className="back-btn">Back</button>
        </Link>
        <form className="create-ad-form" onSubmit={this.onSubmit}>
          <div className="create-name">
            <label htmlFor="name">Name:</label>
            <input id="name" onChange={this.handleInput} name="name" type="text" placeholder="Ad Name" />
          </div>
          <div className="create-price">
            <label htmlFor="price">Price:</label>
            <input id="price" onChange={this.handleInput} name="price" type="text" placeholder="Ad Price" />
          </div>
          <div className="create-description">
            <label htmlFor="description">Description:</label>
            <input id="description" onChange={this.handleInput} name="description" type="text" placeholder="Ad Description" />
          </div>
          <div className="create-tags">
            <label htmlFor="tags">Tags:</label>
            <input id="tags" onChange={this.handleInput} name="tags" type="text" placeholder="motor,lifestyle,work,mobile" />
          </div>
          <div className="create-type">
            <label htmlFor="type">Type:</label>
            <input id="type" onChange={this.handleInput} name="type" type="text" placeholder="buy or sell" />
          </div>
          <div className="create-photo">
            <label htmlFor="photo">Photo:</label>
            <input id="photo" onChange={this.handleInput} name="photo" type="text" placeholder="Photo URL" />
          </div>
          <button className="save-btn" type="submit">Crear Anuncio</button>
        </form>
        <br />

      </div>

    )
  }
}
