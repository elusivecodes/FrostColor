Object.assign(Color, {

    /**
     * From CMY
     * @param {int} c
     * @param {int} m
     * @param {int} y
     * @param {float} [a]
     * @returns {Color}
     */
    fromCMY(...args)
    {
        return new this(
            new CMY(...args)
        );
    },

    /**
     * From CMYK
     * @param {int} c
     * @param {int} m
     * @param {int} y
     * @param {int} k
     * @param {float} [a]
     * @returns {Color}
     */
    fromCMYK(...args)
    {
        return new this(
            new CMYK(...args)
        );
    },

    /**
     * From HSL
     * @param {int} h
     * @param {int} s
     * @param {int} l
     * @param {float} [a]
     * @returns {Color}
     */
    fromHSL(...args)
    {
        return new this(
            new HSL(...args)
        );
    },

    /**
     * From HSV
     * @param {int} h
     * @param {int} s
     * @param {int} v
     * @param {float} [a]
     * @returns {Color}
     */
    fromHSV(...args)
    {
        return new this(
            new HSV(...args)
        );
    },

    /**
     * From RGB
     * @param {int} r
     * @param {int} g
     * @param {int} b
     * @param {float} [a]
     * @returns {Color}
     */
    fromRGB(...args)
    {
        return new this(
            new RGB(...args)
        );
    },

    /**
     * From String
     * @param {string} string
     * @returns {Color}
     */
    fromString(string)
    {
        string = string.toLowerCase();

        if (string === 'transparent') {
            return this.fromRGB(0, 0, 0, 0);
        }

        if (this.colors[string]) {
            string = this.colors[string];
        }

        const hexMatch = string.match(this.hexRegEx);
        if (hexMatch) {
            const rgb = hexMatch.slice(1, 4).map(value => parseInt(value, 16));
            return this.fromRGB(rgb[0], rgb[1], rgb[2]);
        }

        const hexMatchShort = string.match(this.hexRegExShort);
        if (hexMatchShort) {
            const rgb = hexMatchShort.slice(1, 4).map(value => 0x11 * parseInt(value, 16));
            return this.fromRGB(rgb[0], rgb[1], rgb[2]);
        }

        const RGBAMatch = string.match(this.RGBARegEx);
        if (RGBAMatch) {
            return this.fromRGB(RGBAMatch[1], RGBAMatch[2], RGBAMatch[3], RGBAMatch[4]);
        }

        const RGBMatch = string.match(this.RGBRegEx);
        if (RGBMatch) {
            return this.fromRGB(RGBMatch[1], RGBMatch[2], RGBMatch[3]);
        }

        const HSLAMatch = string.match(this.HSLARegEx);
        if (HSLAMatch) {
            return this.fromHSL(HSLAMatch[1], HSLAMatch[2], HSLAMatch[3], HSLAMatch[4]);
        }

        const HSLMatch = string.match(this.HSLRegEx);
        if (HSLMatch) {
            return this.fromHSL(HSLMatch[1], HSLMatch[2], HSLMatch[3]);
        }

        return this.fromRGB(0, 0, 0);
    }

});