import { useEffect } from "react"
import { appTitle } from "../global/global"
import theatreImage from "../images/theatre.jpg";
import TmdbIcon from "../images/Tmdb-logo.svg";
import { SocialIcon } from 'react-social-icons'


const PageAbout = () => {

    useEffect(() => {
        document.title = "About | " + appTitle;
    }, [])

    return (
        <main>
            <div className="about-wrapper">
                <img className="theatre-image" src={theatreImage} alt="Theatre Image" width="300" />
                <article className="info-wrapper">
                    <h2>About</h2>
                    <p className="about-text">"Seenema" is an application that allows users to easily search, favorite, and find other valuable information about movies around the world.</p>
                    <p className="about-text">This product uses the TMDb API but is not endorsed or certified by TMDb. This application uses the TMDb API.
                        This application was created for educational purposes only by;
                        <div className="developers">
                            <article>
                                <p>Kaki Kagatan</p>
                                <p>
                                    <SocialIcon url="https://www.linkedin.com/in/kaki-kagatan-a2ab5a18a/" />
                                    <SocialIcon url="https://github.com/kaykki" bgColor="#C996CC" />
                                </p>
                            </article>
                            <article>
                                <p>Danny Kim</p>
                                <p><SocialIcon url="https://www.linkedin.com/in/danny-kim-8150262a9/" />
                                    <SocialIcon url="https://github.com/dannykim113" bgColor="#C996CC" />
                                </p>
                            </article>
                            <article>
                                <p>Yasin Colak</p>
                                <p>
                                    <SocialIcon url="https://www.linkedin.com/in/yasin-colak-a95980133/" />
                                    <SocialIcon url="https://github.com/yasincoolak" bgColor="#C996CC" />
                                </p>
                            </article>
                            <article>
                                <p>Kyle Thomson</p>
                                <p>
                                    <SocialIcon url="https://www.linkedin.com/in/kyle-thomson-a067002a3/" />
                                    <SocialIcon url="https://github.com/KyleThomsonn" bgColor="#C996CC" />
                                </p>
                            </article>

                        </div>
                    </p>
                    <img src={TmdbIcon} alt="Tmdb logo" width="100" />
                </article>
            </div>
        </main>
    )
}

export default PageAbout