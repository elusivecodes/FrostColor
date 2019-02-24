/**
 * HSLColor class
 * @class
 */
class HSLColor extends BaseColor {

    /**
     * New HSLColor constructor
     * @param {number} [h]
     * @param {number} [s]
     * @param {number} [l]
     * @param {number} [a=1]
     * @returns {HSLColor}
     */
    constructor(h, s, l, a = 1) {
        super(a);

        this.h = h % 360;
        this.s = Color.clamp(s);
        this.l = Color.clamp(l);
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
     * @param {number} a
     * @returns {HSLColor}
     */
    setAlpha(a) {
        return new HSL(this.h, this.s, this.l, a);
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
