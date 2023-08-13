import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchMovies, selectMovies } from "../../features/movies/moviesSlice";
import SingleMovieCard from "./SingleMovieCard";
import TrendingMovies from "../TrendingMovies/TrendingMovies";
import Genre from "../Genre/Genre";
import Spinner from "../../Components/Spinner";

const Home = () => {
  const movies = useAppSelector(selectMovies);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const loading = movies.status === "loading";
  if (loading) {
    return <Spinner></Spinner>;
  }

  return (
    <div>
      <div>
        <TrendingMovies></TrendingMovies>
        <Genre></Genre>
      </div>
      <div className="my-24">
        <h1 className="text-4xl font-extrabold text-white text-start my-6 mx-2 md:mx-6">
          All Movies
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-4 ">
          {movies?.movies.map((movie, i) => (
            <SingleMovieCard
              category="movie"
              key={i}
              movie={movie}
            ></SingleMovieCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
