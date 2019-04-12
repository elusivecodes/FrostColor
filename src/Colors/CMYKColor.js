/**
 * CMYKColor class
 * @class
 */
class CMYKColor extends BaseColor {

    /**
     * New CMYKColor constructor.
     * @param {number} c The cyan value.
     * @param {number} m The magenta value.
     * @param {number} y The yellow value.
     * @param {number} k The key value.
     * @param {number} [a=1] The alpha value.
     * @returns {CMYKColor} A new CMYKColor object.
     */
    constructor(c, m, y, k, a = 1) {
        super(a);

        this._c = Color.clamp(c);
        this._m = Color.clamp(m);
        this._y = Color.clamp(y);
        this._k = Color.clamp(k);
    }

    /**
     * Set the alpha value of the color.
     * @param {number} a The alpha value.
     * @returns {CMYKColor} A new CMYKColor object.
     */
    setAlpha(a) {
        return new CMYKColor(this._c, this._m, this._y, this._k, a);
    }

    /**
     * Create a CMY representation of the color.
     * @returns {CMYColor} A new CMYColor object.
     */
    toCMY() {
        return new CMYColor(
            ...Color.CMYK2CMY(this._c, this._m, this._y, this._k)
                .concat([this._a])
        );
    }

    /**
     * Create a CMYK representation of the color.
     * @returns {CMYKColor} A CMYKColor object.
     */
    toCMYK() {
        return this;
    }

    /**
     * Create a RGB representation of the color.
     * @returns {RGBColor} A new RGBColor object.
     */
    toRGB() {
        return this.toCMY()
            .toRGB();
    }

}
