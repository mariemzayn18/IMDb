import { Component, Input } from '@angular/core';
import { Actor } from '../../models/actor.model';

@Component({
  selector: 'app-actors-cards',
  templateUrl: './actors-cards.component.html',
  styleUrl: './actors-cards.component.css',
})
export class ActorsCardsComponent {
  @Input() actors: Actor[] = [];
  @Input() lang: string = 'en';
}
