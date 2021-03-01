/**
 * Color Attributes
 */

Object.assign(Color.prototype, {

    /**
     * Get the alpha value of the color.
     * @returns {number} The alpha value. (0, 1)
     */
    getAlpha() {
        return this._a;
    },

    /**
     * Get the brightness value of the color.
     * @returns {number} The brightness value. (0, 100)
     */
    getBrightness() {
        return this._getHSV()[2];
    },

    /**
     * Get the hue value of the color.
     * @returns {number} The hue value. (0, 360)
     */
    getHue() {
        return this._getHSV()[0];
    },

    /**
     * Get the saturation value of the color.
     * @returns {number} The saturation value. (0, 100)
     */
    getSaturation() {
        return this._getHSV()[1];
    },

    /**
     * Get the relative luminance value of the color 
     * @returns {number} The relative luminance value. (0, 1)
     */
    luma() {
        return this.constructor.RGB2Luma(this._r, this._g, this._b);
    },

    /**
     * Set the alpha value of the color.
     * @param {number} a The alpha value. (0, 1)
     * @returns {Color} The modified Color object.
     */
    setAlpha(a) {
        return this.setColor(
            this._r,
            this._g,
            this._b,
            a
        );
    },

    /**
     * Set the brightness value of the color.
     * @param {number} v The brightness value. (0, 100)
     * @returns {Color} The modified Color object.
     */
    setBrightness(v) {
        const [h, s, _] = this._getHSV();
        const [r, g, b] = this.constructor.HSV2RGB(h, s, v);
        return this.setColor(
            r,
            g,
            b,
            this._a
        );
    },

    /**
     * Set the hue value of the color.
     * @param {number} h The hue value. (0, 360)
     * @returns {Color} The modified Color object.
     */
    setHue(h) {
        const [_, s, v] = this._getHSV();
        const [r, g, b] = this.constructor.HSV2RGB(h, s, v);
        return this.setColor(
            r,
            g,
            b,
            this._a
        );
    },

    /**
     * Set the saturation value of the color.
     * @param {number} s The saturation value. (0, 100)
     * @returns {Color} The modified Color object.
     */
    setSaturation(s) {
        const [h, _, v] = this._getHSV();
        const [r, g, b] = this.constructor.HSV2RGB(h, s, v);
        return this.setColor(
            r,
            g,
            b,
            this._a
        );
    }

});
