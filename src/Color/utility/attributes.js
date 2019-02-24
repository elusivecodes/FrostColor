Object.assign(Color.prototype, {

    /**
     * Gets the alpha value of the color (between 0 and 1)
     * @returns {number}
     */
    getAlpha() {
        return this.getColor()
            .getAlpha();
    },

    /**
     * Gets the brightness value of the color (between 0 and 100)
     * @returns {number}
     */
    getBrightness() {
        return this.getColor()
            .getBrightness();
    },

    /**
     * Gets the hue value of the color (between 0 and 360)
     * @returns {number}
     */
    getHue() {
        return this.getColor()
            .getHue();
    },

    /**
     * Gets the saturation value of the color (between 0 and 100)
     * @returns {number}
     */
    getSaturation() {
        return this.getColor()
            .getSaturation();
    },

    /**
     * Gets the luminance value of the color 
     * @returns {number}
     */
    luma() {
        return this.getColor()
            .luma();
    },

    /**
     * Sets the alpha value of the color (between 0 and 1)
     * @param {number} alpha
     * @returns {Color}
     */
    setAlpha(alpha) {
        return this.setColor(
            this.getColor()
                .setAlpha(alpha)
        );
    },

    /**
     * Sets the brightness value of the color (between 0 and 100)
     * @param {number} brightness
     * @returns {Color}
     */
    setBrightness(brightness) {
        return this.setColor(
            this.getColor()
                .setBrightness(brightness)
        );
    },

    /**
     * Sets the hue value of the color (between 0 and 360)
     * @param {number} hue
     * @returns {Color}
     */
    setHue(hue) {
        return this.setColor(
            this.getColor()
                .setHue(hue)
        );
    },

    /**
     * Sets the saturation value of the color (between 0 and 100)
     * @param {number} saturation
     * @returns {Color}
     */
    setSaturation(saturation) {
        return this.setColor(
            this.getColor()
                .setSaturation(saturation)
        );
    }

});
