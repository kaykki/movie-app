import { useEffect, useState } from "react"
import { appTitle } from "../global/global";

const PageHome = () => {

    const [movie, setMovie] = useState([]);

    useEffect(() => {
        document.title = appTitle;
        const fetchNowPlaying = async () => {
            const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', {
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjkzZTM0ZGNiZjg1NGEyZGMxYzE1ZDlkNDk2ODA2MSIsInN1YiI6IjY2MzUyN2QzMzU4ZGE3MDEyYTU1NjMzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WAbBbeAHgieYj7ZUUoUsFfA5cUTRs3ayB3NKYkhQxFM'
                }
            });

            let data = await response.json();

            setMovie(data.results);
        }
        fetchNowPlaying();
    }, [])

    return (
        <main>
            <section>
                <h2>Now Playing</h2>

                <div>
                    {movie.map( movie => (
                        <div key={movie.id}>
                            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title}/>
                            <h3>{movie.title}</h3>
                        </div>
                    ) )}
                </div>
            </section>
        </main>
    )
}

export default PageHome