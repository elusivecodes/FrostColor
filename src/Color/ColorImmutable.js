/**
 * ColorImmutable class
 * @class
 */
class ColorImmutable extends Color {

    /**
     * Create a new ColorImmutable from RGBA values.
     * @param {number} r The red value.
     * @param {number} g The green value.
     * @param {number} b The blue value.
     * @param {number} a The alpha value.
     * @returns {ColorImmutable} A new ColorImmutable object.
     */
    setColor(r, g, b, a) {
        return new this.constructor(r, g, b, a);
    }

}
