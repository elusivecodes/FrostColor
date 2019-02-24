/**
 * HSVColor class
 * @class
 */
class HSVColor extends BaseColor {

    /**
     * New HSVColor constructor
     * @param {number} hue
     * @param {number} saturation
     * @param {number} brightness
     * @param {number} [alpha=1]
     * @returns {HSVColor}
     */
    constructor(hue, saturation, brightness, alpha = 1) {
        super(alpha);

        this._h = hue % 360;
        this._s = Color.clamp(saturation);
        this._v = Color.clamp(brightness);
    }

    /**
     * Gets the brightness value of the color (between 0 and 100)
     * @returns {number}
     */
    getBrightness() {
        return this._v;
    }

    /**
     * Gets the hue value of the color (between 0 and 360)
     * @returns {number}
     */
    getHue() {
        return this._h;
    }

    /**
     * Gets the saturation value of the color (between 0 and 100)
     * @returns {number}
     */
    getSaturation() {
        return this._s;
    }

    /**
     * Sets the alpha value of the color (between 0 and 1)
     * @param {number} alpha
     * @returns {HSVColor}
     */
    setAlpha(alpha) {
        return new HSVColor(this._h, this._s, this._v, alpha);
    }

    /**
     * Sets the brightness value of the color (between 0 and 100)
     * @param {number} brightness
     * @returns {HSVColor}
     */
    setBrightness(brightness) {
        return new HSVColor(this._h, this._s, brightness, this._a);
    }

    /**
     * Sets the hue value of the color (between 0 and 360)
     * @param {number} hue
     * @returns {HSVColor}
     */
    setHue(hue) {
        return new HSVColor(hue, this._s, this._v, this._a);
    }

    /**
     * Sets the saturation value of the color (between 0 and 100)
     * @param {number} saturation
     * @returns {HSVColor}
     */
    setSaturation(saturation) {
        return new HSVColor(this._h, saturation, this._v, this._a);
    }

    /**
     * Creates a HSV representation of the color
     * @returns {HSVColor}
     */
    toHSV() {
        return this;
    }

    /**
     * Creates a RGB representation of the color
     * @returns {RGBColor}
     */
    toRGB() {
        const [r, g, b] = Color.HSV2RGB(this._h, this._s, this._v);
        return new RGBColor(r, g, b, this._a);
    }

}
