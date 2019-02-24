Object.assign(Color, {

    /**
     * Creates a new Color object from CMY color values
     * @param {number} c
     * @param {number} m
     * @param {number} y
     * @param {number} [a=1]
     * @returns {Color}
     */
    fromCMY(c, m, y, a = 1) {
        return new this(
            new CMYColor(c, m, y, a)
        );
    },

    /**
     * Creates a new Color object from CMYK color values
     * @param {number} c
     * @param {number} m
     * @param {number} y
     * @param {number} k
     * @param {number} [a=1]
     * @returns {Color}
     */
    fromCMYK(c, m, y, k, a = 1) {
        return new this(
            new CMYKColor(c, m, y, k, a)
        );
    },

    /**
     * Creates a new Color object from HSL color values
     * @param {number} h
     * @param {number} s
     * @param {number} l
     * @param {number} [a=1]
     * @returns {Color}
     */
    fromHSL(h, s, l, a = 1) {
        return new this(
            new HSLColor(h, s, l, a)
        );
    },

    /**
     * Creates a new Color object from HSV color values
     * @param {number} h
     * @param {number} s
     * @param {number} v
     * @param {number} [a=1]
     * @returns {Color}
     */
    fromHSV(h, s, v, a = 1) {
        return new this(
            new HSVColor(h, s, v, a)
        );
    },

    /**
     * Creates a new Color object from RGB color values
     * @param {number} r
     * @param {number} g
     * @param {number} b
     * @param {number} [a=1]
     * @returns {Color}
     */
    fromRGB(r, g, b, a = 1) {
        return new this(
            new RGBColor(r, g, b, a)
        );
    },

    /**
     * Creates a new Color object from a HTML color string
     * @param {string} string
     * @returns {Color}
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
            const rgb = hexMatch.slice(1, 4).map(value => parsenumber(value, 16));
            return new this(rgb[0], rgb[1], rgb[2]);
        }

        const hexMatchShort = string.match(this.hexRegExShort);
        if (hexMatchShort) {
            const rgb = hexMatchShort.slice(1, 4).map(value => 0x11 * parsenumber(value, 16));
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
