import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TopMoviesCatalogComponent } from './top-movies-catalog.component';
import { NgxPaginationModule } from 'ngx-pagination';

describe('TopMoviesCatalogComponent', () => {
  let component: TopMoviesCatalogComponent;
  let fixture: ComponentFixture<TopMoviesCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgxPaginationModule],
      declarations: [TopMoviesCatalogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TopMoviesCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
