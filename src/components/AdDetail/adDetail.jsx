import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from "react-router-dom";

const { getAdDetail } = api();


export default class adDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ad: {}
    }
    const id = this.props.match.params._id;
    this.getDetailAd(id);

  }

  getDetailAd = async (id) => {
    const detailAd = await getAdDetail(id);
    this.setState({
      ad: detailAd
    })
    return detailAd;
  }


  render() {
    const { ad } = this.state;

    return (
      <div className="detail-container">
        <h1>{ad.name}</h1>
        <p>Price: {ad.price}</p>
        <p>Type: {ad.type}</p>
        <p>Description: {ad.description}</p>
        <img src={ad.photo} alt="AdImage" />
        <br />
        <Link to={`/editAd/id=${ad._id}`}>
          <button>Editar Anuncio</button>
        </Link>
        <br />
        <Link to="/anuncios">
          <button>Atras</button>
        </Link>
      </div >
    )
  }
}
