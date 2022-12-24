import Color from './../color.js';
import { hsl2rgb, rgb2hsl } from './../conversions.js';
import { mix } from './../static/utility.js';

/**
 * Color Manipulation
 */

const white = new Color(100);
const grey = new Color(50);
const black = new Color(0);

/**
 * Darken the color by a specified amount.
 * @param {number} amount The amount to darken the color by. (0, 1)
 * @return {Color} The darkened Color object.
 */
export function darken(amount) {
    let [h, s, l] = rgb2hsl(this.r, this.g, this.b);
    l -= l * amount;
    const [r, g, b] = hsl2rgb(h, s, l);

    return new Color(r, g, b, this.a);
};

/**
 * Invert the color.
 * @return {Color} The inverted Color object.
 */
export function invert() {
    return new Color(
        255 - this.r,
        255 - this.g,
        255 - this.b,
        this.a,
    );
};

/**
 * Lighten the color by a specified amount.
 * @param {number} amount The amount to lighten the color by. (0, 1)
 * @return {Color} The lightened Color object.
 */
export function lighten(amount) {
    let [h, s, l] = rgb2hsl(this.r, this.g, this.b);
    l += (100 - l) * amount;
    const [r, g, b] = hsl2rgb(h, s, l);

    return new Color(r, g, b, this.a);
};

/**
 * Shade the color by a specified amount.
 * @param {number} amount The amount to shade the color by. (0, 1)
 * @return {Color} The shaded Color object.
 */
export function shade(amount) {
    return mix(this, black, amount);
};

/**
 * Tint the color by a specified amount.
 * @param {number} amount The amount to tint the color by. (0, 1)
 * @return {Color} The tinted Color object.
 */
export function tint(amount) {
    return mix(this, white, amount);
};

/**
 * Tone the color by a specified amount.
 * @param {number} amount The amount to tone the color by. (0, 1)
 * @return {Color} The toned Color object.
 */
export function tone(amount) {
    return mix(this, grey, amount);
};
