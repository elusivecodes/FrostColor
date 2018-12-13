class HSV extends ColorBase
{
    constructor(h, s, v, a = 1)
    {
        super(a);

        this.h = h % 360;
        this.s = clamp(s);
        this.v = clamp(v);
    }

    /**
     * Get Brightness
     * @returns {int} The brightness value of the color (between 0 and 100)
     */
    getBrightness()
    {
        return this.v;
    }

    /**
     * Get Hue
     * @returns {int} The hue value of the color (between 0 and 360)
     */
    getHue()
    {
        return this.h;
    }

    /**
     * Get Saturation
     * @returns {int} The saturation value of the color (between 0 and 100)
     */
    getSaturation()
    {
        return this.s;
    }

    /**
     * Set Alpha
     * @param {float} a The new alpha value (between 0 and 1)
     * @returns {HSV}
     */
    setAlpha(a)
    {
        return new HSV(this.h, this.s, this.v, a);
    }

    /**
     * Set Brightness
     * @param {int} v The new brightness value (between 0 and 100)
     * @returns {HSV}
     */
    setBrightness(v)
    {
        return new HSV(this.h, this.s, v, this.a);
    }

    /**
     * Set Hue
     * @param {int} h The new hue value (between 0 and 360)
     * @returns {HSV}
     */
    setHue(h)
    {
        return new HSV(h, this.s, this.v, this.a);
    }

    /**
     * Set Saturation
     * @param {int} s The new saturation value (between 0 and 100)
     * @returns {HSV}
     */
    setSaturation(s)
    {
        return new HSV(this.h, s, this.v, this.a);
    }

    /**
     * To HSV
     * @returns {HSV}
     */
    toHSV()
    {
        return this;
    }

    /**
     * To RGB
     * @returns {RGB}
     */
    toRGB()
    {
        const [r, g, b] = Color.HSV2RGB(this.h, this.s, this.v);
        return new RGB(r, g, b, this.a);
    }
}