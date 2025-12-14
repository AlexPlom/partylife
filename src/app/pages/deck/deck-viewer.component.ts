import { Component, computed, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DeckService } from '../../services/deck.service';
import { DECKS_BY_ID, type DeckId } from '../../data/questions';
import { SwipeCardComponent, type SwipeAction } from '../../components/swipe-card/swipe-card.component';

@Component({
  selector: 'jf-deck-viewer',
  standalone: true,
  imports: [NgClass, RouterLink, SwipeCardComponent],
  templateUrl: './deck-viewer.component.html',
  styleUrl: './deck-viewer.component.scss'
})
export class DeckViewerComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly deckService = inject(DeckService);

  readonly deck = this.deckService.selectedDeck;
  readonly progressText = this.deckService.progressText;
  readonly canPrev = this.deckService.canPrev;
  readonly canNext = this.deckService.canNext;
  readonly question = this.deckService.currentQuestion;

  readonly themeClass = computed(() => {
    const theme = this.deck()?.theme;
    return theme ? `theme--${theme}` : '';
  });

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const id = params.get('id') as DeckId | null;
      if (!id || !(id in DECKS_BY_ID)) {
        void this.router.navigate(['/']);
        return;
      }
      this.deckService.selectDeck(id);
    });
  }

  back() {
    this.deckService.clearSelection();
    void this.router.navigate(['/']);
  }

  onSwipe(action: SwipeAction) {
    if (action === 'next') this.deckService.next();
    else this.deckService.prev();
  }
}
