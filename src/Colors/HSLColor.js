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

        this.h = hue % 360;
        this.s = Color.clamp(saturation);
        this.l = Color.clamp(lightness);
    }

    /**
     * Darkens the color by a specified amount (between 0 and 1)
     * @param {number} amount
     * @returns {HSLColor}
     */
    darken(amount) {
        return new HSLColor(
            this.h,
            this.s,
            this.l - (this.l * amount),
            this.a
        );
    }

    /**
     * Lightens the color by a specified amount (between 0 and 1)
     * @param {number} amount
     * @returns {HSLColor}
     */
    lighten(amount) {
        return new HSLColor(
            this.h,
            this.s,
            this.l + ((100 - this.l) * amount),
            this.a
        );
    }

    /**
     * Sets the alpha value of the color (between 0 and 1)
     * @param {number} alpha
     * @returns {HSLColor}
     */
    setAlpha(alpha) {
        return new HSL(this.h, this.s, this.l, alpha);
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
        const [r, g, b] = Color.HSL2RGB(this.h, this.s, this.l);
        return new RGBColor(r, g, b, this.a);
    }

}
