import {Directive, Input, ElementRef, Renderer2, OnInit} from '@angular/core';

@Directive({
  selector: '[roundDistance]',
  standalone: true
})
export class RoundingDistanceDirective implements OnInit {
  @Input('roundDistance') value: number = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.roundAndAppend();
  }

  private roundAndAppend() {
    const roundedValue = RoundingDistanceDirective.roundToTwoDecimals(this.value);
    const formattedValue = `${roundedValue} km`;
    this.renderer.setProperty(this.el.nativeElement, 'innerText', formattedValue);
  }

  private static roundToTwoDecimals(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
