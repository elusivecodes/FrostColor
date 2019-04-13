/**
 * HSLColor class
 * @class
 */
class HSLColor extends BaseColor {

    /**
     * New HSLColor constructor.
     * @param {number} h The hue value.
     * @param {number} s The saturation value.
     * @param {number} l The lightness value.
     * @param {number} [a=1] The alpha value.
     * @returns {HSLColor} A new HSLColor object.
     */
    constructor(h, s, l, a = 1) {
        super(a);

        this._h = h % 360;
        this._s = Color._clamp(s);
        this._l = Color._clamp(l);
    }

    /**
     * Darken the color by a specified amount.
     * @param {number} amount The amount to darken the color by.
     * @returns {HSLColor} A new HSLColor object.
     */
    darken(amount) {
        return new HSLColor(
            this._h,
            this._s,
            this._l - (this._l * amount),
            this._a
        );
    }

    /**
     * Lighten the color by a specified amount.
     * @param {number} amount The amount to lighten the color by.
     * @returns {HSLColor} A new HSLColor object.
     */
    lighten(amount) {
        return new HSLColor(
            this._h,
            this._s,
            this._l + ((100 - this._l) * amount),
            this._a
        );
    }

    /**
     * Set the alpha value of the color.
     * @param {number} a The alpha value.
     * @returns {HSLColor} A new HSLColor object.
     */
    setAlpha(a) {
        return new HSLColor(this._h, this._s, this._l, a);
    }

    /**
     * Create a HSL representation of the color.
     * @returns {HSLColor} A HSLColor object.
     */
    toHSL() {
        return this;
    }

    /**
     * Create a RGB representation of the color.
     * @returns {RGBColor} A new RGBColor object.
     */
    toRGB() {
        return new RGBColor(
            ...Color.HSL2RGB(this._h, this._s, this._l)
                .concat([this._a])
        );
    }

}
