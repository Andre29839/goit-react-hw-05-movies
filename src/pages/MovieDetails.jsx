import React, { useEffect, useState, useRef, Suspense } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';

import { fetchMovieDetails } from 'service/Api';
import {
  Container,
  Description,
  ImageContainer,
  Image,
  ProdCompany,
} from './MovieDetails.styled';
import noimage from 'components/images/noimage.svg';
import Button from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import defaultImg from '../components/images/default_logo.jpg';

const MovieDetails = () => {
  const { moveId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const location = useLocation();
  const backLinkHref = useRef(location.state?.form || '/');

  useEffect(() => {
    const movieDetails = async () => {
      try {
        const movie = await fetchMovieDetails(moveId);
        setMovieDetails(movie);
      } catch (error) {
        console.log(error);
      }
    };
    movieDetails();
  }, [moveId]);

  if (!movieDetails) {
    return <Loader />;
  }

  const productionCompaniesList = movieDetails.production_companies?.map(
    ({ id, logo_path, name }) =>
      logo_path && (
        <li key={id}>
          <img
            src={
              logo_path
                ? `https://image.tmdb.org/t/p/w500${logo_path}`
                : defaultImg
            }
            alt={name || 'default logo'}
            style={{
              maxHeight: 50,
              maxWidth: 200,
              marginRight: 30,
              marginTop: 10,
            }}
          />
        </li>
      )
  );

  const roundedPopularity = Math.round(movieDetails.vote_average * 10);

  return (
    <div>
      <Link to={backLinkHref.current}>
        <Button text="⬅️ Go back" />
      </Link>
      <Container backdrop={movieDetails.backdrop_path}>
        <Description>
          <h1>{movieDetails.title}</h1>
          <h4>User score: {roundedPopularity}%</h4>
          <h2>Overview</h2>
          <p>{movieDetails.overview}</p>
          <h2>Genres</h2>
          <p>
            {movieDetails.genres.map(genre => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </p>
          {productionCompaniesList[0] !== null &&
            productionCompaniesList.length > 0 && (
              <>
                <h2>Production companies</h2>
                <ProdCompany>{productionCompaniesList}</ProdCompany>
              </>
            )}
        </Description>
        <ImageContainer>
          <Image
            src={
              movieDetails.poster_path
                ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
                : `${noimage}`
            }
            alt={movieDetails.title}
          />
        </ImageContainer>
      </Container>
      <hr />
      <h3>Additional information</h3>
      <Link to="cast">
        <Button text="Cast" />
      </Link>
      <Link to="reviews">
        <Button text="Reviews" />
      </Link>
      <hr />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetails;
