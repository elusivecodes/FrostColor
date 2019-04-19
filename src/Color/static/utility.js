/**
 * Color (Static) Utility
 */

Object.assign(Color, {

    /**
     * Calculate the distance between two colors.
     * @param {Color} color1 The first Color.
     * @param {Color} color2 The second Color.
     * @returns {number} The distance between the colors.
     */
    dist(color1, color2) {
        const rgb1 = color1.getColor().toRGB();
        const rgb2 = color2.getColor().toRGB();

        return Math.hypot(
            rgb1._r - rgb2._r,
            rgb1._g - rgb2._g,
            rgb1._b - rgb2._b
        );
    },

    /**
     * Create a new Color by mixing two colors together by a specified amount.
     * @param {Color} color1 The first Color.
     * @param {Color} color2 The second Color.
     * @param {number} amount The amount to mix them by. (0, 1)
     * @returns {Color} A new Color object.
     */
    mix(color1, color2, amount) {
        return new this(
            color1.getColor()
                .mix(color2.getColor(), amount)
        );
    },

    /**
     * Create a new Color by multiplying two colors together by a specified amount.
     * @param {Color} color1 The first Color.
     * @param {Color} color2 The second Color.
     * @param {number} amount The amount to multiply them by. (0, 1)
     * @returns {Color} A new Color object.
     */
    multiply(color1, color2, amount) {
        return new this(
            color1.getColor()
                .multiply(color2.getColor(), amount)
        );
    }

});
