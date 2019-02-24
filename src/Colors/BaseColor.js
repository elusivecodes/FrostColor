/**
 * BaseColor class
 * @class
 */
class BaseColor {

    /**
     * New BaseColor constructor
     * @param {number} [alpha=1]
     * @returns {BaseColor}
     */
    constructor(alpha = 1) {
        this._a = Color.clamp(alpha, 0, 1);
    }

    /**
     * Darkens the color by a specified amount (between 0 and 1)
     * @param {number} amount
     * @returns {HSLColor}
     */
    darken(amount) {
        return this.toHSL()
            .darken(amount);
    }

    /**
     * Gets the alpha value of the color (between 0 and 1)
     * @returns {number}
     */
    getAlpha() {
        return this._a;
    }

    /**
     * Gets the brightness value of the color (between 0 and 100)
     * @returns {number}
     */
    getBrightness() {
        return this.toHSV()
            .getBrightness();
    }

    /**
     * Gets the hue value of the color (between 0 and 360)
     * @returns {number}
     */
    getHue() {
        return this.toHSV()
            .getHue();
    }

    /**
     * Gets the saturation value of the color (between 0 and 100)
     * @returns {number}
     */
    getSaturation() {
        return this.toHSV()
            .getSaturation();
    }

    /**
     * Lightens the color by a specified amount (between 0 and 1)
     * @param {number} amount
     * @returns {HSLColor}
     */
    lighten(amount) {
        return this.toHSL()
            .lighten(amount);
    }

    /**
     * Gets the luminance value of the color 
     * @returns {number}
     */
    luma() {
        return this.toRGB()
            .luma();
    }

    /**
     * Mixes this color with another by a specified amount (between 0 and 1)
     * @param {BaseColor} color
     * @param {number} amount
     * @returns {RGBColor}
     */
    mix(color, amount) {
        return this.toRGB()
            .mix(color, amount);
    }

    /**
     * Multiplies this color with another by a specified amount (between 0 and 1)
     * @param {BaseColor} color
     * @param {number} amount
     * @returns {RGBColor}
     */
    multiply(color, amount) {
        return this.toRGB()
            .multiply(color, amount);
    }

    /**
     * Sets the brightness value of the color (between 0 and 100)
     * @param {number} brightness
     * @returns {HSVColor}
     */
    setBrightness(brightness) {
        return this.toHSV()
            .setBrightness(brightness);
    }

    /**
     * Sets the hue value of the color (between 0 and 360)
     * @param {number} hue
     * @returns {HSVColor}
     */
    setHue(hue) {
        return this.toHSV()
            .setHue(hue);
    }

    /**
     * Sets the saturation value of the color (between 0 and 100)
     * @param {number} saturation
     * @returns {HSVColor}
     */
    setSaturation(saturation) {
        return this.toHSV()
            .setSaturation(saturation);
    }

    /**
     * Shades the color by a specified amount (between 0 and 1)
     * @param {number} amount
     * @returns {RGBColor}
     */
    shade(amount) {
        return Color.mix(
            this,
            new RGBColor(0, 0, 0),
            amount
        );
    }

    /**
     * Tints the color by a specified amount (between 0 and 1)
     * @param {number} amount
     * @returns {RGBColor}
     */
    tint(amount) {
        return Color.mix(
            this,
            new RGBColor(255, 255, 255),
            amount
        );
    }

    /**
     * Creates a CMY representation of the color
     * @returns {CMYColor}
     */
    toCMY() {
        return this.toRGB()
            .toCMY();
    }

    /**
     * Creates a CMYK representation of the color
     * @returns {CMYKColor}
     */
    toCMYK() {
        return this.toCMY()
            .toCMYK();
    }

    /**
     * Creates a HSL representation of the color
     * @returns {HSLColor}
     */
    toHSL() {
        return this.toRGB()
            .toHSL();
    }

    /**
     * Creates a HSV representation of the color
     * @returns {HSVColor}
     */
    toHSV() {
        return this.toRGB()
            .toHSV();
    }

    /**
     * Tones the color by a specified amount (between 0 and 1)
     * @param {number} amount
     * @returns {RGBColor}
     */
    tone(amount) {
        return Color.mix(
            this,
            new RGB(127, 127, 127),
            amount
        );
    }

    /**
     * Returns a string representation of the color
     * @returns {string}
     */
    toString() {
        return this.toRGB()
            .toString();
    }

    /**
     * Returns the luminance value of the color
     * @returns {number}
     */
    valueOf() {
        return this.luma();
    }

    /**
     * Returns a primitive value of the color
     * @returns {string|number}
     */
    [Symbol.toPrimitive](hint) {
        return hint === 'number' ?
            this.valueOf() :
            this.toString();
    }

}