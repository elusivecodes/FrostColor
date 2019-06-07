/**
 * RGBColor class
 * @class
 */
class RGBColor extends BaseColor {

    /**
     * New RGBColor constructor.
     * @param {number} r The red value. (0, 255)
     * @param {number} g The green value. (0, 255)
     * @param {number} b The blue value. (0, 255)
     * @param {number} [a=1] The alpha value. (0, 1)
     * @returns {RGBColor} A new RGBColor object.
     */
    constructor(r, g, b, a = 1) {
        super(a);

        this._r = Color._clamp(r, 0, 255);
        this._g = Color._clamp(g, 0, 255);
        this._b = Color._clamp(b, 0, 255);
    }

    /**
     * Invert the color.
     * @returns {RGBColor} A new RGBColor object.
     */
    invert() {
        return new RGBColor(
            255 - this._r,
            255 - this._g,
            255 - this._b,
            this._a
        );
    }

    /**
     * Get the luminance value of the color.
     * @returns {number} The luminance value. (0, 1)
     */
    luma() {
        return Color.RGB2Luma(this._r, this._g, this._b);
    }

    /**
     * Mix this color with another by a specified amount.
     * @param {BaseColor} color The color to mix with.
     * @param {number} amount The amount to mix by. (0, 1)
     * @returns {RGBColor} A new RGBColor object.
     */
    mix(color, amount) {
        const rgb = color.toRGB();

        return new RGBColor(
            Color._lerp(this._r, rgb._r, amount),
            Color._lerp(this._g, rgb._g, amount),
            Color._lerp(this._b, rgb._b, amount),
            Color._lerp(this._a, rgb._a, amount)
        );
    }

    /**
     * Multiply this color with another by a specified amount.
     * @param {BaseColor} color The color to multiply with.
     * @param {number} amount The amount to multiply by. (0, 1)
     * @returns {RGBColor} A new RGBColor object.
     */
    multiply(color, amount) {
        const rgb = color.toRGB();

        return new RGBColor(
            Color._lerp(this._r, this._r * rgb._r / 255, amount),
            Color._lerp(this._g, this._g * rgb._g / 255, amount),
            Color._lerp(this._b, this._b * rgb._b / 255, amount),
            Color._lerp(this._a, this._a * rgb._a, amount)
        );
    }

    /**
     * Set the alpha value of the color.
     * @param {number} a The alpha value. (0, 1)
     * @returns {RGBColor} A new RGBColor object.
     */
    setAlpha(a) {
        return new RGBColor(this._r, this._g, this._b, a);
    }

    /**
     * Create a CMY representation of the color.
     * @returns {CMYColor} A new CMYColor object.
     */
    toCMY() {
        return new CMYColor(
            ...Color.RGB2CMY(this._r, this._g, this._b)
                .concat([this._a])
        );
    }

    /**
     * Create a HSL representation of the color.
     * @returns {HSLColor} A new HSLColor object.
     */
    toHSL() {
        return new HSLColor(
            ...Color.RGB2HSL(this._r, this._g, this._b)
                .concat([this._a])
        );
    }

    /**
     * Create a HSLV representation of the color.
     * @returns {HSVColor} A new HSVColor object.
     */
    toHSV() {
        return new HSVColor(
            ...Color.RGB2HSV(this._r, this._g, this._b)
                .concat([this._a])
        );
    }

    /**
     * Create a RGB representation of the color.
     * @returns {RGBColor} An RGBColor object.
     */
    toRGB() {
        return this;
    }

    /**
     * Return a hexadecimal string representation of the color.
     * @returns {string} The hexadecimal string.
     */
    toHexString() {
        const hex = this._getHex();

        if (hex.length === 9 &&
            hex[1] === hex[2] &&
            hex[3] === hex[4] &&
            hex[5] === hex[6] &&
            hex[7] === hex[8]) {
            return `#${hex[1]}${hex[3]}${hex[5]}${hex[7]}`;
        }

        if (hex.length === 7 &&
            hex[1] === hex[2] &&
            hex[3] === hex[4] &&
            hex[5] === hex[6]) {
            return `#${hex[1]}${hex[3]}${hex[5]}`;
        }

        return hex;
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

        for (const name in Color.colors) {
            if (Color.colors[name] === hex) {
                return name;
            }
        }

        if (hex[1] === hex[2] &&
            hex[3] === hex[4] &&
            hex[5] === hex[6]) {
            return `#${hex[1]}${hex[3]}${hex[5]}`;
        }

        return hex;
    }

    _getHex() {
        const hex = '#' +
            (Math.round(this._r) | 1 << 8).toString(16).slice(1) +
            (Math.round(this._g) | 1 << 8).toString(16).slice(1) +
            (Math.round(this._b) | 1 << 8).toString(16).slice(1);

        if (this._a < 1) {
            return hex + (this._a * 255 | 1 << 8).toString(16).slice(1);
        }

        return hex;
    }

}
