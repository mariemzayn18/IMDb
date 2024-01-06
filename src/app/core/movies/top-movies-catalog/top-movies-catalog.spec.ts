import { TopMoviesCatalogComponent } from './top-movies-catalog.component';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flushMicrotasks,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MoviesStorageService } from '../../services/movies-storage.service';
import { of, tap, throwError } from 'rxjs';
import { MoviesService } from '../../services/movies.service';
import { expectedGenres } from './mock-data/genres';
import { expectedMovies } from './mock-data/movies';
import { SharedModule } from '../../../shared/shared.module';

describe('TopMoviesCatalogComponent', () => {
  let component: TopMoviesCatalogComponent;
  let fixture: ComponentFixture<TopMoviesCatalogComponent>;
  let httpTestingController: HttpTestingController;
  let moviesStorageService: MoviesStorageService;
  let moviesService: MoviesService;
  let http: HttpClientTestingModule;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, SharedModule],
      declarations: [TopMoviesCatalogComponent],
      providers: [
        MoviesStorageService, // Provide a mock router with a no-op navigate method
      ],
    });

    fixture = TestBed.createComponent(TopMoviesCatalogComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    http = moviesStorageService = TestBed.inject(MoviesStorageService);
    moviesService = TestBed.inject(MoviesService);

    fixture.detectChanges();
  });

  it('should inject MoviesStorageService', () => {
    expect(moviesStorageService).toBeTruthy();
    expect(moviesStorageService).toBeInstanceOf(MoviesStorageService);
  });

  it('should fetch movie genres and top movies on init', fakeAsync(() => {
    let genreSpy = spyOn(
      moviesStorageService,
      'fetchMovieGenres'
    ).and.returnValue(
      of(expectedGenres).pipe(
        tap((data) => {
          moviesService.setMovieGenres(data);
        })
      )
    );
    let movieSpy = spyOn(
      moviesStorageService,
      'fetchTopMovies'
    ).and.returnValue(
      of(expectedMovies).pipe(
        tap((data) => {
          moviesService.setTopMovies(data);
        })
      )
    );

    component.ngOnInit();
    tick();

    // check if the methods are called
    expect(genreSpy).toHaveBeenCalled();
    expect(movieSpy).toHaveBeenCalled();

    // check if the data is set correctly in the service
    expect(moviesService.genres.length).toEqual(expectedGenres.length);
    expect(moviesService.movies.length).toEqual(expectedMovies.length);

    // double check if the data is set correctly in the service
    expect(moviesService.movies[0].title).toEqual('The Shawshank Redemption');
  }));

  it('should handle error when fetching movies on init', fakeAsync(() => {
    spyOn(moviesStorageService, 'fetchMovieGenres').and.returnValue(
      of(expectedGenres).pipe(
        tap((data) => {
          moviesService.setMovieGenres(data);
        })
      )
    );

    spyOn(moviesStorageService, 'fetchTopMovies').and.returnValue(
      throwError(() => new Error('An error occurred. Please try again.'))
    );

    expect(() => {
      component.ngOnInit();
      tick();
      flushMicrotasks();
    }).toThrowError('An error occurred. Please try again.');
  }));
});
