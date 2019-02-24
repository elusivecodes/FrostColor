/**
 * HSLColor class
 * @class
 */
class HSLColor extends BaseColor {

    /**
     * New HSLColor constructor
     * @param {number} hue
     * @param {number} saturation
     * @param {number} lightness
     * @param {number} [alpha=1]
     * @returns {HSLColor}
     */
    constructor(hue, saturation, lightness, alpha = 1) {
        super(alpha);

        this._h = hue % 360;
        this._s = Color.clamp(saturation);
        this._l = Color.clamp(lightness);
    }

    /**
     * Darkens the color by a specified amount (between 0 and 1)
     * @param {number} amount
     * @returns {HSLColor}
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
     * Lightens the color by a specified amount (between 0 and 1)
     * @param {number} amount
     * @returns {HSLColor}
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
     * Sets the alpha value of the color (between 0 and 1)
     * @param {number} alpha
     * @returns {HSLColor}
     */
    setAlpha(alpha) {
        return new HSL(this._h, this._s, this._l, alpha);
    }

    /**
     * Creates a HSL representation of the color
     * @returns {HSLColor}
     */
    toHSL() {
        return this;
    }

    /**
     * Creates a RGB representation of the color
     * @returns {RGBColor}
     */
    toRGB() {
        return new RGBColor(...Color.HSL2RGB(this._h, this._s, this._l).concat([this._a]));
    }

}
