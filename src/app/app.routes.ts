import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/deck-grid.component').then((m) => m.DeckGridComponent)
  },
  {
    path: 'deck/:id',
    loadComponent: () =>
      import('./pages/deck/deck-viewer.component').then(
        (m) => m.DeckViewerComponent
      )
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about.component').then((m) => m.AboutComponent)
  },
  { path: '**', redirectTo: '' }
];
