import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import isFav from '../utilities/isFav';
import { useSelector } from 'react-redux';

function MovieInfo() {

  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);
  const favs = useSelector((state) => state.favs.items);
 
  useEffect(() => {

      const fetchMovie = async () => {
        const apiKey = '2e0de9d682ff6404a82153a83be192cf';
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US&page=1`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data)
      setMovie(data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
      };

      fetchMovie();
  }, []);

  return (
    <div>
      {movie ? (
         <MovieCard
              key={movie.id}
              movie={movie}
              isFav={isFav(favs, null, movie.id)}
              />
      ) : 
      <div>
        <p>sadddd no movie</p>
      </div>
      }
    </div>
  )
}
export default MovieInfo