import {useDispatch} from 'react-redux';
import { useState } from 'react';
import { addFav, deleteFav } from '../features/favs/favsSlice';
import React from 'react'
import FavButton from './FavButton';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function MovieCard ({movie, isFav}) {

    const [isHovered, setIsHovered] = useState();
     
    const location = useLocation();

    const dispatch = useDispatch();

    function handleFavClick(addToFav, obj){
        if(addToFav === true){
            dispatch(addFav(obj));
        }else{
            dispatch(deleteFav(obj));
        }
    }


  return (
        
            
            <div key={movie.id} className="movie-card" 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            
            {isHovered && location.pathname === "/" ? (
            <div className='hover-movie'>
            <img className="movie-image"src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title}  />
            <div className='hover-overview'>
            <p>{movie.overview.slice(0, 100)}...</p>
            <Link to= {`/movieinfo/${movie.id}`}>More Info</Link>
            </div>
            <p className='hover-rating'>{movie.vote_average.toFixed(1)}</p>
            </div>
            ) : 
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} className="movie-image" />}
            <div className='movie-title'>
            <p>{movie.title}</p>
            {isFav ?
                <FavButton movie={movie} remove={true} handleFavClick={handleFavClick} /> :
                <FavButton movie={movie} handleFavClick={handleFavClick} />
            }
            </div>
            </div>
            
            
        
    )
}

export default MovieCard