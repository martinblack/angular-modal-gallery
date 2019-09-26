/*
 * Copyright (c) 2017-2019 Stefano Cappa
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import 'hammerjs';
import 'mousetrap';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { DotsComponent } from './dots.component';
import { AccessibilityConfig } from '../../model/accessibility.interface';
import { DotsConfig } from '../../model/dots-config.interface';
import { KS_DEFAULT_ACCESSIBILITY_CONFIG } from '../../components/accessibility-default';
import { InternalLibImage } from '../../model/image-internal.class';

const CUSTOM_ACCESSIBILITY: AccessibilityConfig = Object.assign({}, KS_DEFAULT_ACCESSIBILITY_CONFIG);
CUSTOM_ACCESSIBILITY.dotsContainerTitle = 'custom dotsContainerTitle';
CUSTOM_ACCESSIBILITY.dotsContainerAriaLabel = 'custom dotsContainerAriaLabel';

let comp: DotsComponent;
let fixture: ComponentFixture<DotsComponent>;

const DOTS_CONFIG_VISIBLE: DotsConfig = {visible: true};
const DOTS_CONFIG_HIDDEN: DotsConfig = {visible: false};

const IMAGES: InternalLibImage[] = [
  new InternalLibImage(0, {
    // modal
    img: '../assets/images/gallery/img1.jpg',
    extUrl: 'http://www.google.com'
  }),
  new InternalLibImage(1, {
    // modal
    img: '../assets/images/gallery/img2.png',
    description: 'Description 2'
  }),
  new InternalLibImage(
    2,
    {
      // modal
      img: '../assets/images/gallery/img3.jpg',
      description: 'Description 3',
      extUrl: 'http://www.google.com'
    },
    {
      // plain
      img: '../assets/images/gallery/thumbs/img3.png',
      title: 'custom title 2',
      alt: 'custom alt 2',
      ariaLabel: 'arial label 2'
    }
  ),
  new InternalLibImage(3, {
    // modal
    img: '../assets/images/gallery/img4.jpg',
    description: 'Description 4',
    extUrl: 'http://www.google.com'
  }),
  new InternalLibImage(
    4,
    {
      // modal
      img: '../assets/images/gallery/img5.jpg'
    },
    {
      // plain
      img: '../assets/images/gallery/thumbs/img5.jpg'
    }
  )
];

function initTestBed() {
  return TestBed.configureTestingModule({
    declarations: [DotsComponent]
  }).compileComponents();
}

describe('DotsComponent', () => {
  beforeEach(async(() => {
    return initTestBed();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DotsComponent);
    comp = fixture.componentInstance;
  });

  it('should instantiate it', () => expect(comp).not.toBeNull());

  describe('---YES---', () => {

    it(`should display dots (first one is active) based of the number of input images`, () => {
      const activeDotIndex = 0;
      comp.dotsConfig = DOTS_CONFIG_VISIBLE;
      comp.accessibilityConfig = KS_DEFAULT_ACCESSIBILITY_CONFIG;
      comp.currentImage = IMAGES[activeDotIndex];
      comp.images = IMAGES;
      comp.ngOnInit();
      fixture.detectChanges();

      const element: DebugElement = fixture.debugElement;

      const dotsContainer: DebugElement = element.query(By.css('nav.dots-container'));
      expect(dotsContainer.name).toBe('nav');
      expect(dotsContainer.attributes['aria-label']).toBe(KS_DEFAULT_ACCESSIBILITY_CONFIG.dotsContainerAriaLabel);
      expect(dotsContainer.properties['title']).toBe(KS_DEFAULT_ACCESSIBILITY_CONFIG.dotsContainerTitle);

      const dots: DebugElement[] = dotsContainer.children;
      expect(dots.length).toBe(IMAGES.length);

      dots.forEach((dot: DebugElement, index: number) => {
        expect(dot.name).toBe('div');
        expect(dot.attributes['role']).toBe('navigation');
        expect(dot.properties['tabIndex']).toBe(0);
        if (index === activeDotIndex) {
          // I don't know why, but with dot.attributes['class'] I can't see 'active'. In this way it's working!
          expect(dot.classes).toEqual({'inside': true, 'dot': true, 'active': true});
        } else {
          expect(dot.attributes['class']).toBe('inside dot');
          // or like above: expect(dot.classes).toEqual({'inside': true, 'dot': true});
        }
        expect(dot.attributes['aria-label']).toBe(KS_DEFAULT_ACCESSIBILITY_CONFIG.dotAriaLabel + ' ' + (index + 1));
      });
    });

    it(`should display dots (first one is active), because by default dotsConfig are visible`, () => {
      const activeDotIndex = 0;
      comp.dotsConfig = undefined; // or null, or something not valid
      comp.accessibilityConfig = KS_DEFAULT_ACCESSIBILITY_CONFIG;
      comp.currentImage = IMAGES[activeDotIndex];
      comp.images = IMAGES;
      comp.ngOnInit();
      fixture.detectChanges();

      const element: DebugElement = fixture.debugElement;

      const dotsContainer: DebugElement = element.query(By.css('nav.dots-container'));
      expect(dotsContainer.name).toBe('nav');
      expect(dotsContainer.attributes['aria-label']).toBe(KS_DEFAULT_ACCESSIBILITY_CONFIG.dotsContainerAriaLabel);
      expect(dotsContainer.properties['title']).toBe(KS_DEFAULT_ACCESSIBILITY_CONFIG.dotsContainerTitle);

      const dots: DebugElement[] = dotsContainer.children;
      expect(dots.length).toBe(IMAGES.length);

      dots.forEach((dot: DebugElement, index: number) => {
        expect(dot.name).toBe('div');
        expect(dot.attributes['role']).toBe('navigation');
        expect(dot.properties['tabIndex']).toBe(0);

        if (index === activeDotIndex) {
          // I don't know why, but with dot.attributes['class'] I can't see 'active'. In this way it's working!
          expect(dot.classes).toEqual({'inside': true, 'dot': true, 'active': true});
        } else {
          expect(dot.attributes['class']).toBe('inside dot');
          // or like above: expect(dot.classes).toEqual({'inside': true, 'dot': true});
        }
        expect(dot.attributes['aria-label']).toBe(KS_DEFAULT_ACCESSIBILITY_CONFIG.dotAriaLabel + ' ' + (index + 1));
      });
    });

    it(`should display dots (first one is active) with custom accessibility`, () => {
      const activeDotIndex = 0;
      comp.dotsConfig = DOTS_CONFIG_VISIBLE;
      comp.accessibilityConfig = CUSTOM_ACCESSIBILITY;
      comp.currentImage = IMAGES[activeDotIndex];
      comp.images = IMAGES;
      comp.ngOnInit();
      fixture.detectChanges();

      const element: DebugElement = fixture.debugElement;

      const dotsContainer: DebugElement = element.query(By.css('nav.dots-container'));
      expect(dotsContainer.name).toBe('nav');
      expect(dotsContainer.attributes['aria-label']).toBe(CUSTOM_ACCESSIBILITY.dotsContainerAriaLabel);
      expect(dotsContainer.properties['title']).toBe(CUSTOM_ACCESSIBILITY.dotsContainerTitle);

      const dots: DebugElement[] = dotsContainer.children;
      expect(dots.length).toBe(IMAGES.length);

      dots.forEach((dot: DebugElement, index: number) => {
        expect(dot.name).toBe('div');
        expect(dot.attributes['role']).toBe('navigation');
        expect(dot.properties['tabIndex']).toBe(0);

        if (index === activeDotIndex) {
          // I don't know why, but with dot.attributes['class'] I can't see 'active'. In this way it's working!
          expect(dot.classes).toEqual({'inside': true, 'dot': true, 'active': true});
        } else {
          expect(dot.attributes['class']).toBe('inside dot');
          // or like above: expect(dot.classes).toEqual({'inside': true, 'dot': true});
        }
        expect(dot.attributes['aria-label']).toBe(KS_DEFAULT_ACCESSIBILITY_CONFIG.dotAriaLabel + ' ' + (index + 1));
      });
    });

    it(`should display dots and click on one of themem`, () => {
      const indexToClick = 1;
      const activeDotIndex = 0;
      comp.dotsConfig = DOTS_CONFIG_VISIBLE;
      comp.accessibilityConfig = KS_DEFAULT_ACCESSIBILITY_CONFIG;
      comp.currentImage = IMAGES[activeDotIndex];
      comp.images = IMAGES;
      comp.ngOnInit();
      fixture.detectChanges();

      const element: DebugElement = fixture.debugElement;

      comp.clickDot.subscribe((index: number) => {
        expect(index).toBe(indexToClick);
      }, () => fail('after a click I should receive a clickDot event'));

      const dotsContainer: DebugElement = element.query(By.css('nav.dots-container'));
      expect(dotsContainer).not.toBeNull();
      const dots: DebugElement[] = dotsContainer.children;
      expect(dots.length).toBe(IMAGES.length);

      // clicks on a dot
      dots[1].nativeElement.click();
    });
  });

  describe('---NO---', () => {

    it(`shouldn't display dots, because visibility is false.`, () => {
      comp.dotsConfig = DOTS_CONFIG_HIDDEN;
      comp.accessibilityConfig = KS_DEFAULT_ACCESSIBILITY_CONFIG;
      comp.ngOnInit();
      fixture.detectChanges();

      const element: DebugElement = fixture.debugElement;

      const dotsContainer: DebugElement = element.query(By.css('nav.dots-container'));
      expect(dotsContainer.name).toBe('nav');
      expect(dotsContainer.attributes['aria-label']).toBe(KS_DEFAULT_ACCESSIBILITY_CONFIG.dotsContainerAriaLabel);
      expect(dotsContainer.properties['title']).toBe(KS_DEFAULT_ACCESSIBILITY_CONFIG.dotsContainerTitle);

      const dots: DebugElement[] = element.queryAll(By.css('div.inside.dot'));
      expect(dots.length).toBe(0);
    });

    it(`shouldn't display dots, because the array of images as input is empty`, () => {
      comp.accessibilityConfig = KS_DEFAULT_ACCESSIBILITY_CONFIG;
      comp.currentImage = null;
      comp.images = [];
      comp.ngOnInit();
      fixture.detectChanges();

      const element: DebugElement = fixture.debugElement;

      const dotsContainer: DebugElement = element.query(By.css('nav.dots-container'));
      expect(dotsContainer.name).toBe('nav');
      expect(dotsContainer.attributes['aria-label']).toBe(KS_DEFAULT_ACCESSIBILITY_CONFIG.dotsContainerAriaLabel);
      expect(dotsContainer.properties['title']).toBe(KS_DEFAULT_ACCESSIBILITY_CONFIG.dotsContainerTitle);

      const dots: DebugElement[] = dotsContainer.children;
      expect(dots.length).toBe(0);
    });

    it(`shouldn't display dots, because the array of images as input is not valid`, () => {
      comp.accessibilityConfig = KS_DEFAULT_ACCESSIBILITY_CONFIG;
      comp.currentImage = null;
      comp.images = null;
      comp.ngOnInit();
      fixture.detectChanges();

      const element: DebugElement = fixture.debugElement;

      const dotsContainer: DebugElement = element.query(By.css('nav.dots-container'));
      expect(dotsContainer.name).toBe('nav');
      expect(dotsContainer.attributes['aria-label']).toBe(KS_DEFAULT_ACCESSIBILITY_CONFIG.dotsContainerAriaLabel);
      expect(dotsContainer.properties['title']).toBe(KS_DEFAULT_ACCESSIBILITY_CONFIG.dotsContainerTitle);

      const dots: DebugElement[] = dotsContainer.children;
      expect(dots.length).toBe(0);
    });

    it(`shouldn't display active dot when the currentImage is invalid, because 'isActive' method throws a managed error and return false`, () => {
      comp.accessibilityConfig = KS_DEFAULT_ACCESSIBILITY_CONFIG;
      // create a fake image not available in comp.images array
      comp.currentImage = new InternalLibImage(99, IMAGES[0].modal);
      comp.images = IMAGES;
      comp.ngOnInit();
      fixture.detectChanges();

      const element: DebugElement = fixture.debugElement;

      const dotsContainer: DebugElement = element.query(By.css('nav.dots-container'));
      expect(dotsContainer.name).toBe('nav');
      expect(dotsContainer.attributes['aria-label']).toBe(KS_DEFAULT_ACCESSIBILITY_CONFIG.dotsContainerAriaLabel);
      expect(dotsContainer.properties['title']).toBe(KS_DEFAULT_ACCESSIBILITY_CONFIG.dotsContainerTitle);

      const dots: DebugElement[] = dotsContainer.children;
      expect(dots.length).toBe(IMAGES.length);

      // all dots are NOT active, bat simply 'inside dot'
      dots.forEach((dot: DebugElement, index: number) => {
        expect(dot.name).toBe('div');
        expect(dot.attributes['role']).toBe('navigation');
        expect(dot.properties['tabIndex']).toBe(0);
        expect(dot.attributes['class']).toBe('inside dot');
        expect(dot.attributes['aria-label']).toBe(KS_DEFAULT_ACCESSIBILITY_CONFIG.dotAriaLabel + ' ' + (index + 1));
      });
    });
  });
});
