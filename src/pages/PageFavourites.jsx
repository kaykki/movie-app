import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { appTitle } from '../global/global';
import seenemaLogo from '../images/seenema-logo.svg';

function PageFavourites() {

    useEffect(() => {
		document.title = "Favourites | " + appTitle;
	}, [])

    const favs = useSelector((state) => state.favs.items);


    return (
        <main>
		    <section className='favourites'>
                {favs.length < 1 ? 
                    <div className='no-favs'>
                        <img src={seenemaLogo} alt="seenema logo"/>
                        <p>We didn't see any favourite movies? Look for some <Link to="/">here!</Link></p>
                    </div>
                : 
                    <div className='fav-movies'>
                        <h2>Your Favourites</h2>
                        {favs.map((movie, i) => {
                            return <MovieCard key={i} 
                                           movie={movie}
                                           isFav={true} />
                        })}
				    </div>}
            </section>
	    </main>
    );
	
}


export default PageFavourites