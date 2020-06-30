import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { Button } from 'primereact/button';
import './adDetail.css';

const { getAdDetail } = api();

export default class adDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ad: {},
      tags: [],
    };
  }

  componentDidMount() {
    console.log(this.props.history.location);
    this.getDetailAd(this.props.match.params._id);
  }

  goToEditAd = () => {
    this.props.history.push(`/editAd/id=${this.state.ad._id}`);
  };

  getDetailAd = async id => {
    console.log('adDetail', this.props.location.state);
    const { result, message } = await getAdDetail(id, this.props.location.state.token);
    console.log('result', result);
    if (message) {
      alert('No se ha podido encontrar el detalle de este anuncio');
      this.props.history.push('/anuncios');
    } else {
      console.log('here');
      this.setState({
        ad: result,
        tags: result.tags,
      });
    }
  };

  render() {
    const { ad, tags } = this.state;
    const type = {};
    if (ad.sale) {
      type.sale = 'sell';
    } else {
      type.sale = 'buy';
    }

    const adTagsArray = tags.toString();

    const adTags = adTagsArray.replace(/,/g, ' - ');

    if (!ad.photo) return <Loading></Loading>;

    return (
      <div>
        <Link className='back-to-ads' to='/anuncios'>
          <Button id='back-btn' label='Back' className='p-button-raised p-button-rounded p-button-secondary' />
        </Link>
        <div className='detail-container'>
          <div className='header'>
            <img className='detail-image' src={`http://ec2-3-19-218-251.us-east-2.compute.amazonaws.com/${ad.photo}`} alt='AdImage' />
          </div>
          <div className='footer'>
            <h1 className='ad-name detail'>{ad.adName}</h1>
            <div className='price-type detail'>
              <p>Price: {ad.price}</p>
              <p>Type: {type.sale}</p>
            </div>
            <p className='detail description'>{ad.description}</p>
            <p className='detail'>Tags: {adTags}</p>
            <Link className='edit-link' to={`/editAd/id=${ad._id}`}>
              <Button label='Edit' icon='pi pi-pencil' className='p-button-rounded p-button-warning' />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
