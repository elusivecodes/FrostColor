import Color from './../color.js';
import { colors } from './../color-names.js';
import { cmy2rgb, cmyk2cmy, hsl2rgb, hsv2rgb } from './../conversions.js';

/**
 * Color (Static) Creation
 */

/**
 * Create a new Color from CMY values.
 * @param {number} c The cyan value. (0, 100)
 * @param {number} m The magenta value. (0, 100)
 * @param {number} y The yellow value. (0, 100)
 * @param {number} [a=1] The alpha value. (0, 1)
 * @return {Color} A new Color object.
 */
export function fromCMY(c, m, y, a = 1) {
    const [r, g, b] = cmy2rgb(c, m, y);
    return new Color(r, g, b, a);
};

/**
 * Create a new Color from CMYK values.
 * @param {number} c The cyan value. (0, 100)
 * @param {number} m The magenta value. (0, 100)
 * @param {number} y The yellow value. (0, 100)
 * @param {number} k The key value. (0, 100)
 * @param {number} [a=1] The alpha value. (0, 1)
 * @return {Color} A new Color object.
 */
export function fromCMYK(c, m, y, k, a = 1) {
    [c, m, y] = cmyk2cmy(c, m, y, k);
    return fromCMY(c, m, y, a);
};

/**
 * Create a new Color from a hex color string.
 * @param {string} string The hex color string.
 * @return {Color} A new Color object.
 */
export function fromHexString(string) {
    string = string.trim();

    const hexMatch = string.length > 6 ?
        string.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})?$/i) :
        string.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f]?)$/i);

    if (!hexMatch) {
        throw new Error('Invalid hex string');
    }

    const rgb = hexMatch.slice(1, 5).map((value) =>
        value ?
            parseInt(
                value.length == 2 ?
                    value :
                    value + value,
                16,
            ) :
            null,
    );

    return new Color(rgb[0],
        rgb[1],
        rgb[2],
        rgb[3] ?
            rgb[3] / 255 :
            1,
    );
};

/**
 * Create a new Color from HSL values.
 * @param {number} h The hue value. (0, 360)
 * @param {number} s The saturation value. (0, 100)
 * @param {number} l The lightness value. (0, 100)
 * @param {number} [a=1] The alpha value. (0, 1)
 * @return {Color} A new Color object.
 */
export function fromHSL(h, s, l, a = 1) {
    const [r, g, b] = hsl2rgb(h, s, l);
    return new Color(r, g, b, a);
};

/**
 * Create a new Color from a HSL color string.
 * @param {string} string The HSL color string.
 * @return {Color} A new Color object.
 */
export function fromHSLString(string) {
    string = string.trim();

    const HSL2Match = string.match(/^hsl\(((?:\d*\.)?\d+)deg\s+((?:\d*\.)?\d+)\%\s+((?:\d*\.)?\d+)\%\)$/i);

    if (HSL2Match) {
        return fromHSL(HSL2Match[1], HSL2Match[2], HSL2Match[3]);
    }

    const HSLA2Match = string.match(/^hsl\(((?:\d*\.)?\d+)deg\s+((?:\d*\.)?\d+)\%\s+((?:\d*\.)?\d+)\%\s*\/\s*((?:\d*\.)?\d+)(\%?)\)$/i);

    if (HSLA2Match) {
        return fromHSL(
            HSLA2Match[1],
            HSLA2Match[2],
            HSLA2Match[3],
            HSLA2Match[5] ?
                HSLA2Match[4] / 100 :
                HSLA2Match[4],
        );
    }

    const HSLMatch = string.match(/^hsl\(((?:\d*\.)?\d+),\s*((?:\d*\.)?\d+)\%,\s*((?:\d*\.)?\d+)\%\)$/i);

    if (HSLMatch) {
        return fromHSL(HSLMatch[1], HSLMatch[2], HSLMatch[3]);
    }

    const HSLAMatch = string.match(/^hsla\(((?:\d*\.)?\d+),\s*((?:\d*\.)?\d+)\%,\s*((?:\d*\.)?\d+)\%,\s*((?:\d*\.)?\d+)(\%?)\)$/i);

    if (HSLAMatch) {
        return fromHSL(
            HSLAMatch[1],
            HSLAMatch[2],
            HSLAMatch[3],
            HSLAMatch[5] ?
                HSLAMatch[4] / 100 :
                HSLAMatch[4],
        );
    }

    throw new Error('Invalid HSL string');
};

