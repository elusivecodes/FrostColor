class HSL extends ColorBase
{
    constructor(h, s, l, a = 1)
    {
        super(a);

        this.h = h % 360;
        this.s = clamp(s);
        this.l = clamp(l);
    }

    /**
     * Darken
     * @param {float} amount The amount to darken the color by (between 0 and 1)
     * @returns {HSL}
     */
    darken(amount)
    {
        const l = this.l - (this.l * amount);
        return new HSL(this.h, this.s, l, this.a);
    }

    /**
     * Lighten
     * @param {float} amount The amount to lighten the color by (between 0 and 1)
     * @returns {HSL}
     */
    lighten(amount)
    {
        const l = this.l + ((100 - this.l) * amount);
        return new HSL(this.h, this.s, l, this.a);
    }

    /**
     * Set Alpha
     * @param {float} a The new alpha value (between 0 and 1)
     * @returns {HSL}
     */
    setAlpha(a)
    {
        return new HSL(this.h, this.s, this.l, a);
    }

    /**
     * To HSL
     * @returns {HSL}
     */
    toHSL()
    {
        return this;
    }

    /**
     * To RGB
     * @returns {RGB}
     */
    toRGB()
    {
        const [r, g, b] = Color.HSL2RGB(this.h, this.s, this.l);
        return new RGB(r, g, b, this.a);
    }
}