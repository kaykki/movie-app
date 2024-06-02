import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addFav, deleteFav } from '../features/favs/favsSlice';
import FavButton from './FavButton';
import { Link } from 'react-router-dom';
import missingPoster from '../images/missing-poster.png';

function MovieCard({ movie, isFav }) {

    const [isHovered, setIsHovered] = useState();

    const dispatch = useDispatch();

    function handleFavClick(addToFav, obj) {
        if (addToFav === true) {
            dispatch(addFav(obj));
        } else {
            dispatch(deleteFav(obj));
        }
    }
    
    return (
        <div key={movie.id} className="movie-card">
            <div className='movie-poster' 
                 onMouseEnter={() => setIsHovered(true)}
                 onMouseLeave={() => setIsHovered(false)}>
                <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w400${movie.poster_path}`: missingPoster} 
                     alt={movie.title} 
                     className="movie-image" />
                <div className='hover-movie' 
                     style={ isHovered ? {opacity: 1} : {opacity: 0}}>
                    <p>{movie.overview ? movie.overview.slice(0, 175) : 'No description found...'}</p>
                    <Link className='more-info-btn' to={`/movieinfo/${movie.id}`}>More Info</Link>
                </div>
            </div>

            <div className='rating'>
                <p>{movie.vote_average.toFixed(1) == 0 ? "NR" : movie.vote_average.toFixed(1)}</p>
            </div>

            <div className='movie-info'>
                <div>
                    <h3>{movie.title}</h3>
                    <p>{movie.release_date}</p>
                </div>
                {isFav ?
                    <FavButton movie={movie} remove={true} handleFavClick={handleFavClick} /> :
                    <FavButton movie={movie} handleFavClick={handleFavClick} />
                }
            </div>
        </div>
    )
}

export default MovieCard