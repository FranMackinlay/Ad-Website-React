import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';

import { Menubar } from 'primereact/menubar';
import FilterForm from '../FilterForm/filterForm';
import './header.css';

export default function Header({ onSubmit, onResetFilter }) {
	let op = useRef(null);
	return (
		<Menubar>
			<div className='logo-container'>
				<h1 className='title'>ReactAds</h1>
			</div>
			<div className='form-container'>
				<FilterForm onSubmit={onSubmit} onResetFilter={onResetFilter} />
			</div>
			<div className='menu-container'>
				<Button type='button' className='bars-menu' icon='pi pi-bars' onClick={e => op.current.toggle(e)} />
				<OverlayPanel className='overlay-menu' ref={op} dismissable={true}>
					<ul className='overlay-ul'>
						<li className='overlay-li'>
							<Link to='/createAd'>
								<Button label='Profile' icon='pi pi-user' className='p-button-secondary' />
							</Link>
						</li>
						<li className='overlay-li'>
							<Link to='/login' className='log-out-container'>
								<Button label='Logout' icon='pi pi-power-off' className='p-button-secondary logout' />
							</Link>
						</li>
					</ul>
				</OverlayPanel>
			</div>
		</Menubar>
	);
}
