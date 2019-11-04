/**
 * Color Manipulation
 */

Object.assign(Color.prototype, {

    /**
     * Darken the color by a specified amount.
     * @param {number} amount The amount to darken the color by. (0, 1)
     * @returns {Color} The darkened Color object.
     */
    darken(amount) {
        return this.setColor(
            this._color.darken(amount)
        );
    },

    /**
     * Invert the color.
     * @returns {Color} The inverted Color object.
     */
    invert() {
        return this.setColor(
            this._color.invert()
        );
    },

    /**
     * Lighten the color by a specified amount.
     * @param {number} amount The amount to lighten the color by. (0, 1)
     * @returns {Color} The lightened Color object.
     */
    lighten(amount) {
        return this.setColor(
            this._color.lighten(amount)
        );
    },

    /**
     * Shade the color by a specified amount.
     * @param {number} amount The amount to shade the color by. (0, 1)
     * @returns {Color} The shaded Color object.
     */
    shade(amount) {
        return this.setColor(
            Color.mix(
                new Color(this),
                new Color(0),
                amount
            ).getColor()
        );
    },

    /**
     * Tint the color by a specified amount.
     * @param {number} amount The amount to tint the color by. (0, 1)
     * @returns {Color} The tinted Color object.
     */
    tint(amount) {
        return this.setColor(
            Color.mix(
                new Color(this),
                new Color(100),
                amount
            ).getColor()
        );
    },

    /**
     * Tone the color by a specified amount.
     * @param {number} amount The amount to tone the color by. (0, 1)
     * @returns {Color} The toned Color object.
     */
    tone(amount) {
        return this.setColor(
            Color.mix(
                new Color(this),
                new Color(50),
                amount
            ).getColor()
        );
    }

});
