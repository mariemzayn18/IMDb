import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MoviesComponent } from './movies.component';
import { MoviesStorageService } from '../shared/movies-storage.service';
import { of, tap } from 'rxjs';
import { MoviesService } from './services/movies.service';
import { expectedGenres } from '../mock-data/genres';
import { expectedMovies } from '../mock-data/movies';
import { environment } from '../../environments/environment';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
  let httpTestingController: HttpTestingController;
  let moviesStorageService: MoviesStorageService;
  let moviesService: MoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [MoviesComponent],
      providers: [MoviesStorageService],
    });

    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    moviesStorageService = TestBed.inject(MoviesStorageService);
    moviesService = TestBed.inject(MoviesService);

    fixture.detectChanges();
  });

  it('should inject MoviesStorageService', () => {
    expect(moviesStorageService).toBeTruthy();
    expect(moviesStorageService).toBeInstanceOf(MoviesStorageService);
  });

  it('should fetch movie genres and top movies on init', fakeAsync(() => {
    spyOn(moviesStorageService, 'fetchMovieGenres').and.returnValue(
      of(expectedGenres).pipe(
        tap((data) => {
          moviesService.setMovieGenres(data);
        })
      )
    );
    spyOn(moviesStorageService, 'fetchTopMovies').and.returnValue(
      of(expectedMovies).pipe(
        tap((data) => {
          moviesService.setTopMovies(data);
        })
      )
    );

    component.ngOnInit();
    tick();

    expect(moviesStorageService.fetchMovieGenres).toHaveBeenCalled();
    expect(moviesStorageService.fetchTopMovies).toHaveBeenCalled();

    expect(moviesService.genres.length).toEqual(expectedGenres.length);
    expect(moviesService.movies.length).toEqual(expectedMovies.length);
  }));
});
