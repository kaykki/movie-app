import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import isFav from '../utilities/isFav';
import { useSelector, useDispatch } from 'react-redux';
import { appTitle } from '../global/global';
import FavButton from '../components/FavButton';
import InfoCard from '../components/InfoCard';

function MovieInfo() {

  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);
  const [movieCast, setMovieCast] = useState(null);
  const favs = useSelector((state) => state.favs.items);


  useEffect(() => {
		document.title = "Movie Information | " + appTitle;
	}, []);
 
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

      
      const fetchCast = async () => {
        const apiKey = '2e0de9d682ff6404a82153a83be192cf';
        const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US&page=1`;
        
        try {
          const response = await fetch(url);
          const data = await response.json();
          console.log(data)
          setMovieCast(data);
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      };
      
      fetchMovie();
      fetchCast();


  }, []);

  return (
    <div>
      {movie && movieCast ? (
        <div>
        <InfoCard 
        key={movie.id}
        movie={movie}
        isFav={isFav(favs, null, movie.id)}
        />
        <section>
          <h2>Cast</h2>
          {movieCast.cast.slice(0, 8).map(member => (
            <div key={member.id}>
            <img src={`https://image.tmdb.org/t/p/w500${member.profile_path}`} alt={member.name} />
            <h3>{member.name}</h3>
            <p>{member.character}</p>
            </div>
          ))}
        </section>
        </div>
      ) : 
      <div>
        <p>No movie to display.</p>
      </div>
      }
    </div>
  )
}
export default MovieInfo