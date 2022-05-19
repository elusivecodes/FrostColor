/**
 * Color Manipulation
 */

Object.assign(Color.prototype, {

    /**
     * Darken the color by a specified amount.
     * @param {number} amount The amount to darken the color by. (0, 1)
     * @returns {Color} The darkened Color object.
     */
    darken(amount) {
        let [h, s, l] = this._getHSL();
        l -= l * amount;
        const [r, g, b] = this.constructor.HSL2RGB(h, s, l);
        return this.setColor(r, g, b, this._a);
    },

    /**
     * Invert the color.
     * @returns {Color} The inverted Color object.
     */
    invert() {
        return this.setColor(
            255 - this._r,
            255 - this._g,
            255 - this._b,
            this._a
        );
    },

    /**
     * Lighten the color by a specified amount.
     * @param {number} amount The amount to lighten the color by. (0, 1)
     * @returns {Color} The lightened Color object.
     */
    lighten(amount) {
        let [h, s, l] = this._getHSL();
        l += (100 - l) * amount;
        const [r, g, b] = this.constructor.HSL2RGB(h, s, l);
        return this.setColor(r, g, b, this._a);
    },

    /**
     * Shade the color by a specified amount.
     * @param {number} amount The amount to shade the color by. (0, 1)
     * @returns {Color} The shaded Color object.
     */
    shade(amount) {
        const color = this.constructor.mix(
            this,
            new this.constructor(0),
            amount
        );
        return this.setColor(color._r, color._g, color._b, this._a);
    },

    /**
     * Tint the color by a specified amount.
     * @param {number} amount The amount to tint the color by. (0, 1)
     * @returns {Color} The tinted Color object.
     */
    tint(amount) {
        const color = this.constructor.mix(
            this,
            new this.constructor(100),
            amount
        );
        return this.setColor(color._r, color._g, color._b, this._a);
    },

    /**
     * Tone the color by a specified amount.
     * @param {number} amount The amount to tone the color by. (0, 1)
     * @returns {Color} The toned Color object.
     */
    tone(amount) {
        const color = this.constructor.mix(
            this,
            new this.constructor(50),
            amount
        );
        return this.setColor(color._r, color._g, color._b, this._a);
    }

});
