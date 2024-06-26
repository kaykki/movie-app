import { useDispatch } from 'react-redux';
import { addFav, deleteFav } from '../features/favs/favsSlice';
import React from 'react'
import FavButton from './FavButton';
import missingPoster from '/assets/images/missing-poster.png'

function InfoCard({ movie, isFav }) {
    const dispatch = useDispatch();

    function handleFavClick(addToFav, obj) {
        if (addToFav === true) {
            dispatch(addFav(obj));
        } else {
            dispatch(deleteFav(obj));
        }
    }
    return (
        <div key={movie.id} className='movie-info-card'>
            <img className='info-backdrop' src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`} alt={movie.title} />

            <section className='movie-info-text'>
                <img className='info-poster' src={movie.poster_path ? `https://image.tmdb.org/t/p/w400${movie.poster_path}` : missingPoster} alt={movie.title} />

                <div className='movie-description'>
                    <h2 className='movie-info-title'>{movie.title}</h2>

                    <div className='content-wrapper'>
                        <p className='release-date'>{movie.release_date}</p>

                        <ul className='genre-list'>
                            {movie.genres.map(genre => (
                                <li key={genre.id}>{genre.name}</li>
                            ))}
                        </ul>
                    </div>

                    <div className='content-wrapper'>
                        <div className='info-rating'>
                            <p>{movie.vote_average.toFixed(1) == 0 ? "NR" : movie.vote_average.toFixed(1)}</p>
                        </div>
                        {isFav ?
                            <FavButton movie={movie} remove={true} handleFavClick={handleFavClick} /> :
                            <FavButton movie={movie} handleFavClick={handleFavClick} />
                        }
                    </div>

                    <article className='full-overview'>
                        <h3>Overview:</h3>
                        <p>{movie.overview}</p>
                    </article>
                </div>
            </section>
        </div>
    )
}

export default InfoCard