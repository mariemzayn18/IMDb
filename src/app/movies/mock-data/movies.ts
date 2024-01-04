import { Movie } from '../models/movie.model';

export const expectedMovies: Movie[] = [
  new Movie(
    '/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg',
    '/hJuDvwzS0SPlsE6MNFOpznQltDZ.jpg',
    278,
    'The Shawshank Redemption',
    8.7,
    new Date('1994-09-23'),

    'Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.',
    ['Drama', 'Crime']
  ),
  new Movie(
    '/rSPw7tgCH9c6NqICZef4kZjFOQ5.jpg',
    '/xMIyotorUv2Yz7zpQz2QYc8wkWB.jpg',
    238,
    'The Godfather',
    8.7,
    new Date('1972-03-14'),

    'Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.',
    ['Drama', 'Crime']
  ),
];
