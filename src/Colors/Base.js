class ColorBase {
    constructor(a = 1) {
        this.a = a;

        return this;
    }

    get a() {
        return this._a;
    }

    set a(a) {
        this._a = frost.clamp(a);
    }

    darken(amount) {
        return this.toHSL().darken(amount);
    }

    getAlpha() {
        return this.a;
    }

    getBrightness() {
        return this.toHSV().v;
    }

    getHue() {
        return this.toHSV().h;
    }

    getSaturation() {
        return this.toHSV().s;
    }

    lighten(amount) {
        return this.toHSL().lighten(amount);
    }

    luma() {
        return this.toRGB().luma();
    }

    mix(color, amount) {
        return this.toRGB().mix(color, amount);
    }

    multiply(color) {
        return this.toRGB().multiply(color);
    }

    setBrightness(brightness) {
        return this.toHSV().setBrightness(brightness);
    }

    setHue(hue) {
        return this.toHSV().setHue(hue);
    }

    setSaturation(saturation) {
        return this.toHSV().setSaturation(saturation);
    }

    shade(amount) {
        return this.toRGB().shade(amount);
    }

    tint(amount) {
        return this.toRGB().tint(amount);
    }

    toCMY() {
        return this.toRGB().toCMY();
    }

    toCMYK() {
        return this.toCMY().toCMYK();
    }

    toHSL() {
        return this.toRGB().toHSL();
    }

    toHSV() {
        return this.toRGB().toHSV();
    }

    tone(amount) {
        return this.toRGB().tone(amount);
    }

    toString() {
        return this.toRGB().toString();
    }
}