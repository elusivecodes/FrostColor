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

        this.h = hue % 360;
        this.s = Color.clamp(saturation);
        this.v = Color.clamp(brightness);
    }

    /**
     * Gets the brightness value of the color (between 0 and 100)
     * @returns {number}
     */
    getBrightness() {
        return this.v;
    }

    /**
     * Gets the hue value of the color (between 0 and 360)
     * @returns {number}
     */
    getHue() {
        return this.h;
    }

    /**
     * Gets the saturation value of the color (between 0 and 100)
     * @returns {number}
     */
    getSaturation() {
        return this.s;
    }

    /**
     * Sets the alpha value of the color (between 0 and 1)
     * @param {number} alpha
     * @returns {HSVColor}
     */
    setAlpha(alpha) {
        return new HSVColor(this.h, this.s, this.v, alpha);
    }

    /**
     * Sets the brightness value of the color (between 0 and 100)
     * @param {number} brightness
     * @returns {HSVColor}
     */
    setBrightness(brightness) {
        return new HSVColor(this.h, this.s, brightness, this.a);
    }

    /**
     * Sets the hue value of the color (between 0 and 360)
     * @param {number} hue
     * @returns {HSVColor}
     */
    setHue(hue) {
        return new HSVColor(hue, this.s, this.v, this.a);
    }

    /**
     * Sets the saturation value of the color (between 0 and 100)
     * @param {number} saturation
     * @returns {HSVColor}
     */
    setSaturation(saturation) {
        return new HSVColor(this.h, saturation, this.v, this.a);
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
        const [r, g, b] = Color.HSV2RGB(this.h, this.s, this.v);
        return new RGBColor(r, g, b, this.a);
    }

}
