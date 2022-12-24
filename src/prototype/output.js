import { colors, hexLookup } from './../color-names.js';
import { toHex } from './../helpers.js';
import { rgb2hsl, rgba2hex } from './../conversions.js';
import { fromHexString } from './../static/create.js';
import { dist } from './../static/utility.js';

/**
 * Get the closest color name for the color.
 * @return {string} The name.
 */
export function label() {
    let closest;
    let closestDistance = Number.MAX_SAFE_INTEGER;

    for (const label in colors) {
        if (!{}.hasOwnProperty.call(colors, label)) {
            continue;
        }

        const color = fromHexString(colors[label]);
        const distance = dist(this, color);

        if (distance < closestDistance) {
            closest = label;
            closestDistance = distance;
        }
    }

    return closest;
};

/**
 * Return a hexadecimal string representation of the color.
 * @return {string} The hexadecimal string.
 */
export function toHexString() {
    const hex = rgba2hex(this.r, this.g, this.b, this.a);

    return toHex(hex);
};

/**
 * Return a HSL/HSLA string representation of the color.
 * @return {string} The HSL/HSLA string.
 */
export function toHSLString() {
    let [h, s, l] = rgb2hsl(this.r, this.g, this.b);

    h = Math.round(h);
    s = Math.round(s);
    l = Math.round(l);
    const a = Math.round(this.a * 100);

    if (a < 100) {
        return `hsl(${h}deg ${s}% ${l}% / ${a}%)`;
    }

    return `hsl(${h}deg ${s}% ${l}%)`;
};

/**
 * Return a RGB/RGBA string representation of the color.
 * @return {string} The RGB/RGBA string.
 */
export function toRGBString() {
    const r = Math.round(this.r);
    const g = Math.round(this.g);
    const b = Math.round(this.b);
    const a = Math.round(this.a * 100);

    if (a < 100) {
        return `rgb(${r} ${g} ${b} / ${a}%)`;
    }

    return `rgb(${r} ${g} ${b})`;
};

/**
 * Return a HTML string representation of the color.
 * @return {string} The HTML color string.
 */
export function toString() {
    if (!this.a) {
        return 'transparent';
    }

    if (this.a < 1) {
        return this.toRGBString();
    }

    const hex = rgba2hex(this.r, this.g, this.b, this.a);

    if (hex in hexLookup) {
        return hexLookup[hex];
    }

    return toHex(hex);
};
