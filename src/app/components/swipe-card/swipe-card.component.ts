import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  signal,
  ViewChild
} from '@angular/core';

export type SwipeAction = 'prev' | 'next';

@Component({
  selector: 'jf-swipe-card',
  standalone: true,
  templateUrl: './swipe-card.component.html',
  styleUrl: './swipe-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwipeCardComponent {
  @Input({ required: true }) question = '';
  @Input() canPrev = true;
  @Input() canNext = true;

  @Output() swipe = new EventEmitter<SwipeAction>();

  @ViewChild('card', { static: true }) private readonly cardRef!: ElementRef<HTMLElement>;

  protected readonly dragging = signal(false);
  protected readonly animating = signal(false);
  protected readonly dx = signal(0);
  protected readonly dy = signal(0);
  protected readonly opacity = signal(1);

  private startX = 0;
  private startY = 0;
  private pointerId: number | null = null;

  @HostBinding('class.is-dragging') get isDragging() {
    return this.dragging();
  }

  readonly transformStyle = computed(() => {
    const dx = this.dx();
    const rotate = Math.max(-14, Math.min(14, dx / 18));
    return `translate3d(${dx}px, ${this.dy()}px, 0) rotate(${rotate}deg)`;
  });

  onPointerDown(event: PointerEvent) {
    if (this.animating()) return;

    this.dragging.set(true);
    this.pointerId = event.pointerId;
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.dx.set(0);
    this.dy.set(0);
    this.opacity.set(1);

    const el = this.cardRef.nativeElement;
    el.setPointerCapture(event.pointerId);
  }

  onPointerMove(event: PointerEvent) {
    if (!this.dragging() || this.pointerId !== event.pointerId) return;
    this.dx.set(event.clientX - this.startX);
    this.dy.set((event.clientY - this.startY) * 0.12);
  }

  onPointerUp(event: PointerEvent) {
    if (!this.dragging() || this.pointerId !== event.pointerId) return;
    this.dragging.set(false);
    this.pointerId = null;

    const threshold = Math.min(140, window.innerWidth * 0.22);
    // Inverted mapping: swipe right = prev, swipe left = next.
    const dx = this.dx();
    const wantsPrev = dx > threshold;
    const wantsNext = dx < -threshold;

    if (wantsNext && this.canNext) return this.animateOut('next');
    if (wantsPrev && this.canPrev) return this.animateOut('prev');

    this.snapBack();
  }

  onPointerCancel() {
    if (!this.dragging()) return;
    this.dragging.set(false);
    this.pointerId = null;
    this.snapBack();
  }

  private snapBack() {
    const el = this.cardRef.nativeElement;
    el.classList.add('is-transitioning');
    this.dx.set(0);
    this.dy.set(0);
    this.opacity.set(1);
    window.setTimeout(() => el.classList.remove('is-transitioning'), 170);
  }

  private animateOut(action: SwipeAction) {
    // Inverted mapping: next animates left, prev animates right.
    const direction = action === 'next' ? -1 : 1;
    const el = this.cardRef.nativeElement;

    this.animating.set(true);
    el.classList.add('is-transitioning');
    this.dx.set(direction * Math.max(720, window.innerWidth * 0.9));
    this.dy.set(-8);
    this.opacity.set(0.35);

    window.setTimeout(() => {
      this.swipe.emit(action);

      el.classList.remove('is-transitioning');
      this.dx.set(-direction * 70);
      this.dy.set(10);
      this.opacity.set(0);

      // iOS Safari can occasionally miss a repaint when we flip opacity/transform quickly.
      // Forcing a layout here makes the next transition reliable.
      void el.offsetWidth;

      requestAnimationFrame(() => {
        el.classList.add('is-transitioning');
        this.dx.set(0);
        this.dy.set(0);
        this.opacity.set(1);

        window.setTimeout(() => {
          el.classList.remove('is-transitioning');
          this.animating.set(false);
        }, 180);
      });
    }, 175);
  }
}
