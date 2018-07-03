Object.assign(Color.prototype, {

    darken(amount) {
        return this.pushColor(this._color.darken(amount));
    },

    getAlpha() {
        return this._color.getAlpha();
    },

    getBrightness() {
        return this._color.getBrightness();
    },

    getHue() {
        return this._color.getHue();
    },

    getSaturation() {
        return this._color.getSaturation();
    },

    lighten(amount) {
        return this.pushColor(this._color.lighten(amount));
    },

    luma() {
        return this._color.luma();
    },

    setAlpha(alpha) {
        return this.pushColor(this._color.setAlpha(alpha));
    },

    setBrightness(brightness) {
        return this.pushColor(this._color.setBrightness(brightness));
    },

    setHue(hue) {
        return this.pushColor(this._color.setHue(hue));
    },

    setSaturation(saturation) {
        return this.pushColor(this._color.setSaturation(saturation));
    },

    shade(amount) {
        return this.pushColor(this._color.shade(amount));
    },

    tint(amount) {
        return this.pushColor(this._color.tint(amount));
    },

    tone(amount) {
        return this.pushColor(this._color.tone(amount));
    }

});