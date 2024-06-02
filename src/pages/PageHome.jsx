import React from 'react'
import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import HeroSlide from '../components/HeroSlide';
import isFav from '../utilities/isFav';
import { useSelector } from 'react-redux';
import { appTitle } from "../global/global";
import BackToTopButton from '../components/BackToTopButton';
import Loading from '../components/Loading';
import CategoryMenu from '../components/CategoryMenu';

const PageHome = () => {

	const [loading, setLoading] = useState(false);
	const [movieList, setMovieList] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [currentCategory, setCurrentCategory] = useState({
		title: "Popular",
		value: "popular",
		url: `https://api.themoviedb.org/3/movie/popular?language=en-US`,
	});

	const favs = useSelector((state) => state.favs.items);

	useEffect(() => {
		document.title = "Home | " + appTitle;
		const fetchMovies = async () => {
			setLoading(true);
			const response = await fetch(`${currentCategory.url}&page=${currentPage}`, {
				headers: {
					accept: 'application/json',
					Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjkzZTM0ZGNiZjg1NGEyZGMxYzE1ZDlkNDk2ODA2MSIsInN1YiI6IjY2MzUyN2QzMzU4ZGE3MDEyYTU1NjMzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WAbBbeAHgieYj7ZUUoUsFfA5cUTRs3ayB3NKYkhQxFM'
				}
			});

			let data = await response.json();
			if (currentPage > 1) {
				setMovieList(movieList => ([...movieList, ...data.results.slice(0, 12)]));
			} else {
				setMovieList(data.results.slice(0, 12));
			}

			setTimeout(() => {
				setLoading(false);
			}, "1000");
		}
		fetchMovies();
	}, [currentCategory, currentPage]);

	const chooseCategory = (category) => {
		setCurrentCategory(category);
	}

	const resetPage = () => {
		setCurrentPage(1);
	}

	return (
		<main>
			<HeroSlide />
			<CategoryMenu
				currentCategory={currentCategory}
				chooseCategory={chooseCategory}
				resetPage={resetPage}
			/>
			{loading ?
				<Loading />
				:
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
						onClick={() => { setCurrentPage(currentPage + 1); }}>
						Load More
					</button>
					<BackToTopButton />
				</section>
			}
		</main>
	);
};
export default PageHome;