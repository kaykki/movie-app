import React from 'react'
import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import HeroSlide from '../components/HeroSlide';
import isFav from '../utilities/isFav';
import { useSelector } from 'react-redux';
import { appTitle, categories } from "../global/global";

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




	return (
		<main>
			<div>
				<HeroSlide />
			</div>
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