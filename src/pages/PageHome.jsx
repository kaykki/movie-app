import React from 'react'
import { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import MovieCard from '../components/MovieCard';
import isFav from '../utilities/isFav';
import { useSelector } from 'react-redux';
import { appTitle } from "../global/global";


const PageHome = () => {
	const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
	const [upcomingMovies, setUpcomingMovies] 	  = useState([]);
	const [topRatedMovies, setTopRatedMovies] 	  = useState([]);
	const [popularMovies, setPopularMovies] 	  = useState([]);

	const favs = useSelector((state) => state.favs.items);

	useEffect(() => {
		document.title = "Home | " + appTitle;
		fetchMovies('now_playing', setNowPlayingMovies);
	}, []);

	const fetchMovies = async (category, setter) => {
		const apiKey = '2e0de9d682ff6404a82153a83be192cf';
		const url = `https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&language=en-US&page=1`;

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
			setter(results.slice(0, 21));
			console.log(results)
		} catch (error) {
			console.error('Error fetching data: ', error);
		}
	};

	const changeTab = (category, setter) => {
		fetchMovies(category, setter);
	};

	return (
		<div>

			<Tabs>
				<TabList className="tab-nav">
					<Tab className="tab">Now Playing</Tab>
					<Tab className="tab" onClick={() => changeTab('upcoming', setUpcomingMovies)}>Upcoming</Tab>
					<Tab className="tab" onClick={() => changeTab('top_rated', setTopRatedMovies)}>Top Rated</Tab>
					<Tab className="tab" onClick={() => changeTab('popular', setPopularMovies)}>Popular</Tab>
				</TabList>
				<TabPanel>
					<div className="movie-container">
						{nowPlayingMovies.map(movie => {
							return <MovieCard
								key={movie.id}
								movie={movie}
								isFav={isFav(favs, null, movie.id)}
							/>
						})}
					</div>
				</TabPanel>
				<TabPanel>
					<div className="movie-container">
						{upcomingMovies.map(movie => {
							return <MovieCard
								key={movie.id}
								movie={movie}
								isFav={isFav(favs, null, movie.id)}
							/>
						})}
					</div>
				</TabPanel>
				<TabPanel>
					<div className="movie-container">
						{topRatedMovies.map(movie => {
							return <MovieCard
								key={movie.id}
								movie={movie}
								isFav={isFav(favs, null, movie.id)}
							/>
						})}
					</div>
				</TabPanel>
				<TabPanel>
					<div className="movie-container">
						{popularMovies.map(movie => {
							return <MovieCard
								key={movie.id}
								movie={movie}
								isFav={isFav(favs, null, movie.id)}
							/>
						})}
					</div>
				</TabPanel>
			</Tabs>
		</div>
	);
};

export default PageHome;