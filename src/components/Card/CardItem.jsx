import React from 'react';
import { Link } from 'react-router-dom';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import './card.css';

export default function CardItem({ ad, token, history }) {
  console.log('CARD', token);
  const header = <img className='card-image' alt='Ad' src={`http://ec2-3-19-218-251.us-east-2.compute.amazonaws.com${ad.photo}`} />;

  const goToEditAd = () => {
    history.push(`/editAd/id=${ad._id}`);
  };

  const footer = (
    <span>
      <Button onClick={goToEditAd} label='Edit' icon='pi pi-pencil' className='p-button-rounded p-button-warning' />
    </span>
  );

  const type = {};
  if (ad.sale) {
    type.sale = 'sell';
  } else {
    type.sale = 'buy';
  }

  return (
    <li className='p-col-2'>
      <Link key={ad._id} to={{
        pathname: `/anuncios/${ad._id}`,
        state: { token }
      }}>
        <Card title={ad.adName} className='ui-card-shadow' footer={footer} header={header}>
          <div className='price-type'>
            <p>Price: {ad.price}</p>
            <p>Type: {type.sale}</p>
          </div>
          <p className='description'>{ad.description}</p>
        </Card>
      </Link>
    </li>
  );
}
