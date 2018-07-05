class HSV extends ColorBase {
    constructor(h, s, v, a = 1) {
        super(a);

        this.h = h % 360;
        this.s = clamp(s);
        this.v = clamp(v);
    }

    getBrightness() {
        return this.v;
    }

    getHue() {
        return this.h;
    }

    getSaturation() {
        return this.s;
    }

    setAlpha(a) {
        return new HSV(this.h, this.s, this.v, a);
    }

    setBrightness(v) {
        return new HSV(this.h, this.s, v, this.a);
    }

    setHue(h) {
        return new HSV(h, this.s, this.v, this.a);
    }

    setSaturation(s) {
        return new HSV(this.h, s, this.v, this.a);
    }

    toHSV() {
        return this;
    }

    toRGB() {
        const [r, g, b] = Color.HSV2RGB(this.h, this.s, this.v);
        return new RGB(r, g, b, this.a);
    }
}