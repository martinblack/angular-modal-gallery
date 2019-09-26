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
 * Interface `Description` to change the description, either with a full custom
 * description or with a small and simple customization.
 * Also, you could change margins, background style and so on.
 */
export interface Description {
  strategy: DescriptionStrategy;
  customFullDescription?: string;
  imageText?: string;
  numberSeparator?: string;
  beforeTextDescription?: string;

  style?: DescriptionStyle;
}

/**
 * Enum `DescriptionStrategy` with keys and their relative key codes.
 */
export enum DescriptionStrategy {
  ALWAYS_HIDDEN = 1,
  ALWAYS_VISIBLE,
  HIDE_IF_EMPTY
}

/**
 * Interface to change css properties.
 */
export interface DescriptionStyle {
  bgColor?: string;
  textColor?: string;
  width?: string;
  height?: string;
  position?: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  marginTop?: string;
  marginBottom?: string;
  marginRight?: string;
  marginLeft?: string;
}
