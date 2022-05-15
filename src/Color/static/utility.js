/**
 * Color (Static) Utility
 */

Object.assign(Color, {

    /**
     * Get the contrast value between two colors.
     * @param {Color} color1 The first Color.
     * @param {Color} color2 The second Color.
     * @returns {number} The contrast value. (1, 21)
     */
    contrast(color1, color2) {
        const luma1 = color1.luma();
        const luma2 = color2.luma();
        return (Math.max(luma1, luma2) + .05) / (Math.min(luma1, luma2) + .05);
    },

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
     * Find an optimally contrasting color for another color.
     * @param {Color} color1 The first Color.
     * @param {Color} [color2] The second Color.
     * @param {number} [minContrast=4.5] The minimum contrast.
     * @param {number} [stepSize=.01] The step size.
     * @returns {Color} The new Color.
     */
    findContrast(color1, color2 = null, minContrast = 4.5, stepSize = .01) {
        if (!color2) {
            color2 = color1.clone();
        }

        if (this.contrast(color1, color2) >= minContrast) {
            return color2;
        }

        const methods = ['tint', 'shade'];
        for (let i = stepSize; i <= 1; i += stepSize) {
            for (const method of methods) {
                const tempColor = color2.clone()[method](i);
                if (this.contrast(color1, tempColor) >= minContrast) {
                    return tempColor;
                }
            }
        }

        return null;
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
            this._lerp(color1._r, color2._r, amount),
            this._lerp(color1._g, color2._g, amount),
            this._lerp(color1._b, color2._b, amount),
            this._lerp(color1._a, color2._a, amount)
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
            this._lerp(
                color1._r,
                color1._r * color2._r / 255,
                amount
            ),
            this._lerp(
                color1._g,
                color1._g * color2._g / 255,
                amount
            ),
            this._lerp(
                color1._b,
                color1._b * color2._b / 255,
                amount
            ),
            this._lerp(
                color1._a,
                color1._a * color2._a,
                amount
            )
        );
    }

});
