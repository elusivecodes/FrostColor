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

        this._c = Color.clamp(cyan);
        this._m = Color.clamp(magenta);
        this._y = Color.clamp(yellow);
    }

    /**
     * Sets the alpha value of the color (between 0 and 1)
     * @param {number} alpha
     * @returns {CMYColor}
     */
    setAlpha(alpha) {
        return new CMYColor(this._c, this._m, this._y, alpha);
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
        const [c, m, y, k] = Color.CMY2CMYK(this._c, this._m, this._y);
        return new CMYKColor(c, m, y, k, this.a);
    }

    /**
     * Creates a RGB representation of the color
     * @returns {RGBColor}
     */
    toRGB() {
        const [r, g, b] = Color.CMY2RGB(this._c, this._m, this._y);
        return new RGBColor(r, g, b, this._a);
    }

}
