import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function HeroSlide() {
    const [movieList, setMovieList] = useState([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 600);
        };
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const fetchMovies = async () => {
            const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US', {
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjkzZTM0ZGNiZjg1NGEyZGMxYzE1ZDlkNDk2ODA2MSIsInN1YiI6IjY2MzUyN2QzMzU4ZGE3MDEyYTU1NjMzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WAbBbeAHgieYj7ZUUoUsFfA5cUTRs3ayB3NKYkhQxFM'
                }
            });

            let data = await response.json();
            setMovieList(data.results.slice(0, 5));
        }
        fetchMovies();
    }, []);

    return (
        <div className="box">
            <Carousel
                useKeyboardArrows={false}
                showThumbs={false}
                showStatus={false}
                autoPlay
                infiniteLoop
                showIndicators
                renderIndicator={(clickHandler, isSelected, index) => {
                    return (
                        <>
                            {!isMobile && <li
                            onClick={clickHandler}
                            className={`indicator ${isSelected ? "active" : ""}`}
                            key={index}
                            role="button"
                            />}
                        </>
                    );
                }}>
                {movieList.map((movie) => (
                    <div className="slide" key={movie.id}>
                        <div className="movie-infor">
                            {!isMobile && <div className='rating'>
                                <p>{movie.vote_average.toFixed(1) == 0 ? "NR" : movie.vote_average.toFixed(1)}</p>
                            </div>}

                            <h2 className="movie-title">{movie.title}</h2>
                            <p className='release-date'>{movie.release_date}</p>
                            {!isMobile && (
                                <p className="movie-overview">{movie.overview}</p>
                            )}
                            <Link className='more-info-btn' to={`/movieinfo/${movie.id}`}>More Info</Link>
                        </div>
                        <div className='hero-overlay'></div>
                        <img alt={movie.title} src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} />
                    </div>
                ))}
            </Carousel>
        </div>
    )
};

export default HeroSlide;