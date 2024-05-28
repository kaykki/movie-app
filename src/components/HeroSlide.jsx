import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function HeroSlide() {
    const [movies, setMovies] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [translateValue, setTranslateValue] = useState(0);

    useEffect(() => {
        const fetchNowPlaying = async () => {
            const apiKey = '2e0de9d682ff6404a82153a83be192cf';
            const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                }
            };

            try {
                const response = await fetch(url, options);
                const { results } = await response.json();
                setMovies(results.slice(0, 10));
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchNowPlaying();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            slideRight();
        }, 6000);
        return () => clearInterval(interval);
    }, [currentIndex, movies.length]);

    const slideWidth = () => {
        return document.querySelector('.movie-hero').clientWidth;
    };

    const slideRight = () => {
        if (currentIndex === movies.length - 1) {
            setCurrentIndex(0);
            setTranslateValue(0);
        } else {
            setCurrentIndex(currentIndex + 1);
            setTranslateValue(translateValue - slideWidth());
        }
    };

    const nextSlide = () => {
        slideRight();
    };

    const prevSlide = () => {
        if (currentIndex === 0) {
            setCurrentIndex(movies.length - 1);
            setTranslateValue(-(movies.length - 1) * slideWidth());
        } else {
            setCurrentIndex(currentIndex - 1);
            setTranslateValue(translateValue + slideWidth());
        }
    }

    return (
        <section className="hero-slide">
            <div className="movie-slider"
                style={{
                    transform: `translateX(${translateValue}px)`,
                    transition: 'transform ease-out 0.5s'
                }}>
                {movies.map((movie) => (
                    <div key={movie.id} className="movie-hero">
                        <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                            alt={movie.title} />
                        <div className='hero-overlay'></div>
                        <div className="movie-infor">
                            <div className='rating'>
                                <p>{movie.vote_average.toFixed(1) == 0 ? "NR" : movie.vote_average.toFixed(1)}</p>
                            </div>
                            <h2 className="movie-title">{movie.title}</h2>
                            <p>{movie.release_date}</p>
                            {window.innerWidth > 600 ?
                                <p className="movie-overview">{movie.overview}</p>
                                : ''}
                            <Link className='more-info-btn' to={`/movieinfo/${movie.id}`}>MORE INFO</Link>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={prevSlide} className="prev">
                &#10094;
            </button>
            <button onClick={nextSlide} className="next">
                &#10095;
            </button>
        </section>
    )
};

export default HeroSlide;