import axios from 'axios';

const API_KEY = 'c3755e1c88b3f430b9a9356edda9caa4';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const params = {
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
};

export const fetchTrendingMovies = async () => {
  const response = await axios.get(`trending/movie/day`, params);
  return response.data.results;
};

export const fetchMovieDetails = async moveId => {
  const response = await axios.get(`/movie/${moveId}`, params);
  return response.data;
};

export const handleSearch = async moveName => {
  const response = await axios.get(`/search/movie?query=${moveName}`, params);
  return response.data.results;
};

export const fetchMovieCast = async moveId => {
  const response = await axios.get(`movie/${moveId}/credits?`, params);
  return response.data.cast;
};

export const fetchMovieReviews = async moveId => {
  const response = await axios.get(`movie/${moveId}/reviews?`, params);
  return response.data.results;
};
