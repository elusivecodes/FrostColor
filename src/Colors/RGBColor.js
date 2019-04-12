/**
 * RGBColor class
 * @class
 */
class RGBColor extends BaseColor {

    /**
     * New RGBColor constructor.
     * @param {number} r The red value.
     * @param {number} g The green value.
     * @param {number} b The blue value.
     * @param {number} [a=1] The alpha value.
     * @returns {RGBColor} A new RGBColor object.
     */
    constructor(r, g, b, a = 1) {
        super(a);

        this._r = Color.clamp(r, 0, 255);
        this._g = Color.clamp(g, 0, 255);
        this._b = Color.clamp(b, 0, 255);
    }

    /**
     * Get the luminance value of the color.
     * @returns {number} The luminance value.
     */
    luma() {
        return Color.RGB2Luma(this._r, this._g, this._b);
    }

    /**
     * Mix this color with another by a specified amount.
     * @param {BaseColor} color The color to mix with.
     * @param {number} amount The amount to mix by.
     * @returns {RGBColor} A new RGBColor object.
     */
    mix(color, amount) {
        const rgb = color.toRGB();

        return new RGBColor(
            Color.lerp(this._r, rgb._r, amount),
            Color.lerp(this._g, rgb._g, amount),
            Color.lerp(this._b, rgb._b, amount),
            Color.lerp(this._a, rgb._a, amount)
        );
    }

    /**
     * Multiply this color with another by a specified amount.
     * @param {BaseColor} color The color to multiply with.
     * @param {number} amount The amount to multiply by.
     * @returns {RGBColor} A new RGBColor object.
     */
    multiply(color, amount) {
        const rgb = color.toRGB();

        return new RGBColor(
            Color.lerp(this._r, this._r * rgb._r / 255, amount),
            Color.lerp(this._g, this._g * rgb._g / 255, amount),
            Color.lerp(this._b, this._b * rgb._b / 255, amount),
            Color.lerp(this._a, this._a * rgb._a, amount)
        );
    }

    /**
     * Set the alpha value of the color.
     * @param {number} a The alpha value.
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
     * Return a HTML string representation of the color.
     * @returns {string} The HTML color string.
     */
    toString() {
        const a = Math.round(this._a * 100) / 100;

        if (a === 0) {
            return 'transparent';
        }

        const r = Math.round(this._r);
        const g = Math.round(this._g);
        const b = Math.round(this._b);

        if (a < 1) {
            return `rgba(${r}, ${g}, ${b}, ${a})`;
        }

        const hex = `#${
            (0x1000000 + (b | (g << 8) | (r << 16)))
                .toString(16)
                .slice(1)
            }`;

        const name = Object.keys(Color.colors)
            .find(name => Color.colors[name] === hex);

        if (name) {
            return name;
        }

        if (hex[1] === hex[2] &&
            hex[3] === hex[4] &&
            hex[5] === hex[6]) {
            return `#${hex[1]}${hex[3]}${hex[5]}`;
        }

        return hex;
    }

}
