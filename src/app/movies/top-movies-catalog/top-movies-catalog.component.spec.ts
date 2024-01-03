import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { TopMoviesCatalogComponent } from './top-movies-catalog.component';
import { MoviesService } from './../services/movies.service';
import { MoviesStorageService } from '../../shared/movies-storage.service';
import { expectedMovies } from '../../mock-data/movies';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';

describe('TopMoviesCatalogComponent', () => {
  let component: TopMoviesCatalogComponent;
  let fixture: ComponentFixture<TopMoviesCatalogComponent>;
  let httpTestingController: HttpTestingController;
  let moviesService: MoviesService;
  let moviesStorageService: MoviesStorageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgxPaginationModule],
      declarations: [TopMoviesCatalogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TopMoviesCatalogComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);

    moviesService = TestBed.inject(MoviesService);
    moviesStorageService = TestBed.inject(MoviesStorageService);

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title interpolated correctly from the code', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toEqual(component.title);
  });

  xit('should use the movies from the movies service', () => {
    // check that there's data after the service fetches it
    spyOn(moviesStorageService, 'fetchTopMovies').and.returnValue(
      of(expectedMovies)
    );
    const url =
      environment.movieDBBaseUrl +
      'movie/top_rated?api_key=' +
      environment.movieDBAPIKey;

    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('GET');

    req.flush(expectedMovies); //mock the response
    component.ngOnInit();
    // expect(component.moviesList).toEqual(moviesService.movies);
    // expect(component.moviesList.length).toBeGreaterThan(0);
  });
});
