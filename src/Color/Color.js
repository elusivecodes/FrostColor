class Color
{

    /**
     * New Color constructor
     * @param {int} [r]
     * @param {int} [g]
     * @param {int} [b]
     * @param {float} [a]
     * @returns {Color}
     */
    constructor(r = 0, g = 1, b = null, a = 1)
    {
        if (b !== null) {
            this.color = new RGB(r, g, b, a);
        }
        else if (r instanceof ColorBase) {
            this.color = r;
        }
        else if (r instanceof Color) {
            this.color = r.color;
        }
        else {
            this.color = new HSL(0, 0, r, g);
        }
    }

    /**
     * Set Color
     * @param {Base} color
     * @returns {Color}
     */
    setColor(color)
    {
        this.color = color;
        return this;
    }

    /**
     * To String
     * @returns {string}
     */
    toString()
    {
        return this.color.toString();
    }

    /**
     * Value Of
     * @returns {float}
     */
    valueOf()
    {
        return this.luma();
    }

    /**
     * To Primitive
     * @returns {string|float}
     */
    [Symbol.toPrimitive](hint)
    {
        return hint === 'number' ?
            this.valueOf() :
            this.toString();
    }

}