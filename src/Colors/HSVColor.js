/**
 * HSVColor class
 * @class
 */
class HSVColor extends BaseColor {

    /**
     * New HSVColor constructor.
     * @param {number} h The hue value.
     * @param {number} s The saturation value.
     * @param {number} v The brightness value.
     * @param {number} [a=1] The alpha value.
     * @returns {HSVColor} A new HSVColor object.
     */
    constructor(h, s, v, a = 1) {
        super(a);

        this._h = h % 360;
        this._s = Color.clamp(s);
        this._v = Color.clamp(v);
    }

    /**
     * Get the brightness value of the color.
     * @returns {number} The brightess value.
     */
    getBrightness() {
        return this._v;
    }

    /**
     * Get the hue value of the color.
     * @returns {number} The hue value.
     */
    getHue() {
        return this._h;
    }

    /**
     * Get the saturation value of the color.
     * @returns {number} The saturation value.
     */
    getSaturation() {
        return this._s;
    }

    /**
     * Set the alpha value of the color.
     * @param {number} a The alpha value.
     * @returns {HSVColor} A new HSVColor object.
     */
    setAlpha(a) {
        return new HSVColor(this._h, this._s, this._v, a);
    }

    /**
     * Set the brightness value of the color.
     * @param {number} v The brightness value.
     * @returns {HSVColor} A new HSVColor object.
     */
    setBrightness(v) {
        return new HSVColor(this._h, this._s, v, this._a);
    }

    /**
     * Set the hue value of the color.
     * @param {number} h The hue value.
     * @returns {HSVColor} A new HSVColor object.
     */
    setHue(h) {
        return new HSVColor(h, this._s, this._v, this._a);
    }

    /**
     * Set the saturation value of the color.
     * @param {number} s The saturation value.
     * @returns {HSVColor} A new HSVColor object.
     */
    setSaturation(s) {
        return new HSVColor(this._h, s, this._v, this._a);
    }

    /**
     * Create a HSV representation of the color.
     * @returns {HSVColor} A HSVColor object.
     */
    toHSV() {
        return this;
    }

    /**
     * Create a RGB representation of the color.
     * @returns {RGBColor} A new RGBColor object.
     */
    toRGB() {
        return new RGBColor(
            ...Color.HSV2RGB(this._h, this._s, this._v)
                .concat([this._a])
        );
    }

}
