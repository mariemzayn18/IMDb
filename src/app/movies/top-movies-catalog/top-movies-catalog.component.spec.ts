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
import { of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { expectedGenres } from '../../mock-data/genres';

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

  it('should have movies list similar to that in the service', () => {
    moviesService.setTopMovies(expectedMovies);
    component.ngOnInit();
    expect(component.moviesList.length).toEqual(
      moviesService.movies.length - 1
    );
  });
});
