import Color from './../color.js';
import { lerp } from './../helpers.js';

/**
 * Color (Static) Utility
 */

/**
 * Get the contrast value between two colors.
 * @param {Color} color1 The first Color.
 * @param {Color} color2 The second Color.
 * @return {number} The contrast value. (1, 21)
 */
export const contrast = (color1, color2) => {
    const luma1 = color1.luma();
    const luma2 = color2.luma();

    return (Math.max(luma1, luma2) + .05) / (Math.min(luma1, luma2) + .05);
};

/**
 * Calculate the distance between two colors.
 * @param {Color} color1 The first Color.
 * @param {Color} color2 The second Color.
 * @return {number} The distance between the colors.
 */
export const dist = (color1, color2) => {
    return Math.hypot(color1.r - color2.r, color1.g - color2.g, color1.b - color2.b);
};

/**
 * Find an optimally contrasting color for another color.
 * @param {Color} color1 The first Color.
 * @param {Color} [color2] The second Color.
 * @param {object} [options] The options for finding the contrasting color.
 * @param {number} [options.minContrast=4.5] The minimum contrast.
 * @param {number} [options.stepSize=.01] The step size.
 * @return {Color} The new Color.
 */
export const findContrast = (color1, color2 = null, { minContrast = 4.5, stepSize = .01 } = {}) => {
    if (!color2) {
        color2 = color1;
    }

    if (contrast(color1, color2) >= minContrast) {
        return color2;
    }

    const methods = ['tint', 'shade'];
    for (let i = stepSize; i <= 1; i += stepSize) {
        for (const method of methods) {
            const tempColor = color2[method](i);
            if (contrast(color1, tempColor) >= minContrast) {
                return tempColor;
            }
        }
    }

    return null;
};

/**
 * Create a new Color by mixing two colors together by a specified amount.
 * @param {Color} color1 The first Color.
 * @param {Color} color2 The second Color.
 * @param {number} amount The amount to mix them by. (0, 1)
 * @return {Color} A new Color object.
 */
export function mix(color1, color2, amount) {
    const r = lerp(color1.r, color2.r, amount);
    const g = lerp(color1.g, color2.g, amount);
    const b = lerp(color1.b, color2.b, amount);

    return new Color(r, g, b);
};

/**
 * Create a new Color by multiplying two colors together by a specified amount.
 * @param {Color} color1 The first Color.
 * @param {Color} color2 The second Color.
 * @param {number} amount The amount to multiply them by. (0, 1)
 * @return {Color} A new Color object.
 */
export function multiply(color1, color2, amount) {
    const r = lerp(color1.r, color1.r * color2.r / 255, amount);
    const g = lerp(color1.g, color1.g * color2.g / 255, amount);
    const b = lerp(color1.b, color1.b * color2.b / 255, amount);

    return new Color(r, g, b);
};
