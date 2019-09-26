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

import { Injectable } from '@angular/core';
import { SidePreviewsConfig, SlideConfig } from '../model/slide-config.interface';
import { PlayConfig } from '../model/play-config.interface';
import { KS_DEFAULT_ACCESSIBILITY_CONFIG } from '../components/accessibility-default';
import { AccessibilityConfig } from '../model/accessibility.interface';
import { PreviewConfig } from '../model/preview-config.interface';
import { Size } from '../model/size.interface';
import { ButtonsConfig, ButtonsStrategy } from '../model/buttons-config.interface';
import { DotsConfig } from '../model/dots-config.interface';
import { AdvancedLayout, GridLayout, LineLayout, PlainGalleryConfig, PlainGalleryStrategy } from '../model/plain-gallery-config.interface';
import { CurrentImageConfig } from '../model/current-image-config.interface';
import { KeyboardConfig } from '../model/keyboard-config.interface';
import { LoadingConfig, LoadingType } from '../model/loading-config.interface';
import { Description, DescriptionStrategy, DescriptionStyle } from '../model/description.interface';
import { CarouselConfig } from '../model/carousel-config.interface';
import { CarouselImageConfig } from '../model/carousel-image-config.interface';
import { BreakpointsConfig, CarouselPreviewConfig } from '../model/carousel-preview-config.interface';

export interface LibConfig {
  slideConfig?: SlideConfig;
  accessibilityConfig?: AccessibilityConfig;
  previewConfig?: PreviewConfig;
  buttonsConfig?: ButtonsConfig;
  dotsConfig?: DotsConfig;
  plainGalleryConfig?: PlainGalleryConfig;
  currentImageConfig?: CurrentImageConfig;
  keyboardConfig?: KeyboardConfig;
  carouselConfig?: CarouselConfig;
  carouselImageConfig?: CarouselImageConfig;
  carouselPreviewsConfig?: CarouselPreviewConfig;
  carouselPlayConfig?: PlayConfig;
  carouselDotsConfig?: DotsConfig;
}

export const DEFAULT_PREVIEW_SIZE: Size = { height: '50px', width: 'auto' };
export const DEFAULT_LAYOUT: LineLayout = new LineLayout(DEFAULT_PREVIEW_SIZE, { length: -1, wrap: false }, 'flex-start');
export const DEFAULT_PLAIN_CONFIG: PlainGalleryConfig = {
  strategy: PlainGalleryStrategy.ROW,
  layout: DEFAULT_LAYOUT,
  advanced: { aTags: false, additionalBackground: '50% 50%/cover' }
};
export const DEFAULT_LOADING: LoadingConfig = { enable: true, type: LoadingType.STANDARD };
export const DEFAULT_DESCRIPTION_STYLE: DescriptionStyle = {
  bgColor: 'rgba(0, 0, 0, .5)',
  textColor: 'white',
  marginTop: '0px',
  marginBottom: '0px',
  marginLeft: '0px',
  marginRight: '0px'
};
export const DEFAULT_DESCRIPTION: Description = {
  strategy: DescriptionStrategy.ALWAYS_VISIBLE,
  imageText: 'Image ',
  numberSeparator: '/',
  beforeTextDescription: ' - ',
  style: DEFAULT_DESCRIPTION_STYLE
};
export const DEFAULT_CAROUSEL_DESCRIPTION: Description = {
  strategy: DescriptionStrategy.ALWAYS_HIDDEN,
  imageText: 'Image ',
  numberSeparator: '/',
  beforeTextDescription: ' - ',
  style: DEFAULT_DESCRIPTION_STYLE
};
export const DEFAULT_CURRENT_IMAGE_CONFIG: CurrentImageConfig = {
  navigateOnClick: true,
  loadingConfig: DEFAULT_LOADING,
  description: DEFAULT_DESCRIPTION,
  downloadable: false,
  invertSwipe: false
};
export const DEFAULT_CAROUSEL_IMAGE_CONFIG: CarouselImageConfig = {
  description: DEFAULT_CAROUSEL_DESCRIPTION,
  invertSwipe: false
};
export const DEFAULT_CURRENT_CAROUSEL_CONFIG: CarouselConfig = {
  maxWidth: '100%',
  maxHeight: '400px',
  showArrows: true,
  objectFit: 'cover',
  keyboardEnable: true,
  modalGalleryEnable: false,
  legacyIE11Mode: false
};
export const DEFAULT_CURRENT_CAROUSEL_PLAY: PlayConfig = {
  autoPlay: true,
  interval: 5000,
  pauseOnHover: true
};

