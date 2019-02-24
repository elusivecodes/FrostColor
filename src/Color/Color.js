/**
 * Color class
 * @class
 */
class Color {

    /**
     * New Color constructor
     * @param {number} [r=0]
     * @param {number} [g=1]
     * @param {null|number} [b=null]
     * @param {number} [a=1]
     * @returns {Color}
     */
    constructor(r = 0, g = 1, b = null, a = 1) {
        if (b !== null) {
            this.color = new RGBColor(r, g, b, a);
        } else if (r instanceof BaseColor) {
            this.color = r;
        } else if (r instanceof Color) {
            this.color = r.color;
        } else {
            this.color = new HSLColor(0, 0, r, g);
        }
    }

    /**
     * Sets the BaseColor of the color
     * @param {BaseColor} color
     * @returns {Color}
     */
    setColor(color) {
        this.color = color;
        return this;
    }

    /**
     * Returns a string representation of the color
     * @returns {string}
     */
    toString() {
        return this.color.toString();
    }

    /**
     * Returns the luminance value of the color
     * @returns {number}
     */
    valueOf() {
        return this.color.valueOf();
    }

    /**
     * Returns a primitive value of the color
     * @returns {string|number}
     */
    [Symbol.toPrimitive](hint) {
        return this.color[Symbol.toPrimitive](hint);
    }

}
