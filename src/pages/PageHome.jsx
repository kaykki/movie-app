import React from 'react'
import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import isFav from '../utilities/isFav';
import { useSelector } from 'react-redux';
import { appTitle, categories } from "../global/global";


const PageHome = () => {
	const [movieList, setMovieList] 		    = useState([]);
	const [currentCategory, setCurrentCategory] = useState("now_playing");
	const [currentPage, setCurrentPage] 		= useState(1);
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
		const fetchMovies = async (category) => {

			const response = await fetch(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`, {
				headers: {
					accept: 'application/json',
					Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjkzZTM0ZGNiZjg1NGEyZGMxYzE1ZDlkNDk2ODA2MSIsInN1YiI6IjY2MzUyN2QzMzU4ZGE3MDEyYTU1NjMzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WAbBbeAHgieYj7ZUUoUsFfA5cUTRs3ayB3NKYkhQxFM'
				}
			});
	
			let data = await response.json();
	
			setMovieList(data.results.slice(0, 18));
		}

		fetchMovies(currentCategory);
	}, [currentCategory]);

	const loadMore = async () => {
		const newPage = currentPage + 1;
		setCurrentPage(newPage);
		const response = await fetch(`https://api.themoviedb.org/3/movie/${currentCategory}?language=en-US&page=${newPage}`, {
			headers: {
				accept: 'application/json',
				Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjkzZTM0ZGNiZjg1NGEyZGMxYzE1ZDlkNDk2ODA2MSIsInN1YiI6IjY2MzUyN2QzMzU4ZGE3MDEyYTU1NjMzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WAbBbeAHgieYj7ZUUoUsFfA5cUTRs3ayB3NKYkhQxFM'
			}
		});

		let data = await response.json();

		setMovieList(movieList => ([...movieList, ...data.results.slice(0, 18)]));
	}

	const toggleDropdown = () => {
		setShowDropdown(!showDropdown);
	}

	return (
		<main>
			{isMobile ? (
				<div className="category-dropdown">
				<button className="category-dropdown-btn" onClick={toggleDropdown}>
					<span className="disc"></span>
					<label>{currentCategory.replace(/_/g, " ").toUpperCase()}</label>
				</button>
				{showDropdown && (
					<ul className="dropdown-list">
						{categories.map((category) => (
							<li key={category.value} 
								onClick={() => {
									setCurrentCategory(category.value);
									toggleDropdown();
								}}>
								{category.value === currentCategory && <span className="disc"></span>}
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
							style={category.value == currentCategory ? {listStyleType: 'disc'} : null}
							onClick={() => {setCurrentCategory( category.value )}}>
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
				<button className='load-more-btn' onClick={() => {loadMore();}}>Load More</button>
			</section>
		</main>
	);
};

export default PageHome;