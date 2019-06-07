/**
 * BaseColor class
 * @class
 */
class BaseColor {

    /**
     * New BaseColor constructor.
     * @param {number} [a=1] The alpha value. (0, 1)
     * @returns {BaseColor} A new BaseColor object.
     */
    constructor(a = 1) {
        this._a = Color._clamp(a, 0, 1);
    }

    /**
     * Darken the color by a specified amount.
     * @param {number} amount The amount to darken the color by. (0, 1)
     * @returns {HSLColor} A new HSLColor object.
     */
    darken(amount) {
        return this.toHSL()
            .darken(amount);
    }

    /**
     * Get the alpha value of the color.
     * @returns {number} The alpha value. (0, 1)
     */
    getAlpha() {
        return this._a;
    }

    /**
     * Get the brightness value of the color.
     * @returns {number} The brightness value. (0, 100)
     */
    getBrightness() {
        return this.toHSV()
            .getBrightness();
    }

    /**
     * Get the hue value of the color.
     * @returns {number} The hue value. (0, 360)
     */
    getHue() {
        return this.toHSV()
            .getHue();
    }

    /**
     * Get the saturation value of the color.
     * @returns {number} The saturation value. (0, 100)
     */
    getSaturation() {
        return this.toHSV()
            .getSaturation();
    }

    /**
     * Invert the color.
     * @returns {RGBColor} A new RGBColor object.
     */
    invert() {
        return this.toRGB()
            .invert();
    }

    /**
     * Lighten the color by a specified amount.
     * @param {number} amount The amount to lighten the color by. (0, 1)
     * @returns {HSLColor} A new HSLColor object.
     */
    lighten(amount) {
        return this.toHSL()
            .lighten(amount);
    }

    /**
     * Get the luminance value of the color.
     * @returns {number} The luminance value. (0, 1)
     */
    luma() {
        return this.toRGB()
            .luma();
    }

    /**
     * Mix this color with another by a specified amount.
     * @param {BaseColor} color The color to mix with.
     * @param {number} amount The amount to mix by. (0, 1)
     * @returns {RGBColor} A new RGBColor object.
     */
    mix(color, amount) {
        return this.toRGB()
            .mix(color, amount);
    }

    /**
     * Multiply this color with another by a specified amount.
     * @param {BaseColor} color The color to multiply with.
     * @param {number} amount The amount to multiply by. (0, 1)
     * @returns {RGBColor} A new RGBColor object.
     */
    multiply(color, amount) {
        return this.toRGB()
            .multiply(color, amount);
    }

    /**
     * Set the brightness value of the color.
     * @param {number} v The brightness value. (0, 100)
     * @returns {HSVColor} A new HSVColor object.
     */
    setBrightness(v) {
        return this.toHSV()
            .setBrightness(v);
    }

    /**
     * Set the hue value of the color.
     * @param {number} h The hue value. (0, 360)
     * @returns {HSVColor} A new HSVColor object.
     */
    setHue(h) {
        return this.toHSV()
            .setHue(h);
    }

    /**
     * Set the saturation value of the color.
     * @param {number} s The saturation value. (0, 100)
     * @returns {HSVColor} A new HSVColor object.
     */
    setSaturation(s) {
        return this.toHSV()
            .setSaturation(s);
    }

    /**
     * Create a CMY representation of the color.
     * @returns {CMYColor} A new CMYColor object.
     */
    toCMY() {
        return this.toRGB()
            .toCMY();
    }

    /**
     * Create a CMYK representation of the color.
     * @returns {CMYKColor} A new CMYKColor object.
     */
    toCMYK() {
        return this.toCMY()
            .toCMYK();
    }

    /**
     * Create a HSL representation of the color.
     * @returns {HSLColor} A new HSLColor object.
     */
    toHSL() {
        return this.toRGB()
            .toHSL();
    }

    /**
     * Create a HSV representation of the color.
     * @returns {HSVColor} A new HSVColor object.
     */
    toHSV() {
        return this.toRGB()
            .toHSV();
    }

    /**
     * Return a hexadecimal string representation of the color.
     * @returns {string} The hexadecimal string.
     */
    toHexString() {
        return this.toRGB()
            .toHexString();
    }

    /**
     * Return a HSL/HSLA string representation of the color.
     * @returns {string} The HSL/HSLA string.
     */
    toHSLString() {
        return this.toHSL()
            .toHSLString();
    }

    /**
     * Return a RGB/RGBA string representation of the color.
     * @returns {string} The RGB/RGBA string.
     */
    toRGBString() {
        return this.toRGB()
            .toRGBString();
    }

    /**
     * Return a HTML string representation of the color.
     * @returns {string} The HTML color string.
     */
    toString() {
        return this.toRGB()
            .toString();
    }

    /**
     * Get the luminance value of the color.
     * @returns {number} The luminance value. (0, 1)
     */
    valueOf() {
        return this.luma();
    }

    /**
     * Return a primitive value of the color.
     * @returns {string|number} The HTML color string, or the luminance value.
     */
    [Symbol.toPrimitive](hint) {
        return hint === 'number' ?
            this.valueOf() :
            this.toString();
    }

}
