import { useEffect } from "react"
import { appTitle } from "../global/global"
import logo from "../images/theatre.jpg";

const PageAbout = () => {

    useEffect(() => {
		document.title = "About | " + appTitle;
	}, [])

    return (
        <>
        <img src={logo} alt="a" width="300" />
        <h2>About</h2>
        <p>“Seenema” is an application that allows users to easily search, favorite, and find other valuable information about movies around the world.</p>
        <p>This product uses the TMDb API but is not endorsed or certified by TMDb. This application uses the TMDb API. 
        This application was created for educational purposes only.</p>
        </>
    )
}

export default PageAbout