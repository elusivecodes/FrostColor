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
        return new this(
            new CMYColor(c, m, y, a)
        );
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
        return new this(
            new CMYKColor(c, m, y, k, a)
        );
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

        return new this(rgb[0], rgb[1], rgb[2], rgb[3] ? rgb[3] / 255 : 1);
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
        return new this(
            new HSLColor(h, s, l, a)
        );
    },

    /**
     * Create a new Color from a HSL color string.
     * @param {string} string The HSL color string.
     * @returns {Color} A new Color object.
     */
    fromHSLString(string) {
        const HSLMatch = string.match(this._hslRegExp);

        if (!HSLMatch) {
            throw new Error('Invalid HSL string');
        }

        return this.fromHSL(HSLMatch[1], HSLMatch[2], HSLMatch[3]);
    },

    /**
     * Create a new Color from a HSLA color string.
     * @param {string} string The HSLA color string.
     * @returns {Color} A new Color object.
     */
    fromHSLAString(string) {
        const HSLAMatch = string.match(this._hslaRegExp);
        if (!HSLAMatch) {
            throw new Error('Invalid HSLA string');
        }

        return this.fromHSL(
            HSLAMatch[1],
            HSLAMatch[2],
            HSLAMatch[3],
            HSLAMatch[5] ?
                HSLAMatch[4] / 100 :
                HSLAMatch[4]
        );
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
        return new this(
            new HSVColor(h, s, v, a)
        );
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
        return new this(
            new RGBColor(r, g, b, a)
        );
    },

    /**
     * Create a new Color from a RGB color string.
     * @param {string} string The RGB color string.
     * @returns {Color} A new Color object.
     */
    fromRGBString(string) {
        const RGBMatch = string.match(this._rgbRegExp);

        if (!RGBMatch) {
            throw new Error('Invalid RGB string');
        }

        return new this(RGBMatch[1], RGBMatch[2], RGBMatch[3]);
    },

    /**
     * Create a new Color from a RGBA color string.
     * @param {string} string The RGBA color string.
     * @returns {Color} A new Color object.
     */
    fromRGBAString(string) {
        const RGBAMatch = string.match(this._rgbaRegExp);

        if (!RGBAMatch) {
            throw new Error('Invalid RGBA string');
        }

        return new this(
            RGBAMatch[1],
            RGBAMatch[2],
            RGBAMatch[3],
            RGBAMatch[5] ?
                RGBAMatch[4] / 100 :
                RGBAMatch[4]
        );
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

        if (this.colors[string]) {
            string = this.colors[string];
        } else {
            string = string.trim();
        }

        if (string.substring(0, 1) === '#') {
            return this.fromHexString(string);
        }

        if (string.substring(0, 4).toLowerCase() === 'rgba') {
            return this.fromRGBAString(string);
        }

        if (string.substring(0, 3).toLowerCase() === 'rgb') {
            return this.fromRGBString(string);
        }

        if (string.substring(0, 4).toLowerCase() === 'hsla') {
            return this.fromHSLAString(string);
        }

        if (string.substring(0, 3).toLowerCase() === 'hsl') {
            return this.fromHSLString(string);
        }

        throw new Error('Invalid color string');
    }

});
