/**
 * Color Schemes
 */

Object.assign(Color.prototype, {

    /**
     * Create an array with 2 analogous color variations.
     * @returns {Color[]} An array containing 2 analogous color variations.
     */
    analogous() {
        const hsv = this.getColor()
            .toHSV();

        return [
            new this.constructor(
                hsv.setHue(
                    hsv.getHue() + 30
                )
            ),
            new this.constructor(
                hsv.setHue(
                    hsv.getHue() - 30
                )
            )
        ];
    },

    /**
     * Create a complementary color variation.
     * @returns {Color} A complementary color variation.
     */
    complementary() {
        const hsv = this.getColor()
            .toHSV();

        return new this.constructor(
            hsv.setHue(
                hsv.getHue() + 180
            )
        );
    },

    /**
     * Create an array with 2 split color variations.
     * @returns {Color[]} An array containing 2 split color variations.
     */
    split() {
        const hsv = this.getColor()
            .toHSV();

        return [
            new this.constructor(
                hsv.setHue(
                    hsv.getHue() + 150
                )
            ),
            new this.constructor(
                hsv.setHue(
                    hsv.getHue() - 150
                )
            )
        ];
    },

    /**
     * Create an array with 3 tetradic color variations.
     * @returns {Color[]} An array containing 3 tetradic color variations.
     */
    tetradic() {
        const hsv = this.getColor()
            .toHSV();

        return [
            new this.constructor(
                hsv.setHue(
                    hsv.getHue() + 60
                )
            ),
            new this.constructor(
                hsv.setHue(
                    hsv.getHue() + 180
                )
            ),
            new this.constructor(
                hsv.setHue(
                    hsv.getHue() + 240
                )
            )
        ];
    },

    /**
     * Create an array with 2 triadic color variations.
     * @returns {Color[]} An array containing 2 triadic color variations.
     */
    triadic() {
        const hsv = this.getColor()
            .toHSV();

        return [
            new this.constructor(
                hsv.setHue(
                    hsv.getHue() + 120
                )
            ),
            new this.constructor(
                hsv.setHue(
                    hsv.getHue() + 240
                )
            )
        ];
    }

});
