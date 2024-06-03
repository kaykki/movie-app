import { useEffect } from "react"
import { appTitle } from "../global/global"
import cinemaImage from "/assets/images/cinema.jpg";
import tmdbIcon from "/assets/images/tmdb-logo.svg";
import { SocialIcon } from 'react-social-icons'


const PageAbout = () => {

    useEffect(() => {
        document.title = "About | " + appTitle;
    }, [])

    return (
        <main>
            <div className="about-wrapper">
                <img className="theatre-image" src={cinemaImage} alt="Theatre Image" />
                <article className="info-wrapper">
                    <div>
                        <h2>About Seenema</h2>
                        <p>"Seenema" is an application that allows users to easily search, favorite, and find other valuable information about movies around the world.</p>
                    </div>

                    <div class="tmdb-respect">
                        <p className="tmdb-text">This product uses the TMDb API but is not endorsed or certified by TMDb. This application uses the TMDb API.
                            This application was created for educational purposes only by.</p>
                        <img src={tmdbIcon} alt="Tmdb logo" />
                    </div>

                    <div className="developers">
                        <h2>About Development Team</h2>
                        <p>This movie database site was created by a passionate and hardworking team of four members. If you have any questions or feedback about the site's features, please feel free to click on the social media icons below to contact us without hesitation. If you are interested in various collaborations, don't hesitate to reach out. We will all work together to become a team that continues to grow.</p>
                        <h2>Team:</h2>
                        <ul>
                            <li>
                                <p>Kaki Kagatan</p>
                                <div className="social-icons">
                                    <SocialIcon url="https://www.linkedin.com/in/kaki-kagatan-a2ab5a18a/" style={{width: '2rem', height: '2rem'}} />
                                    <SocialIcon url="https://github.com/kaykki" bgColor="#C996CC" style={{width: '2rem', height: '2rem'}}/>
                                </div>
                            </li>
                            <li>
                                <p>Danny Kim</p>
                                <div className="social-icons">
                                    <SocialIcon url="https://www.linkedin.com/in/danny-kim-8150262a9/" style={{width: '2rem', height: '2rem'}}/>
                                    <SocialIcon url="https://github.com/dannykim113" bgColor="#C996CC" style={{width: '2rem', height: '2rem'}}/>
                                </div>
                            </li>
                            <li>
                                <p>Yasin Colak</p>
                                <div className="social-icons">
                                    <SocialIcon url="https://www.linkedin.com/in/yasin-colak-a95980133/" style={{width: '2rem', height: '2rem'}}/>
                                    <SocialIcon url="https://github.com/yasincoolak" bgColor="#C996CC" style={{width: '2rem', height: '2rem'}}/>
                                </div>
                            </li>
                            <li>
                                <p>Kyle Thomson</p>
                                <div className="social-icons">
                                    <SocialIcon url="https://www.linkedin.com/in/kyle-thomson-a067002a3/" style={{width: '2rem', height: '2rem'}}/>
                                    <SocialIcon url="https://github.com/KyleThomsonn" bgColor="#C996CC" style={{width: '2rem', height: '2rem'}}/>
                                </div>
                            </li>
                        </ul>
                    </div>
                </article>
            </div>
        </main>
    )
}

export default PageAbout