Object.assign(Color.prototype, {

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
    }

});