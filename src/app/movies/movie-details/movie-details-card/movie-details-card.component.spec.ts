import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsCardComponent } from './movie-details-card.component';

describe('MovieDetailsCardComponent', () => {
  let component: MovieDetailsCardComponent;
  let fixture: ComponentFixture<MovieDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieDetailsCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
