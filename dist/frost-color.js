/**
 * FrostColor v3.0.0
 * https://github.com/elusivecodes/FrostColor
 */
(function(global, factory) {
    'use strict';

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory();
    } else {
        Object.assign(global, factory());
    }

})(this, function() {
    'use strict';

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
         * @returns {Color} A new Color object.
         */
        constructor(r = 0, g = 1, b = null, a = 1) {
            if (b === null) {
                a = g;
                r *= 2.55;
                b = g = r;
            }

            this._r = this.constructor._clamp(r, 0, 255);
            this._g = this.constructor._clamp(g, 0, 255);
            this._b = this.constructor._clamp(b, 0, 255);
            this._a = this.constructor._clamp(a, 0, 1);
        }

        /**
         * Clone the Color.
         * @returns {Color} A new Color object.
         */
        clone() {
            return new this.constructor(this._r, this._g, this._b, this._a);
        }

        /**
         * Get the closest color name for the color.
         * @returns {string} The name.
         */
        label() {
            let closest,
                closestDist = Number.MAX_SAFE_INTEGER;

            for (const label in this.constructor.colors) {
                const color = this.constructor.fromHexString(this.constructor.colors[label]);
                const dist = this.constructor.dist(this, color);

                if (dist < closestDist) {
                    closest = label;
                    closestDist = dist;
                }
            }

            return closest;
        }

        /**
         * Set the RGBA values of the Color.
         * @param {number} r The red value.
         * @param {number} g The green value.
         * @param {number} b The blue value.
         * @param {number} a The alpha value.
         * @returns {Color} The Color object.
         */
        setColor(r, g, b, a) {
            this._r = this.constructor._clamp(r, 0, 255);
            this._g = this.constructor._clamp(g, 0, 255);
            this._b = this.constructor._clamp(b, 0, 255);
            this._a = this.constructor._clamp(a, 0, 1);

            return this;
        }

        /**
         * Return a hexadecimal string representation of the color.
         * @returns {string} The hexadecimal string.
         */
        toHexString() {
            const hex = this._getHex();

            return this.constructor._toHex(hex);
        }

        /**
         * Return a HSL/HSLA string representation of the color.
         * @returns {string} The HSL/HSLA string.
         */
        toHSLString() {
            let [h, s, l] = this.constructor.RGB2HSL(this._r, this._g, this._b);

            h = Math.round(h);
            s = Math.round(s);
            l = Math.round(l);
            const a = Math.round(this._a * 100);

            if (a < 100) {
                return `hsl(${h}deg ${s}% ${l}% / ${a}%)`;
            }

            return `hsl(${h}deg ${s}% ${l}%)`;
        }

        /**
         * Return a RGB/RGBA string representation of the color.
         * @returns {string} The RGB/RGBA string.
         */
        toRGBString() {
            const r = Math.round(this._r);
            const g = Math.round(this._g);
            const b = Math.round(this._b);
            const a = Math.round(this._a * 100);

            if (a < 100) {
                return `rgb(${r} ${g} ${b} / ${a}%)`;
            }

            return `rgb(${r} ${g} ${b})`;
        }

        /**
         * Return a HTML string representation of the color.
         * @returns {string} The HTML color string.
         */
        toString() {
            if (!this._a) {
                return 'transparent';
            }

            if (this._a < 1) {
                return this.toRGBString();
            }

            const hex = this._getHex();

            for (const name in this.constructor.colors) {
                if (this.constructor.colors[name] === hex) {
                    return name;
                }
            }

            return this.constructor._toHex(hex);
        }

        /**
         * Return the luminance value of the color.
         * @returns {number} The luminance value. (0, 1)
         */
        valueOf() {
            return this.luma();
        }

        /**
         * Return a primitive value of the color.
         * @returns {string|number} The HTML color string, or the luminance value.
         */
        [Symbol.toPrimitive](hint) {
            return hint === 'number' ?
                this.valueOf() :
                this.toString();
        }

    }

    /**
     * ColorImmutable class
     * @class
     */
    class ColorImmutable extends Color {

        /**
         * Create a new ColorImmutable from RGBA values.
         * @param {number} r The red value.
         * @param {number} g The green value.
         * @param {number} b The blue value.
         * @param {number} a The alpha value.
         * @returns {ColorImmutable} A new ColorImmutable object.
         */
        setColor(r, g, b, a) {
            return new this.constructor(r, g, b, a);
        }

    }

    /**
     * Color (Static) Conversions
     */

    Object.assign(Color, {

        /**
         * Convert CMY color values to CMYK.
         * @param {number} c The cyan value. (0, 100)
         * @param {number} m The magenta value. (0, 100)
         * @param {number} y The yellow value. (0, 100)
         * @returns {number[]} An array containing the CMYK values.
         */
        CMY2CMYK(c, m, y) {
            const k = Math.min(c, m, y);

            if (k === 100) {
                return [0, 0, 0, k];
            }

            k /= 100;

            return [
                (c / 100 - k)
                / (1 - k) * 100,
                (m / 100 - k)
                / (1 - k) * 100,
                (y / 100 - k)
                / (1 - k) * 100,
                k * 100
            ];
        },

        /**
         * Convert CMY color values to RGB.
         * @param {number} c The cyan value. (0, 100)
         * @param {number} m The magenta value. (0, 100)
         * @param {number} y The yellow value. (0, 100)
         * @returns {number[]} An array containing the RGB values.
         */
        CMY2RGB(c, m, y) {
            return [
                (1 - c / 100)
                * 255,
                (1 - m / 100)
                * 255,
                (1 - y / 100)
                * 255
            ];
        },

        /**
         * Convert CMYK color values to CMY.
         * @param {number} c The cyan value. (0, 100)
         * @param {number} m The magenta value. (0, 100)
         * @param {number} y The yellow value. (0, 100)
         * @param {number} k The key value. (0, 100)
         * @returns {number[]} An array containing the CMY values.
         */
        CMYK2CMY(c, m, y, k) {
            k /= 100;

            return [
                (
                    c / 100
                    * (1 - k)
                    + k
                ) * 100,
                (
                    m / 100
                    * (1 - k)
                    + k
                ) * 100,
                (
                    y / 100
                    * (1 - k)
                    + k
                ) * 100
            ];
        },

        /**
         * Convert HSL color values to RGB.
         * @param {number} h The hue value. (0, 360)
         * @param {number} s The saturation value. (0, 100)
         * @param {number} l The lightness value. (0, 100)
         * @returns {number[]} An array containing the RGB values.
         */
        HSL2RGB(h, s, l) {
            if (!l) {
                return [0, 0, 0];
            }

            h /= 360;
            s /= 100;
            l /= 100;

            const v2 = l < .5 ?
                l * (1 + s) :
                (l + s) - (s * l),
                v1 = 2 * l - v2;

            return [
                this.RGBHue(
                    v1,
                    v2,
                    h + (1 / 3)
                ) * 255,
                this.RGBHue(
                    v1,
                    v2,
                    h
                ) * 255,
                this.RGBHue(
                    v1,
                    v2,
                    h - (1 / 3)
                ) * 255
            ];
        },

        /**
         * Convert HSV color values to RGB.
         * @param {number} h The hue value. (0, 360)
         * @param {number} s The saturation value. (0, 100)
         * @param {number} v The brightness value (0, 100)
         * @returns {number[]} An array containing the RGB values.
         */
        HSV2RGB(h, s, v) {
            v /= 100;

            if (!s) {
                return [
                    v * 255,
                    v * 255,
                    v * 255
                ];
            }

            h = (h / 60) % 6;
            s /= 100;

            const vi = Math.floor(h),
                v1 = v
                    * (1 - s),
                v2 = v
                    * (
                        1 - s
                        * (h - vi)
                    ),
                v3 = v
                    * (
                        1 - s
                        * (
                            1
                            - (h - vi)
                        )
                    );

            let r, g, b;

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
                r * 255,
                g * 255,
                b * 255
            ];
        },

        /**
         * Convert RGB color values to CMY.
         * @param {number} r The red value. (0, 255)
         * @param {number} g The green value. (0, 255)
         * @param {number} b The blue value. (0, 255)
         * @returns {number[]} An array containing the CMY values.
         */
        RGB2CMY(r, g, b) {
            return [
                (
                    1
                    - (r / 255)
                ) * 100,
                (
                    1 -
                    (g / 255)
                ) * 100,
                (
                    1
                    - (b / 255)
                ) * 100
            ];
        },

        /**
         * Calculate the relative luminance of an RGB color.
         * @param {number} r The red value. (0, 255)
         * @param {number} g The green value. (0, 255)
         * @param {number} b The blue value. (0, 255)
         * @returns {number} The relative luminance value.
         */
        RGB2Luma(r, g, b) {
            r = this.RGBLumaValue(r);
            g = this.RGBLumaValue(g);
            b = this.RGBLumaValue(b);

            return (.2126 * r) + (.7152 * g) + (.0722 * b);
        },

        /**
         * Convert RGB color values to HSL.
         * @param {number} r The red value. (0, 255)
         * @param {number} g The green value. (0, 255)
         * @param {number} b The blue value. (0, 255)
         * @returns {number[]} An array containing the HSL values.
         */
        RGB2HSL(r, g, b) {
            r /= 255;
            g /= 255;
            b /= 255;

            const min = Math.min(r, g, b),
                max = Math.max(r, g, b),
                diff = max - min,
                l = (max + min) / 2;

            if (!diff) {
                return [0, 0, l * 100];
            }

            const s = l < .5 ?
                diff / (max + min) :
                diff / (2 - max - min),
                deltaR = (
                    (
                        (max - r)
                        / 6
                    )
                    + (diff / 2)
                ) / diff,
                deltaG = (
                    (
                        (max - g)
                        / 6
                    )
                    + (diff / 2)
                ) / diff,
                deltaB = (
                    (
                        (max - b)
                        / 6
                    )
                    + (diff / 2)
                ) / diff;

            let h = 0;

            switch (max) {
                case r:
                    h = deltaB - deltaG;
                    break;
                case g:
                    h = 1 / 3
                        + deltaR
                        - deltaB;
                    break;
                case b:
                    h = 2 / 3
                        + deltaG
                        - deltaR;
                    break;
            }

            return [
                (
                    (h + 1) % 1
                ) * 360,
                s * 100,
                l * 100
            ];
        },

        /**
         * Convert RGB color values to HSV.
         * @param {number} r The red value. (0, 255)
         * @param {number} g The green value. (0, 255)
         * @param {number} b The blue value. (0, 255)
         * @returns {number[]} An array containing the HSV values.
         */
        RGB2HSV(r, g, b) {
            r /= 255;
            g /= 255;
            b /= 255;

            const min = Math.min(r, g, b),
                max = Math.max(r, g, b),
                diff = max - min,
                v = max;

            if (!diff) {
                return [0, 0, v * 100];
            }

            const s = diff / max,
                deltaR = (
                    (
                        (max - r)
                        / 6
                    )
                    + (diff / 2)
                ) / diff,
                deltaG = (
                    (
                        (max - g)
                        / 6
                    )
                    + (diff / 2)
                ) / diff,
                deltaB = (
                    (
                        (max - b)
                        / 6
                    )
                    + (diff / 2)
                ) / diff;

            let h = 0;

            switch (max) {
                case r:
                    h = deltaB - deltaG;
                    break;
                case g:
                    h = 1 / 3
                        + deltaR - deltaB;
                    break;
                case b:
                    h = 2 / 3
                        + deltaG - deltaR;
                    break;
            }

            h = (h + 1) % 1;

            return [
                h * 360,
                s * 100,
                v * 100
            ];
        },

        /**
         * Calculate the R, G or B value of a hue.
         * @param {number} v1 The first value.
         * @param {number} v2 The second value.
         * @param {number} vH The hue value.
         * @returns {number} The R, G or B value.
         */
        RGBHue(v1, v2, vH) {
            vH = (vH + 1) % 1;

            if (6 * vH < 1) {
                return v1
                    + (v2 - v1)
                    * 6
                    * vH;
            }

            if (2 * vH < 1) {
                return v2;
            }

            if (3 * vH < 2) {
                return v1
                    + (v2 - v1)
                    * (
                        (2 / 3)
                        - vH
                    )
                    * 6;
            }

            return v1;
        },

        /**
         * Calculate the relative R, G or B value for luma calculation.
         * @param {number} v The value.
         * @returns {number} The R, G or B value.
         */
        RGBLumaValue(v) {
            v /= 255;

            if (v <= .03928) {
                return v / 12.92;
            }

            return Math.pow(((v + .055) / 1.055), 2.4);
        }

    });

    /**
     * Color (Static) Creation
     */

    Object.assign(Color, {

        /**
         * Create a new Color from CMY values.
         * @param {number} c The cyan value. (0, 100)
         * @param {number} m The magenta value. (0, 100)
         * @param {number} y The yellow value. (0, 100)
         * @param {number} [a=1] The alpha value. (0, 1)
         * @returns {Color} A new Color object.
         */
        fromCMY(c, m, y, a = 1) {
            const [r, g, b] = this.CMY2RGB(c, m, y);
            return new this(r, g, b, a);
        },

        /**
         * Create a new Color from CMYK values.
         * @param {number} c The cyan value. (0, 100)
         * @param {number} m The magenta value. (0, 100)
         * @param {number} y The yellow value. (0, 100)
         * @param {number} k The key value. (0, 100)
         * @param {number} [a=1] The alpha value. (0, 1)
         * @returns {Color} A new Color object.
         */
        fromCMYK(c, m, y, k, a = 1) {
            [c, m, y] = this.CMYK2CMY(c, m, y, k);
            return this.fromCMY(c, m, y, a);
        },

        /**
         * Create a new Color from a hex color string.
         * @param {string} string The hex color string.
         * @returns {Color} A new Color object.
         */
        fromHexString(string) {
            string = string.trim();

            const hexMatch = string.length > 6 ?
                string.match(this._hexRegExp) :
                string.match(this._hexRegExpShort);

            if (!hexMatch) {
                throw new Error('Invalid hex string');
            }

            const rgb = hexMatch.slice(1, 5).map(value =>
                value ?
                    parseInt(
                        value.length == 2 ?
                            value :
                            value + value,
                        16
                    ) :
                    null
            );

            return new this(
                rgb[0],
                rgb[1],
                rgb[2],
                rgb[3] ?
                    rgb[3] / 255 :
                    1
            );
        },

        /**
         * Create a new Color from HSL values.
         * @param {number} h The hue value. (0, 360)
         * @param {number} s The saturation value. (0, 100)
         * @param {number} l The lightness value. (0, 100)
         * @param {number} [a=1] The alpha value. (0, 1)
         * @returns {Color} A new Color object.
         */
        fromHSL(h, s, l, a = 1) {
            const [r, g, b] = this.HSL2RGB(h, s, l);
            return new this(r, g, b, a);
        },

        /**
         * Create a new Color from a HSL color string.
         * @param {string} string The HSL color string.
         * @returns {Color} A new Color object.
         */
        fromHSLString(string) {
            const HSL2Match = string.match(this._hsl2RegExp);

            if (HSL2Match) {
                return this.fromHSL(HSL2Match[1], HSL2Match[2], HSL2Match[3]);
            }

            const HSLA2Match = string.match(this._hsla2RegExp);

            if (HSLA2Match) {
                return this.fromHSL(
                    HSLA2Match[1],
                    HSLA2Match[2],
                    HSLA2Match[3],
                    HSLA2Match[5] ?
                        HSLA2Match[4] / 100 :
                        HSLA2Match[4]
                );
            }

            const HSLMatch = string.match(this._hslRegExp);

            if (HSLMatch) {
                return this.fromHSL(HSLMatch[1], HSLMatch[2], HSLMatch[3]);
            }

            const HSLAMatch = string.match(this._hslaRegExp);

            if (HSLAMatch) {
                return this.fromHSL(
                    HSLAMatch[1],
                    HSLAMatch[2],
                    HSLAMatch[3],
                    HSLAMatch[5] ?
                        HSLAMatch[4] / 100 :
                        HSLAMatch[4]
                );
            }

            throw new Error('Invalid HSLA string');
        },

        /**
         * Create a new Color from HSV values.
         * @param {number} h The hue value. (0, 360)
         * @param {number} s The saturation value. (0, 100)
         * @param {number} v The brightness value. (0, 100)
         * @param {number} [a=1] The alpha value. (0, 1)
         * @returns {Color} A new Color object.
         */
        fromHSV(h, s, v, a = 1) {
            const [r, g, b] = this.HSV2RGB(h, s, v);
            return new this(r, g, b, a);
        },

        /**
         * Create a new Color from RGB values.
         * @param {number} r The red value. (0, 255)
         * @param {number} g The green value. (0, 255)
         * @param {number} b The blue value. (0, 255)
         * @param {number} [a=1] The alpha value. (0, 1)
         * @returns {Color} A new Color object.
         */
        fromRGB(r, g, b, a = 1) {
            return new this(r, g, b, a);
        },

        /**
         * Create a new Color from a RGB color string.
         * @param {string} string The RGB color string.
         * @returns {Color} A new Color object.
         */
        fromRGBString(string) {
            const RGB2Match = string.match(this._rgb2RegExp);

            if (RGB2Match) {
                return new this(RGB2Match[1], RGB2Match[2], RGB2Match[3]);
            }

            const RGBA2Match = string.match(this._rgba2RegExp);

            if (RGBA2Match) {
                return new this(
                    RGBA2Match[1],
                    RGBA2Match[2],
                    RGBA2Match[3],
                    RGBA2Match[5] ?
                        RGBA2Match[4] / 100 :
                        RGBA2Match[4]
                );
            }

            const RGBMatch = string.match(this._rgbRegExp);

            if (RGBMatch) {
                return new this(RGBMatch[1], RGBMatch[2], RGBMatch[3]);
            }

            const RGBAMatch = string.match(this._rgbaRegExp);

            if (RGBAMatch) {
                return new this(
                    RGBAMatch[1],
                    RGBAMatch[2],
                    RGBAMatch[3],
                    RGBAMatch[5] ?
                        RGBAMatch[4] / 100 :
                        RGBAMatch[4]
                );
            }

            throw new Error('Invalid RGB string');
        },

        /**
         * Create a new Color from a HTML color string.
         * @param {string} string The HTML color string.
         * @returns {Color} A new Color object.
         */
        fromString(string) {
            string = string.toLowerCase();

            if (string === 'transparent') {
                return new this(0, 0, 0, 0);
            }

            if (string in this.colors) {
                string = this.colors[string];
            } else {
                string = string.trim();
            }

            if (string.substring(0, 1) === '#') {
                return this.fromHexString(string);
            }

            if (string.substring(0, 3).toLowerCase() === 'rgb') {
                return this.fromRGBString(string);
            }

            if (string.substring(0, 3).toLowerCase() === 'hsl') {
                return this.fromHSLString(string);
            }

            throw new Error('Invalid color string');
        }

    });

    /**
     * Color (Static) Helpers
     */

    Object.assign(Color, {

        /**
         * Clamp a value between a min and max.
         * @param {number} value The value to clamp.
         * @param {number} [min=0] The minimum value of the clamped range.
         * @param {number} [max=1] The maximum value of the clamped range.
         * @returns {number} The clamped value.
         */
        _clamp(val, min = 0, max = 100) {
            return Math.max(
                min,
                Math.min(max, val)
            );
        },

        /**
         * Linear interpolation from one value to another.
         * @param {number} v1 The starting value.
         * @param {number} v2 The ending value.
         * @param {number} amount The amount to interpolate.
         * @returns {number} The interpolated value.
         */
        _lerp(a, b, amount) {
            return a
                * (1 - amount)
                + b * amount;
        },

        _toHex(hex) {
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
        }

    });

    /**
     * Color (Static) Utility
     */

    Object.assign(Color, {

        /**
         * Get the contrast value between two colors.
         * @param {Color} color1 The first Color.
         * @param {Color} color2 The second Color.
         * @returns {number} The contrast value. (1, 21)
         */
        contrast(color1, color2) {
            const luma1 = color1.luma();
            const luma2 = color2.luma();
            return (Math.max(luma1, luma2) + .05) / (Math.min(luma1, luma2) + .05);
        },

        /**
         * Calculate the distance between two colors.
         * @param {Color} color1 The first Color.
         * @param {Color} color2 The second Color.
         * @returns {number} The distance between the colors.
         */
        dist(color1, color2) {
            return Math.hypot(
                color1._r - color2._r,
                color1._g - color2._g,
                color1._b - color2._b
            );
        },

        /**
         * Find an optimally contrasting color for another color.
         * @param {Color} color1 The first Color.
         * @param {Color} [color2] The second Color.
         * @param {number} [minContrast=4.5] The minimum contrast.
         * @param {number} [stepSize=.01] The step size.
         * @returns {Color} The new Color.
         */
        findContrast(color1, color2 = null, minContrast = 4.5, stepSize = .01) {
            if (!color2) {
                color2 = color1.clone();
            }

            if (this.contrast(color1, color2) >= minContrast) {
                return color2;
            }

            const methods = ['tint', 'shade'];
            for (let i = stepSize; i <= 1; i += stepSize) {
                for (const method of methods) {
                    const tempColor = color2.clone()[method](i);
                    if (this.contrast(color1, tempColor) >= minContrast) {
                        return tempColor;
                    }
                }
            }

            return null;
        },

        /**
         * Create a new Color by mixing two colors together by a specified amount.
         * @param {Color} color1 The first Color.
         * @param {Color} color2 The second Color.
         * @param {number} amount The amount to mix them by. (0, 1)
         * @returns {Color} A new Color object.
         */
        mix(color1, color2, amount) {
            return new this(
                Color._lerp(color1._r, color2._r, amount),
                Color._lerp(color1._g, color2._g, amount),
                Color._lerp(color1._b, color2._b, amount),
                Color._lerp(color1._a, color2._a, amount)
            );
        },

        /**
         * Create a new Color by multiplying two colors together by a specified amount.
         * @param {Color} color1 The first Color.
         * @param {Color} color2 The second Color.
         * @param {number} amount The amount to multiply them by. (0, 1)
         * @returns {Color} A new Color object.
         */
        multiply(color1, color2, amount) {
            return new this(
                Color._lerp(
                    color1._r,
                    color1._r * color2._r / 255,
                    amount
                ),
                Color._lerp(
                    color1._g,
                    color1._g * color2._g / 255,
                    amount
                ),
                Color._lerp(
                    color1._b,
                    color1._b * color2._b / 255,
                    amount
                ),
                Color._lerp(
                    color1._a,
                    color1._a * color2._a,
                    amount
                )
            );
        }

    });

    /**
     * Color Attributes
     */

    Object.assign(Color.prototype, {

        /**
         * Get the alpha value of the color.
         * @returns {number} The alpha value. (0, 1)
         */
        getAlpha() {
            return this._a;
        },

        /**
         * Get the brightness value of the color.
         * @returns {number} The brightness value. (0, 100)
         */
        getBrightness() {
            return this._getHSV()[2];
        },

        /**
         * Get the hue value of the color.
         * @returns {number} The hue value. (0, 360)
         */
        getHue() {
            return this._getHSV()[0];
        },

        /**
         * Get the saturation value of the color.
         * @returns {number} The saturation value. (0, 100)
         */
        getSaturation() {
            return this._getHSV()[1];
        },

        /**
         * Get the relative luminance value of the color 
         * @returns {number} The relative luminance value. (0, 1)
         */
        luma() {
            return this.constructor.RGB2Luma(this._r, this._g, this._b);
        },

        /**
         * Set the alpha value of the color.
         * @param {number} a The alpha value. (0, 1)
         * @returns {Color} The modified Color object.
         */
        setAlpha(a) {
            return this.setColor(
                this._r,
                this._g,
                this._b,
                a
            );
        },

        /**
         * Set the brightness value of the color.
         * @param {number} v The brightness value. (0, 100)
         * @returns {Color} The modified Color object.
         */
        setBrightness(v) {
            const [h, s, _] = this._getHSV();
            const [r, g, b] = this.constructor.HSV2RGB(h, s, v);
            return this.setColor(
                r,
                g,
                b,
                this._a
            );
        },

        /**
         * Set the hue value of the color.
         * @param {number} h The hue value. (0, 360)
         * @returns {Color} The modified Color object.
         */
        setHue(h) {
            const [_, s, v] = this._getHSV();
            const [r, g, b] = this.constructor.HSV2RGB(h, s, v);
            return this.setColor(
                r,
                g,
                b,
                this._a
            );
        },

        /**
         * Set the saturation value of the color.
         * @param {number} s The saturation value. (0, 100)
         * @returns {Color} The modified Color object.
         */
        setSaturation(s) {
            const [h, _, v] = this._getHSV();
            const [r, g, b] = this.constructor.HSV2RGB(h, s, v);
            return this.setColor(
                r,
                g,
                b,
                this._a
            );
        }

    });

    Object.assign(Color.prototype, {

        /**
         * Get the hex string of the Colour.
         * @returns {string} The hex string.
         */
        _getHex() {
            const [r, g, b] = [this._r, this._g, this._b].map(
                value => (Math.round(value) | 1 << 8)
                    .toString(16)
                    .slice(1)
            );
            const hex = `#${r}${g}${b}`;

            if (this._a < 1) {
                return hex +
                    (this._a * 255 | 1 << 8)
                        .toString(16)
                        .slice(1);
            }

            return hex;
        },

        /**
         * Get the HSL values of the Colour.
         * @returns {number[]} The HSL values.
         */
        _getHSL() {
            return this.constructor.RGB2HSL(this._r, this._g, this._b);
        },

        /**
         * Get the HSV values of the Colour.
         * @returns {number[]} The HSV values.
         */
        _getHSV() {
            return this.constructor.RGB2HSV(this._r, this._g, this._b);
        },

    });

    /**
     * Color Manipulation
     */

    Object.assign(Color.prototype, {

        /**
         * Darken the color by a specified amount.
         * @param {number} amount The amount to darken the color by. (0, 1)
         * @returns {Color} The darkened Color object.
         */
        darken(amount) {
            let [h, s, l] = this._getHSL();
            l -= l * amount;
            const [r, g, b] = this.constructor.HSL2RGB(h, s, l);
            return this.setColor(
                r,
                g,
                b,
                this._a
            );
        },

        /**
         * Invert the color.
         * @returns {Color} The inverted Color object.
         */
        invert() {
            return this.setColor(
                255 - this._r,
                255 - this._g,
                255 - this._b,
                this._a
            );
        },

        /**
         * Lighten the color by a specified amount.
         * @param {number} amount The amount to lighten the color by. (0, 1)
         * @returns {Color} The lightened Color object.
         */
        lighten(amount) {
            let [h, s, l] = this._getHSL();
            l += (100 - l) * amount;
            const [r, g, b] = this.constructor.HSL2RGB(h, s, l);
            return this.setColor(
                r,
                g,
                b,
                this._a
            );
        },

        /**
         * Shade the color by a specified amount.
         * @param {number} amount The amount to shade the color by. (0, 1)
         * @returns {Color} The shaded Color object.
         */
        shade(amount) {
            const color = this.constructor.mix(
                this,
                new this.constructor(0),
                amount
            );
            return this.setColor(
                color._r,
                color._g,
                color._b,
                this._a
            );
        },

        /**
         * Tint the color by a specified amount.
         * @param {number} amount The amount to tint the color by. (0, 1)
         * @returns {Color} The tinted Color object.
         */
        tint(amount) {
            const color = this.constructor.mix(
                this,
                new this.constructor(100),
                amount
            );
            return this.setColor(
                color._r,
                color._g,
                color._b,
                this._a
            );
        },

        /**
         * Tone the color by a specified amount.
         * @param {number} amount The amount to tone the color by. (0, 1)
         * @returns {Color} The toned Color object.
         */
        tone(amount) {
            const color = this.constructor.mix(
                this,
                new this.constructor(50),
                amount
            );
            return this.setColor(
                color._r,
                color._g,
                color._b,
                this._a
            );
        }

    });

    /**
     * Color Palette
     */

    Object.assign(Color.prototype, {

        /**
         * Create a palette object with a specified number of shades, tints and tone variations.
         * @param {number} [shades=10] The number of shades to generate.
         * @param {number} [tints=10] The number of tints to generate.
         * @param {number} [tones=10] The number of tones to generate.
         * @returns {object} A palette object.
         */
        palette(shades = 10, tints = 10, tones = 10) {
            return {
                shades: this.shades(shades),
                tints: this.tints(tints),
                tones: this.tones(tones)
            };
        },

        /**
         * Create an array with a specified number of shade variations.
         * @param {number} [shades=10] The number of shades to generate.
         * @returns {Color[]} An array containing shade variations.
         */
        shades(shades = 10) {
            return new Array(shades)
                .fill()
                .map(
                    (_, index) => this.clone()
                        .shade(
                            index
                            / (shades + 1)
                        )
                );
        },

        /**
         * Create an array with a specified number of tint variations.
         * @param {number} [tints=10] The number of tints to generate.
         * @returns {Color[]} An array containing tint variations.
         */
        tints(tints = 10) {
            return new Array(tints)
                .fill()
                .map(
                    (_, index) => this.clone()
                        .tint(
                            index
                            / (tints + 1)
                        )
                );
        },

        /**
         * Create an array with a specified number of tone variations.
         * @param {number} [tones=10] The number of tones to generate.
         * @returns {Color[]} An array containing tone variations.
         */
        tones(tones = 10) {
            return new Array(tones)
                .fill()
                .map(
                    (_, index) => this.clone()
                        .tone(
                            index
                            / (tones + 1)
                        )
                );
        }

    });

    /**
     * Color Schemes
     */

    Object.assign(Color.prototype, {

        /**
         * Create an array with 2 analogous color variations.
         * @returns {Color[]} An array containing 2 analogous color variations.
         */
        analogous() {
            const [h, s, v] = this.constructor.RGB2HSV(this._r, this._g, this._b);
            const [r1, g1, b1] = this.constructor.HSV2RGB(h + 30, s, v);
            const [r2, g2, b2] = this.constructor.HSV2RGB(h - 30, s, v);
            return [
                new this.constructor(r1, g1, b1, this._a),
                new this.constructor(r2, g2, b2, this._a)
            ];
        },

        /**
         * Create a complementary color variation.
         * @returns {Color} A complementary color variation.
         */
        complementary() {
            const [h, s, v] = this.constructor.RGB2HSV(this._r, this._g, this._b);
            const [r, g, b] = this.constructor.HSV2RGB(h + 180, s, v);
            return new this.constructor(r, g, b, this._a)
        },

        /**
         * Create an array with 2 split color variations.
         * @returns {Color[]} An array containing 2 split color variations.
         */
        split() {
            const [h, s, v] = this.constructor.RGB2HSV(this._r, this._g, this._b);
            const [r1, g1, b1] = this.constructor.HSV2RGB(h + 150, s, v);
            const [r2, g2, b2] = this.constructor.HSV2RGB(h - 150, s, v);
            return [
                new this.constructor(r1, g1, b1, this._a),
                new this.constructor(r2, g2, b2, this._a)
            ];
        },

        /**
         * Create an array with 3 tetradic color variations.
         * @returns {Color[]} An array containing 3 tetradic color variations.
         */
        tetradic() {
            const [h, s, v] = this.constructor.RGB2HSV(this._r, this._g, this._b);
            const [r1, g1, b1] = this.constructor.HSV2RGB(h + 60, s, v);
            const [r2, g2, b2] = this.constructor.HSV2RGB(h + 180, s, v);
            const [r3, g3, b3] = this.constructor.HSV2RGB(h - 120, s, v);
            return [
                new this.constructor(r1, g1, b1, this._a),
                new this.constructor(r2, g2, b2, this._a),
                new this.constructor(r3, g3, b3, this._a)
            ];
        },

        /**
         * Create an array with 2 triadic color variations.
         * @returns {Color[]} An array containing 2 triadic color variations.
         */
        triadic() {
            const [h, s, v] = this.constructor.RGB2HSV(this._r, this._g, this._b);
            const [r1, g1, b1] = this.constructor.HSV2RGB(h + 120, s, v);
            const [r2, g2, b2] = this.constructor.HSV2RGB(h - 120, s, v);
            return [
                new this.constructor(r1, g1, b1, this._a),
                new this.constructor(r2, g2, b2, this._a)
            ];
        }

    });

    /**
     * Color (Static) Properties
     */

    Object.assign(Color, {

        // HTML color names
        colors: {
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
            yellowgreen: '#9acd32'
        },

        // Hex RegExp
        _hexRegExpShort: /^#([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f]?)$/i,
        _hexRegExp: /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})?$/i,

        // HSL RegExp
        _hslRegExp: /^hsl\(((?:\d*\.)?\d+),\s*((?:\d*\.)?\d+)\%,\s*((?:\d*\.)?\d+)\%\)$/i,
        _hsl2RegExp: /^hsl\(((?:\d*\.)?\d+)deg\s+((?:\d*\.)?\d+)\%\s+((?:\d*\.)?\d+)\%\)$/i,
        _hslaRegExp: /^hsla\(((?:\d*\.)?\d+),\s*((?:\d*\.)?\d+)\%,\s*((?:\d*\.)?\d+)\%,\s*((?:\d*\.)?\d+)(\%?)\)$/i,
        _hsla2RegExp: /^hsl\(((?:\d*\.)?\d+)deg\s+((?:\d*\.)?\d+)\%\s+((?:\d*\.)?\d+)\%\s*\/\s*((?:\d*\.)?\d+)(\%?)\)$/i,

        // RGB RegExp
        _rgbRegExp: /^rgb\(((?:\d*\.)?\d+),\s*((?:\d*\.)?\d+),\s*((?:\d*\.)?\d+)\)$/i,
        _rgb2RegExp: /^rgb\(((?:\d*\.)?\d+)\s+((?:\d*\.)?\d+)\s+((?:\d*\.)?\d+)\)$/i,
        _rgbaRegExp: /^rgba\(((?:\d*\.)?\d+),\s*((?:\d*\.)?\d+),\s*((?:\d*\.)?\d+),\s*((?:\d*\.)?\d+)(\%?)\)$/i,
        _rgba2RegExp: /^rgb\(((?:\d*\.)?\d+)\s+((?:\d*\.)?\d+)\s+((?:\d*\.)?\d+)\s*\/\s*((?:\d*\.)?\d+)(\%?)\)$/i

    });

    return {
        Color,
        ColorImmutable
    };

});