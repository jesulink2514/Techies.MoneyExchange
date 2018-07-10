import { Directive, HostListener, ElementRef, LOCALE_ID, Inject } from '@angular/core';
import { getLocaleNumberSymbol, NumberSymbol } from '@angular/common';

@Directive({
  selector: '[tme-decimal]'
})
export class DecimalInputDirective {

  private el: HTMLInputElement;

  private decimalSeparator: string;

  constructor(private elementRef: ElementRef, @Inject(LOCALE_ID) private localeId: string) {
    this.el = this.elementRef.nativeElement;
    this.decimalSeparator = getLocaleNumberSymbol(localeId, NumberSymbol.Decimal);
  }

  @HostListener('change') onChange() {
    const precision = 4;
    if (this.el.value == null || this.el.value === '') {return; }
    const number = parseFloat(this.el.value);
    if (isNaN(number)) { return; }

    const factor = Math.pow(10, precision);
    const tempNumber = number * factor;
    const roundedTempNumber = Math.round(tempNumber);
    const fixed = roundedTempNumber / factor;
    this.el.value = fixed.toString();
  }

  @HostListener('keydown', ['$event']) onKeyDown(event) {

    const e = <KeyboardEvent>event;
    if ((e.keyCode >= 48 && e.keyCode <= 57) ||
      (e.keyCode >= 96 && e.keyCode <= 105) ||
      (e.keyCode >= 35 && e.keyCode <= 40) ||
      (e.key === this.decimalSeparator) ||
      (e.keyCode === 8) ||
      (e.keyCode === 46)) {

        if (e.key === this.decimalSeparator && this.el.value && this.el.value.indexOf(this.decimalSeparator) !== -1) {
          e.preventDefault();
        }

      return;
    }

    e.preventDefault();
  }

}
