import Color from './../color.js';
import { hsv2rgb, rgb2hsv } from './../conversions.js';

/**
 * Color Schemes
 */

/**
 * Create an array with 2 analogous color variations.
 * @return {Color[]} An array containing 2 analogous color variations.
 */
export function analogous() {
    const [h, s, v] = rgb2hsv(this.r, this.g, this.b);
    const [r1, g1, b1] = hsv2rgb(h + 30, s, v);
    const [r2, g2, b2] = hsv2rgb(h - 30, s, v);

    return [
        new Color(r1, g1, b1, this.a),
        new Color(r2, g2, b2, this.a),
    ];
};

/**
 * Create a complementary color variation.
 * @return {Color} A complementary color variation.
 */
export function complementary() {
    const [h, s, v] = rgb2hsv(this.r, this.g, this.b);
    const [r, g, b] = hsv2rgb(h + 180, s, v);

    return new Color(r, g, b, this.a);
};

/**
 * Create an array with 2 split color variations.
 * @return {Color[]} An array containing 2 split color variations.
 */
export function split() {
    const [h, s, v] = rgb2hsv(this.r, this.g, this.b);
    const [r1, g1, b1] = hsv2rgb(h + 150, s, v);
    const [r2, g2, b2] = hsv2rgb(h - 150, s, v);

    return [
        new Color(r1, g1, b1, this.a),
        new Color(r2, g2, b2, this.a),
    ];
};

/**
 * Create an array with 3 tetradic color variations.
 * @return {Color[]} An array containing 3 tetradic color variations.
 */
export function tetradic() {
    const [h, s, v] = rgb2hsv(this.r, this.g, this.b);
    const [r1, g1, b1] = hsv2rgb(h + 60, s, v);
    const [r2, g2, b2] = hsv2rgb(h + 180, s, v);
    const [r3, g3, b3] = hsv2rgb(h - 120, s, v);

    return [
        new Color(r1, g1, b1, this.a),
        new Color(r2, g2, b2, this.a),
        new Color(r3, g3, b3, this.a),
    ];
};

/**
 * Create an array with 2 triadic color variations.
 * @return {Color[]} An array containing 2 triadic color variations.
 */
export function triadic() {
    const [h, s, v] = rgb2hsv(this.r, this.g, this.b);
    const [r1, g1, b1] = hsv2rgb(h + 120, s, v);
    const [r2, g2, b2] = hsv2rgb(h - 120, s, v);

    return [
        new Color(r1, g1, b1, this.a),
        new Color(r2, g2, b2, this.a),
    ];
};
