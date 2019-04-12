/**
 * Color class
 * @class
 */
class Color {

    /**
     * New Color constructor.
     * @param {number|BaseColor|Color} [a=0] The red value, the brightness value, or a Color or BaseColor object.
     * @param {number} [b=1] The green value or the alpha value.
     * @param {null|number} [c=null] The blue value.
     * @param {number} [d=1] The alpha value.
     * @returns {Color} A new Color object.
     */
    constructor(a = 0, b = 1, c = null, d = 1) {
        if (c !== null) {
            this._color = new RGBColor(a, b, c, d);
        } else if (a instanceof BaseColor) {
            this._color = a;
        } else if (a instanceof Color) {
            this._color = a.getColor();
        } else {
            this._color = new HSVColor(0, 0, a, b);
        }
    }

    /**
     * Return the internal BaseColor of the Color object.
     * @returns {BaseColor} The BaseColor.
     */
    getColor() {
        return this._color;
    }

    /**
     * Set the BaseColor of the Color object.
     * @param {BaseColor} color A new BaseColor.
     * @returns {Color} The Color object.
     */
    setColor(color) {
        this._color = color;
        return this;
    }

    /**
     * Return a HTML string representation of the color.
     * @returns {string} The HTML color string.
     */
    toString() {
        return this.getColor()
            .toString();
    }

    /**
     * Return the luminance value of the color.
     * @returns {number} The luminance value.
     */
    valueOf() {
        return this.getColor()
            .valueOf();
    }

    /**
     * Return a primitive value of the color.
     * @returns {string|number} The HTML color string, or the luminance value.
     */
    [Symbol.toPrimitive](hint) {
        return this.getColor()[Symbol.toPrimitive](hint);
    }

}
