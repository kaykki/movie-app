import { Link } from 'react-router-dom';
import Nav from './Nav';
import { useState } from 'react';
import { useEffect } from 'react';
import { appTitle } from '../global/global';

const Header = () => {
    const [showNav, setShowNav] = useState(false);

    const toggleNav = () => {
        setShowNav(!showNav);
    }

    const isDesktop = (e) => {
        if (e.matches) {
            setShowNav(false);
        }
    }

    useEffect(() => {
        let mediaQuery = window.matchMedia('(min-width: 1040px)');
        mediaQuery.addEventListener('change', isDesktop);

        return () => mediaQuery.removeEventListener('change', isDesktop);
    }, []);


    const [movieList, setMovieList] = useState([]);
    const [hasResults, setHasResults] = useState(false);
    const [searchInput, setSearchInput] = useState("");


    useEffect(() => {
        const fetchMovie = async () => {

            const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchInput}&include_adult=false&language=en-US&page=1`, {
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjkzZTM0ZGNiZjg1NGEyZGMxYzE1ZDlkNDk2ODA2MSIsInN1YiI6IjY2MzUyN2QzMzU4ZGE3MDEyYTU1NjMzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WAbBbeAHgieYj7ZUUoUsFfA5cUTRs3ayB3NKYkhQxFM'
                }
            });

            let data = await response.json();

            setMovieList(data.results.slice(0, 10));
            console.log(movieList.length);
            if (movieList.length > 0) {
                setHasResults(true);
            } else {
                setHasResults(false);
            }
        }
        fetchMovie();
    }, [searchInput]);

    return (
        <header className={showNav ? 'show' : ''}>
            <h1><Link className="logo" to="/">{appTitle}</Link></h1>
            <div className="search-container">
                <input type="text"
                    className="search-input"
                    placeholder="Search"
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <button type="submit" className="search-button" ><i className="fas fa-search"></i></button>

                {hasResults ?
                    (<div className='search-results'>
                        <ul>
                            {movieList.map((movie) => {
                                return (
                                    <li key={movie.id}>
                                        <Link to={`/movieinfo/${movie.id}`}>{movie.title}</Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>) 
                    :
                    null
                }
            </div>
            <button className="btn-main-nav"
                onClick={toggleNav}>
                <span className="hamburger-icon">
                    <span className="line"></span>
                    <span className="line"></span>
                    <span className="line"></span>
                </span>
            </button>
            <Nav handleShowHideNav={toggleNav} />
        </header>
    )
}

export default Header