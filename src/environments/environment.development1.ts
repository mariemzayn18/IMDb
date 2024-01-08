export const environment = {
  signInUrl:
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
  signUpUrl: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=',
  firebaseAPIKey: 'AIzaSyCHqv-zrAg1SRfXBTTbRlVZCF2SD_LY348',

  movieDBAPIKey: 'db552f09f7aa7f83033702a268815e8f',
  movieBaseImageUrl: 'https://image.tmdb.org/t/p/w500',

  fetchingTopMoviesUrl:
    'https://api.themoviedb.org/3/discover/movie/?sort_by=primary_release_date.desc&api_key=',
  fetchingMovieGenresUrl:
    'https://api.themoviedb.org/3/genre/movie/list?api_key=',
  fetchingMovieByIdBaseUrl: 'https://api.themoviedb.org/3/movie/',
};
