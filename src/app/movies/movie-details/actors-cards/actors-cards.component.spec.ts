import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorsCardsComponent } from './actors-cards.component';

describe('ActorsCardsComponent', () => {
  let component: ActorsCardsComponent;
  let fixture: ComponentFixture<ActorsCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActorsCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActorsCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
