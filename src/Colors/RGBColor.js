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

        this.r = Color.clamp(red, 0, 255);
        this.g = Color.clamp(green, 0, 255);
        this.b = Color.clamp(blue, 0, 255);
    }

    /**
     * Gets the luminance value of the color 
     * @returns {number}
     */
    luma() {
        return Color.RGB2Luma(this.r, this.g, this.b);
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
            Color.lerp(this.r, rgb.r, amount),
            Color.lerp(this.g, rgb.g, amount),
            Color.lerp(this.b, rgb.b, amount),
            Color.lerp(this.a, rgb.a, amount)
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
            Color.lerp(this.r, this.r * rgb.r / 255, amount),
            Color.lerp(this.g, this.g * rgb.g / 255, amount),
            Color.lerp(this.b, this.b * rgb.b / 255, amount),
            Color.lerp(this.a, this.a * rgb.a, amount)
        );
    }

    /**
     * Sets the alpha value of the color (between 0 and 1)
     * @param {number} alpha
     * @returns {RGBColor}
     */
    setAlpha(alpha) {
        return new RGBColor(this.r, this.g, this.b, alpha);
    }

    /**
     * Creates a CMY representation of the color
     * @returns {CMYColor}
     */
    toCMY() {
        const [c, m, y] = Color.RGB2CMY(this.r, this.g, this.b);
        return new CMYColor(c, m, y, this.a);
    }

    /**
     * Creates a HSL representation of the color
     * @returns {HSLColor}
     */
    toHSL() {
        const [h, s, l] = Color.RGB2HSL(this.r, this.g, this.b);
        return new HSLColor(h, s, l, this.a);
    }

    /**
     * Creates a HSLV representation of the color
     * @returns {HSVColor}
     */
    toHSV() {
        const [h, s, v] = Color.RGB2HSV(this.r, this.g, this.b);
        return new HSVColor(h, s, v, this.a);
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
        const a = Math.round(this.a * 100) / 100;

        if (a === 0) {
            return 'transparent';
        }

        const r = Math.round(this.r);
        const g = Math.round(this.g);
        const b = Math.round(this.b);

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