/**
 * Create a new Color from HSV values.
 * @param {number} h The hue value. (0, 360)
 * @param {number} s The saturation value. (0, 100)
 * @param {number} v The brightness value. (0, 100)
 * @param {number} [a=1] The alpha value. (0, 1)
 * @return {Color} A new Color object.
 */
export function fromHSV(h, s, v, a = 1) {
    const [r, g, b] = hsv2rgb(h, s, v);
    return new Color(r, g, b, a);
};

/**
 * Create a new Color from RGB values.
 * @param {number} r The red value. (0, 255)
 * @param {number} g The green value. (0, 255)
 * @param {number} b The blue value. (0, 255)
 * @param {number} [a=1] The alpha value. (0, 1)
 * @return {Color} A new Color object.
 */
export function fromRGB(r, g, b, a = 1) {
    return new Color(r, g, b, a);
};

/**
 * Create a new Color from a RGB color string.
 * @param {string} string The RGB color string.
 * @return {Color} A new Color object.
 */
export function fromRGBString(string) {
    string = string.trim();

    const RGB2Match = string.match(/^rgb\(((?:\d*\.)?\d+)\s+((?:\d*\.)?\d+)\s+((?:\d*\.)?\d+)\)$/i);

    if (RGB2Match) {
        return new Color(RGB2Match[1], RGB2Match[2], RGB2Match[3]);
    }

    const RGBA2Match = string.match(/^rgb\(((?:\d*\.)?\d+)\s+((?:\d*\.)?\d+)\s+((?:\d*\.)?\d+)\s*\/\s*((?:\d*\.)?\d+)(\%?)\)$/i);

    if (RGBA2Match) {
        return new Color(
            RGBA2Match[1],
            RGBA2Match[2],
            RGBA2Match[3],
            RGBA2Match[5] ?
                RGBA2Match[4] / 100 :
                RGBA2Match[4],
        );
    }

    const RGBMatch = string.match(/^rgb\(((?:\d*\.)?\d+),\s*((?:\d*\.)?\d+),\s*((?:\d*\.)?\d+)\)$/i);

    if (RGBMatch) {
        return new Color(RGBMatch[1], RGBMatch[2], RGBMatch[3]);
    }

    const RGBAMatch = string.match(/^rgba\(((?:\d*\.)?\d+),\s*((?:\d*\.)?\d+),\s*((?:\d*\.)?\d+),\s*((?:\d*\.)?\d+)(\%?)\)$/i);

    if (RGBAMatch) {
        return new Color(
            RGBAMatch[1],
            RGBAMatch[2],
            RGBAMatch[3],
            RGBAMatch[5] ?
                RGBAMatch[4] / 100 :
                RGBAMatch[4],
        );
    }

    throw new Error('Invalid RGB string');
};

/**
 * Create a new Color from a HTML color string.
 * @param {string} string The HTML color string.
 * @return {Color} A new Color object.
 */
export function fromString(string) {
    string = string.toLowerCase().trim();

    if (string === 'transparent') {
        return new Color(0, 0, 0, 0);
    }

    if (string in colors) {
        string = colors[string];
    }

    if (string.substring(0, 1) === '#') {
        return fromHexString(string);
    }

    if (string.substring(0, 3).toLowerCase() === 'rgb') {
        return fromRGBString(string);
    }

    if (string.substring(0, 3).toLowerCase() === 'hsl') {
        return fromHSLString(string);
    }

    throw new Error('Invalid color string');
};
