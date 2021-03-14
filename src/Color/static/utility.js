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
     * @param {Color} color2 The second Color.
     * @param {number} [minContrast=4.5] The minimum contrast.
     * @param {number} [stepSize=1] The step size.
     * @returns {Color} The new Color.
     */
    findContrast(color1, color2, minContrast = 4.5, stepSize = 0.01) {
        const tempColor = this.fromString(color2.toString());

        if (this.contrast(color1, tempColor) >= minContrast) {
            return tempColor;
        }

        let offset = stepSize;
        while (offset <= 1) {
            const tempColor1 = tempColor.clone().tint(offset);
            if (this.contrast(color1, tempColor1) >= minContrast) {
                return tempColor1;
            }

            const tempColor2 = tempColor.clone().shade(offset);
            if (this.contrast(color1, tempColor2) >= minContrast) {
                return tempColor2;
            }

            offset += stepSize;
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
