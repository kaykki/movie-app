import { useEffect } from 'react';

const PageNotFound = () => {

	useEffect(() => {
		document.title = "Page Not Found | " + appTitle;
	}, [])

	return (
		<div>PageNotFound</div>
	)
}

export default PageNotFound