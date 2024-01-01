import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesCatalogComponent } from './movies-catalog.component';

describe('MoviesCatalogComponent', () => {
  let component: MoviesCatalogComponent;
  let fixture: ComponentFixture<MoviesCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoviesCatalogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoviesCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
