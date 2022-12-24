import { round } from './helpers.js';

/**
 * Color Conversions
 */

/**
 * Convert CMY color values to RGB.
 * @param {number} c The cyan value. (0, 100)
 * @param {number} m The magenta value. (0, 100)
 * @param {number} y The yellow value. (0, 100)
 * @return {number[]} An array containing the RGB values.
 */
export const cmy2rgb = (c, m, y) => {
    return [
        round((1 - c / 100) * 255),
        round((1 - m / 100) * 255),
        round((1 - y / 100) * 255),
    ];
};

/**
 * Convert CMYK color values to CMY.
 * @param {number} c The cyan value. (0, 100)
 * @param {number} m The magenta value. (0, 100)
 * @param {number} y The yellow value. (0, 100)
 * @param {number} k The key value. (0, 100)
 * @return {number[]} An array containing the CMY values.
 */
export const cmyk2cmy = (c, m, y, k) => {
    k /= 100;

    return [
        round((c / 100 * (1 - k) + k) * 100),
        round((m / 100 * (1 - k) + k) * 100),
        round((y / 100 * (1 - k) + k) * 100),
    ];
};

/**
 * Calculate the R, G or B value of a hue.
 * @param {number} v1 The first value.
 * @param {number} v2 The second value.
 * @param {number} vH The hue value.
 * @return {number} The R, G or B value.
 */
const rgbHue = (v1, v2, vH) => {
    vH = (vH + 1) % 1;

    if (6 * vH < 1) {
        return v1 + (v2 - v1) * 6 * vH;
    }

    if (2 * vH < 1) {
        return v2;
    }

    if (3 * vH < 2) {
        return v1 + (v2 - v1) * ((2 / 3) - vH) * 6;
    }

    return v1;
};

/**
 * Convert HSL color values to RGB.
 * @param {number} h The hue value. (0, 360)
 * @param {number} s The saturation value. (0, 100)
 * @param {number} l The lightness value. (0, 100)
 * @return {number[]} An array containing the RGB values.
 */
export const hsl2rgb = (h, s, l) => {
    if (!l) {
        return [0, 0, 0];
    }

    h /= 360;
    s /= 100;
    l /= 100;

    const v2 = l < .5 ?
        l * (1 + s) :
        (l + s) - (s * l);
    const v1 = 2 * l - v2;
    const r = rgbHue(v1, v2, h + (1 / 3));
    const g = rgbHue(v1, v2, h);
    const b = rgbHue(v1, v2, h - (1 / 3));

    return [
        round(r * 255),
        round(g * 255),
        round(b * 255),
    ];
};

/**
 * Convert HSV color values to RGB.
 * @param {number} h The hue value. (0, 360)
 * @param {number} s The saturation value. (0, 100)
 * @param {number} v The brightness value (0, 100)
 * @return {number[]} An array containing the RGB values.
 */
export const hsv2rgb = (h, s, v) => {
    v /= 100;

    if (!s) {
        return [
            round(v * 255),
            round(v * 255),
            round(v * 255),
        ];
    }

    h = (h / 60) % 6;
    s /= 100;

    const vi = Math.floor(h);
    const v1 = v * (1 - s);
    const v2 = v * (1 - s * (h - vi));
    const v3 = v * (1 - s * (1 - (h - vi)));

    let r; let g; let b;

    switch (vi) {
        case 0:
            r = v;
            g = v3;
            b = v1;
            break;
        case 1:
            r = v2;
            g = v;
            b = v1;
            break;
        case 2:
            r = v1;
            g = v;
            b = v3;
            break;
        case 3:
            r = v1;
            g = v2;
            b = v;
            break;
        case 4:
            r = v3;
            g = v1;
            b = v;
            break;
        default:
            r = v;
            g = v1;
            b = v2;
            break;
    }

    return [
        round(r * 255),
        round(g * 255),
        round(b * 255),
    ];
};

/**
 * Convert RGB color values to HSL.
 * @param {number} r The red value. (0, 255)
 * @param {number} g The green value. (0, 255)
 * @param {number} b The blue value. (0, 255)
 * @return {number[]} An array containing the HSL values.
 */
export const rgb2hsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const diff = max - min;
    const l = (max + min) / 2;

    if (!diff) {
        return [
            0,
            0,
            round(l * 100),
        ];
    }

    const s = l < .5 ?
        diff / (max + min) :
        diff / (2 - max - min);
    const deltaR = (((max - r) / 6) + (diff / 2)) / diff;
    const deltaG = (((max - g) / 6) + (diff / 2)) / diff;
    const deltaB = (((max - b) / 6) + (diff / 2)) / diff;

    let h = 0;

    switch (max) {
        case r:
            h = deltaB - deltaG;
            break;
        case g:
            h = 1 / 3 + deltaR - deltaB;
            break;
        case b:
            h = 2 / 3 + deltaG - deltaR;
            break;
    }

    h = (h + 1) % 1;

    return [
        round(h * 360),
        round(s * 100),
        round(l * 100),
    ];
};

/**
 * Convert RGB color values to HSV.
 * @param {number} r The red value. (0, 255)
 * @param {number} g The green value. (0, 255)
 * @param {number} b The blue value. (0, 255)
 * @return {number[]} An array containing the HSV values.
 */
export const rgb2hsv = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const diff = max - min;
    const v = max;

    if (!diff) {
        return [
            0,
            0,
            round(v * 100),
        ];
    }

    const s = diff / max;
    const deltaR = (((max - r) / 6) + (diff / 2)) / diff;
    const deltaG = (((max - g) / 6) + (diff / 2)) / diff;
    const deltaB = (((max - b) / 6) + (diff / 2)) / diff;

    let h = 0;

    switch (max) {
        case r:
            h = deltaB - deltaG;
            break;
        case g:
            h = 1 / 3 + deltaR - deltaB;
            break;
        case b:
            h = 2 / 3 + deltaG - deltaR;
            break;
    }

    h = (h + 1) % 1;

    return [
        round(h * 360),
        round(s * 100),
        round(v * 100),
    ];
};

/**
 * Convert RGBA color values to hex.
 * @param {number} r The red value. (0, 255)
 * @param {number} g The green value. (0, 255)
 * @param {number} b The blue value. (0, 255)
 * @param {number} a The alpha value. (0, 1)
 * @return {string} The hex string.
 */
export const rgba2hex = (r, g, b, a) => {
    [r, g, b] = [r, g, b].map(
        (value) => (Math.round(value) | 1 << 8)
            .toString(16)
            .slice(1),
    );
    const hex = `#${r}${g}${b}`;

    if (a >= 1) {
        return hex;
    }

    return hex +
        (Math.round(a * 255) | 1 << 8)
            .toString(16)
            .slice(1);
};

/**
 * Calculate the relative R, G or B value for luma calculation.
 * @param {number} v The value.
 * @return {number} The R, G or B value.
 */
const rgbLumaVlaue = (v) => {
    v /= 255;

    if (v <= .03928) {
        return v / 12.92;
    }

    return Math.pow(((v + .055) / 1.055), 2.4);
};

/**
 * Calculate the relative luminance of an RGB color.
 * @param {number} r The red value. (0, 255)
 * @param {number} g The green value. (0, 255)
 * @param {number} b The blue value. (0, 255)
 * @return {number} The relative luminance value.
 */
export const rgbLuma = (r, g, b) => {
    r = rgbLumaVlaue(r);
    g = rgbLumaVlaue(g);
    b = rgbLumaVlaue(b);

    return (.2126 * r) + (.7152 * g) + (.0722 * b);
};
