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
      <div>
        <h1>{ad.name}</h1>
        <p>{ad.price}</p>
        <p>{ad.type}</p>
        <p>{ad.description}</p>
        <img src={ad.photo} alt="AdImage" />
        <Link to="/ads">
          <button>Atras</button>
        </Link>
      </div >
    )
  }
}
