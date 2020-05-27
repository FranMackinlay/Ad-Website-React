import React from 'react';
import { Link } from 'react-router-dom';
import './card.css';

export default function Card({ ad }) {
	return (
		<li>
			<Link key={ad._id} to={`/anuncios/${ad._id}`}>
				<img src={ad.photo} alt='AdImage' />
				<br />
				<h2>{ad.name}</h2>
				<div className='price-type'>
					<p>Price: {ad.price}</p>
					<p>Type: {ad.type}</p>
				</div>
				<p className='description'>{ad.description}</p>
			</Link>
			<Link to={`/editAd/id=${ad._id}`} className='edit-link'>
				<button className='edit-btn'>Edit Ad</button>
			</Link>
		</li>
	);
}
