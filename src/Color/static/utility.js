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
        return Math.hypot(
            color1._r - color2._r,
            color1._g - color2._g,
            color1._b - color2._b
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
            Color._lerp(color1._r, color2._r, amount),
            Color._lerp(color1._g, color2._g, amount),
            Color._lerp(color1._b, color2._b, amount),
            Color._lerp(color1._a, color2._a, amount)
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
            Color._lerp(
                color1._r,
                color1._r * color2._r / 255,
                amount
            ),
            Color._lerp(
                color1._g,
                color1._g * color2._g / 255,
                amount
            ),
            Color._lerp(
                color1._b,
                color1._b * color2._b / 255,
                amount
            ),
            Color._lerp(
                color1._a,
                color1._a * color2._a,
                amount
            )
        );
    }

});
