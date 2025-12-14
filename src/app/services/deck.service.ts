import { Injectable, computed, effect, signal } from '@angular/core';
import { DECKS_BY_ID, type DeckDefinition, type DeckId } from '../data/questions';

type PersistedState = Partial<
  Record<DeckId, { currentIndex: number; order: number[] }>
>;

const STORAGE_KEY = 'just-fun.deck-state.v1';

function safeParseState(raw: string | null): PersistedState {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as PersistedState;
    if (!parsed || typeof parsed !== 'object') return {};
    return parsed;
  } catch {
    return {};
  }
}

function shuffleInPlace<T>(items: T[]): T[] {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

@Injectable({ providedIn: 'root' })
export class DeckService {
  readonly selectedDeckId = signal<DeckId | null>(null);
  readonly currentIndex = signal(0);
  readonly order = signal<number[]>([]);

  readonly selectedDeck = computed<DeckDefinition | null>(() => {
    const id = this.selectedDeckId();
    return id ? DECKS_BY_ID[id] : null;
  });

  readonly total = computed(() => this.order().length);
  readonly progressText = computed(() => {
    const total = this.total();
    if (!total) return '0 / 0';
    return `${this.currentIndex() + 1} / ${total}`;
  });

  readonly canPrev = computed(() => this.currentIndex() > 0);
  readonly canNext = computed(() => this.currentIndex() < this.total() - 1);

  readonly currentQuestion = computed(() => {
    const deck = this.selectedDeck();
    const order = this.order();
    const index = this.currentIndex();
    if (!deck || !order.length) return '';
    const questionIndex = order[index] ?? 0;
    return deck.questions[questionIndex] ?? '';
  });

  private persisted: PersistedState = {};

  constructor() {
    if (typeof window !== 'undefined') {
      this.persisted = safeParseState(window.localStorage.getItem(STORAGE_KEY));
    }

    effect(() => {
      const id = this.selectedDeckId();
      if (!id) return;
      this.persisted[id] = {
        currentIndex: this.currentIndex(),
        order: this.order()
      };
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.persisted));
      }
    });
  }

  selectDeck(id: DeckId) {
    const deck = DECKS_BY_ID[id];
    const saved = this.persisted[id];

    let order = deck.questions.map((_, i) => i);
    let currentIndex = 0;

    if (id === 'full-stack') {
      order = shuffleInPlace([...order]);
      this.selectedDeckId.set(id);
      this.order.set(order);
      this.currentIndex.set(0);
      return;
    }

    if (saved?.order?.length === deck.questions.length) {
      const isValid = saved.order.every(
        (n) => Number.isInteger(n) && n >= 0 && n < deck.questions.length
      );
      if (isValid) {
        order = [...saved.order];
        currentIndex = Math.min(
          Math.max(0, saved.currentIndex ?? 0),
          order.length - 1
        );
      }
    }

    this.selectedDeckId.set(id);
    this.order.set(order);
    this.currentIndex.set(currentIndex);
  }

  clearSelection() {
    this.selectedDeckId.set(null);
    this.order.set([]);
    this.currentIndex.set(0);
  }

  restart() {
    const deck = this.selectedDeck();
    if (!deck) return;
    if (this.selectedDeckId() === 'full-stack') return this.shuffle();
    this.order.set(deck.questions.map((_, i) => i));
    this.currentIndex.set(0);
  }

  shuffle() {
    const deck = this.selectedDeck();
    if (!deck) return;
    const next = shuffleInPlace(deck.questions.map((_, i) => i));
    this.order.set(next);
    this.currentIndex.set(0);
  }

  prev() {
    if (!this.canPrev()) return;
    this.currentIndex.update((i) => i - 1);
  }

  next() {
    if (!this.canNext()) return;
    this.currentIndex.update((i) => i + 1);
  }
}
