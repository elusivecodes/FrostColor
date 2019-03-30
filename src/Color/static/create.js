Object.assign(Color, {

    /**
     * Creates a new Color object from CMY color values
     * @param {number} cyan
     * @param {number} magenta
     * @param {number} yellow
     * @param {number} [alpha=1]
     * @returns {Color}
     */
    fromCMY(cyan, magenta, yellow, alpha = 1) {
        return new this(
            new CMYColor(cyan, magenta, yellow, alpha)
        );
    },

    /**
     * Creates a new Color object from CMYK color values
     * @param {number} cyan
     * @param {number} magenta
     * @param {number} yellow
     * @param {number} key
     * @param {number} [alpha=1]
     * @returns {Color}
     */
    fromCMYK(cyan, magenta, yellow, key, alpha = 1) {
        return new this(
            new CMYKColor(cyan, magenta, yellow, key, alpha)
        );
    },

    /**
     * Creates a new Color object from HSL color values
     * @param {number} hue
     * @param {number} saturation
     * @param {number} lightness
     * @param {number} [alpha=1]
     * @returns {Color}
     */
    fromHSL(hue, saturation, lightness, alpha = 1) {
        return new this(
            new HSLColor(hue, saturation, lightness, alpha)
        );
    },

    /**
     * Creates a new Color object from HSV color values
     * @param {number} hue
     * @param {number} saturation
     * @param {number} brightness
     * @param {number} [alpha=1]
     * @returns {Color}
     */
    fromHSV(hue, saturation, brightness, alpha = 1) {
        return new this(
            new HSVColor(hue, saturation, brightness, alpha)
        );
    },

    /**
     * Creates a new Color object from RGB color values
     * @param {number} red
     * @param {number} green
     * @param {number} blue
     * @param {number} [alpha=1]
     * @returns {Color}
     */
    fromRGB(red, green, blue, alpha = 1) {
        return new this(
            new RGBColor(red, green, blue, alpha)
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