export const DEFAULT_CAROUSEL_BREAKPOINTS: BreakpointsConfig = { xSmall: 100, small: 100, medium: 150, large: 200, xLarge: 200 };
export const DEFAULT_CAROUSEL_PREVIEWS_CONFIG: CarouselPreviewConfig = {
  visible: true,
  number: 4,
  arrows: true,
  clickable: true,
  width: 100 / 4 + '%',
  maxHeight: '200px',
  breakpoints: DEFAULT_CAROUSEL_BREAKPOINTS
};

const DEFAULT_CONFIG: LibConfig = Object.freeze({
  slideConfig: <SlideConfig>{
    infinite: false,
    playConfig: <PlayConfig>{ autoPlay: false, interval: 5000, pauseOnHover: true },
    sidePreviews: <SidePreviewsConfig>{ show: true, size: { width: '100px', height: 'auto' } }
  },
  accessibilityConfig: KS_DEFAULT_ACCESSIBILITY_CONFIG,
  previewConfig: <PreviewConfig>{
    visible: true,
    number: 3,
    arrows: true,
    clickable: true,
    // alwaysCenter: false, // TODO still not implemented
    size: DEFAULT_PREVIEW_SIZE
  },
  buttonsConfig: <ButtonsConfig>{ visible: true, strategy: ButtonsStrategy.DEFAULT },
  dotsConfig: <DotsConfig>{ visible: true },
  plainGalleryConfig: DEFAULT_PLAIN_CONFIG,
  currentImageConfig: DEFAULT_CURRENT_IMAGE_CONFIG,
  keyboardConfig: null, // by default nothing, because the library uses default buttons automatically
  carouselConfig: DEFAULT_CURRENT_CAROUSEL_CONFIG,
  carouselImageConfig: DEFAULT_CAROUSEL_IMAGE_CONFIG,
  carouselPreviewsConfig: DEFAULT_CAROUSEL_PREVIEWS_CONFIG,
  carouselPlayConfig: DEFAULT_CURRENT_CAROUSEL_PLAY,
  carouselDotsConfig: <DotsConfig>{ visible: true }
});

/**
 * Service to handle library configuration in a unique place
 */
@Injectable()
export class ConfigService {
  config: LibConfig = DEFAULT_CONFIG;

  get(): LibConfig {
    return this.config;
  }

