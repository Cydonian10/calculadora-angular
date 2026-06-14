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
    expect(service.operadores()).toEqual(['AC', '%', '+/-', '+', '-', 'x', '÷', '=', 'Backspace']);
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
});
