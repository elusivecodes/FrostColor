Object.assign(Color.prototype, {

    /**
     * Returns a palette object with a specified number of shades, tints and tone variations
     * @param {number} [shades=10]
     * @param {number} [tints=10]
     * @param {number} [tones=10]
     * @returns {Object}
     */
    palette(shades = 10, tints = 10, tones = 10) {
        return {
            shades: this.shades(shades),
            tints: this.tints(tints),
            tones: this.tones(tones)
        };
    },

    /**
     * Returns an Array with a specified number of shade variations
     * @param {number} [shades=10]
     * @returns {Color[]}
     */
    shades(shades = 10) {
        const rgb = this.getColor()
            .toRGB();

        return new Array(shades)
            .fill()
            .map((_, index) =>
                rgb.shade(
                    index / (shades + 1)
                )
            );
    },

    /**
     * Returns an Array with a specified number of tint variations
     * @param {number} [tints=10]
     * @returns {Color[]}
     */
    tints(tints = 10) {
        const rgb = this.getColor()
            .toRGB();

        return new Array(tints)
            .fill()
            .map((_, index) =>
                rgb.tint(
                    index / (tints + 1)
                )
            );
    },

    /**
     * Returns an Array with a specified number of tone variations
     * @param {number} [tones=10]
     * @returns {Color[]}
     */
    tones(tones = 10) {
        const rgb = this.getColor()
            .toRGB();

        return new Array(tones)
            .fill()
            .map((_, index) =>
                rgb.tone(
                    index / (tones + 1)
                )
            );
    }

});
