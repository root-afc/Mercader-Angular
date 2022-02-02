import {Directive, ElementRef, HostListener} from "@angular/core";

@Directive({
  selector: 'input[numbersOnly]'
})
export class NumberDirective {
  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event'])
  onKeyDown() {
    const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
  }

  @HostListener('paste', ['$event']) onPaste(e: KeyboardEvent) {
    e.preventDefault();
  }
}
