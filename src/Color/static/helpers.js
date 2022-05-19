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
        const value = a * (1 - amount) + b * amount;
        return this._round(value);
    },

    /**
     * Round a number to a specified precision.
     * @param {number} num The number to round.
     * @param {number} [precision=2] The precision to use.
     * @returns {number} The rounded number.
     */
    _round(num, precision = 2) {
        return parseFloat(parseFloat(num).toFixed(precision));
    },

    /**
     * Shorten a hex string (if possible).
     * @param {string} hex The hex string.
     * @returns {string} The hex string.
     */
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
