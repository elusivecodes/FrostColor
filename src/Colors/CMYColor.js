/**
 * CMYColor class
 * @class
 */
class CMYColor extends BaseColor {

    /**
     * New CMYColor constructor
     * @param {number} cyan
     * @param {number} magenta
     * @param {number} yellow
     * @param {number} [alpha=1]
     * @returns {CMYColor}
     */
    constructor(cyan, magenta, yellow, alpha = 1) {
        super(alpha);

        this.c = Color.clamp(cyan);
        this.m = Color.clamp(magenta);
        this.y = Color.clamp(yellow);
    }

    /**
     * Sets the alpha value of the color (between 0 and 1)
     * @param {number} alpha
     * @returns {CMYColor}
     */
    setAlpha(alpha) {
        return new CMYColor(this.c, this.m, this.y, alpha);
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
