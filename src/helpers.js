/**
 * Linear Interpolation
 * @param {float} a
 * @param {float} b
 * @param {float} amount
 * @returns {float}
 */
function lerp(a, b, amount)
{
    return a * (1 - amount) + b * amount;
}

/**
 * Clamp
 * @param {float} val
 * @param {float} [min]
 * @param {float} [max]
 * @returns {float}
 */
function clamp(val, min = 0, max = 100)
{
    return Math.max(min, Math.min(max, val));
}