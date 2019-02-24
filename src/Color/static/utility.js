Object.assign(Color, {

    /**
     * Clamps a value between a min and max
     * @param {number} val
     * @param {number} [min=0]
     * @param {number} [max=100]
     * @returns {number}
     */
    clamp(val, min = 0, max = 100) {
        return Math.max(
            min,
            Math.min(max, val)
        );
    },

    /**
     * Linearly interpolates from one value to another
     * @param {number} a
     * @param {number} b
     * @param {number} amount
     * @returns {number}
     */
    lerp(a, b, amount) {
        return a * (1 - amount) + b * amount;
    }

});
