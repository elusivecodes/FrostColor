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
        const rgb = this.getColor()
            .toRGB();

        return new Array(shades)
            .fill()
            .map((_, index) =>
                new this.constructor(rgb).shade(
                    index / (shades + 1)
                )
            );
    },

    /**
     * Create an array with a specified number of tint variations.
     * @param {number} [tints=10] The number of tints to generate.
     * @returns {Color[]} An array containing tint variations.
     */
    tints(tints = 10) {
        const rgb = this.getColor()
            .toRGB();

        return new Array(tints)
            .fill()
            .map((_, index) =>
                new this.constructor(rgb).tint(
                    index / (tints + 1)
                )
            );
    },

    /**
     * Create an array with a specified number of tone variations.
     * @param {number} [tones=10] The number of tones to generate.
     * @returns {Color[]} An array containing tone variations.
     */
    tones(tones = 10) {
        const rgb = this.getColor()
            .toRGB();

        return new Array(tones)
            .fill()
            .map((_, index) =>
                new this.constructor(rgb).tone(
                    index / (tones + 1)
                )
            );
    }

});
