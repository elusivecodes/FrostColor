/**
 * Color Creation
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
        }

        const hexMatch = string.match(this.hexRegEx);
        if (hexMatch) {
            const rgb = hexMatch.slice(1, 4).map(value => parseInt(value, 16));
            return new this(rgb[0], rgb[1], rgb[2]);
        }

        const hexMatchShort = string.match(this.hexRegExShort);
        if (hexMatchShort) {
            const rgb = hexMatchShort.slice(1, 4).map(value => 0x11 * parseInt(value, 16));
            return new this(rgb[0], rgb[1], rgb[2]);
        }

        const RGBAMatch = string.match(this.RGBARegEx);
        if (RGBAMatch) {
            return new this(RGBAMatch[1], RGBAMatch[2], RGBAMatch[3], RGBAMatch[4]);
        }

        const RGBMatch = string.match(this.RGBRegEx);
        if (RGBMatch) {
            return new this(RGBMatch[1], RGBMatch[2], RGBMatch[3]);
        }

        const HSLAMatch = string.match(this.HSLARegEx);
        if (HSLAMatch) {
            return this.fromHSL(HSLAMatch[1], HSLAMatch[2], HSLAMatch[3], HSLAMatch[4]);
        }

        const HSLMatch = string.match(this.HSLRegEx);
        if (HSLMatch) {
            return this.fromHSL(HSLMatch[1], HSLMatch[2], HSLMatch[3]);
        }

        return new this(0, 0, 0);
    }

});
