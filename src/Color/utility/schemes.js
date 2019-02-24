Object.assign(Color.prototype, {

    /**
     * Returns an Array with 2 analogous Color variations
     * @returns {Color[]}
     */
    analogous() {
        const hsv = this.getColor()
            .toHSV();

        return [
            new Color(
                hsv.setHue(
                    hsv.getHue() + 30
                )
            ),
            new Color(
                hsv.setHue(
                    hsv.getHue() - 30
                )
            )
        ];
    },

    /**
     * Returns a complementary Color variation
     * @returns {Color}
     */
    complementary() {
        const hsv = this.getColor()
            .toHSV();

        return new Color(
            hsv.setHue(
                hsv.getHue() + 180
            )
        );
    },

    /**
     * Returns an Array with 2 split Color variations
     * @returns {Color[]}
     */
    split() {
        const hsv = this.getColor()
            .toHSV();

        return [
            new Color(
                hsv.setHue(
                    hsv.getHue() + 150
                )
            ),
            new Color(
                hsv.setHue(
                    hsv.getHue() - 150
                )
            )
        ];
    },

    /**
     * Returns an Array with 3 tetradic Color variations
     * @returns {Color[]}
     */
    tetradic() {
        const hsv = this.getColor()
            .toHSV();

        return [
            new Color(
                hsv.setHue(
                    hsv.getHue() + 60
                )
            ),
            new Color(
                hsv.setHue(
                    hsv.getHue() + 180
                )
            ),
            new Color(
                hsv.setHue(
                    hsv.getHue() + 240
                )
            )
        ];
    },

    /**
     * Returns an Array with 2 triadic Color variations
     * @returns {Color[]}
     */
    triadic() {
        const hsv = this.getColor()
            .toHSV();

        return [
            new Color(
                hsv.setHue(
                    hsv.getHue() + 120
                )
            ),
            new Color(
                hsv.setHue(
                    hsv.getHue() + 240
                )
            )
        ];
    }

});
