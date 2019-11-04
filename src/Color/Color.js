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
        if (a instanceof BaseColor) {
            this._color = a;
        } else if (a instanceof Color) {
            this._color = a.getColor();
        } else if (c !== null) {
            this._color = new RGBColor(a, b, c, d);
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
     * Get the closest color name for the color.
     * @returns {string} The name.
     */
    label() {
        let closest,
            closestDist = Number.MAX_SAFE_INTEGER;

        for (const label in Color.colors) {
            const color = Color.fromHexString(Color.colors[label]);
            const dist = Color.dist(this, color);

            if (dist < closestDist) {
                closest = label;
                closestDist = dist;
            }
        }

        return closest;
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
     * Return a hexadecimal string representation of the color.
     * @returns {string} The hexadecimal string.
     */
    toHexString() {
        return this._color.toHexString();
    }

    /**
     * Return a HSL/HSLA string representation of the color.
     * @returns {string} The HSL/HSLA string.
     */
    toHSLString() {
        return this._color.toHSLString();
    }

    /**
     * Return a RGB/RGBA string representation of the color.
     * @returns {string} The RGB/RGBA string.
     */
    toRGBString() {
        return this._color.toRGBString();
    }

    /**
     * Return a HTML string representation of the color.
     * @returns {string} The HTML color string.
     */
    toString() {
        return this._color.toString();
    }

    /**
     * Return the luminance value of the color.
     * @returns {number} The luminance value. (0, 1)
     */
    valueOf() {
        return this._color.valueOf();
    }

    /**
     * Return a primitive value of the color.
     * @returns {string|number} The HTML color string, or the luminance value.
     */
    [Symbol.toPrimitive](hint) {
        return this._color[Symbol.toPrimitive](hint);
    }

}
