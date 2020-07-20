import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { Button } from 'primereact/button';
import './adDetail.css';

const { getAdDetail, deleteAd } = api();

export default class adDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ad: {},
      tags: [],
      id: this.props.match.params._id,
      token: localStorage?.getItem('token'),
    };
  }

  componentDidMount() {
    this.getDetailAd();
  }

  goToEditAd = () => {
    this.props.history.push(`/editAd/id=${this.state.ad._id}`);
  };

  getDetailAd = async () => {
    const { result, message } = await getAdDetail(this.state);
    console.log('RESULT', result);
    console.log('MESSAGE', message);
    if (message) {
      alert('No se ha podido encontrar el detalle de este anuncio');
      this.props.history.push('/ads');
    } else {
      this.setState({
        ad: result,
        tags: result.tags,
      });
    }
  };

  deleteAd = async () => {
    const { result } = await deleteAd(this.state);
    if (result) {
      this.props.history.push('/ads');
    }
  };

  renderUtilities = (ad) => (
    <div className="utilities">
      <Link className='edit-ad-container' to={`/editAd/id=${ad._id}`}>
        <Button label='Edit' icon='pi pi-pencil' className='p-button-raised p-button-rounded p-button-warning' />
      </Link>
      <div className="delete-ad-container">
        <Button id='delete-ad' onClick={this.deleteAd} label='Delete' className='p-button-rounded p-button-raised p-button-danger' />
      </div>
    </div>
  );

  render() {
    const { ad, tags } = this.state;
    const type = {};
    if (ad.sale) {
      type.sale = 'sell';
    } else {
      type.sale = 'buy';
    }
    let image;
    if (ad.photo?.includes('data')) {
      image = ad.photo;
    }
    const adTagsArray = tags.toString();

    const author = localStorage?.getItem('user');

    const adTags = adTagsArray.replace(/,/g, ' - ');

    if (!ad.photo) return <Loading></Loading>;


    return (
      <div>
        <Link className='back-to-ads' to='/ads'>
          <Button id='back-btn' label='Back' className='p-button-raised p-button-rounded p-button-secondary' />
        </Link>
        <div className='detail-container'>
          <div className='header'>
            <img className='detail-image' src={image ? image : `http://ec2-3-19-218-251.us-east-2.compute.amazonaws.com/${ad.photo}`} alt='AdImage' />
          </div>
          <div className='footer'>
            <h1 className='ad-name detail'>{ad.adName}</h1>
            <div className='price-type detail'>
              <p>Price: {ad.price}</p>
              <p>Type: {type.sale}</p>
            </div>
            <p className='detail description'>{ad.description}</p>
            <p className='detail'>Tags: {adTags}</p>
            <p className='detail'>Owner: {ad.author}</p>
            {author === ad.author ? this.renderUtilities(ad) : ''}
          </div>
        </div>
      </div>
    );
  }
}
