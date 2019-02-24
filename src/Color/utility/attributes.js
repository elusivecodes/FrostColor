Object.assign(Color.prototype, {

    /**
     * Gets the alpha value of the color (between 0 and 1)
     * @returns {number}
     */
    getAlpha() {
        return this.color.getAlpha();
    },

    /**
     * Gets the brightness value of the color (between 0 and 100)
     * @returns {number}
     */
    getBrightness() {
        return this.color.getBrightness();
    },

    /**
     * Gets the hue value of the color (between 0 and 360)
     * @returns {number}
     */
    getHue() {
        return this.color.getHue();
    },

    /**
     * Gets the saturation value of the color (between 0 and 100)
     * @returns {number}
     */
    getSaturation() {
        return this.color.getSaturation();
    },

    /**
     * Gets the luminance value of the color 
     * @returns {number}
     */
    luma() {
        return this.color.luma();
    },

    /**
     * Sets the alpha value of the color (between 0 and 1)
     * @param {number} alpha
     * @returns {Color}
     */
    setAlpha(alpha) {
        return this.setColor(
            this.color.setAlpha(alpha)
        );
    },

    /**
     * Sets the brightness value of the color (between 0 and 100)
     * @param {number} brightness
     * @returns {Color}
     */
    setBrightness(brightness) {
        return this.setColor(
            this.color.setBrightness(brightness)
        );
    },

    /**
     * Sets the hue value of the color (between 0 and 360)
     * @param {number} h
     * @returns {Color}
     */
    setHue(hue) {
        return this.setColor(
            this.color.setHue(hue)
        );
    },

    /**
     * Sets the saturation value of the color (between 0 and 100)
     * @param {number} s
     * @returns {Color}
     */
    setSaturation(saturation) {
        return this.setColor(
            this.color.setSaturation(saturation)
        );
    }

});
