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
        string = string.trim();

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

        throw new Error('Invalid HSL string');
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
        string = string.trim();

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
        string = string.toLowerCase().trim();

        if (string === 'transparent') {
            return new this(0, 0, 0, 0);
        }

        if (string in this.colors) {
            string = this.colors[string];
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
