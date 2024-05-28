import React from 'react'
import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import isFav from '../utilities/isFav';
import { useSelector } from 'react-redux';
import { appTitle, categories } from "../global/global";
import { Link } from 'react-router-dom';

const PageHome = () => {
	const [movieList, setMovieList] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [currentCategory, setCurrentCategory] = useState({
		title: "Now Playing",
		value: "now_playing",
		url: `https://api.themoviedb.org/3/movie/now_playing?language=en-US`,
	});

	const favs = useSelector((state) => state.favs.items);

	useEffect(() => {
		document.title = "Home | " + appTitle;
		const fetchMovies = async () => {
			const response = await fetch(`${currentCategory.url}&page=1`, {
				headers: {
					accept: 'application/json',
					Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjkzZTM0ZGNiZjg1NGEyZGMxYzE1ZDlkNDk2ODA2MSIsInN1YiI6IjY2MzUyN2QzMzU4ZGE3MDEyYTU1NjMzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WAbBbeAHgieYj7ZUUoUsFfA5cUTRs3ayB3NKYkhQxFM'
				}
			});

			let data = await response.json();
			setMovieList(data.results.slice(0, 12));
		}

		fetchMovies();
	}, [currentCategory]);

	const loadMore = async () => {
		const response = await fetch(`${currentCategory.url || 'https://api.themoviedb.org/3/movie/now_playing?language=en-US'}&page=${show()}`, {
			headers: {
				accept: 'application/json',
				Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjkzZTM0ZGNiZjg1NGEyZGMxYzE1ZDlkNDk2ODA2MSIsInN1YiI6IjY2MzUyN2QzMzU4ZGE3MDEyYTU1NjMzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WAbBbeAHgieYj7ZUUoUsFfA5cUTRs3ayB3NKYkhQxFM'
			}
		});

		let data = await response.json();
		setMovieList(movieList => ([...movieList, ...data.results.slice(0, 12)]));
	}

	const show = () => {
		const newPage = currentPage + 1;
		setCurrentPage(newPage);
		return newPage;
	}

	// hero-slide
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
		return document.querySelector('.movie-card').clientWidth;
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

	const myTransValue = translateValue * 3;


	return (
		<main>
			<section className="hero-slide">
				<div className="slideshow-container">
					<div
						className="movie-slider"
						style={{
							transform: `translateX(${myTransValue}px)`,
							transition: 'transform ease-out 0.5s'
						}}
					>
						{movies.map((movie) => (
							<div key={movie.id} className="movie-cardy">
								<div className="movie-poster">
									<img
										src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
										alt={movie.title}
										className="movie-imagey"
									/>
								</div>
								<div className="movie-infor">
									<h2 className="movie-title">{movie.title}</h2>
									<p className="movie-overview">{movie.overview}</p>
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
				</div>
			</section>

			<nav className="tab-nav">
				<ul>
					{categories.map((category) => (
						<li key={category.value}
							className="tab"
							style={category.title == currentCategory.title ? { listStyleType: 'disc' } : null}
							onClick={() => { setCurrentCategory(category) }}>
							{category.title}
						</li>
					))}
				</ul>
			</nav>

			<section className='movies-display'>
				<div className="movie-container">
					{movieList.map(movie => {
						return <MovieCard
							key={movie.id}
							movie={movie}
							isFav={isFav(favs, null, movie.id)}
						/>
					})}
				</div>
				<button className='load-more-btn'
					onClick={() => { loadMore(); }}>
					Load More
				</button>
			</section>
		</main>
	);
};
export default PageHome;