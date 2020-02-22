import React, { Component } from 'react';
import api from '../../services/api';

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
    console.log('EditAd');
  }

  getDetailAd = async (id) => {
    const detailAd = await getAdDetail(id);
    console.log(detailAd);
    this.setState({
      name: detailAd.name,
      price: detailAd.price,
      description: detailAd.description,
      tags: detailAd.tags,
      type: detailAd.type,
      photo: detailAd.photo,
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
    console.log(isAdEdited);
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
        <h1>Editar anuncio de: {name}</h1>
        <form onSubmit={this.onSubmit}>
          <input onChange={this.handleInput} value={name} name="name" type="text" placeholder="Ad Name" />
          <input onChange={this.handleInput} value={price} name="price" type="text" placeholder="Ad Price" />
          <input onChange={this.handleInput} value={description} name="description" type="text" placeholder="Ad Description" />
          <input onChange={this.handleInput} value={tags} name="tags" type="text" placeholder="Ad Tags" />
          <input onChange={this.handleInput} value={type} name="type" type="text" placeholder="Ad Type" />
          <input onChange={this.handleInput} value={photo} name="photo" type="text" placeholder="Ad Photo" />
          <button type="submit">Crear Anuncio</button>
        </form>
      </div>

    )
  }
}
