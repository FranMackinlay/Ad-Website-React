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
		this.getDetailAd(this.props.match.params._id);
	}

	goToEditAd = () => {
		this.props.history.push(`/editAd/id=${this.state.ad._id}`);
	};

	getDetailAd = async id => {
		const { error, result } = await getAdDetail(id);
		if (error) {
			alert('No se ha podido encontrar el detalla de este anuncio');
			this.props.history.push('/anuncios');
		} else {
			this.setState({
				ad: result,
				tags: result.tags,
			});
		}
	};

	render() {
		const { ad, tags } = this.state;

		const adTagsArray = tags.toString();

		const adTags = adTagsArray.replace(/,/g, ' - ');

		if (!ad.photo) return <Loading></Loading>;

		return (
			<div>
				<Link className='back-to-ads' to='/anuncios'>
					<button className='back-btn'>Atras</button>
				</Link>
				<div className='detail-container'>
					<div className='header'>
						<img className='detail-image' src={ad.photo} alt='AdImage' />
					</div>
					<div className='footer'>
						<h1 className='ad-name detail'>{ad.name}</h1>
						<div className='price-type detail'>
							<p>Price: {ad.price}</p>
							<p>Type: {ad.type}</p>
						</div>
						<p className='detail description'>{ad.description}</p>
						<p className='detail'>Tags: {adTags}</p>
						<br />
						<Link to={`/editAd/id=${ad._id}`}>
							<Button label='Edit' icon='pi pi-pencil' className='p-button-rounded p-button-warning' />
						</Link>
					</div>
				</div>
			</div>
		);
	}
}
