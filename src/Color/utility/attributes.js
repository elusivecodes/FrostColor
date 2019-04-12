/**
 * Color Attributes
 */

Object.assign(Color.prototype, {

    /**
     * Get the alpha value of the color.
     * @returns {number} The alpha value.
     */
    getAlpha() {
        return this.getColor()
            .getAlpha();
    },

    /**
     * Get the brightness value of the color.
     * @returns {number} The brightness value.
     */
    getBrightness() {
        return this.getColor()
            .getBrightness();
    },

    /**
     * Get the hue value of the color.
     * @returns {number} The hue value.
     */
    getHue() {
        return this.getColor()
            .getHue();
    },

    /**
     * Get the saturation value of the color.
     * @returns {number} The saturation value.
     */
    getSaturation() {
        return this.getColor()
            .getSaturation();
    },

    /**
     * Get the luminance value of the color 
     * @returns {number} The luminance value.
     */
    luma() {
        return this.getColor()
            .luma();
    },

    /**
     * Set the alpha value of the color.
     * @param {number} a The alpha value.
     * @returns {Color} The modified Color object.
     */
    setAlpha(a) {
        return this.setColor(
            this.getColor()
                .setAlpha(a)
        );
    },

    /**
     * Set the brightness value of the color.
     * @param {number} v The brightness value.
     * @returns {Color} The modified Color object.
     */
    setBrightness(v) {
        return this.setColor(
            this.getColor()
                .setBrightness(v)
        );
    },

    /**
     * Set the hue value of the color.
     * @param {number} h The hue value.
     * @returns {Color} The modified Color object.
     */
    setHue(h) {
        return this.setColor(
            this.getColor()
                .setHue(h)
        );
    },

    /**
     * Set the saturation value of the color.
     * @param {number} s The saturation value.
     * @returns {Color} The modified Color object.
     */
    setSaturation(s) {
        return this.setColor(
            this.getColor()
                .setSaturation(s)
        );
    }

});
