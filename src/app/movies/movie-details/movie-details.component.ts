import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../movies.service';
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent {
  constructor(
    private moviesService: MoviesService,
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    const movieId = +this.router.snapshot.params['id'];
    const movie = this.moviesService.getMovieDetails(movieId);
  }
}
