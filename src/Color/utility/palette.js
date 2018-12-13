Object.assign(Color.prototype, {

    /**
     * Palette
     * @param {int} [shades=10] The number of shades to create
     * @param {int} [tints=10] The number of tints to create
     * @param {int} [tones=10] The number of tones to create
     * @returns {Array}
     */
    palette(shades = 10, tints = 10, tones = 10)
    {
        return {
            shades: this.shades(shades),
            tints: this.tints(tints),
            tones: this.tones(tones)
        };
    },

    /**
     * Shades
     * @param {int} [shades=10] The number of shades to create
     * @returns {Array}
     */
    shades(shades = 10)
    {
        return new Array(shades)
            .fill(0)
            .map((value, index) =>
                this.color.shade(
                    index / (shades + 1)
                )
            );
    },

    /**
     * Tints
     * @param {int} [tints=10] The number of tints to create
     * @returns {Array}
     */
    tints(tints = 10)
    {
        return new Array(tints)
            .fill(0)
            .map((value, index) =>
                this.color.tint(
                    index / (tints + 1)
                )
            );
    },

    /**
     * Tones
     * @param {int} [tones=10] The number of tones to create
     * @returns {Array}
     */
    tones(tones = 10)
    {
        return new Array(tones)
            .fill(0)
            .map((value, index) =>
                this.color.tone(
                    index / (tones + 1)
                )
            );
    }

});