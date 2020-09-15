/**
 * Color Schemes
 */

Object.assign(Color.prototype, {

    /**
     * Create an array with 2 analogous color variations.
     * @returns {Color[]} An array containing 2 analogous color variations.
     */
    analogous() {
        const [h, s, v] = this.constructor.RGB2HSV(this._r, this._g, this._b);
        const [r1, g1, b1] = this.constructor.HSV2RGB(h + 30, s, v);
        const [r2, g2, b2] = this.constructor.HSV2RGB(h - 30, s, v);
        return [
            new this.constructor(r1, g1, b1, this._a),
            new this.constructor(r2, g2, b2, this._a)
        ];
    },

    /**
     * Create a complementary color variation.
     * @returns {Color} A complementary color variation.
     */
    complementary() {
        const [h, s, v] = this.constructor.RGB2HSV(this._r, this._g, this._b);
        const [r, g, b] = this.constructor.HSV2RGB(h + 180, s, v);
        return new this.constructor(r, g, b, this._a)
    },

    /**
     * Create an array with 2 split color variations.
     * @returns {Color[]} An array containing 2 split color variations.
     */
    split() {
        const [h, s, v] = this.constructor.RGB2HSV(this._r, this._g, this._b);
        const [r1, g1, b1] = this.constructor.HSV2RGB(h + 150, s, v);
        const [r2, g2, b2] = this.constructor.HSV2RGB(h - 150, s, v);
        return [
            new this.constructor(r1, g1, b1, this._a),
            new this.constructor(r2, g2, b2, this._a)
        ];
    },

    /**
     * Create an array with 3 tetradic color variations.
     * @returns {Color[]} An array containing 3 tetradic color variations.
     */
    tetradic() {
        const [h, s, v] = this.constructor.RGB2HSV(this._r, this._g, this._b);
        const [r1, g1, b1] = this.constructor.HSV2RGB(h + 60, s, v);
        const [r2, g2, b2] = this.constructor.HSV2RGB(h + 180, s, v);
        const [r3, g3, b3] = this.constructor.HSV2RGB(h - 120, s, v);
        return [
            new this.constructor(r1, g1, b1, this._a),
            new this.constructor(r2, g2, b2, this._a),
            new this.constructor(r3, g3, b3, this._a)
        ];
    },

    /**
     * Create an array with 2 triadic color variations.
     * @returns {Color[]} An array containing 2 triadic color variations.
     */
    triadic() {
        const [h, s, v] = this.constructor.RGB2HSV(this._r, this._g, this._b);
        const [r1, g1, b1] = this.constructor.HSV2RGB(h + 120, s, v);
        const [r2, g2, b2] = this.constructor.HSV2RGB(h - 120, s, v);
        return [
            new this.constructor(r1, g1, b1, this._a),
            new this.constructor(r2, g2, b2, this._a)
        ];
    }

});
