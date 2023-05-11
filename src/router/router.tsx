import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import MovieDetails from "../pages/Home/MovieDetails";
import TrendingDetails from "../pages/TrendingMovies/TrendingDetails";



export const router = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children:[
            {
                path:'/',
                element:<Home></Home>,
            },
            {
                path:'/movie/:id',
                element:<MovieDetails></MovieDetails>,
                loader:(({params})=> fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`))
            },
            {
                path:'/tv/:id',
                element:<TrendingDetails></TrendingDetails>,
                loader:(({params})=> fetch(`https://api.themoviedb.org/3/tv/${params.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`))
            },
        ]
    }
])