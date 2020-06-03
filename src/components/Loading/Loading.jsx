import React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import './loading.css';

export default function Loading(props) {
	const { onSubmit, onResetFilter } = props;
	return (
		<div className='content-container'>
			<div className='header-navbar-container'>
				<Navbar onSubmit={onSubmit} onResetFilter={onResetFilter} />
				<Header />
			</div>
			<div className='ads-container'>
				<ProgressSpinner />
			</div>
		</div>
	);
}
