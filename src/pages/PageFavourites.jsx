import { useEffect } from "react";
import { appTitle } from "../global/global";

const PageFavourites = () => {

	useEffect(() => {
		document.title = "Favourites | " + appTitle;
	}, [])

	return (
		<div>PageFavourites</div>
	)
}

export default PageFavourites