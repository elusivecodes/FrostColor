class ColorImmutable extends Color
{

    /**
     * Set Color
     * @param {Base} color
     * @returns {ColorImmutable}
     */
    setColor(color)
    {
        return new ColorImmutable(color);
    }

}