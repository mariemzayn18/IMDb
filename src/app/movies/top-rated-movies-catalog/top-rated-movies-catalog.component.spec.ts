import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRatedMoviesCatalogComponent } from './top-rated-movies-catalog.component';

describe('TopRatedMoviesCatalogComponent', () => {
  let component: TopRatedMoviesCatalogComponent;
  let fixture: ComponentFixture<TopRatedMoviesCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopRatedMoviesCatalogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TopRatedMoviesCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
