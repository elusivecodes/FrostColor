/**
 * Color Manipulation
 */

Object.assign(Color.prototype, {

    /**
     * Darken the color by a specified amount.
     * @param {number} amount The amount to darken the color by.
     * @returns {Color} The darkened Color object.
     */
    darken(amount) {
        return this.setColor(
            this.getColor()
                .darken(amount)
        );
    },

    /**
     * Lighten the color by a specified amount.
     * @param {number} amount The amount to lighten the color by.
     * @returns {Color} The lightened Color object.
     */
    lighten(amount) {
        return this.setColor(
            this.getColor()
                .lighten(amount)
        );
    },

    /**
     * Shade the color by a specified amount.
     * @param {number} amount The amount to shade the color by.
     * @returns {Color} The shaded Color object.
     */
    shade(amount) {
        return this.setColor(
            Color.mix(
                new Color(this),
                new Color(0, 0, 0),
                amount
            ).getColor()
        );
    },

    /**
     * Tint the color by a specified amount.
     * @param {number} amount The amount to tint the color by.
     * @returns {Color} The tinted Color object.
     */
    tint(amount) {
        return this.setColor(
            Color.mix(
                new Color(this),
                new Color(255, 255, 255),
                amount
            ).getColor()
        );
    },

    /**
     * Tone the color by a specified amount.
     * @param {number} amount The amount to tone the color by.
     * @returns {Color} The toned Color object.
     */
    tone(amount) {
        return this.setColor(
            Color.mix(
                new Color(this),
                new Color(127, 127, 127),
                amount
            ).getColor()
        );
    }

});
