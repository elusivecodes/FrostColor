Object.assign(Color.prototype, {

    /**
     * Get Alpha
     * @returns {float} The alpha value of the color (between 0 and 1)
     */
    getAlpha()
    {
        return this.color.getAlpha();
    },

    /**
     * Get Brightness
     * @returns {int} The brightness value of the color (between 0 and 100)
     */
    getBrightness()
    {
        return this.color.getBrightness();
    },

    /**
     * Get Hue
     * @returns {int} The hue value of the color (between 0 and 360)
     */
    getHue()
    {
        return this.color.getHue();
    },

    /**
     * Get Saturation
     * @returns {int} The saturation value of the color (between 0 and 100)
     */
    getSaturation()
    {
        return this.color.getSaturation();
    },

    /**
     * Luma
     * @returns {int} The luma value of the color
     */
    luma()
    {
        return this.color.luma();
    },

    /**
     * Set Alpha
     * @param {float} a The new alpha value (between 0 and 1)
     * @returns {Color}
     */
    setAlpha(alpha)
    {
        return this.setColor(this.color.setAlpha(alpha));
    },

    /**
     * Set Brightness
     * @param {int} v The new brightness value (between 0 and 100)
     * @returns {Color}
     */
    setBrightness(brightness)
    {
        return this.setColor(this.color.setBrightness(brightness));
    },

    /**
     * Set Hue
     * @param {int} h The new hue value (between 0 and 360)
     * @returns {Color}
     */
    setHue(hue)
    {
        return this.setColor(this.color.setHue(hue));
    },

    /**
     * Set Saturation
     * @param {int} s The new saturation value (between 0 and 100)
     * @returns {Color}
     */
    setSaturation(saturation)
    {
        return this.setColor(this.color.setSaturation(saturation));
    }

});