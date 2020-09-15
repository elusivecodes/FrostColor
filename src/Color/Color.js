/**
 * Color class
 * @class
 */
class Color {

    /**
     * New Color constructor.
     * @param {number} [r=0] The red value, or the brightness value.
     * @param {number} [g=1] The green value or the alpha value.
     * @param {null|number} [b=null] The blue value.
     * @param {number} [a=1] The alpha value.
     * @returns {Color} A new Color object.
     */
    constructor(r = 0, g = 1, b = null, a = 1) {
        if (b === null) {
            a = g;
            r *= 2.55;
            b = g = r;
        }

        this._r = this.constructor._clamp(r, 0, 255);
        this._g = this.constructor._clamp(g, 0, 255);
        this._b = this.constructor._clamp(b, 0, 255);
        this._a = this.constructor._clamp(a, 0, 1);
    }

    /**
     * Clone the Color.
     * @returns {Color} A new Color object.
     */
    clone() {
        return new this.constructor(this._r, this._g, this._b, this._a);
    }

    /**
     * Get the closest color name for the color.
     * @returns {string} The name.
     */
    label() {
        let closest,
            closestDist = Number.MAX_SAFE_INTEGER;

        for (const label in this.constructor.colors) {
            const color = this.constructor.fromHexString(this.constructor.colors[label]);
            const dist = this.constructor.dist(this, color);

            if (dist < closestDist) {
                closest = label;
                closestDist = dist;
            }
        }

        return closest;
    }

    /**
     * Set the RGBA values of the Color.
     * @param {number} r The red value.
     * @param {number} g The green value.
     * @param {number} b The blue value.
     * @param {number} a The alpha value.
     * @returns {Color} The Color object.
     */
    setColor(r, g, b, a) {
        this._r = this.constructor._clamp(r, 0, 255);
        this._g = this.constructor._clamp(g, 0, 255);
        this._b = this.constructor._clamp(b, 0, 255);
        this._a = this.constructor._clamp(a, 0, 1);

        return this;
    }

    /**
     * Return a hexadecimal string representation of the color.
     * @returns {string} The hexadecimal string.
     */
    toHexString() {
        const hex = this._getHex();

        return this.constructor._toHex(hex);
    }

    /**
     * Return a HSL/HSLA string representation of the color.
     * @returns {string} The HSL/HSLA string.
     */
    toHSLString() {
        let [h, s, l] = this.constructor.RGB2HSL(this._r, this._g, this._b);

        h = Math.round(h);
        s = Math.round(s);
        l = Math.round(l);
        const a = Math.round(this._a * 100) / 100;

        if (a < 1) {
            return `hsla(${h}, ${s}%, ${l}%, ${a})`;
        }

        return `hsl(${h}, ${s}%, ${l}%)`;
    }

    /**
     * Return a RGB/RGBA string representation of the color.
     * @returns {string} The RGB/RGBA string.
     */
    toRGBString() {
        const r = Math.round(this._r);
        const g = Math.round(this._g);
        const b = Math.round(this._b);
        const a = Math.round(this._a * 1000) / 1000;

        if (a < 1) {
            return `rgba(${r}, ${g}, ${b}, ${a})`;
        }

        return `rgb(${r}, ${g}, ${b})`;
    }

    /**
     * Return a HTML string representation of the color.
     * @returns {string} The HTML color string.
     */
    toString() {
        if (!this._a) {
            return 'transparent';
        }

        if (this._a < 1) {
            return this.toRGBString();
        }

        const hex = this._getHex();

        for (const name in this.constructor.colors) {
            if (this.constructor.colors[name] === hex) {
                return name;
            }
        }

        return this.constructor._toHex(hex);
    }

    /**
     * Return the luminance value of the color.
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
