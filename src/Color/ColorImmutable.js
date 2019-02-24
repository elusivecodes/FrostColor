/**
 * ColorImmutable class
 * @class
 */
class ColorImmutable extends Color {

    /**
     * Creates a new ColorImmutable from a BaseColor
     * @param {BaseColor} color
     * @returns {ColorImmutable}
     */
    setColor(color) {
        return new ColorImmutable(color);
    }

}
