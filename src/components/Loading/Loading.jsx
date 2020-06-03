import React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import Header from '../Header/header';
import './loading.css';

export default function Loading(props) {
	const { onSubmit, onResetFilter } = props;
	return (
		<div className='content-container'>
			<Header onSubmit={onSubmit} onResetFilter={onResetFilter} />
			<div className='ads-container'>
				<ProgressSpinner />
			</div>
		</div>
	);
}
