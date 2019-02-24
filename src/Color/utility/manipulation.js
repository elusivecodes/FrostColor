Object.assign(Color.prototype, {

    /**
     * Darkens the color by a specified amount (between 0 and 1)
     * @param {number} amount
     * @returns {Color}
     */
    darken(amount) {
        return this.setColor(
            this.getColor().darken(amount)
        );
    },

    /**
     * Lightens the color by a specified amount (between 0 and 1)
     * @param {number} amount
     * @returns {Color}
     */
    lighten(amount) {
        return this.setColor(
            this.getColor().lighten(amount)
        );
    },

    /**
     * Shades the color by a specified amount (between 0 and 1)
     * @param {number} amount
     * @returns {Color}
     */
    shade(amount) {
        return this.setColor(
            this.getColor().shade(amount)
        );
    },

    /**
     * Tints the color by a specified amount (between 0 and 1)
     * @param {number} amount
     * @returns {Color}
     */
    tint(amount) {
        return this.setColor(
            this.getColor().tint(amount)
        );
    },

    /**
     * Tones the color by a specified amount (between 0 and 1)
     * @param {number} amount
     * @returns {Color}
     */
    tone(amount) {
        return this.setColor(
            this.getColor().tone(amount)
        );
    }

});
