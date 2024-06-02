import { useEffect } from 'react';
import { appTitle } from '../global/global';

const PageNotFound = () => {

	useEffect(() => {
		document.title = "Page Not Found | " + appTitle;
	}, [])

	return (
		<div className='page-not-found'>
			<h1>Page doesn't exist!</h1>
		</div>
	)
}

export default PageNotFound