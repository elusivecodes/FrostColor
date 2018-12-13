class CMY extends ColorBase
{
    constructor(c, m, y, a = 1)
    {
        super(a);

        this.c = clamp(c);
        this.m = clamp(m);
        this.y = clamp(y);
    }

    /**
     * Set Alpha
     * @param {float} a The new alpha value (between 0 and 1)
     * @returns {CMY}
     */
    setAlpha(a)
    {
        return new CMY(this.c, this.m, this.y, a);
    }

    /**
     * To CMY
     * @returns {CMY}
     */
    toCMY()
    {
        return this;
    }

    /**
     * To CMYK
     * @returns {CMYK}
     */
    toCMYK()
    {
        const [c, m, y, k] = Color.CMY2CMYK(this.c, this.m, this.y);
        return new CMYK(c, m, y, k, this.a);
    }

    /**
     * To RGB
     * @returns {RGB}
     */
    toRGB()
    {
        const [r, g, b] = Color.CMY2RGB(this.c, this.m, this.y);
        return new RGB(r, g, b, this.a);
    }
}