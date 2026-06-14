import { Component, ElementRef, HostBinding, input, output, viewChild } from '@angular/core';

@Component({
  selector: 'calculadora-button',
  template: `
    <button
      #button
      (click)="handleClick()"
      class="w-full h-16 outline-none focus:outline-none hover:bg-indigo-700 hover:bg-opacity-20 text-white text-opacity-50 text-xl font-light active:scale-95 transition-transform duration-100"
    >
      <ng-content></ng-content>
    </button>
  `,
  imports: [],
  host: {
    class: 'w-1/4 border-r border-b border-indigo-400',
  },
})
export class CalculadoraButton {
  public buttonElement = viewChild<ElementRef<HTMLButtonElement>>('button');

  doubleSize = input(false, {
    transform: (value: boolean | string) => (typeof value === 'string' ? value === '' : value),
  });

  isComand = input(false, {
    transform: (value: boolean | string) => (typeof value === 'string' ? value === '' : value),
  });
  onClick = output<string>();

  @HostBinding('class.w-2/4')
  get dobleSizeStyle() {
    return this.doubleSize();
  }

  @HostBinding('class.bg-indigo-500')
  get isComandStyle() {
    return this.isComand();
  }

  handleClick() {
    if (!this.buttonElement()?.nativeElement) return;

    const textValue = this.buttonElement()?.nativeElement.innerText;

    this.onClick.emit(textValue!.trim());
  }

  handleKeyUpPressedStyle(key: string) {
    if (!this.buttonElement()?.nativeElement) return;

    const valueText = this.buttonElement()?.nativeElement.innerText;

    if (key === valueText) {
      this.buttonElement()?.nativeElement.classList.add('bg-indigo-700', 'bg-opacity-20');
      setTimeout(() => {
        this.buttonElement()?.nativeElement.classList.remove('bg-indigo-700', 'bg-opacity-20');
      }, 200);
    }
  }
}
