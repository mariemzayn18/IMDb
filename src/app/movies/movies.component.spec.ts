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
import { MoviesComponent } from './movies.component';
import { MoviesStorageService } from './services/movies-storage.service';
import { of, tap, throwError } from 'rxjs';
import { MoviesService } from './services/movies.service';
import { expectedGenres } from './mock-data/genres';
import { expectedMovies } from './mock-data/movies';
import { environment } from '../../environments/environment';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { Router } from '@angular/router';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
  let httpTestingController: HttpTestingController;
  let moviesStorageService: MoviesStorageService;
  let moviesService: MoviesService;
  let http: HttpClientTestingModule;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [MoviesComponent, LoadingSpinnerComponent],
      providers: [
        MoviesStorageService, // Provide a mock router with a no-op navigate method
        {
          provide: Router,
          useValue: {
            navigate: jasmine
              .createSpy('navigate')
              .and.callFake(() => Promise.resolve(true)),
          },
        },
      ],
    });

    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    http = moviesStorageService = TestBed.inject(MoviesStorageService);
    moviesService = TestBed.inject(MoviesService);
    router = TestBed.inject(Router);

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
