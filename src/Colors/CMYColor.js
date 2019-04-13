/**
 * CMYColor class
 * @class
 */
class CMYColor extends BaseColor {

    /**
     * New CMYColor constructor.
     * @param {number} c The cyan value.
     * @param {number} m The magenta value.
     * @param {number} y The yellow value.
     * @param {number} [a=1] The alpha value.
     * @returns {CMYColor} A new CMYColor object.
     */
    constructor(c, m, y, a = 1) {
        super(a);

        this._c = Color._clamp(c);
        this._m = Color._clamp(m);
        this._y = Color._clamp(y);
    }

    /**
     * Set the alpha value of the color.
     * @param {number} a The alpha value.
     * @returns {CMYColor} A new CMYColor object.
     */
    setAlpha(a) {
        return new CMYColor(this._c, this._m, this._y, a);
    }

    /**
     * Create a CMY representation of the color.
     * @returns {CMYColor} A CMYColor object.
     */
    toCMY() {
        return this;
    }

    /**
     * Create a CMYK representation of the color.
     * @returns {CMYKColor} A new CMYKColor object.
     */
    toCMYK() {
        return new CMYKColor(
            ...Color.CMY2CMYK(this._c, this._m, this._y)
                .concat([this._a])
        );
    }

    /**
     * Create a RGB representation of the color.
     * @returns {RGBColor} A new RGBColor object.
     */
    toRGB() {
        return new RGBColor(
            ...Color.CMY2RGB(this._c, this._m, this._y)
                .concat([this._a])
        );
    }

}
