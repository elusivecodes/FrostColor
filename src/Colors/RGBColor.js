/**
 * RGBColor class
 * @class
 */
class RGBColor extends BaseColor {

    /**
     * New RGBColor constructor
     * @param {number} red
     * @param {number} green
     * @param {number} blue
     * @param {number} [alpha=1]
     * @returns {RGBColor}
     */
    constructor(red, green, blue, alpha = 1) {
        super(alpha);

        this._r = Color.clamp(red, 0, 255);
        this._g = Color.clamp(green, 0, 255);
        this._b = Color.clamp(blue, 0, 255);
    }

    /**
     * Gets the luminance value of the color 
     * @returns {number}
     */
    luma() {
        return Color.RGB2Luma(this._r, this._g, this._b);
    }

    /**
     * Mixes this color with another by a specified amount (between 0 and 1)
     * @param {BaseColor} color
     * @param {number} amount
     * @returns {RGBColor}
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
     * Multiplies this color with another by a specified amount (between 0 and 1)
     * @param {BaseColor} color
     * @param {number} amount
     * @returns {RGBColor}
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
     * Sets the alpha value of the color (between 0 and 1)
     * @param {number} alpha
     * @returns {RGBColor}
     */
    setAlpha(alpha) {
        return new RGBColor(this._r, this._g, this._b, alpha);
    }

    /**
     * Creates a CMY representation of the color
     * @returns {CMYColor}
     */
    toCMY() {
        return new CMYColor(...Color.RGB2CMY(this._r, this._g, this._b).concat([this._a]));
    }

    /**
     * Creates a HSL representation of the color
     * @returns {HSLColor}
     */
    toHSL() {
        return new HSLColor(...Color.RGB2HSL(this._r, this._g, this._b).concat([this._a]));
    }

    /**
     * Creates a HSLV representation of the color
     * @returns {HSVColor}
     */
    toHSV() {
        return new HSVColor(...Color.RGB2HSV(this._r, this._g, this._b).concat([this._a]));
    }

    /**
     * Creates a RGB representation of the color
     * @returns {RGBColor}
     */
    toRGB() {
        return this;
    }

    /**
     * Returns a string representation of the color
     * @returns {string}
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
