import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './header.css';

export default function Header() {
	return (
		<Fragment>
			<Link to='/login' className='log-out-container'>
				<button className='log-out'>Log Out</button>
			</Link>
			<div className='main-container'>
				<div className='first-container share'>
					<h1 className='title'>
						<span id='one'>R</span>
						<span>e</span>
						<span>a</span>
						<span>c</span>
						<span>t</span>
						<span>A</span>
						<span>d</span>
						<span>s</span>
					</h1>
				</div>
			</div>
			<Link to='/createAd'>
				<button className='create-ad'>Create Ad</button>
			</Link>
		</Fragment>
	);
}
