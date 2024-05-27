import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';

function Searchbar() {

    const [movieList, setMovieList]     = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [showResults, setShowResults] = useState('none');

    useEffect(() => {
        const fetchMovie = async () => {

            const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchInput}&include_adult=false&language=en-US&page=1`, {
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjkzZTM0ZGNiZjg1NGEyZGMxYzE1ZDlkNDk2ODA2MSIsInN1YiI6IjY2MzUyN2QzMzU4ZGE3MDEyYTU1NjMzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WAbBbeAHgieYj7ZUUoUsFfA5cUTRs3ayB3NKYkhQxFM'
                }
            });
    
            let data = await response.json();
    
            setMovieList(data.results.slice(0, 18));
    
            if(movieList.length > 0) {
                setShowResults('block');
            } else {
                setShowResults('none');
            }
            
        }
        fetchMovie();
    }, [searchInput]); 

    

    return (
        <div className="search-container">
            <input type="text"
                className="search-input"
                placeholder="Search"
                onChange={(e) => { e.preventDefault(); setSearchInput(e.target.value);}}
                onBlur={() => setShowResults('none')}
                onFocus={() => movieList.length > 0 ? setShowResults('block') : setShowResults('none') }
            />
            <button type="submit" className="search-button" ><i className="fas fa-search"></i></button>

            <div className='search-results' style={{display: showResults }}>
                <ul>
                    {movieList.map((movie) => {
                        return (
                            <li key={movie.id}>
                                <Link to={`/movieinfo/${movie.id}`}>
                                    <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt="" />
                                    {movie.title}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Searchbar