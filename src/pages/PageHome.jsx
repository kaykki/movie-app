import React from 'react'
import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import HeroSlide from '../components/HeroSlide';
import isFav from '../utilities/isFav';
import { useSelector } from 'react-redux';
import { appTitle, categories } from "../global/global";
import Searchbar from '../components/Searchbar';
import BackToTopButton from '../components/BackToTopButton';
import Loading from '../components/Loading';

const PageHome = () => {

	const [loading, setLoading] = useState(false);
	const [movieList, setMovieList] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [currentCategory, setCurrentCategory] = useState({
		title: "Now Playing",
		value: "now_playing",
		url: `https://api.themoviedb.org/3/movie/now_playing?language=en-US`,
	});

	const [isMobile, setIsMobile] = useState(false);
	const [showDropdown, setShowDropdown] = useState(false);

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
		document.title = "Home | " + appTitle;
		const fetchMovies = async () => {
			setLoading(true);
			const response = await fetch(`${currentCategory.url}&page=1`, {
				headers: {
					accept: 'application/json',
					Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjkzZTM0ZGNiZjg1NGEyZGMxYzE1ZDlkNDk2ODA2MSIsInN1YiI6IjY2MzUyN2QzMzU4ZGE3MDEyYTU1NjMzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WAbBbeAHgieYj7ZUUoUsFfA5cUTRs3ayB3NKYkhQxFM'
				}
			});

			let data = await response.json();
			setMovieList(data.results.slice(0, 12));

			setTimeout(() => {
				setLoading(false);
			  }, "2000");
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

	const toggleDropdown = () => {
		setShowDropdown(!showDropdown);
	}

	return (
		<main>
			{loading 
			? (<Loading />) 
			: (
				<>
					<HeroSlide />
					{isMobile ? (
						<div className="category-dropdown">
							<button className="category-dropdown-btn" onClick={toggleDropdown}>
								<span className="disc"></span>
								<label>{currentCategory.title}</label>
							</button>
							{showDropdown && (
								<ul className="dropdown-list">
									{categories.map((category) => (
										<li key={category.value}
											onClick={() => {
												setCurrentCategory(category);
												toggleDropdown();
											}}>
											{category === currentCategory && <span className="disc"></span>}
											{category.title}
										</li>
									))}
								</ul>
							)}
						</div>
					) : (
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
					)}
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
					<BackToTopButton />
				</>
			)}
		</main>
	);
};
export default PageHome;