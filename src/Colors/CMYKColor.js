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

        this.c = Color.clamp(cyan);
        this.m = Color.clamp(magenta);
        this.y = Color.clamp(yellow);
        this.k = Color.clamp(key);
    }

    /**
     * Sets the alpha value of the color (between 0 and 1)
     * @param {number} alpha
     * @returns {CMYKColor}
     */
    setAlpha(alpha) {
        return new CMYKColor(this.c, this.m, this.y, this.k, alpha);
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
