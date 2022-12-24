/**
 * Color Palette
 */

/**
 * Create a palette object with a specified number of shades, tints and tone variations.
 * @param {number} [shades=10] The number of shades to generate.
 * @param {number} [tints=10] The number of tints to generate.
 * @param {number} [tones=10] The number of tones to generate.
 * @return {object} A palette object.
 */
export function palette(shades = 10, tints = 10, tones = 10) {
    return {
        shades: this.shades(shades),
        tints: this.tints(tints),
        tones: this.tones(tones),
    };
};

/**
 * Create an array with a specified number of shade variations.
 * @param {number} [shades=10] The number of shades to generate.
 * @return {Color[]} An array containing shade variations.
 */
export function shades(shades = 10) {
    return new Array(shades)
        .fill()
        .map(
            (_, index) => this.shade(index / (shades + 1)),
        );
};

/**
 * Create an array with a specified number of tint variations.
 * @param {number} [tints=10] The number of tints to generate.
 * @return {Color[]} An array containing tint variations.
 */
export function tints(tints = 10) {
    return new Array(tints)
        .fill()
        .map(
            (_, index) => this.tint(index / (tints + 1)),
        );
};

/**
 * Create an array with a specified number of tone variations.
 * @param {number} [tones=10] The number of tones to generate.
 * @return {Color[]} An array containing tone variations.
 */
export function tones(tones = 10) {
    return new Array(tones)
        .fill()
        .map(
            (_, index) => this.tone(index / (tones + 1)),
        );
};
