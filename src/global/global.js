import { currentDate } from "../utilities/utilities";

// Movie App title
export const appTitle = "Seenema";

// Movie App authors
export const authors = "Kaki, Danny, Yasin, Kyle";

// Movie App homepage categories
export const categories = 
[
    {
        title: "Popular",
        value: "popular",
        url:   `https://api.themoviedb.org/3/movie/popular?language=en-US`,
    },   
    {
        title: "Top Rated",
        value: "top_rated",
        url:   `https://api.themoviedb.org/3/movie/top_rated?language=en-US`,
    },
    {
        title: "Now Playing",
        value: "now_playing", 
        url:   `https://api.themoviedb.org/3/movie/now_playing?language=en-US`,
    },
    {
        title: "Upcoming",   
        value: "upcoming", 
        url:   `https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=${currentDate}`,
    }                
];

export const APP_FOLDER_NAME = "seenema";

