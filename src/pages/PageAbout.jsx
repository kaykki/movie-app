import { useEffect } from "react"
import { appTitle } from "../global/global"
import theatreImage from "../images/theatre.jpg";
import  TmdbIcon  from "../images/Tmdb-logo.svg";

const PageAbout = () => {

    useEffect(() => {
		document.title = "About | " + appTitle;
	}, [])

    return (
        <div className="about-wrapper">
            <img className="theatre-image" src={theatreImage} alt="Theatre Image" width="300" />
            <article className="info-wrapper">
                <h2>About</h2>
                <p className="about-text">"Seenema" is an application that allows users to easily search, favorite, and find other valuable information about movies around the world.</p>
                <p className="about-text">This product uses the TMDb API but is not endorsed or certified by TMDb. This application uses the TMDb API. 
                This application was created for educational purposes only.</p>
                <img src={TmdbIcon} alt="Tmdb logo" width="100" />
            </article>
        </div>
    )
}

export default PageAbout