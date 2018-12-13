Object.assign(Color.prototype, {

    /**
     * Analogous
     * @returns {Array}
     */
    analogous()
    {
        return [
            new Color(
                this.color.setHue(
                    this.color.getHue() + 30
                )
            ),
            new Color(
                this.color.setHue(
                    this.color.getHue() + 330
                )
            )
        ];
    },

    /**
     * Complementary
     * @returns {Color}
     */
    complementary()
    {
        return new Color(
            this.color.setHue(
                this.color.getHue() + 180
            )
        );
    },

    /**
     * Split
     * @returns {Array}
     */
    split()
    {
        return [
            new Color(
                this.color.setHue(
                    this.color.getHue() + 150
                )
            ),
            new Color(
                this.color.setHue(
                    this.color.getHue() + 210
                )
            )
        ];
    },

    /**
     * Tetradic
     * @returns {Array}
     */
    tetradic()
    {
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
     * Triadic
     * @returns {Array}
     */
    triadic()
    {
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