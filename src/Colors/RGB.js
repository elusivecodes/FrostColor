class RGB extends ColorBase
{
    constructor(r, g, b, a = 1)
    {
        super(a);

        this.r = clamp(r, 0, 255);
        this.g = clamp(g, 0, 255);
        this.b = clamp(b, 0, 255);
    }

    /**
     * Luma
     * @returns {int} The luma value of the color
     */
    luma()
    {
        return Color.RGB2Luma(this.r, this.g, this.b);
    }

    /**
     * Mix
     * @param {Base} color
     * @param {float} amount
     * @returns {RGB}
     */
    mix(color, amount)
    {
        const rgb = color.toRGB();

        return new RGB(
            lerp(this.r, rgb.r, amount),
            lerp(this.g, rgb.g, amount),
            lerp(this.b, rgb.b, amount),
            lerp(this.a, rgb.a, amount)
        );
    }

    /**
     * Multiply
     * @param {Base} color
     * @param {float} amount
     * @returns {RGB}
     */
    multiply(color, amount)
    {
        const rgb = color.toRGB();

        return new RGB(
            lerp(this.r, this.r * rgb.r / 255, amount),
            lerp(this.g, this.g * rgb.g / 255, amount),
            lerp(this.b, this.b * rgb.b / 255, amount),
            lerp(this.a, this.a * rgb.a, amount)
        );
    }

    /**
     * Set Alpha
     * @param {float} a The new alpha value (between 0 and 1)
     * @returns {RGB}
     */
    setAlpha(a)
    {
        return new RGB(this.r, this.g, this.b, a);
    }

    /**
     * To CMY
     * @returns {CMY}
     */
    toCMY()
    {
        const [c, m, y] = Color.RGB2CMY(this.r, this.g, this.b);
        return new CMY(c, m, y, this.a);
    }

    /**
     * To HSL
     * @returns {HSL}
     */
    toHSL()
    {
        const [h, s, l] = Color.RGB2HSL(this.r, this.g, this.b);
        return new HSL(h, s, l, this.a);
    }

    /**
     * To HSV
     * @returns {HSV}
     */
    toHSV()
    {
        const [h, s, v] = Color.RGB2HSV(this.r, this.g, this.b);
        return new HSV(h, s, v, this.a);
    }

    /**
     * To RGB
     * @returns {RGB}
     */
    toRGB()
    {
        return this;
    }

    /**
     * To String
     * @returns {string}
     */
    toString()
    {
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

        const rgb = b | (g << 8) | (r << 16);
        const hex = '#' + (0x1000000 + rgb).toString(16).slice(1);

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