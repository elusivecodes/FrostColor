class ColorBase {
    constructor(a = 1) {
        this.a = a;

        return this;
    }

    get a() {
        return this._a;
    }

    set a(a) {
        this._a = clamp(a);
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

    setBrightness(brightness) {
        const hsv = this.toHSV();
        hsv.v = brightness;
        return hsv;
    }

    setHue(hue) {
        const hsl = this.toHSV();
        hsl.h = hue;
        return hsl;
    }

    setSaturation(saturation) {
        const hsl = this.toHSV();
        hsl.s = saturation;
        return hsl;
    }

    shade(amount) {
        return this.toHSV().shade(amount);
    }

    tint(amount) {
        return this.toHSV().tint(amount);
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

    toString() {
        return this.toRGB().toString();
    }
}