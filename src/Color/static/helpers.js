/**
 * Color (Static) Helpers
 */

Object.assign(Color, {

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
        return a
            * (1 - amount)
            + b * amount;
    },

    _toHex(hex) {
        if (hex.length === 9 &&
            hex[1] === hex[2] &&
            hex[3] === hex[4] &&
            hex[5] === hex[6] &&
            hex[7] === hex[8]) {
            return `#${hex[1]}${hex[3]}${hex[5]}${hex[7]}`;
        }

        if (hex.length === 7 &&
            hex[1] === hex[2] &&
            hex[3] === hex[4] &&
            hex[5] === hex[6]) {
            return `#${hex[1]}${hex[3]}${hex[5]}`;
        }

        return hex;
    }

});
