Object.assign(Color.prototype, {

    analogous() {
        return [
            new Color(this._color.setHue(this._color.getHue() + 30)),
            new Color(this._color.setHue(this._color.getHue() + 330))
        ];
    },

    complementary() {
        return new Color(this._color.setHue(this._color.getHue() + 180));
    },

    split() {
        return [
            new Color(this._color.setHue(this._color.getHue() + 150)),
            new Color(this._color.setHue(this._color.getHue() + 210))
        ];
    },

    tetradic() {
        return [
            new Color(this._color.setHue(this._color.getHue() + 60)),
            new Color(this._color.setHue(this._color.getHue() + 180)),
            new Color(this._color.setHue(this._color.getHue() + 240))
        ];
    },

    triadic() {
        return [
            new Color(this._color.setHue(this._color.getHue() + 120)),
            new Color(this._color.setHue(this._color.getHue() + 240))
        ];
    }

});