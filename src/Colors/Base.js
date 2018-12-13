class ColorBase
{
    constructor(a = 1)
    {
        this.a = clamp(a, 0, 1);
    }

    /**
     * Darken
     * @param {float} amount The amount to darken the color by (between 0 and 1)
     * @returns {HSL}
     */
    darken(amount)
    {
        return this.toHSL().darken(amount);
    }

    /**
     * Get Alpha
     * @returns {float} The alpha value of the color (between 0 and 1)
     */
    getAlpha()
    {
        return this.a;
    }

    /**
     * Get Brightness
     * @returns {int} The brightness value of the color (between 0 and 100)
     */
    getBrightness()
    {
        return this.toHSV().getBrightness();
    }

    /**
     * Get Hue
     * @returns {int} The hue value of the color (between 0 and 360)
     */
    getHue()
    {
        return this.toHSV().getHue();
    }

    /**
     * Get Saturation
     * @returns {int} The saturation value of the color (between 0 and 100)
     */
    getSaturation()
    {
        return this.toHSV().getSaturation();
    }

    /**
     * Lighten
     * @param {float} amount The amount to lighten the color by (between 0 and 1)
     * @returns {HSL}
     */
    lighten(amount)
    {
        return this.toHSL().lighten(amount);
    }

    /**
     * Luma
     * @returns {int} The luma value of the color
     */
    luma()
    {
        return this.toRGB().luma();
    }

    /**
     * Mix
     * @param {Base} color
     * @param {float} amount
     * @returns {RGB}
     */
    mix(color, amount)
    {
        return this.toRGB().mix(color, amount);
    }

    /**
     * Multiply
     * @param {Base} color
     * @param {float} amount
     * @returns {RGB}
     */
    multiply(color, amount)
    {
        return this.toRGB().multiply(color, amount);
    }

    /**
     * Set Brightness
     * @param {int} v The new brightness value (between 0 and 100)
     * @returns {HSV}
     */
    setBrightness(v)
    {
        return this.toHSV().setBrightness(v);
    }

    /**
     * Set Hue
     * @param {int} h The new hue value (between 0 and 360)
     * @returns {HSV}
     */
    setHue(h)
    {
        return this.toHSV().setHue(h);
    }

    /**
     * Set Saturation
     * @param {int} s The new saturation value (between 0 and 100)
     * @returns {HSV}
     */
    setSaturation(s)
    {
        return this.toHSV().setSaturation(s);
    }

    /**
     * Shade
     * @param {float} amount The amount to shade the color by (between 0 and 1)
     * @returns {RGB}
     */
    shade(amount)
    {
        return Color.mix(this, new RGB(0, 0, 0), amount);
    }

    /**
     * Tint
     * @param {float} amount The amount to tint the color by (between 0 and 1)
     * @returns {RGB}
     */
    tint(amount)
    {
        return Color.mix(this, new RGB(255, 255, 255), amount);
    }

    /**
     * To CMY
     * @returns {CMY}
     */
    toCMY()
    {
        return this.toRGB().toCMY();
    }

    /**
     * To CMYK
     * @returns {CMYK}
     */
    toCMYK()
    {
        return this.toCMY().toCMYK();
    }

    /**
     * To HSL
     * @returns {HSL}
     */
    toHSL()
    {
        return this.toRGB().toHSL();
    }

    /**
     * To HSV
     * @returns {HSV}
     */
    toHSV()
    {
        return this.toRGB().toHSV();
    }

    /**
     * Tone
     * @param {float} amount The amount to tone the color by (between 0 and 1)
     * @returns {RGB}
     */
    tone(amount)
    {
        return Color.mix(this, new RGB(127, 127, 127), amount);
    }

    /**
     * To String
     * @returns {string}
     */
    toString()
    {
        return this.toRGB().toString();
    }
}