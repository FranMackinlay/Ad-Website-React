import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';

import { Menubar } from 'primereact/menubar';
import FilterForm from '../FilterForm/filterForm';
import './Navbar.css';

export default function Navbar({ onSubmit, onResetFilter }) {
  let op = useRef(null);
  const user = localStorage?.getItem('user');
  const token = localStorage.getItem('token');

  const deleteLocalStorage = () => {
    if (user && token) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }

  const isUserLoggedBurger = () => {
    if (user) {
      return (
        <ul className='overlay-ul'>
          <li className='overlay-li'>
            <Link to='/profile'>
              <Button label='Profile' icon='pi pi-user' className='p-button-secondary' />
            </Link>
          </li>
          <li className='overlay-li' onClick={() => deleteLocalStorage()}>
            <Link to='/ads' className='log-out-container'>
              <Button label='Logout' icon='pi pi-power-off' className='p-button-secondary logout' />
            </Link>
          </li>
        </ul>
      )
    } else {
      return (
        <ul className='overlay-ul'>
          <li className='overlay-li'>
            <Link to='/login'>
              <Button label='Login' icon='pi pi-user' className='p-button-secondary' />
            </Link>
          </li>
        </ul>
      )
    }
  }

  const isUserLoggedCreate = () => {
    if (user) {
      return (
        <Link to={'/createAd'}>
          <Button icon='pi pi-plus' className='p-button-raised p-button-success' />
        </Link>
      )
    }
  }




  return (
    <Menubar>
      <div className='logo-container'>
        <Link to='/ads'>
          <h1 onClick={onResetFilter} className='title'>SecondHand</h1>
        </Link>
      </div>
      <div className='form-container'>
        <FilterForm onSubmit={onSubmit} onResetFilter={onResetFilter} />
      </div>
      <div className='menu-container'>
        {isUserLoggedCreate()}
        <Button type='button' className='bars-menu' icon='pi pi-bars' onClick={e => op.current.toggle(e)} />
      </div>
      <OverlayPanel className='overlay-menu' ref={op} dismissable={true}>
        {isUserLoggedBurger()}
      </OverlayPanel>
    </Menubar>
  );
}