  set(obj: LibConfig): void {
    const newConfig: LibConfig = Object.assign({}, this.config);
    if (obj.slideConfig) {
      let playConfig;
      let sidePreviews;
      let size;
      if (obj.slideConfig.playConfig) {
        playConfig = Object.assign({}, DEFAULT_CONFIG.slideConfig.playConfig, obj.slideConfig.playConfig);
      } else {
        playConfig = DEFAULT_CONFIG.slideConfig.playConfig;
      }
      if (obj.slideConfig.sidePreviews) {
        if (obj.slideConfig.sidePreviews.size) {
          size = Object.assign({}, DEFAULT_CONFIG.slideConfig.sidePreviews.size, obj.slideConfig.sidePreviews.size);
        } else {
          size = DEFAULT_CONFIG.slideConfig.sidePreviews.size;
        }
        sidePreviews = Object.assign({}, DEFAULT_CONFIG.slideConfig.sidePreviews, obj.slideConfig.sidePreviews);
      } else {
        sidePreviews = DEFAULT_CONFIG.slideConfig.sidePreviews;
        size = DEFAULT_CONFIG.slideConfig.sidePreviews.size;
      }
      const newSlideConfig: SlideConfig = Object.assign({}, DEFAULT_CONFIG.slideConfig, obj.slideConfig);
      newSlideConfig.playConfig = playConfig;
      newSlideConfig.sidePreviews = sidePreviews;
      newSlideConfig.sidePreviews.size = size;
      newConfig.slideConfig = newSlideConfig;
    }
    if (obj.accessibilityConfig) {
      newConfig.accessibilityConfig = Object.assign({}, DEFAULT_CONFIG.accessibilityConfig, obj.accessibilityConfig);
    }
    if (obj.previewConfig) {
      let size;
      let number;
      if (obj.previewConfig.size) {
        size = Object.assign({}, DEFAULT_CONFIG.previewConfig.size, obj.previewConfig.size);
      } else {
        size = DEFAULT_CONFIG.previewConfig.size;
      }
      if (obj.previewConfig.number) {
        if (obj.previewConfig.number <= 0) {
          // if number is <= 0 reset to default
          number = DEFAULT_CONFIG.previewConfig.number;
        } else {
          number = obj.previewConfig.number;
        }
      } else {
        number = DEFAULT_CONFIG.previewConfig.number;
      }
      const newPreviewConfig: PreviewConfig = Object.assign({}, DEFAULT_CONFIG.previewConfig, obj.previewConfig);
      newPreviewConfig.size = size;
      newPreviewConfig.number = number;
      newConfig.previewConfig = newPreviewConfig;
    }
    if (obj.buttonsConfig) {
      newConfig.buttonsConfig = Object.assign({}, DEFAULT_CONFIG.buttonsConfig, obj.buttonsConfig);
    }
    if (obj.dotsConfig) {
      newConfig.dotsConfig = Object.assign({}, DEFAULT_CONFIG.dotsConfig, obj.dotsConfig);
    }
    if (obj.plainGalleryConfig) {
      let advanced;
      let layout;
      if (obj.plainGalleryConfig.advanced) {
        advanced = Object.assign({}, DEFAULT_CONFIG.plainGalleryConfig.advanced, obj.plainGalleryConfig.advanced);
      } else {
        advanced = DEFAULT_CONFIG.plainGalleryConfig.advanced;
      }
      if (obj.plainGalleryConfig.layout) {
        // it isn't mandatory to use assign, because obj.plainGalleryConfig.layout is an instance of class (LineaLayout, GridLayout, AdvancedLayout)
        layout = obj.plainGalleryConfig.layout;
      } else {
        layout = DEFAULT_CONFIG.plainGalleryConfig.layout;
      }
      const newPlainGalleryConfig: PlainGalleryConfig = Object.assign({}, DEFAULT_CONFIG.plainGalleryConfig, obj.plainGalleryConfig);
      newPlainGalleryConfig.layout = layout;
      newPlainGalleryConfig.advanced = advanced;
      newConfig.plainGalleryConfig = initPlainGalleryConfig(newPlainGalleryConfig);
    }
    if (obj.currentImageConfig) {
      let loading;
      let description;
      let descriptionStyle;
      if (obj.currentImageConfig.loadingConfig) {
        loading = Object.assign({}, DEFAULT_CONFIG.currentImageConfig.loadingConfig, obj.currentImageConfig.loadingConfig);
      } else {
        loading = DEFAULT_CONFIG.currentImageConfig.loadingConfig;
      }
      if (obj.currentImageConfig.description) {
        description = Object.assign({}, DEFAULT_CONFIG.currentImageConfig.description, obj.currentImageConfig.description);
        if (obj.currentImageConfig.description.style) {
          descriptionStyle = Object.assign({}, DEFAULT_CONFIG.currentImageConfig.description.style, obj.currentImageConfig.description.style);
        } else {
          descriptionStyle = DEFAULT_CONFIG.currentImageConfig.description.style;
        }
      } else {
        description = DEFAULT_CONFIG.currentImageConfig.description;
        descriptionStyle = DEFAULT_CONFIG.currentImageConfig.description.style;
      }
      const newCurrentImageConfig: CurrentImageConfig = Object.assign({}, DEFAULT_CONFIG.currentImageConfig, obj.currentImageConfig);
      newCurrentImageConfig.loadingConfig = loading;
      newCurrentImageConfig.description = description;
      newCurrentImageConfig.description.style = descriptionStyle;
      newConfig.currentImageConfig = newCurrentImageConfig;
    }

    // carousel
    if (obj.carouselConfig) {
      newConfig.carouselConfig = Object.assign({}, DEFAULT_CONFIG.carouselConfig, obj.carouselConfig);
    }
    if (obj.carouselImageConfig) {
      let description;
      let descriptionStyle;
      if (obj.carouselImageConfig.description) {
        description = Object.assign({}, DEFAULT_CONFIG.carouselImageConfig.description, obj.carouselImageConfig.description);
        if (obj.carouselImageConfig.description.style) {
          descriptionStyle = Object.assign({}, DEFAULT_CONFIG.carouselImageConfig.description.style, obj.carouselImageConfig.description.style);
        } else {
          descriptionStyle = DEFAULT_CONFIG.carouselImageConfig.description.style;
        }
      } else {
        description = DEFAULT_CONFIG.carouselImageConfig.description;
        descriptionStyle = DEFAULT_CONFIG.carouselImageConfig.description.style;
      }
      const newCarouselImageConfig: CarouselImageConfig = Object.assign({}, DEFAULT_CONFIG.carouselImageConfig, obj.carouselImageConfig);
      newCarouselImageConfig.description = description;
      newCarouselImageConfig.description.style = descriptionStyle;
      newConfig.carouselImageConfig = newCarouselImageConfig;
    }
    if (obj.carouselPlayConfig) {
      // check values
      if (obj.carouselPlayConfig.interval <= 0) {
        throw new Error(`Carousel's interval must be a number >= 0`);
      }
      newConfig.carouselPlayConfig = Object.assign({}, DEFAULT_CONFIG.carouselPlayConfig, obj.carouselPlayConfig);
    }
    if (obj.carouselPreviewsConfig) {
      // check values
      let number;
      let breakpoints;
      if (obj.carouselPreviewsConfig.number <= 0 || !obj.carouselPreviewsConfig.number) {
        number = DEFAULT_CAROUSEL_PREVIEWS_CONFIG.number;
      } else {
        number = obj.carouselPreviewsConfig.number;
      }
      if (obj.carouselPreviewsConfig.breakpoints) {
        breakpoints = Object.assign({}, DEFAULT_CONFIG.carouselPreviewsConfig.breakpoints, obj.carouselPreviewsConfig.breakpoints);
      } else {
        breakpoints = DEFAULT_CONFIG.carouselPreviewsConfig.breakpoints;
      }
      newConfig.carouselPreviewsConfig = Object.assign({}, DEFAULT_CONFIG.carouselPreviewsConfig, obj.carouselPreviewsConfig);
      newConfig.carouselPreviewsConfig.number = number;
      newConfig.carouselPreviewsConfig.breakpoints = breakpoints;
      // Init preview image width based on the number of previews in PreviewConfig
      // Don't move this line above, because I need to be sure that both configPreview.number
      // and configPreview.size are initialized
      newConfig.carouselPreviewsConfig.width = 100 / newConfig.carouselPreviewsConfig.number + '%';
    }
    if (obj.carouselDotsConfig) {
      newConfig.carouselDotsConfig = Object.assign({}, DEFAULT_CONFIG.carouselDotsConfig, obj.carouselDotsConfig);
    }
    this.config = newConfig;
  }
}

