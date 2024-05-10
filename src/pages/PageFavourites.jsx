import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { appTitle } from '../global/global';

function PageFavourites() {

    useEffect(() => {
		document.title = "Favourites | " + appTitle;
	}, [])

    const favs = useSelector((state) => state.favs.items);


    return (
        <main>
		    <section>
                <h2>Your Favourites</h2>
                {favs.length < 1 ? <p>You have no favourite movies :( Go back to the <Link to="/">home</Link> page to add a favourite! </p> : 
                    <div>
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