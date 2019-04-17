/**
 * Color Attributes
 */

Object.assign(Color.prototype, {

    /**
     * Get the alpha value of the color.
     * @returns {number} The alpha value. (0, 1)
     */
    getAlpha() {
        return this.getColor()
            .getAlpha();
    },

    /**
     * Get the brightness value of the color.
     * @returns {number} The brightness value. (0, 100)
     */
    getBrightness() {
        return this.getColor()
            .getBrightness();
    },

    /**
     * Get the hue value of the color.
     * @returns {number} The hue value. (0, 360)
     */
    getHue() {
        return this.getColor()
            .getHue();
    },

    /**
     * Get the closest color name for the color.
     * @returns {string} The name.
     */
    getName() {
        let closest,
            closestDist = Number.MAX_SAFE_INTEGER;

        for (label in Color.colors) {
            const color = Color.fromString(label);
            const dist = Color.dist(this, color);

            if (dist < closestDist) {
                closest = label;
                closestDist = dist;
            }
        }

        return closest;
    },

    /**
     * Get the saturation value of the color.
     * @returns {number} The saturation value. (0, 100)
     */
    getSaturation() {
        return this.getColor()
            .getSaturation();
    },

    /**
     * Get the luminance value of the color 
     * @returns {number} The luminance value. (0, 1)
     */
    luma() {
        return this.getColor()
            .luma();
    },

    /**
     * Set the alpha value of the color.
     * @param {number} a The alpha value. (0, 1)
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
     * @param {number} v The brightness value. (0, 100)
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
     * @param {number} h The hue value. (0, 360)
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
     * @param {number} s The saturation value. (0, 100)
     * @returns {Color} The modified Color object.
     */
    setSaturation(s) {
        return this.setColor(
            this.getColor()
                .setSaturation(s)
        );
    }

});
