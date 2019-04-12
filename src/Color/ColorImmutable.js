/**
 * ColorImmutable class
 * @class
 */
class ColorImmutable extends Color {

    /**
     * Create a new ColorImmutable from a BaseColor.
     * @param {BaseColor} color A new BaseColor.
     * @returns {ColorImmutable} A new ColorImmutable object.
     */
    setColor(color) {
        return new ColorImmutable(color);
    }

}
