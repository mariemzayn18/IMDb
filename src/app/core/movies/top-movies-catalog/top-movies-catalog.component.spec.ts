import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { TopMoviesCatalogComponent } from './top-movies-catalog.component';
import { MoviesService } from '../../services/movies.service';
import { MoviesStorageService } from '../../services/movies-storage.service';
import { expectedMovies } from '../mock-data/movies';

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
    expect(component.moviesList.length).toEqual(moviesService.movies.length);
  });

  it('should have movies cards rendered correctly', () => {
    moviesService.setTopMovies(expectedMovies);
    component.ngOnInit();
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    const movieCards = compiled.querySelectorAll('.card');
    expect(movieCards.length).toEqual(component.moviesList.length);
  });
});
