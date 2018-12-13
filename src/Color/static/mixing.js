Object.assign(Color, {

    /**
     * Mix
     * @param {Color} color1
     * @param {Color} color2
     * @param {float} amount
     * @returns {Color}
     */
    mix(color1, color2, amount)
    {
        return new this(
            color1.color.mix(color2.color, amount)
        );
    },

    /**
     * Multiply
     * @param {Color} color1
     * @param {Color} color2
     * @param {float} amount
     * @returns {Color}
     */
    multiply(color1, color2, amount)
    {
        return new this(
            color1.color.multiply(color2.color, amount)
        );
    }

});