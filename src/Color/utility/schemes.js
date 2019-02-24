Object.assign(Color.prototype, {

    /**
     * Returns an Array with 2 analogous Color variations
     * @returns {Color[]}
     */
    analogous() {
        return [
            new Color(
                this.color.setHue(
                    this.color.getHue() + 30
                )
            ),
            new Color(
                this.color.setHue(
                    this.color.getHue() - 30
                )
            )
        ];
    },

    /**
     * Returns a complementary Color variation
     * @returns {Color}
     */
    complementary() {
        return new Color(
            this.color.setHue(
                this.color.getHue() + 180
            )
        );
    },

    /**
     * Returns an Array with 2 split Color variations
     * @returns {Color[]}
     */
    split() {
        return [
            new Color(
                this.color.setHue(
                    this.color.getHue() + 150
                )
            ),
            new Color(
                this.color.setHue(
                    this.color.getHue() - 150
                )
            )
        ];
    },

    /**
     * Returns an Array with 3 tetradic Color variations
     * @returns {Color[]}
     */
    tetradic() {
        return [
            new Color(
                this.color.setHue(
                    this.color.getHue() + 60
                )
            ),
            new Color(
                this.color.setHue(
                    this.color.getHue() + 180
                )
            ),
            new Color(
                this.color.setHue(
                    this.color.getHue() + 240
                )
            )
        ];
    },

    /**
     * Returns an Array with 2 triadic Color variations
     * @returns {Color[]}
     */
    triadic() {
        return [
            new Color(
                this.color.setHue(
                    this.color.getHue() + 120
                )
            ),
            new Color(
                this.color.setHue(
                    this.color.getHue() + 240
                )
            )
        ];
    }

});
