import React from 'react';
import { Link } from 'react-router-dom';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import './card.css';

export default function CardItem({ ad }) {
	const header = <img alt='Ad' src={ad.photo} />;
	const footer = (
		<span>
			<Link to={`/editAd/id=${ad._id}`} className='edit-link'>
				{/* <Button label='Edit' icon='pi pi-pencil' style={{ marginRight: '.25em' }} /> */}
				<Button label='Edit' icon='pi pi-pencil' className='p-button-rounded p-button-warning' />
			</Link>
		</span>
	);
	return (
		<li className='p-col-6 p-md-2 p-lg-1'>
			<Link key={ad._id} to={`/anuncios/${ad._id}`}>
				<Card title={ad.name} className='ui-card-shadow' footer={footer} header={header}>
					<div className='price-type'>
						<p>Price: {ad.price}</p>
						<p>Type: {ad.type}</p>
					</div>
					<p className='description'>{ad.description}</p>
				</Card>
			</Link>
		</li>
	);
}
