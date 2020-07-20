import React from 'react';
import './Header.css';

export default function Header() {

  const user = localStorage.getItem('user').split('@')[0];

  return (
    <div className='header-container'>
      <span className='text1'>Welcome {user} to SecondAds!</span>
      <span className='text2'>What are you looking for today?</span>
    </div>
  );
}
