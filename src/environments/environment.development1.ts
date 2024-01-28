export const environment = {
  signInUrl: 'http://localhost:8080/api/auth/authenticate',
  signUpUrl: 'http://localhost:8080/api/auth/register',

  firebaseAPIKey: 'AIzaSyCHqv-zrAg1SRfXBTTbRlVZCF2SD_LY348',
  movieDBAPIKey: 'db552f09f7aa7f83033702a268815e8f',
  movieBaseImageUrl: 'https://image.tmdb.org/t/p/w500',

  fetchingTopMoviesUrl: 'https://api.themoviedb.org/3/movie/top_rated?api_key=',

  fetchingMovieGenresUrl:
    'https://api.themoviedb.org/3/genre/movie/list?api_key=',
  fetchingMovieByIdBaseUrl: 'https://api.themoviedb.org/3/movie/',
};
