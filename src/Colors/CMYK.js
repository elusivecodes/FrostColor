class CMYK extends ColorBase
{
    constructor(c, m, y, k, a = 1)
    {
        super(a);

        this.c = clamp(c);
        this.m = clamp(m);
        this.y = clamp(y);
        this.k = clamp(k);
    }

    /**
     * Set Alpha
     * @param {float} a The new alpha value (between 0 and 1)
     * @returns {CMYK}
     */
    setAlpha(a)
    {
        return new CMYK(this.c, this.m, this.y, this.k, a);
    }

    /**
     * To CMY
     * @returns {CMY}
     */
    toCMY()
    {
        const [c, m, y] = Color.CMYK2CMY(this.c, this.m, this.y, this.k);
        return new CMY(c, m, y, this.a);
    }

    /**
     * To CMYK
     * @returns {CMYK}
     */
    toCMYK()
    {
        return this;
    }

    /**
     * To RGB
     * @returns {RGB}
     */
    toRGB()
    {
        return this.toCMY().toRGB();
    }
}