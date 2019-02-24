/**
 * CMYColor class
 * @class
 */
class CMYColor extends BaseColor {

    /**
     * New CMYColor constructor
     * @param {number} [c]
     * @param {number} [m]
     * @param {number} [y]
     * @param {number} [a=1]
     * @returns {CMYColor}
     */
    constructor(c, m, y, a = 1) {
        super(a);

        this.c = Color.clamp(c);
        this.m = Color.clamp(m);
        this.y = Color.clamp(y);
    }

    /**
     * Sets the alpha value of the color (between 0 and 1)
     * @param {number} a
     * @returns {CMYColor}
     */
    setAlpha(a) {
        return new CMYColor(this.c, this.m, this.y, a);
    }

    /**
     * Creates a CMY representation of the color
     * @returns {CMYColor}
     */
    toCMY() {
        return this;
    }

    /**
     * Creates a CMYK representation of the color
     * @returns {CMYKColor}
     */
    toCMYK() {
        const [c, m, y, k] = Color.CMY2CMYK(this.c, this.m, this.y);
        return new CMYKColor(c, m, y, k, this.a);
    }

    /**
     * Creates a RGB representation of the color
     * @returns {RGBColor}
     */
    toRGB() {
        const [r, g, b] = Color.CMY2RGB(this.c, this.m, this.y);
        return new RGBColor(r, g, b, this.a);
    }

}
