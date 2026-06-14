import { TestBed } from '@angular/core/testing';
import { CalculadoraService } from './calculadora.service';

describe('CalculadoraService', () => {
  let service: CalculadoraService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculadoraService);
    vi.resetAllMocks();
  });

  // should be created
  // should be created with default values
  // should set resultText, subResultText to "0" when C is pressed
  //should update resultText with number input

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created with default values', () => {
    expect(service.operadores()).toEqual(['AC', '%', '+/-', '+', '-', '*', '÷', '=', 'Backspace']);
    expect(service.teclas()).toEqual(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']);
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.ultimoOperador()).toBe('');
  });

  it("should set resultText, subResultText to '0' when AC is pressed", () => {
    service.resultText.set('123');
    service.subResultText.set('456');
    service.ultimoOperador.set('-');

    service.construirNumero('AC');

    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.ultimoOperador()).toBe('');
  });

  it('shoud update resultText with number input', () => {
    service.construirNumero('1');
    service.construirNumero('2');

    expect(service.resultText()).toBe('12');
  });

  it('should handle operator correctly', () => {
    service.resultText.set('1234');
    service.construirNumero('+');

    expect(service.ultimoOperador()).toBe('+');
    expect(service.subResultText()).toBe('1234');
    expect(service.resultText()).toBe('0');

    service.resultText.set('12');
    service.construirNumero('*');

    expect(service.ultimoOperador()).toBe('*');
    expect(service.resultText()).toBe('0');
  });

  it('should result text diferente de cero y operador diferente de cero y lanzan un operador valido', () => {
    service.resultText.set('2');
    service.subResultText.set('3');
    service.ultimoOperador.set('+');
    service.construirNumero('+');
    expect(service.ultimoOperador()).toBe('+');
    expect(service.subResultText()).toBe('5');
    expect(service.resultText()).toBe('0');
  });
});
