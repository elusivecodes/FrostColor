class ColorBase {
    constructor(a = 1) {
        this.a = clamp(a, 0, 1);
    }

    darken(amount) {
        return this.toHSL().darken(amount);
    }

    getAlpha() {
        return this.a;
    }

    getBrightness() {
        return this.toHSV().getBrightness();
    }

    getHue() {
        return this.toHSV().getHue();
    }

    getSaturation() {
        return this.toHSV().getSaturation();
    }

    lighten(amount) {
        return this.toHSL().lighten(amount);
    }

    luma() {
        return this.toRGB().luma();
    }

    setBrightness(v) {
        return this.toHSV().setBrightness(v);
    }

    setHue(h) {
        return this.toHSV().setHue(h);
    }

    setSaturation(s) {
        return this.toHSV().setSaturation(s);
    }

    shade(amount) {
        return Color.mix(this, new RGB(0, 0, 0), amount);
    }

    tint(amount) {
        return Color.mix(this, new RGB(255, 255, 255), amount);
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
        return Color.mix(this, new RGB(127, 127, 127), amount);
    }

    toString() {
        return this.toRGB().toString();
    }
}