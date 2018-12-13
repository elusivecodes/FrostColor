Object.assign(Color.prototype, {

    /**
     * Darken
     * @param {float} amount The amount to darken the color by (between 0 and 1)
     * @returns {Color}
     */
    darken(amount)
    {
        return this.setColor(this.color.darken(amount));
    },

    /**
     * Lighten
     * @param {float} amount The amount to lighten the color by (between 0 and 1)
     * @returns {Color}
     */
    lighten(amount)
    {
        return this.setColor(this.color.lighten(amount));
    },

    /**
     * Shade
     * @param {float} amount The amount to shade the color by (between 0 and 1)
     * @returns {Color}
     */
    shade(amount)
    {
        return this.setColor(this.color.shade(amount));
    },

    /**
     * Tint
     * @param {float} amount The amount to tint the color by (between 0 and 1)
     * @returns {RGB}
     */
    tint(amount)
    {
        return this.setColor(this.color.tint(amount));
    },

    /**
     * Tone
     * @param {float} amount The amount to tone the color by (between 0 and 1)
     * @returns {RGB}
     */
    tone(amount)
    {
        return this.setColor(this.color.tone(amount));
    }

});