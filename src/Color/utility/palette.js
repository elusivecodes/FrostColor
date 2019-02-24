Object.assign(Color.prototype, {

    /**
     * Returns a palette object with a specified number of shades, tints and tone variations
     * @param {number} [shades=10]
     * @param {number} [tints=10]
     * @param {number} [tones=10]
     * @returns {object}
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
        return new Array(shades)
            .fill()
            .map((_, index) =>
                this.getColor().shade(
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
        return new Array(tints)
            .fill()
            .map((_, index) =>
                this.getColor().tint(
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
        return new Array(tones)
            .fill()
            .map((_, index) =>
                this.getColor().tone(
                    index / (tones + 1)
                )
            );
    }

});
