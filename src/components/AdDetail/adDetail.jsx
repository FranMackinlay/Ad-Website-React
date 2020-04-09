import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from "react-router-dom";
import './adDetail.css';

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
    if (detailAd.error) {
      alert('No se ha podido encontrar el detalla de este anuncio');
      this.props.history.push('/anuncios');
    } else {
      this.setState({
        ad: detailAd.result
      })
      return detailAd.result;
    }

  }


  render() {
    const { ad } = this.state;

    return (
      <div>
        <Link className="back-to-ads" to="/anuncios">
          <button className="back-btn">Atras</button>
        </Link>
        <div className="detail-container">
          <img className="detail-image" src={ad.photo} alt="AdImage" />
          <h1>{ad.name}</h1>
          <div className="price-type">
            <p>Price: {ad.price}</p>
            <p>Type: {ad.type}</p>
          </div>
          <p>Description: {ad.description}</p>
          <br />
          <Link to={`/editAd/id=${ad._id}`}>
            <button className="edit-ad">Editar Anuncio</button>
          </Link>
          <br />

        </div >
      </div>
    )
  }
}
