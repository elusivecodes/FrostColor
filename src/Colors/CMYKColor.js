/**
 * CMYKColor class
 * @class
 */
class CMYKColor extends BaseColor {

    /**
     * New CMYKColor constructor
     * @param {number} cyan
     * @param {number} magenta
     * @param {number} yellow
     * @param {number} key
     * @param {number} [alpha=1]
     * @returns {CMYKColor}
     */
    constructor(cyan, magenta, yellow, key, alpha = 1) {
        super(alpha);

        this._c = Color.clamp(cyan);
        this._m = Color.clamp(magenta);
        this._y = Color.clamp(yellow);
        this._k = Color.clamp(key);
    }

    /**
     * Sets the alpha value of the color (between 0 and 1)
     * @param {number} alpha
     * @returns {CMYKColor}
     */
    setAlpha(alpha) {
        return new CMYKColor(this._c, this._m, this._y, this._k, alpha);
    }

    /**
     * Creates a CMY representation of the color
     * @returns {CMYColor}
     */
    toCMY() {
        const [c, m, y] = Color.CMYK2CMY(this._c, this._m, this._y, this._k);
        return new CMYColor(c, m, y, this._a);
    }

    /**
     * Creates a CMYK representation of the color
     * @returns {CMYKColor}
     */
    toCMYK() {
        return this;
    }

    /**
     * Creates a RGB representation of the color
     * @returns {RGBColor}
     */
    toRGB() {
        return this.toCMY()
            .toRGB();
    }

}
