import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopMoviesCatalogComponent } from './top-movies-catalog.component';

describe('TopMoviesCatalogComponent', () => {
  let component: TopMoviesCatalogComponent;
  let fixture: ComponentFixture<TopMoviesCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
