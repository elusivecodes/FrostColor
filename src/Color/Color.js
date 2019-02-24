/**
 * Color class
 * @class
 */
class Color {

    /**
     * New Color constructor
     * @param {number|BaseColor|Color} [red=0]
     * @param {number} [green=1]
     * @param {null|number} [blue=null]
     * @param {number} [alpha=1]
     * @returns {Color}
     */
    constructor(red = 0, green = 1, blue = null, alpha = 1) {
        if (blue !== null) {
            this._color = new RGBColor(red, green, blue, alpha);
        } else if (red instanceof BaseColor) {
            this._color = red;
        } else if (red instanceof Color) {
            this._color = red.getColor();
        } else {
            this._color = new HSLColor(0, 0, red, green);
        }
    }

    /**
     * Returns the internal BaseColor of the color
     * @returns {BaseColor}
     */
    getColor() {
        return this._color;
    }

    /**
     * Sets the BaseColor of the color
     * @param {BaseColor} color
     * @returns {Color}
     */
    setColor(color) {
        this._color = color;
        return this;
    }

    /**
     * Returns a string representation of the color
     * @returns {string}
     */
    toString() {
        return this.getColor()
            .toString();
    }

    /**
     * Returns the luminance value of the color
     * @returns {number}
     */
    valueOf() {
        return this.getColor()
            .valueOf();
    }

    /**
     * Returns a primitive value of the color
     * @returns {string|number}
     */
    [Symbol.toPrimitive](hint) {
        return this.getColor()[Symbol.toPrimitive](hint);
    }

}
