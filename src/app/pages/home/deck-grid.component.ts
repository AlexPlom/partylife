import { Component, computed, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { DECKS, type DeckDefinition, type DeckId } from '../../data/questions';

@Component({
  selector: 'jf-deck-grid',
  standalone: true,
  imports: [NgClass],
  templateUrl: './deck-grid.component.html',
  styleUrl: './deck-grid.component.scss'
})
export class DeckGridComponent {
  readonly decks = DECKS;
  readonly leaving = signal(false);
  readonly picked = signal<DeckId | null>(null);

  readonly gridClass = computed(() => ({
    'is-leaving': this.leaving()
  }));

  constructor(private readonly router: Router) {}

  onPick(deck: DeckDefinition) {
    if (this.leaving()) return;
    this.picked.set(deck.id);
    this.leaving.set(true);
    window.setTimeout(() => {
      void this.router.navigate(['/deck', deck.id]);
    }, 180);
  }
}

