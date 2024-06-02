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
                    <h2>About Seenema</h2>
                    <p className="about-text">"Seenema" is an application that allows users to easily search, favorite, and find other valuable information about movies around the world.</p>

                    <div className="developers">
                        <h3>About Development Team</h3>
                        <p class="about-text">This movie database site was created by a passionate and hardworking team of four members. If you have any questions or feedback about the site's features, please feel free to click on the social media icons below to contact us without hesitation. If you are interested in various collaborations, don't hesitate to reach out. We will all work together to become a team that continues to grow.</p>
                        <article>
                            <li>Kaki Kagatan</li>
                            <section className="social-icons">
                                <SocialIcon url="https://www.linkedin.com/in/kaki-kagatan-a2ab5a18a/" />
                                <SocialIcon url="https://github.com/kaykki" bgColor="#C996CC" />
                            </section>
                        </article>
                        <article>
                            <li>Danny Kim</li>
                            <section className="social-icons">
                                <SocialIcon url="https://www.linkedin.com/in/danny-kim-8150262a9/" />
                                <SocialIcon url="https://github.com/dannykim113" bgColor="#C996CC" />
                            </section>
                        </article>
                        <article>
                            <li>Yasin Colak</li>
                            <section className="social-icons">
                                <SocialIcon url="https://www.linkedin.com/in/yasin-colak-a95980133/" />
                                <SocialIcon url="https://github.com/yasincoolak" bgColor="#C996CC" />
                            </section>
                        </article>
                        <article>
                            <li>Kyle Thomson</li>
                            <section className="social-icons">
                                <SocialIcon url="https://www.linkedin.com/in/kyle-thomson-a067002a3/" />
                                <SocialIcon url="https://github.com/KyleThomsonn" bgColor="#C996CC" />
                            </section>
                        </article>
                    </div>
                    <div class="tmdb-respect">
                        <p className="tmdb-text">This product uses the TMDb API but is not endorsed or certified by TMDb. This application uses the TMDb API.
                            This application was created for educational purposes only by.</p>
                        <img src={TmdbIcon} alt="Tmdb logo" width="100" />
                    </div>
                </article>
            </div>
        </main>
    )
}

export default PageAbout