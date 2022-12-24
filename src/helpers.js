/**
 * Color Helpers
 */

/**
 * Clamp a value between a min and max.
 * @param {number} val The value to clamp.
 * @param {number} [min=0] The minimum value of the clamped range.
 * @param {number} [max=1] The maximum value of the clamped range.
 * @return {number} The clamped value.
 */
export const clamp = (val, min = 0, max = 100) => {
    return Math.max(
        min,
        Math.min(max, val),
    );
};

/**
 * Linear interpolation from one value to another.
 * @param {number} a The starting value.
 * @param {number} b The ending value.
 * @param {number} amount The amount to interpolate.
 * @return {number} The interpolated value.
 */
export const lerp = (a, b, amount) => {
    const value = a * (1 - amount) + b * amount;
    return round(value);
};

/**
 * Round a number to a specified precision.
 * @param {number} num The number to round.
 * @param {number} [precision=2] The precision to use.
 * @return {number} The rounded number.
 */
export const round = (num, precision = 2) => {
    return parseFloat(parseFloat(num).toFixed(precision));
};

/**
 * Shorten a hex string (if possible).
 * @param {string} hex The hex string.
 * @return {string} The hex string.
 */
export const toHex = (hex) => {
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
};
