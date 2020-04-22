import React from 'react';
import VentureGreen from './venturegreen2.png';

const logo = (props) => {
	const styles = {background:'none',
padding:'3px',
height:props.height,
boxSizing:'border-box',
borderRadius:'5px'}
	return (<div style={styles}>
		<img className='h-100' src={VentureGreen} alt="ventureGreen"/>
		</div>)
};

export default logo;