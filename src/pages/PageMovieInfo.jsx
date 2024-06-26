import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import isFav from '../utilities/isFav';
import { useSelector } from 'react-redux';
import { appTitle } from '../global/global';
import InfoCard from '../components/InfoCard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cast from '../components/Cast';

function MovieInfo() {

    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [movieCast, setMovieCast] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    const favs = useSelector((state) => state.favs.items);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 700);
        };
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {

        const fetchMovie = async () => {
            const apiKey = '2e0de9d682ff6404a82153a83be192cf';
            const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US&page=1`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                setMovie(data);
                document.title = `${data.title} | ${appTitle}`;
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };


        const fetchCast = async () => {
            const apiKey = '2e0de9d682ff6404a82153a83be192cf';
            const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US&page=1`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                setMovieCast(data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchMovie();
        fetchCast();

    }, [id]);

    const settings = {
        className: "center",
        infinite: false,
        centerPadding: "60px",
        slidesToShow: 8,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1920,
                settings: {
                    slidesToShow: 6
                }
            },
            {
                breakpoint: 1040,
                settings: {
                    slidesToShow: 4
                }
            }
        ]
    };

    return (
        <div>
            {movie && movieCast ? (
                <>
                    <InfoCard
                        key={movie.id}
                        movie={movie}
                        isFav={isFav(favs, null, movie.id)}
                    />
                    <section className='cast'>
                        <h2>Cast</h2>
                        {isMobile ? (
                            <div className='non-slider-container'>
                                {movieCast.cast.slice(0, 6).map(member => (
                                    <Cast member={member} key={member.id} />
                                ))}
                            </div>
                        ) : (
                            <div className='slider-container'>
                                <Slider {...settings}>
                                    {movieCast.cast.slice(0, 10).map(member => (
                                        <Cast member={member} key={member.id} />
                                    ))}
                                </Slider>
                            </div>
                        )}
                    </section>
                </>
            ) : (
                <p>No movie to display.</p>
            )}
        </div>
    )
}
export default MovieInfo