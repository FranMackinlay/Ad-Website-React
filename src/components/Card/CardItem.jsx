import React from 'react';
import { Link } from 'react-router-dom';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import './card.css';

export default function CardItem({ ad, history, isUserAd }) {
  let header2;
  if (ad.photo?.includes('data')) {
    header2 = <img className='card-image' alt='Ad' src={`${ad.photo}`} />;
  } else if (ad.photo?.includes('http')) {
    header2 = <img className='card-image' alt='Ad' src={`${ad.photo}`} />;
  } else {
  }
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

  const user = localStorage.getItem('user');
  const author = ad.author.split('@')[0];

  return (
    <li className={`p-col-2 ${isUserAd ? 'user-li-card' : ''}`}>
      <Link key={ad._id} to={`/anuncios/${ad._id}`}>
        <Card title={ad.adName} className='ui-card-shadow card-item' footer={user === ad.author ? footer : ''} header={header2 ? header2 : header}>
          <div className='price-type'>
            <p>Price: {ad.price}</p>
            <p>Type: {type.sale}</p>
          </div>
          <p className='description'>{ad.description}</p>
          <p className="author">Owner: {author}</p>
        </Card>
      </Link>
    </li>
  );
}
