import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: 'input[AlphaNumeric]'
})
export class AlphanumericDirective {
  constructor(private _el: ElementRef) { }
  
  @HostListener('input', ['$event']) onKeyDown() {
    const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initalValue.replace(/[^a-z-A-Z-0-9 ]*/g, '');
  }

  @HostListener('paste', ['$event']) onPaste(e: any) {
    e.preventDefault();
  }
}
