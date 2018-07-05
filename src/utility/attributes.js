Object.assign(Color.prototype, {

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

});