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

/**
 * Interface `Accessibility` to config titles, alt texts, aria labels and so on
 */
export interface AccessibilityConfig {
  backgroundAriaLabel: string;
  backgroundTitle: string;

  plainGalleryContentAriaLabel: string;
  plainGalleryContentTitle: string;

  modalGalleryContentAriaLabel: string;
  modalGalleryContentTitle: string;

  loadingSpinnerAriaLabel: string;
  loadingSpinnerTitle: string;

  mainContainerAriaLabel: string;
  mainContainerTitle: string;
  mainPrevImageAriaLabel: string;
  mainPrevImageTitle: string;
  mainNextImageAriaLabel: string;
  mainNextImageTitle: string;

  dotsContainerAriaLabel: string;
  dotsContainerTitle: string;
  dotAriaLabel: string;

  previewsContainerAriaLabel: string;
  previewsContainerTitle: string;
  previewScrollPrevAriaLabel: string;
  previewScrollPrevTitle: string;
  previewScrollNextAriaLabel: string;
  previewScrollNextTitle: string;

  carouselContainerAriaLabel: string;
  carouselContainerTitle: string;
  carouselPrevImageAriaLabel: string;
  carouselPrevImageTitle: string;
  carouselNextImageAriaLabel: string;
  carouselNextImageTitle: string;
  carouselPreviewsContainerAriaLabel: string;
  carouselPreviewsContainerTitle: string;
  carouselPreviewScrollPrevAriaLabel: string;
  carouselPreviewScrollPrevTitle: string;
  carouselPreviewScrollNextAriaLabel: string;
  carouselPreviewScrollNextTitle: string;
}
