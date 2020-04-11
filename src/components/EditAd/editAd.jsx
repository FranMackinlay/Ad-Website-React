import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from "react-router-dom";
import './editAd.css';

const { getAdDetail, editAd } = api();

export default class EditAd extends Component {
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
    const id = this.props.match.params._id;
    this.getDetailAd(id);
  }

  getDetailAd = async (id) => {
    const detailAd = await getAdDetail(id);
    this.setState({
      name: detailAd.result.name,
      price: detailAd.result.price,
      description: detailAd.result.description,
      tags: detailAd.result.tags,
      type: detailAd.result.type,
      photo: detailAd.result.photo,
    })
    return detailAd;
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
    const isAdEdited = await editAd(this.props.match.params._id, name, price, description, tags, type, photo);
    if (isAdEdited.error) {
      alert('No se ha podido editar el anuncio, intente nuevamente');
    } else {
      this.props.history.push('/anuncios');
    }
  }

  render() {
    const { name, price, description, tags, type, photo } = this.state;
    return (
      <div>
        <Link className="back-to-ads" to="/anuncios">
          <button className="back-btn">Back</button>
        </Link>
        <h1>Ad to be edited: "{name}"</h1>
        <form className="edit-ad-form" onSubmit={this.onSubmit}>
          <div className="edit-name">
            <label htmlFor="name">Name:</label>
            <input id="name" onChange={this.handleInput} value={name} name="name" type="text" placeholder="Ad Name" />
          </div>
          <div className="edit-price">
            <label htmlFor="price">Price:</label>
            <input id="price" onChange={this.handleInput} value={price} name="price" type="text" placeholder="Ad Price" />
          </div>
          <div className="edit-description">
            <label htmlFor="description">Description:</label>
            <input id="description" onChange={this.handleInput} value={description} name="description" type="text" placeholder="Ad Description" />
          </div>
          <div className="edit-tags">
            <label htmlFor="tags">Tags:</label>
            <input onChange={this.handleInput} value={tags} name="tags" type="text" placeholder="Ad Tags" />
          </div >
          <div className="edit-type">
            <label htmlFor="type">Type:</label>
            <input onChange={this.handleInput} value={type} name="type" type="text" placeholder="Ad Type" />
          </div>
          <div className="edit-photo">
            <label htmlFor="photo">Photo</label>
            <input onChange={this.handleInput} value={photo} name="photo" type="text" placeholder="Ad Photo" />
          </div>
          <button className="save-btn" type="submit">Save Changes</button>
        </form >
        <br />
      </div >

    )
  }
}
