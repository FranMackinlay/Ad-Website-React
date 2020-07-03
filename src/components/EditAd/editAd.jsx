import React, { Component } from 'react';
import api from '../../services/api';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Growl } from 'primereact/growl';
import Loading from '../Loading/Loading';
import { FileUpload } from 'primereact/fileupload';
import './editAd.css';

const { getAdDetail, editAd, deleteAd } = api();

export default class EditAd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params._id,
      token: localStorage.getItem('token'),
      name: '',
      price: 0,
      description: '',
      tags: null,
      sale: '',
      photo: '',
    };

  }

  componentDidMount() {
    this.getDetailAd();
  }

  getDetailAd = async () => {
    const detailAd = await getAdDetail(this.state);
    this.setState({
      name: detailAd.result.adName,
      price: detailAd.result.price,
      description: detailAd.result.description,
      tags: detailAd.result.tags,
      sale: detailAd.result.sale,
      photo: detailAd.result.photo,
    });
    return detailAd;
  };

  handleInput = event => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === 'tags') {
      const splittedValue = value.split(',');
      this.setState({
        tags: splittedValue,
      });
    } else {
      this.setState({
        [name]: value,
      });
    }
  };

  onSubmit = async event => {
    event.preventDefault();
    const { result } = await editAd(this.state);
    if (!result) {
      this.props.history.push({
        pathname: '/anuncios',
        state: { isAdEditedSuccesfully: false },
      });
    } else {
      this.props.history.push({
        pathname: '/anuncios',
        state: { isAdEditedSuccesfully: true },
      });
    }
  };

  deleteAd = async () => {
    const { result } = await deleteAd(this.state);
    if (result) {
      this.props.history.push('/anuncios');
    }
  };

  uploadInvoice = file => {
    this.setState({
      photo: file,
    });
  }

  invoiceUploadHandler = ({ files }) => {
    const [file] = files;
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.uploadInvoice(e.target.result);
    };
    fileReader.readAsDataURL(file);
  };

  render() {
    const { name, price, description, tags, sale, photo } = this.state;
    if (!photo) return <Loading></Loading>;
    return (
      <div>
        <Link className='back-to-ads' to='/anuncios'>
          <Button id='back-btn' label='Back' className='p-button-raised p-button-rounded p-button-secondary' />
        </Link>
        <form className='edit-ad-form' onSubmit={this.onSubmit}>
          <div className='edit-name'>
            <label htmlFor='name'>Ad Name:</label>
            <InputText id='name' value={name} onChange={this.handleInput} name='name' type='text' placeholder='Ad Name' required />
          </div>
          <div className='edit-price'>
            <label htmlFor='price'>Price:</label>
            <InputText id='price' value={price} keyfilter='pint' onChange={this.handleInput} name='price' type='text' placeholder='Ad Price' required />
          </div>
          <div className='edit-description'>
            <label htmlFor='description'>Description:</label>
            <InputText id='description' value={description} onChange={this.handleInput} name='description' type='text' placeholder='Ad Description' required />
          </div>
          <div className='edit-tags'>
            <label htmlFor='tags'>Tags:</label>
            <InputText id='tags' value={tags} onChange={this.handleInput} name='tags' type='text' placeholder='Ad Tags' />
          </div>
          <div className='edit-sale'>
            <label htmlFor='sale'>Sale:</label>
            <InputText id='sale' value={sale ? 'sell' : 'buy'} onChange={this.handleInput} name='sale' type='text' placeholder='Buy or Sell' required />
          </div>
          <div className='edit-photo'>
            <label htmlFor='photo'>Photo:</label>
            <FileUpload name="invoice"
              accept="image/*"
              customUpload={true}
              uploadHandler={this.invoiceUploadHandler}
              mode="basic"
              auto={true} />
            {/* <InputText id='photo' onChange={this.handleInput} name='photo' type='text' placeholder='Ad Photo' required /> */}
          </div>
          <div className="buttons">
            <Button id='delete-ad-btn' onClick={this.deleteAd} label='Delete' className='p-button-raised p-button-danger' />
            <Button id='edit-ad-btn' label='Save Changes' type='submit' className='p-button-raised p-button-success' />
          </div>
        </form>
        <br />
        <Growl ref={el => (this.growl = el)} />
      </div>
    );
  }
}
