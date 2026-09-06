import { Routes } from '@angular/router';
import { Books } from './pages/books/books';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'book',
    pathMatch: 'full',
  },
  {
    path: 'book',
    component: Books,
  },
];
