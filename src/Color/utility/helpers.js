Object.assign(Color.prototype, {

    /**
     * Get the hex string of the Colour.
     * @returns {string} The hex string.
     */
    _getHex() {
        const [r, g, b] = [this._r, this._g, this._b].map(
            value => (Math.round(value) | 1 << 8)
                .toString(16)
                .slice(1)
        );
        const hex = `#${r}${g}${b}`;

        if (this._a < 1) {
            return hex +
                (Math.round(this._a * 255) | 1 << 8)
                    .toString(16)
                    .slice(1);
        }

        return hex;
    },

    /**
     * Get the HSL values of the Colour.
     * @returns {number[]} The HSL values.
     */
    _getHSL() {
        return this.constructor.RGB2HSL(this._r, this._g, this._b);
    },

    /**
     * Get the HSV values of the Colour.
     * @returns {number[]} The HSV values.
     */
    _getHSV() {
        return this.constructor.RGB2HSV(this._r, this._g, this._b);
    }

});
