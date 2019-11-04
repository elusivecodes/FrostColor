/**
 * Color Attributes
 */

Object.assign(Color.prototype, {

    /**
     * Get the alpha value of the color.
     * @returns {number} The alpha value. (0, 1)
     */
    getAlpha() {
        return this._color.getAlpha();
    },

    /**
     * Get the brightness value of the color.
     * @returns {number} The brightness value. (0, 100)
     */
    getBrightness() {
        return this._color.getBrightness();
    },

    /**
     * Get the hue value of the color.
     * @returns {number} The hue value. (0, 360)
     */
    getHue() {
        return this._color.getHue();
    },

    /**
     * Get the saturation value of the color.
     * @returns {number} The saturation value. (0, 100)
     */
    getSaturation() {
        return this._color.getSaturation();
    },

    /**
     * Get the luminance value of the color 
     * @returns {number} The luminance value. (0, 1)
     */
    luma() {
        return this._color.luma();
    },

    /**
     * Set the alpha value of the color.
     * @param {number} a The alpha value. (0, 1)
     * @returns {Color} The modified Color object.
     */
    setAlpha(a) {
        return this.setColor(
            this._color.setAlpha(a)
        );
    },

    /**
     * Set the brightness value of the color.
     * @param {number} v The brightness value. (0, 100)
     * @returns {Color} The modified Color object.
     */
    setBrightness(v) {
        return this.setColor(
            this._color.setBrightness(v)
        );
    },

    /**
     * Set the hue value of the color.
     * @param {number} h The hue value. (0, 360)
     * @returns {Color} The modified Color object.
     */
    setHue(h) {
        return this.setColor(
            this._color.setHue(h)
        );
    },

    /**
     * Set the saturation value of the color.
     * @param {number} s The saturation value. (0, 100)
     * @returns {Color} The modified Color object.
     */
    setSaturation(s) {
        return this.setColor(
            this._color.setSaturation(s)
        );
    }

});
