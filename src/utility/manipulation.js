Object.assign(Color.prototype, {

    darken(amount) {
        return this.pushColor(this._color.darken(amount));
    },

    lighten(amount) {
        return this.pushColor(this._color.lighten(amount));
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