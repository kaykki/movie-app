import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Searchbar() {

    const [movieList, setMovieList] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef(null);


    useEffect(() => {
        const fetchMovie = async () => {
            if (searchInput.length != 0) {
                const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchInput}&include_adult=false&language=en-US&sort_by=popularity.asc`, {
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjkzZTM0ZGNiZjg1NGEyZGMxYzE1ZDlkNDk2ODA2MSIsInN1YiI6IjY2MzUyN2QzMzU4ZGE3MDEyYTU1NjMzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WAbBbeAHgieYj7ZUUoUsFfA5cUTRs3ayB3NKYkhQxFM'
                    }
                });

                const data = await response.json();

                setMovieList(data.results.slice(0, 18));
                setShowResults(true);
            } else {
                setMovieList([]);
                setShowResults(false);
            }
        };
        fetchMovie();
    }, [searchInput]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [searchRef]);


    return (
        <div className="search-container" ref={searchRef}>
            <input type="text"
                className="search-input"
                placeholder="Search"
                value={searchInput}
                onChange={(e) => { setSearchInput(e.target.value); }}
                onFocus={() => searchInput.length > 0 && setShowResults(true)}
            />
            <button type="submit" className="search-button" ><i className="fas fa-search"></i></button>

            {showResults && (
                <div className="search-results">
                    <ul>
                        {movieList.map((movie) => (
                            <li key={movie.id}>
                                <Link to={`/movieinfo/${movie.id}`} onClick={() => setShowResults(false)}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                        alt={movie.title}
                                    />
                                    {movie.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )
            }
        </div >
    )
}

export default Searchbar