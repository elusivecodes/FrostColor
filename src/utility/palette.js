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

    mix(color, amount) {
        return new Color(this._color.mix(color._color, amount));
    },

    multiply(color) {
        return new Color(this._color.multiply(color));
    },

    palette(shades = 10, tints = 10, tones = 10) {
        return {
            shades: this.shades(shades),
            tints: this.tints(tints),
            tones: this.tones(tones)
        };
    },

    shades(shades = 10) {
        const results = [];
        for (let i = 1; i <= shades; i++) {
            results.push(this._color.shade(i / (shades + 1)));
        }
        return results;
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

    tints(tints = 10) {
        const results = [];
        for (let i = 1; i <= tints; i++) {
            results.push(this._color.tint(i / (tints + 1)));
        }
        return results;
    },

    tones(tones = 10) {
        const results = [];
        for (let i = 1; i <= tones; i++) {
            results.push(this._color.tone(i / (tones + 1)));
        }
        return results;
    },

    triadic() {
        return [
            new Color(this._color.setHue(this._color.getHue() + 120)),
            new Color(this._color.setHue(this._color.getHue() + 240))
        ];
    }

});