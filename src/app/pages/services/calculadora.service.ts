import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculadoraService {
  operadores = signal(['AC', '%', '+/-', '+', '-', 'x', '÷', '=', 'Backspace']);
  teclas = signal(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']);

  resultText = signal('0');
  subResultText = signal('0');
  ultimoOperador = signal('');

  public construirNumero(value: string): void {
    console.log(value);
    if (![...this.teclas(), ...this.operadores()].includes(value)) return;

    if (value === '=') {
      this.calcularResultado();
      return;
    }

    if (value === 'Backspace') {
      if (
        this.resultText().length === 1 ||
        (this.resultText().length === 2 && this.resultText().startsWith('-'))
      ) {
        this.resultText.set('0');
        return;
      }

      this.resultText.update((text) => text.slice(0, -1));
      return;
    }

    if (value === 'AC') {
      this.resultText.set('0');
      this.subResultText.set('0');
      this.ultimoOperador.set('');
      return;
    }

    if (value === '+/-') {
      if (this.resultText().startsWith('-')) {
        this.resultText.set(this.resultText().substring(1));
      } else {
        this.resultText.set('-' + this.resultText());
      }
      return;
    }

    if (this.operadores().includes(value)) {
      if (this.resultText() === '0' && value === '-') {
        this.resultText.set('-');
        return;
      }

      this.ultimoOperador.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set('0');
      return;
    }

    if (this.teclas().includes(value)) {
      if (this.resultText().length >= 10) return;
      // manje de cero inicial con . debia ser 0.
      if (value === '.' && this.resultText() === '0') {
        this.resultText.set('0.');
        return;
      }

      if (this.resultText() === '0') {
        this.resultText.set(value);
        return;
      }

      if (this.resultText() === '-0') {
        this.resultText.set('-' + value);
        return;
      }

      this.resultText.update((text) => text + value);
    }
  }

  public calcularResultado(): void {
    const number1 = parseFloat(this.subResultText());
    const number2 = parseFloat(this.resultText());
    const operador = this.ultimoOperador();
    let resultado = 0;

    switch (operador) {
      case '+':
        resultado = number1 + number2;
        break;
      case '-':
        resultado = number1 - number2;
        break;
      case 'x':
        resultado = number1 * number2;
        break;
      case '÷':
        resultado = number1 / number2;
        break;
      case '%':
        resultado = (number1 * number2) / 100;
        break;
    }

    this.resultText.set(resultado.toString());
    this.subResultText.set('0');
    this.ultimoOperador.set('');
  }
}
