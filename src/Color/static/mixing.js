/**
 * Color Mixing
 */

Object.assign(Color, {

    /**
     * Create a new Color by mixing two colors together by a specified amount.
     * @param {Color} color1 The first Color.
     * @param {Color} color2 The second Color.
     * @param {number} amount The amount to mix them by.
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
     * @param {number} amount The amount to multiply them by.
     * @returns {Color} A new Color object.
     */
    multiply(color1, color2, amount) {
        return new this(
            color1.getColor()
                .multiply(color2.getColor(), amount)
        );
    }

});
