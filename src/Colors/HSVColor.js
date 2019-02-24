/**
 * HSVColor class
 * @class
 */
class HSVColor extends BaseColor {

    /**
     * New HSVColor constructor
     * @param {number} [h]
     * @param {number} [s]
     * @param {number} [v]
     * @param {number} [a=1]
     * @returns {HSVColor}
     */
    constructor(h, s, v, a = 1) {
        super(a);

        this.h = h % 360;
        this.s = Color.clamp(s);
        this.v = Color.clamp(v);
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
     * @param {number} a
     * @returns {HSVColor}
     */
    setAlpha(a) {
        return new HSVColor(this.h, this.s, this.v, a);
    }

    /**
     * Sets the brightness value of the color (between 0 and 100)
     * @param {number} v
     * @returns {HSVColor}
     */
    setBrightness(v) {
        return new HSVColor(this.h, this.s, v, this.a);
    }

    /**
     * Sets the hue value of the color (between 0 and 360)
     * @param {number} h
     * @returns {HSVColor}
     */
    setHue(h) {
        return new HSVColor(h, this.s, this.v, this.a);
    }

    /**
     * Sets the saturation value of the color (between 0 and 100)
     * @param {number} s
     * @returns {HSVColor}
     */
    setSaturation(s) {
        return new HSVColor(this.h, s, this.v, this.a);
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
