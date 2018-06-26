class Color {
    constructor(r, g = 1, b = false, a = 1) {
        if (b) {
            this._color = new RGB(r, g, b, a);
        } else if (utility.isColorBase(r)) {
            this._color = r.toRGB();
        } else if (utility.isColor(r)) {
            this._color = r._color.toRGB();
        } else {
            this._color = new HSV(0, 0, r || 0, g).toRGB();
        }
    }

    darken(amount) {
        this._color = this._color.darken(amount);
        return this;
    }

    getAlpha() {
        return this._color.getAlpha();
    }

    getBrightness() {
        return this._color.getBrightness();
    }

    getHue() {
        return this._color.getHue();
    }

    getSaturation() {
        return this._color.getSaturation();
    }

    lighten(amount) {
        this._color = this._color.lighten(amount);
        return this;
    }

    luma() {
        return this._color.luma();
    }

    mix(color, amount = 0.5) {
        this._color = this._color.mix(color._color, amount);
        return this;
    }

    setAlpha(saturation) {
        this._color = this._color.setAlpha(saturation);
        return this;
    }

    setBrightness(brightness) {
        this._color = this._color.setBrightness(brightness);
        return this;
    }

    setHue(hue) {
        this._color = this._color.setHue(hue);
        return this;
    }

    setSaturation(saturation) {
        this._color = this._color.setSaturation(saturation);
        return this;
    }

    shade(amount) {
        this._color = this._color.shade(amount);
        return this;
    }

    tint(amount) {
        this._color = this._color.tint(amount);
        return this;
    }

    toString() {
        return this._color.toString();
    }
}