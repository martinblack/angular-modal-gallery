/*
 The MIT License (MIT)

 Copyright (c) 2017-2019 Stefano Cappa (Ks89)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */

import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2 } from '@angular/core';

/**
 * Directive to change the flex-direction of an element, based on two inputs (`direction` and `justify`).
 */
@Directive({
  selector: '[ksDirection]'
})
export class DirectionDirective implements OnInit, OnChanges {
  /**
   * String input to set the css flex-direction of an element.
   */
  @Input()
  direction: string;
  /**
   * String input to set the css justify-content of an element.
   */
  @Input()
  justify: string;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  /**
   * Method ´ngOnInit´ to apply the style of this directive.
   * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
   * In particular, it's called only one time!!!
   */
  ngOnInit() {
    this.applyStyle();
  }

  /**
   * Method ´ngOnChanges´ to apply the style of this directive.
   * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
   * In particular, it's called when any data-bound property of a directive changes!!!
   */
  ngOnChanges() {
    this.applyStyle();
  }

  /**
   * Private method to change both direction and justify of an element.
   */
  private applyStyle() {
    if (!this.direction || !this.justify) {
      return;
    }
    this.renderer.setStyle(this.el.nativeElement, 'flex-direction', this.direction);
    this.renderer.setStyle(this.el.nativeElement, 'justify-content', this.justify);
  }
}
