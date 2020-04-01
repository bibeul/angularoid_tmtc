import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[coloredLog]'
})
export class ColoredLogDirective implements OnInit {
  @Input('coloredLog') pokemonColor!: string;
  constructor(private renderer: Renderer2, private elmRef: ElementRef) {
  }

  ngOnInit(): void {
    this.renderer.setStyle(this.elmRef.nativeElement, 'color', this.pokemonColor);
  }
}
