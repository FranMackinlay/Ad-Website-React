import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';

import { Menubar } from 'primereact/menubar';
import FilterForm from '../FilterForm/filterForm';
import './Navbar.css';

export default function Navbar({ onSubmit, onResetFilter }) {
  let op = useRef(null);


  const isUserLogged = () => {
    const user = localStorage.getItem('user');

    if (user) {
      return (
        <ul className='overlay-ul'>
          <li className='overlay-li'>
            <Link to='/profile'>
              <Button label='Profile' icon='pi pi-user' className='p-button-secondary' />
            </Link>
          </li>
          <li className='overlay-li'>
            <Link to='/login' className='log-out-container'>
              <Button label='Logout' icon='pi pi-power-off' className='p-button-secondary logout' />
            </Link>
          </li>
        </ul>
      )
    } else {
      return (
        <ul className='overlay-ul'>
          <li className='overlay-li'>
            <Link to='/register'>
              <Button label='Register' icon='pi pi-user' className='p-button-secondary' />
            </Link>
          </li>
        </ul>
      )
    }
  }


  return (
    <Menubar>
      <div className='logo-container'>
        <h1 className='title'>SecondAds</h1>
      </div>
      <div className='form-container'>
        <FilterForm onSubmit={onSubmit} onResetFilter={onResetFilter} />
      </div>
      <div className='menu-container'>
        <Link to={'/createAd'}>
          <Button icon='pi pi-plus' className='p-button-raised p-button-success' />
        </Link>
        <Button type='button' className='bars-menu' icon='pi pi-bars' onClick={e => op.current.toggle(e)} />
      </div>
      <OverlayPanel className='overlay-menu' ref={op} dismissable={true}>
        {isUserLogged()}
      </OverlayPanel>
    </Menubar>
  );
}
