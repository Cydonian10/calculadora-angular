import { Component, computed, inject, viewChildren } from '@angular/core';
import { CalculadoraButton } from './calculadora-button';
import { CalculadoraService } from '../services/calculadora.service';

@Component({
  selector: 'calculadora',
  template: `
    <div class="w-full h-40 bg-linear-to-b from-gray-800 to-gray-700 flex items-end text-right">
      <div class="w-full py-5 px-6 text-6xl text-white font-thin">
        <span class="block font-semibold">{{ subResultText() }} {{ ultimoOperador() }}</span>
        <span class="block text-5xl">{{ resultText() }}</span>
      </div>
    </div>
    <div class="w-full bg-linear-to-b from-indigo-400 to-indigo-500">
      <div class="flex w-full">
        <calculadora-button (onClick)="handleClick($event)" isComand>AC</calculadora-button>
        <calculadora-button (onClick)="handleClick($event)" isComand>+/-</calculadora-button>
        <calculadora-button (onClick)="handleClick($event)" isComand>%</calculadora-button>
        <calculadora-button (onClick)="handleClick($event)" isComand>÷</calculadora-button>
      </div>
      <div class="flex w-full">
        <calculadora-button (onClick)="handleClick($event)">7</calculadora-button>
        <calculadora-button (onClick)="handleClick($event)">8</calculadora-button>
        <calculadora-button (onClick)="handleClick($event)">9</calculadora-button>
        <calculadora-button (onClick)="handleClick($event)" isComand>x</calculadora-button>
      </div>
      <div class="flex w-full">
        <calculadora-button (onClick)="handleClick($event)">4</calculadora-button>
        <calculadora-button (onClick)="handleClick($event)">5</calculadora-button>
        <calculadora-button (onClick)="handleClick($event)">6</calculadora-button>
        <calculadora-button (onClick)="handleClick($event)" isComand>-</calculadora-button>
      </div>
      <div class="flex w-full">
        <calculadora-button (onClick)="handleClick($event)">1</calculadora-button>
        <calculadora-button (onClick)="handleClick($event)">2</calculadora-button>
        <calculadora-button (onClick)="handleClick($event)">3</calculadora-button>
        <calculadora-button (onClick)="handleClick($event)" isComand>+</calculadora-button>
      </div>
      <div class="flex w-full">
        <calculadora-button (onClick)="handleClick($event)">0</calculadora-button>
        <calculadora-button (onClick)="handleClick($event)">.</calculadora-button>
        <calculadora-button (onClick)="handleClick($event)" doubleSize isComand>
          =
        </calculadora-button>
      </div>
    </div>
  `,
  imports: [CalculadoraButton],
  host: {
    '(document:keyup)': 'handleKeyUp($event)',
  },
})
export class Calculadora {
  calculadoraSrv = inject(CalculadoraService);
  buttons = viewChildren(CalculadoraButton);

  resultText = computed(() => this.calculadoraSrv.resultText());
  subResultText = computed(() => this.calculadoraSrv.subResultText());
  ultimoOperador = computed(() => this.calculadoraSrv.ultimoOperador());

  handleClick(value: string) {
    this.calculadoraSrv.construirNumero(value);
  }

  handleKeyUp(event: KeyboardEvent) {
    const keyEquivalentes: Record<string, string> = {
      Enter: '=',
      Escape: 'AC',
      '*': 'x',
      '/': '÷',
    };

    const key = event.key;
    const keyValue = keyEquivalentes[key] || key;
    this.handleClick(keyValue);
    this.buttons().forEach((button) => {
      button.handleKeyUpPressedStyle(keyValue);
    });
  }
}
