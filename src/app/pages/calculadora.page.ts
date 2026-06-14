import { Component } from '@angular/core';
import { Calculadora } from './components/calculadora';

@Component({
  selector: 'calculator-page',
  template: ` <calculadora /> `,
  imports: [Calculadora],
  host: {
    class:
      'w-full mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-900 relative overflow-hidden max-w-75',
  },
})
export class CalculatorPage {}
