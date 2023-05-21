(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Color = factory());
})(this, (function () { 'use strict';

    /**
     * Color Helpers
     */

    /**
     * Clamp a value between a min and max.
     * @param {number} val The value to clamp.
     * @param {number} [min=0] The minimum value of the clamped range.
     * @param {number} [max=1] The maximum value of the clamped range.
     * @return {number} The clamped value.
     */
    const clamp = (val, min = 0, max = 100) => {
        return Math.max(
            min,
            Math.min(max, val),
        );
    };

    /**
     * Linear interpolation from one value to another.
     * @param {number} a The starting value.
     * @param {number} b The ending value.
     * @param {number} amount The amount to interpolate.
     * @return {number} The interpolated value.
     */
    const lerp = (a, b, amount) => {
        const value = a * (1 - amount) + b * amount;
        return round(value);
    };

    /**
     * Round a number to a specified precision.
     * @param {number} num The number to round.
     * @param {number} [precision=2] The precision to use.
     * @return {number} The rounded number.
     */
    const round = (num, precision = 2) => {
        return parseFloat(parseFloat(num).toFixed(precision));
    };

    /**
     * Shorten a hex string (if possible).
     * @param {string} hex The hex string.
     * @return {string} The hex string.
     */
    const toHex = (hex) => {
        if (hex.length === 9 &&
            hex[1] === hex[2] &&
            hex[3] === hex[4] &&
            hex[5] === hex[6] &&
            hex[7] === hex[8]) {
            return `#${hex[1]}${hex[3]}${hex[5]}${hex[7]}`;
        }

        if (hex.length === 7 &&
            hex[1] === hex[2] &&
            hex[3] === hex[4] &&
            hex[5] === hex[6]) {
            return `#${hex[1]}${hex[3]}${hex[5]}`;
        }

        return hex;
    };

    /**
     * Color class
     * @class
     */
    class Color {
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

    /**
     * Color Names
     */

    // HTML color names
    const colors = {
        aliceblue: '#f0f8ff',
        antiquewhite: '#faebd7',
        aqua: '#00ffff',
        aquamarine: '#7fffd4',
        azure: '#f0ffff',
        beige: '#f5f5dc',
        bisque: '#ffe4c4',
        black: '#000000',
        blanchedalmond: '#ffebcd',
        blue: '#0000ff',
        blueviolet: '#8a2be2',
        brown: '#a52a2a',
        burlywood: '#deb887',
        cadetblue: '#5f9ea0',
        chartreuse: '#7fff00',
        chocolate: '#d2691e',
        coral: '#ff7f50',
        cornflowerblue: '#6495ed',
        cornsilk: '#fff8dc',
        crimson: '#dc143c',
        cyan: '#00ffff',
        darkblue: '#00008b',
        darkcyan: '#008b8b',
        darkgoldenrod: '#b8860b',
        darkgray: '#a9a9a9',
        darkgrey: '#a9a9a9',
        darkgreen: '#006400',
        darkkhaki: '#bdb76b',
        darkmagenta: '#8b008b',
        darkolivegreen: '#556b2f',
        darkorange: '#ff8c00',
        darkorchid: '#9932cc',
        darkred: '#8b0000',
        darksalmon: '#e9967a',
        darkseagreen: '#8fbc8f',
        darkslateblue: '#483d8b',
        darkslategray: '#2f4f4f',
        darkslategrey: '#2f4f4f',
        darkturquoise: '#00ced1',
        darkviolet: '#9400d3',
        deeppink: '#ff1493',
        deepskyblue: '#00bfff',
        dimgray: '#696969',
        dimgrey: '#696969',
        dodgerblue: '#1e90ff',
        firebrick: '#b22222',
        floralwhite: '#fffaf0',
        forestgreen: '#228b22',
        fuchsia: '#ff00ff',
        gainsboro: '#dcdcdc',
        ghostwhite: '#f8f8ff',
        gold: '#ffd700',
        goldenrod: '#daa520',
        gray: '#808080',
        grey: '#808080',
        green: '#008000',
        greenyellow: '#adff2f',
        honeydew: '#f0fff0',
        hotpink: '#ff69b4',
        indianred: '#cd5c5c',
        indigo: '#4b0082',
        ivory: '#fffff0',
        khaki: '#f0e68c',
        lavender: '#e6e6fa',
        lavenderblush: '#fff0f5',
        lawngreen: '#7cfc00',
        lemonchiffon: '#fffacd',
        lightblue: '#add8e6',
        lightcoral: '#f08080',
        lightcyan: '#e0ffff',
        lightgoldenrodyellow: '#fafad2',
        lightgray: '#d3d3d3',
        lightgrey: '#d3d3d3',
        lightgreen: '#90ee90',
        lightpink: '#ffb6c1',
        lightsalmon: '#ffa07a',
        lightseagreen: '#20b2aa',
        lightskyblue: '#87cefa',
        lightslategray: '#778899',
        lightslategrey: '#778899',
        lightsteelblue: '#b0c4de',
        lightyellow: '#ffffe0',
        lime: '#00ff00',
        limegreen: '#32cd32',
        linen: '#faf0e6',
        magenta: '#ff00ff',
        maroon: '#800000',
        mediumaquamarine: '#66cdaa',
        mediumblue: '#0000cd',
        mediumorchid: '#ba55d3',
        mediumpurple: '#9370db',
        mediumseagreen: '#3cb371',
        mediumslateblue: '#7b68ee',
        mediumspringgreen: '#00fa9a',
        mediumturquoise: '#48d1cc',
        mediumvioletred: '#c71585',
        midnightblue: '#191970',
        mintcream: '#f5fffa',
        mistyrose: '#ffe4e1',
        moccasin: '#ffe4b5',
        navajowhite: '#ffdead',
        navy: '#000080',
        oldlace: '#fdf5e6',
        olive: '#808000',
        olivedrab: '#6b8e23',
        orange: '#ffa500',
        orangered: '#ff4500',
        orchid: '#da70d6',
        palegoldenrod: '#eee8aa',
        palegreen: '#98fb98',
        paleturquoise: '#afeeee',
        palevioletred: '#db7093',
        papayawhip: '#ffefd5',
        peachpuff: '#ffdab9',
        peru: '#cd853f',
        pink: '#ffc0cb',
        plum: '#dda0dd',
        powderblue: '#b0e0e6',
        purple: '#800080',
        rebeccapurple: '#663399',
        red: '#ff0000',
        rosybrown: '#bc8f8f',
        royalblue: '#4169e1',
        saddlebrown: '#8b4513',
        salmon: '#fa8072',
        sandybrown: '#f4a460',
        seagreen: '#2e8b57',
        seashell: '#fff5ee',
        sienna: '#a0522d',
        silver: '#c0c0c0',
        skyblue: '#87ceeb',
        slateblue: '#6a5acd',
        slategray: '#708090',
        slategrey: '#708090',
        snow: '#fffafa',
        springgreen: '#00ff7f',
        steelblue: '#4682b4',
        tan: '#d2b48c',
        teal: '#008080',
        thistle: '#d8bfd8',
        tomato: '#ff6347',
        turquoise: '#40e0d0',
        violet: '#ee82ee',
        wheat: '#f5deb3',
        white: '#ffffff',
        whitesmoke: '#f5f5f5',
        yellow: '#ffff00',
        yellowgreen: '#9acd32',
    };

    const hexLookup = Object.fromEntries(
        Object.entries(colors)
            .map(([key, value]) => [value, key]),
    );

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
    const cmy2rgb = (c, m, y) => {
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
    const cmyk2cmy = (c, m, y, k) => {
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
    const hsl2rgb = (h, s, l) => {
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
    const hsv2rgb = (h, s, v) => {
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
    const rgb2hsl = (r, g, b) => {
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
    const rgb2hsv = (r, g, b) => {
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
    const rgba2hex = (r, g, b, a) => {
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
    const rgbLuma = (r, g, b) => {
        r = rgbLumaVlaue(r);
        g = rgbLumaVlaue(g);
        b = rgbLumaVlaue(b);

        return (.2126 * r) + (.7152 * g) + (.0722 * b);
    };

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
    function fromCMY(c, m, y, a = 1) {
        const [r, g, b] = cmy2rgb(c, m, y);
        return new Color(r, g, b, a);
    }
    /**
     * Create a new Color from CMYK values.
     * @param {number} c The cyan value. (0, 100)
     * @param {number} m The magenta value. (0, 100)
     * @param {number} y The yellow value. (0, 100)
     * @param {number} k The key value. (0, 100)
     * @param {number} [a=1] The alpha value. (0, 1)
     * @return {Color} A new Color object.
     */
    function fromCMYK(c, m, y, k, a = 1) {
        [c, m, y] = cmyk2cmy(c, m, y, k);
        return fromCMY(c, m, y, a);
    }
    /**
     * Create a new Color from a hex color string.
     * @param {string} string The hex color string.
     * @return {Color} A new Color object.
     */
    function fromHexString(string) {
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
    }
    /**
     * Create a new Color from HSL values.
     * @param {number} h The hue value. (0, 360)
     * @param {number} s The saturation value. (0, 100)
     * @param {number} l The lightness value. (0, 100)
     * @param {number} [a=1] The alpha value. (0, 1)
     * @return {Color} A new Color object.
     */
    function fromHSL(h, s, l, a = 1) {
        const [r, g, b] = hsl2rgb(h, s, l);
        return new Color(r, g, b, a);
    }
    /**
     * Create a new Color from a HSL color string.
     * @param {string} string The HSL color string.
     * @return {Color} A new Color object.
     */
    function fromHSLString(string) {
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
    }
    /**
     * Create a new Color from HSV values.
     * @param {number} h The hue value. (0, 360)
     * @param {number} s The saturation value. (0, 100)
     * @param {number} v The brightness value. (0, 100)
     * @param {number} [a=1] The alpha value. (0, 1)
     * @return {Color} A new Color object.
     */
    function fromHSV(h, s, v, a = 1) {
        const [r, g, b] = hsv2rgb(h, s, v);
        return new Color(r, g, b, a);
    }
    /**
     * Create a new Color from RGB values.
     * @param {number} r The red value. (0, 255)
     * @param {number} g The green value. (0, 255)
     * @param {number} b The blue value. (0, 255)
     * @param {number} [a=1] The alpha value. (0, 1)
     * @return {Color} A new Color object.
     */
    function fromRGB(r, g, b, a = 1) {
        return new Color(r, g, b, a);
    }
    /**
     * Create a new Color from a RGB color string.
     * @param {string} string The RGB color string.
     * @return {Color} A new Color object.
     */
    function fromRGBString(string) {
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
    }
    /**
     * Create a new Color from a HTML color string.
     * @param {string} string The HTML color string.
     * @return {Color} A new Color object.
     */
    function fromString(string) {
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
    }

    /**
     * Color (Static) Utility
     */

    /**
     * Get the contrast value between two colors.
     * @param {Color} color1 The first Color.
     * @param {Color} color2 The second Color.
     * @return {number} The contrast value. (1, 21)
     */
    const contrast = (color1, color2) => {
        const luma1 = color1.luma();
        const luma2 = color2.luma();

        return (Math.max(luma1, luma2) + .05) / (Math.min(luma1, luma2) + .05);
    };

    /**
     * Calculate the distance between two colors.
     * @param {Color} color1 The first Color.
     * @param {Color} color2 The second Color.
     * @return {number} The distance between the colors.
     */
    const dist = (color1, color2) => {
        return Math.hypot(color1.r - color2.r, color1.g - color2.g, color1.b - color2.b);
    };

    /**
     * Find an optimally contrasting color for another color.
     * @param {Color} color1 The first Color.
     * @param {Color} [color2] The second Color.
     * @param {object} [options] The options for finding the contrasting color.
     * @param {number} [options.minContrast=4.5] The minimum contrast.
     * @param {number} [options.stepSize=.01] The step size.
     * @return {Color} The new Color.
     */
    const findContrast = (color1, color2 = null, { minContrast = 4.5, stepSize = .01 } = {}) => {
        if (!color2) {
            color2 = color1;
        }

        if (contrast(color1, color2) >= minContrast) {
            return color2;
        }

        const methods = ['tint', 'shade'];
        for (let i = stepSize; i <= 1; i += stepSize) {
            for (const method of methods) {
                const tempColor = color2[method](i);
                if (contrast(color1, tempColor) >= minContrast) {
                    return tempColor;
                }
            }
        }

        return null;
    };

    /**
     * Create a new Color by mixing two colors together by a specified amount.
     * @param {Color} color1 The first Color.
     * @param {Color} color2 The second Color.
     * @param {number} amount The amount to mix them by. (0, 1)
     * @return {Color} A new Color object.
     */
    function mix(color1, color2, amount) {
        const r = lerp(color1.r, color2.r, amount);
        const g = lerp(color1.g, color2.g, amount);
        const b = lerp(color1.b, color2.b, amount);

        return new Color(r, g, b);
    }
    /**
     * Create a new Color by multiplying two colors together by a specified amount.
     * @param {Color} color1 The first Color.
     * @param {Color} color2 The second Color.
     * @param {number} amount The amount to multiply them by. (0, 1)
     * @return {Color} A new Color object.
     */
    function multiply(color1, color2, amount) {
        const r = lerp(color1.r, color1.r * color2.r / 255, amount);
        const g = lerp(color1.g, color1.g * color2.g / 255, amount);
        const b = lerp(color1.b, color1.b * color2.b / 255, amount);

        return new Color(r, g, b);
    }

    /**
     * Color Attributes
     */


    /**
     * Get the alpha value of the color.
     * @return {number} The alpha value. (0, 1)
     */
    function getAlpha() {
        return this.a;
    }
    /**
     * Get the brightness value of the color.
     * @return {number} The brightness value. (0, 100)
     */
    function getBrightness() {
        return rgb2hsv(this.r, this.g, this.b)[2];
    }
    /**
     * Get the hue value of the color.
     * @return {number} The hue value. (0, 360)
     */
    function getHue() {
        return rgb2hsv(this.r, this.g, this.b)[0];
    }
    /**
     * Get the saturation value of the color.
     * @return {number} The saturation value. (0, 100)
     */
    function getSaturation() {
        return rgb2hsv(this.r, this.g, this.b)[1];
    }
    /**
     * Get the relative luminance value of the color
     * @return {number} The relative luminance value. (0, 1)
     */
    function luma() {
        return rgbLuma(this.r, this.g, this.b);
    }
    /**
     * Set the alpha value of the color.
     * @param {number} a The alpha value. (0, 1)
     * @return {Color} The modified Color object.
     */
    function setAlpha(a) {
        return new Color(this.r, this.g, this.b, a);
    }
    /**
     * Set the brightness value of the color.
     * @param {number} v The brightness value. (0, 100)
     * @return {Color} The modified Color object.
     */
    function setBrightness(v) {
        const [h, s, _] = rgb2hsv(this.r, this.g, this.b);
        const [r, g, b] = hsv2rgb(h, s, v);

        return new Color(r, g, b, this.a);
    }
    /**
     * Set the hue value of the color.
     * @param {number} h The hue value. (0, 360)
     * @return {Color} The modified Color object.
     */
    function setHue(h) {
        const [_, s, v] = rgb2hsv(this.r, this.g, this.b);
        const [r, g, b] = hsv2rgb(h, s, v);

        return new Color(r, g, b, this.a);
    }
    /**
     * Set the saturation value of the color.
     * @param {number} s The saturation value. (0, 100)
     * @return {Color} The modified Color object.
     */
    function setSaturation(s) {
        const [h, _, v] = rgb2hsv(this.r, this.g, this.b);
        const [r, g, b] = hsv2rgb(h, s, v);

        return new Color(r, g, b, this.a);
    }

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
    function darken(amount) {
        let [h, s, l] = rgb2hsl(this.r, this.g, this.b);
        l -= l * amount;
        const [r, g, b] = hsl2rgb(h, s, l);

        return new Color(r, g, b, this.a);
    }
    /**
     * Invert the color.
     * @return {Color} The inverted Color object.
     */
    function invert() {
        return new Color(
            255 - this.r,
            255 - this.g,
            255 - this.b,
            this.a,
        );
    }
    /**
     * Lighten the color by a specified amount.
     * @param {number} amount The amount to lighten the color by. (0, 1)
     * @return {Color} The lightened Color object.
     */
    function lighten(amount) {
        let [h, s, l] = rgb2hsl(this.r, this.g, this.b);
        l += (100 - l) * amount;
        const [r, g, b] = hsl2rgb(h, s, l);

        return new Color(r, g, b, this.a);
    }
    /**
     * Shade the color by a specified amount.
     * @param {number} amount The amount to shade the color by. (0, 1)
     * @return {Color} The shaded Color object.
     */
    function shade(amount) {
        return mix(this, black, amount);
    }
    /**
     * Tint the color by a specified amount.
     * @param {number} amount The amount to tint the color by. (0, 1)
     * @return {Color} The tinted Color object.
     */
    function tint(amount) {
        return mix(this, white, amount);
    }
    /**
     * Tone the color by a specified amount.
     * @param {number} amount The amount to tone the color by. (0, 1)
     * @return {Color} The toned Color object.
     */
    function tone(amount) {
        return mix(this, grey, amount);
    }

    /**
     * Get the closest color name for the color.
     * @return {string} The name.
     */
    function label() {
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
    }
    /**
     * Return a hexadecimal string representation of the color.
     * @return {string} The hexadecimal string.
     */
    function toHexString() {
        const hex = rgba2hex(this.r, this.g, this.b, this.a);

        return toHex(hex);
    }
    /**
     * Return a HSL/HSLA string representation of the color.
     * @return {string} The HSL/HSLA string.
     */
    function toHSLString() {
        let [h, s, l] = rgb2hsl(this.r, this.g, this.b);

        h = Math.round(h);
        s = Math.round(s);
        l = Math.round(l);
        const a = Math.round(this.a * 100);

        if (a < 100) {
            return `hsl(${h}deg ${s}% ${l}% / ${a}%)`;
        }

        return `hsl(${h}deg ${s}% ${l}%)`;
    }
    /**
     * Return a RGB/RGBA string representation of the color.
     * @return {string} The RGB/RGBA string.
     */
    function toRGBString() {
        const r = Math.round(this.r);
        const g = Math.round(this.g);
        const b = Math.round(this.b);
        const a = Math.round(this.a * 100);

        if (a < 100) {
            return `rgb(${r} ${g} ${b} / ${a}%)`;
        }

        return `rgb(${r} ${g} ${b})`;
    }
    /**
     * Return a HTML string representation of the color.
     * @return {string} The HTML color string.
     */
    function toString() {
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
    }

    /**
     * Color Palette
     */

    /**
     * Create a palette object with a specified number of shades, tints and tone variations.
     * @param {object} [options] The options for generating a palette.
     * @param {number} [options.shades=10] The number of shades to generate.
     * @param {number} [options.tints=10] The number of tints to generate.
     * @param {number} [options.tones=10] The number of tones to generate.
     * @return {object} A palette object.
     */
    function palette({ shades = 10, tints = 10, tones = 10 } = {}) {
        return {
            shades: this.shades(shades),
            tints: this.tints(tints),
            tones: this.tones(tones),
        };
    }
    /**
     * Create an array with a specified number of shade variations.
     * @param {number} [shades=10] The number of shades to generate.
     * @return {Color[]} An array containing shade variations.
     */
    function shades(shades = 10) {
        return new Array(shades)
            .fill()
            .map(
                (_, index) => this.shade(index / (shades + 1)),
            );
    }
    /**
     * Create an array with a specified number of tint variations.
     * @param {number} [tints=10] The number of tints to generate.
     * @return {Color[]} An array containing tint variations.
     */
    function tints(tints = 10) {
        return new Array(tints)
            .fill()
            .map(
                (_, index) => this.tint(index / (tints + 1)),
            );
    }
    /**
     * Create an array with a specified number of tone variations.
     * @param {number} [tones=10] The number of tones to generate.
     * @return {Color[]} An array containing tone variations.
     */
    function tones(tones = 10) {
        return new Array(tones)
            .fill()
            .map(
                (_, index) => this.tone(index / (tones + 1)),
            );
    }

    /**
     * Color Schemes
     */

    /**
     * Create an array with 2 analogous color variations.
     * @return {Color[]} An array containing 2 analogous color variations.
     */
    function analogous() {
        const [h, s, v] = rgb2hsv(this.r, this.g, this.b);
        const [r1, g1, b1] = hsv2rgb(h + 30, s, v);
        const [r2, g2, b2] = hsv2rgb(h - 30, s, v);

        return [
            new Color(r1, g1, b1, this.a),
            new Color(r2, g2, b2, this.a),
        ];
    }
    /**
     * Create a complementary color variation.
     * @return {Color} A complementary color variation.
     */
    function complementary() {
        const [h, s, v] = rgb2hsv(this.r, this.g, this.b);
        const [r, g, b] = hsv2rgb(h + 180, s, v);

        return new Color(r, g, b, this.a);
    }
    /**
     * Create an array with 2 split color variations.
     * @return {Color[]} An array containing 2 split color variations.
     */
    function split() {
        const [h, s, v] = rgb2hsv(this.r, this.g, this.b);
        const [r1, g1, b1] = hsv2rgb(h + 150, s, v);
        const [r2, g2, b2] = hsv2rgb(h - 150, s, v);

        return [
            new Color(r1, g1, b1, this.a),
            new Color(r2, g2, b2, this.a),
        ];
    }
    /**
     * Create an array with 3 tetradic color variations.
     * @return {Color[]} An array containing 3 tetradic color variations.
     */
    function tetradic() {
        const [h, s, v] = rgb2hsv(this.r, this.g, this.b);
        const [r1, g1, b1] = hsv2rgb(h + 60, s, v);
        const [r2, g2, b2] = hsv2rgb(h + 180, s, v);
        const [r3, g3, b3] = hsv2rgb(h - 120, s, v);

        return [
            new Color(r1, g1, b1, this.a),
            new Color(r2, g2, b2, this.a),
            new Color(r3, g3, b3, this.a),
        ];
    }
    /**
     * Create an array with 2 triadic color variations.
     * @return {Color[]} An array containing 2 triadic color variations.
     */
    function triadic() {
        const [h, s, v] = rgb2hsv(this.r, this.g, this.b);
        const [r1, g1, b1] = hsv2rgb(h + 120, s, v);
        const [r2, g2, b2] = hsv2rgb(h - 120, s, v);

        return [
            new Color(r1, g1, b1, this.a),
            new Color(r2, g2, b2, this.a),
        ];
    }

    Color.contrast = contrast;
    Color.dist = dist;
    Color.findContrast = findContrast;
    Color.fromCMY = fromCMY;
    Color.fromCMYK = fromCMYK;
    Color.fromHexString = fromHexString;
    Color.fromHSL = fromHSL;
    Color.fromHSLString = fromHSLString;
    Color.fromHSV = fromHSV;
    Color.fromRGB = fromRGB;
    Color.fromRGBString = fromRGBString;
    Color.fromString = fromString;
    Color.mix = mix;
    Color.multiply = multiply;

    const proto = Color.prototype;

    proto.analogous = analogous;
    proto.complementary = complementary;
    proto.darken = darken;
    proto.getAlpha = getAlpha;
    proto.getBrightness = getBrightness;
    proto.getHue = getHue;
    proto.getSaturation = getSaturation;
    proto.invert = invert;
    proto.label = label;
    proto.lighten = lighten;
    proto.luma = luma;
    proto.palette = palette;
    proto.setAlpha = setAlpha;
    proto.setBrightness = setBrightness;
    proto.setHue = setHue;
    proto.setSaturation = setSaturation;
    proto.shade = shade;
    proto.shades = shades;
    proto.split = split;
    proto.tetradic = tetradic;
    proto.tint = tint;
    proto.tints = tints;
    proto.toHexString = toHexString;
    proto.toHSLString = toHSLString;
    proto.toRGBString = toRGBString;
    proto.toString = toString;
    proto.tone = tone;
    proto.tones = tones;
    proto.triadic = triadic;

    return Color;

}));
//# sourceMappingURL=frost-color.js.map
