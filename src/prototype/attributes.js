import Color from './../color.js';
import { hsv2rgb, rgb2hsv, rgbLuma } from './../conversions.js';

/**
 * Color Attributes
 */


/**
 * Get the alpha value of the color.
 * @return {number} The alpha value. (0, 1)
 */
export function getAlpha() {
    return this.a;
};

/**
 * Get the brightness value of the color.
 * @return {number} The brightness value. (0, 100)
 */
export function getBrightness() {
    return rgb2hsv(this.r, this.g, this.b)[2];
};

/**
 * Get the hue value of the color.
 * @return {number} The hue value. (0, 360)
 */
export function getHue() {
    return rgb2hsv(this.r, this.g, this.b)[0];
};

/**
 * Get the saturation value of the color.
 * @return {number} The saturation value. (0, 100)
 */
export function getSaturation() {
    return rgb2hsv(this.r, this.g, this.b)[1];
};

/**
 * Get the relative luminance value of the color
 * @return {number} The relative luminance value. (0, 1)
 */
export function luma() {
    return rgbLuma(this.r, this.g, this.b);
};

/**
 * Set the alpha value of the color.
 * @param {number} a The alpha value. (0, 1)
 * @return {Color} The modified Color object.
 */
export function setAlpha(a) {
    return new Color(this.r, this.g, this.b, a);
};

/**
 * Set the brightness value of the color.
 * @param {number} v The brightness value. (0, 100)
 * @return {Color} The modified Color object.
 */
export function setBrightness(v) {
    const [h, s, _] = rgb2hsv(this.r, this.g, this.b);
    const [r, g, b] = hsv2rgb(h, s, v);

    return new Color(r, g, b, this.a);
};

/**
 * Set the hue value of the color.
 * @param {number} h The hue value. (0, 360)
 * @return {Color} The modified Color object.
 */
export function setHue(h) {
    const [_, s, v] = rgb2hsv(this.r, this.g, this.b);
    const [r, g, b] = hsv2rgb(h, s, v);

    return new Color(r, g, b, this.a);
};

/**
 * Set the saturation value of the color.
 * @param {number} s The saturation value. (0, 100)
 * @return {Color} The modified Color object.
 */
export function setSaturation(s) {
    const [h, _, v] = rgb2hsv(this.r, this.g, this.b);
    const [r, g, b] = hsv2rgb(h, s, v);

    return new Color(r, g, b, this.a);
};