/**
 * Function to build and return a `PlainGalleryConfig` object, proving also default values and validating the input object.
 * @param plainGalleryConfig object with the config requested by user
 * @returns PlainGalleryConfig the plain gallery configuration
 * @throws an Error if layout and strategy aren't compatible
 */
function initPlainGalleryConfig(plainGalleryConfig): PlainGalleryConfig {
  const newPlayGalleryConfig: PlainGalleryConfig = Object.assign({}, DEFAULT_CONFIG.plainGalleryConfig, plainGalleryConfig);

  if (newPlayGalleryConfig.layout instanceof LineLayout) {
    if (newPlayGalleryConfig.strategy !== PlainGalleryStrategy.ROW && newPlayGalleryConfig.strategy !== PlainGalleryStrategy.COLUMN) {
      throw new Error('LineLayout requires either ROW or COLUMN strategy');
    }
    if (!newPlayGalleryConfig.layout || !newPlayGalleryConfig.layout.breakConfig) {
      throw new Error('Both layout and breakConfig must be valid');
    }
  }

  if (newPlayGalleryConfig.layout instanceof GridLayout) {
    if (newPlayGalleryConfig.strategy !== PlainGalleryStrategy.GRID) {
      throw new Error('GridLayout requires GRID strategy');
    }
    if (!newPlayGalleryConfig.layout || !newPlayGalleryConfig.layout.breakConfig) {
      throw new Error('Both layout and breakConfig must be valid');
    }
    // force wrap for grid layout
    newPlayGalleryConfig.layout.breakConfig.wrap = true;
  }

  if (newPlayGalleryConfig.layout instanceof AdvancedLayout) {
    if (newPlayGalleryConfig.strategy !== PlainGalleryStrategy.CUSTOM) {
      throw new Error('AdvancedLayout requires CUSTOM strategy');
    }
  }
  return newPlayGalleryConfig;
}
