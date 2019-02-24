Object.assign(Color, {

    /**
     * Creates a new Color object by mixing two colors together by a specified amount (between 0 and 1)
     * @param {Color} color1
     * @param {Color} color2
     * @param {number} amount
     * @returns {Color}
     */
    mix(color1, color2, amount) {
        return new this(
            color1.color.mix(color2.color, amount)
        );
    },

    /**
     * Creates a new Color object by multiplying two colors together by a specified amount (between 0 and 1)
     * @param {Color} color1
     * @param {Color} color2
     * @param {number} amount
     * @returns {Color}
     */
    multiply(color1, color2, amount) {
        return new this(
            color1.color.multiply(color2.color, amount)
        );
    }

});
