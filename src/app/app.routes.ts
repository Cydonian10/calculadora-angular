import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/calculadora.page').then((m) => m.CalculatorPage),
  },
];
