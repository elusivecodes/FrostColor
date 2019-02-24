/**
 * CMYKColor class
 * @class
 */
class CMYKColor extends BaseColor {

    /**
     * New CMYKColor constructor
     * @param {number} [c]
     * @param {number} [m]
     * @param {number} [y]
     * @param {number} [k]
     * @param {number} [a=1]
     * @returns {CMYKColor}
     */
    constructor(c, m, y, k, a = 1) {
        super(a);

        this.c = Color.clamp(c);
        this.m = Color.clamp(m);
        this.y = Color.clamp(y);
        this.k = Color.clamp(k);
    }

    /**
     * Sets the alpha value of the color (between 0 and 1)
     * @param {number} a
     * @returns {CMYKColor}
     */
    setAlpha(a) {
        return new CMYKColor(this.c, this.m, this.y, this.k, a);
    }

    /**
     * Creates a CMY representation of the color
     * @returns {CMYColor}
     */
    toCMY() {
        const [c, m, y] = Color.CMYK2CMY(this.c, this.m, this.y, this.k);
        return new CMYColor(c, m, y, this.a);
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
