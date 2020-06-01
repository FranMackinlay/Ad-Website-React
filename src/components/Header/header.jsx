import React from 'react';
import { Link } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import FilterForm from '../FilterForm/filterForm';
import './header.css';

export default function Header({ onSubmit, onResetFilter }) {
	return (
		<Menubar>
			<div className='logo-container'>
				<h1 className='title'>ReactAds</h1>
			</div>
			<div className='form-container'>
				<FilterForm onSubmit={onSubmit} onResetFilter={onResetFilter} />
			</div>
			<div className='menu-container'>
				<Link to='/createAd'>
					<button className='create-ad'>Create Ad</button>
				</Link>
				<Link to='/login' className='log-out-container'>
					<button className='log-out'>Log Out</button>
				</Link>
			</div>
		</Menubar>
	);
}
