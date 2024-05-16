import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import isFav from '../utilities/isFav';
import { useSelector} from 'react-redux';
import { appTitle } from '../global/global';
import InfoCard from '../components/InfoCard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

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

  const settings = {
    className: "center",
    infinite: false,
    centerPadding: "60px",
    slidesToShow: 8,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 6
        }
      },
      {
        breakpoint: 1040,
        settings: {
          slidesToShow: 4
        }
      }
    ]
  };

  return (
    <div>
      {movie && movieCast ? (
        <div>
        <InfoCard 
        key={movie.id}
        movie={movie}
        isFav={isFav(favs, null, movie.id)}
        />
        <section className='cast'>
          <h2>Cast</h2>
          <div className='slider-container'>
          <Slider {...settings}>
          {movieCast.cast.slice(0, 10).map(member => (
            <article className='cast-card' key={member.id}>
            <img src={`https://image.tmdb.org/t/p/w500${member.profile_path}`} alt={member.name} />
            <h3>{member.name}</h3>
            <p>{member.character}</p>
            </article>
          ))}
          </Slider>
          </div>
          <div className='non-slider-container'>
          {movieCast.cast.slice(0, 8).map(member => (
            <article className='cast-card' key={member.id}>
            <img src={`https://image.tmdb.org/t/p/w500${member.profile_path}`} alt={member.name} />
            <h3>{member.name}</h3>
            <p>{member.character}</p>
            </article>
          ))}
          </div>
        </section>
        </div>
      ) : 

        <p>No movie to display.</p>

      }
    </div>
  )
}
export default MovieInfo