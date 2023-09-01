import React, { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import MovieList from 'components/MovieList/MovieList';
import { fetchTrendingMovies } from 'service/Api';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movies = await fetchTrendingMovies();
        setTrendingMovies(movies);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Trending Movies</h2>
      <SkeletonTheme baseColor="#dddddd" highLightColor="#a5a5a5">
        {trendingMovies.length === 0 ? (
          <Skeleton
            count={15}
            style={{ height: 30, width: 300, matginTop: 15 }}
          />
        ) : (
          <MovieList films={trendingMovies} />
        )}
      </SkeletonTheme>
    </div>
  );
};

export default Home;
