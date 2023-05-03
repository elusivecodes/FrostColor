
import { clamp, round } from './helpers.js';

/**
 * Color class
 * @class
 */
export default class Color {
    /**
     * New Color constructor.
     * @param {number} [r=0] The red value, or the brightness value.
     * @param {number} [g=1] The green value or the alpha value.
     * @param {null|number} [b=null] The blue value.
     * @param {number} [a=1] The alpha value.
     */
    constructor(r = 0, g = 1, b = null, a = 1) {
        if (b === null) {
            a = g;
            b = g = r = round(r * 2.55);
        }

        this._r = clamp(r, 0, 255);
        this._g = clamp(g, 0, 255);
        this._b = clamp(b, 0, 255);
        this._a = clamp(a, 0, 1);
    }

    /**
     * Return the luminance value of the color.
     * @return {number} The luminance value. (0, 1)
     */
    valueOf() {
        return this.luma();
    }

    /**
     * Return a primitive value of the color.
     * @param {string} hint The type hint.
     * @return {string|number} The HTML color string, or the luminance value.
     */
    [Symbol.toPrimitive](hint) {
        return hint === 'number' ?
            this.valueOf() :
            this.toString();
    }

    /**
     * Get the alpha value of the color.
     * @return {number} The alpha value. (0, 1)
     */
    get a() {
        return this._a;
    }

    /**
     * Get the blue value of the color.
     * @return {number} The blue value. (0, 255)
     */
    get b() {
        return this._b;
    }

    /**
     * Get the green value of the color.
     * @return {number} The green value. (0, 255)
     */
    get g() {
        return this._g;
    }

    /**
     * Get the red value of the color.
     * @return {number} The red value. (0, 255)
     */
    get r() {
        return this._r;
    }
}
