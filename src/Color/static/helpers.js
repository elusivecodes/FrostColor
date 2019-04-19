/**
 * Color (Static) Helpers
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
     * Clamp a value between a min and max.
     * @param {number} value The value to clamp.
     * @param {number} [min=0] The minimum value of the clamped range.
     * @param {number} [max=1] The maximum value of the clamped range.
     * @returns {number} The clamped value.
     */
    _clamp(val, min = 0, max = 100) {
        return Math.max(
            min,
            Math.min(max, val)
        );
    },

    /**
     * Linear interpolation from one value to another.
     * @param {number} v1 The starting value.
     * @param {number} v2 The ending value.
     * @param {number} amount The amount to interpolate.
     * @returns {number} The interpolated value.
     */
    _lerp(a, b, amount) {
        return a * (1 - amount) + b * amount;
    }

});
