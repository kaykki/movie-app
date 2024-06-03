import { useEffect } from 'react';
import { appTitle } from '../global/global';
import { Link } from 'react-router-dom';

const PageNotFound = () => {

	useEffect(() => {
		document.title = "Page Not Found | " + appTitle;
	}, [])

	return (
		<div className='page-not-found'>
			<h1>Page doesn't exist!</h1>
			<Link to="/">Return to home!</Link>
		</div>
	)
}

export default PageNotFound