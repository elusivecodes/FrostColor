(function(frost) {

class Color {
    constructor(r, g = 1, b = false, a = 1) {
        if (b !== false) {
            this._color = new RGB(r, g, b, a);
        } else if (r instanceof ColorBase) {
            this._color = r.toRGB();
        } else if (r instanceof Color) {
            this._color = r._color.toRGB();
        } else {
            r = r || 0;
            this._color = new HSL(0, 0, r, g);
        }
    }

    pushColor(color) {
        this._color = color;
        return this;
    }

    toString() {
        return this._color.toRGB().toString();
    }

    valueOf() {
        return this.toString();
    }

    [Symbol.toPrimitive]() {
        return this.toString();
    }
}

frost.Color = Color;
class ColorImmutable extends Color {
    constructor() {
        super(...arguments);
    }

    pushColor(color) {
        return new ColorImmutable(color);
    }
}

frost.ColorImmutable = ColorImmutable;
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
class CMY extends ColorBase {
    constructor(c, m, y, a = 1) {
        super(a);

        this.c = c;
        this.m = m;
        this.y = y;

        return this;
    }

    get c() {
        return this._c;
    }

    get m() {
        return this._m;
    }

    get y() {
        return this._y;
    }

    set c(c) {
        this._c = frost.clampPercent(c);
    }

    set m(m) {
        this._m = frost.clampPercent(m);
    }

    set y(y) {
        this._y = frost.clampPercent(y);
    }

    setAlpha(a) {
        return new CMY(this.c, this.m, this.y, a);
    }

    toCMY() {
        return new CMY(this.c, this.m, this,y, this.a);
    }

    toCMYK() {
        const k = Math.min(this.c, this.m, this.y) / 100;

        if (k == 1) {
            return new CMYK(0, 0, 0, k, this.a);
        }

        const c = ((this.c / 100) - k) / (1 - k);
        const m = ((this.m / 100) - k) / (1 - k);
        const y = ((this.y / 100) - k) / (1 - k);

        return new CMYK(c * 100, m * 100, y * 100, k * 100, this.a);
    }

    toRGB() {
        const r = (1 - (this.c / 100));
        const g = (1 - (this.m / 100));
        const b = (1 - (this.y / 100));

        return new RGB(r * 255, g * 255, b * 255, this.a);
    }
}
class CMYK extends ColorBase {
    constructor(c, m, y, k, a = 1) {
        super(a);

        this.c = c;
        this.m = m;
        this.y = y;
        this.k = k;

        return this;
    }

    get c() {
        return this._c;
    }

    get m() {
        return this._m;
    }

    get y() {
        return this._y;
    }

    get k() {
        return this._k;
    }

    set c(c) {
        this._c = frost.clampPercent(c);
    }

    set m(m) {
        this._m = frost.clampPercent(m);
    }

    set y(y) {
        this._y = frost.clampPercent(y);
    }

    set k(k) {
        this._k = frost.clampPercent(k);
    }

    setAlpha(a) {
        return new CMYK(this.c, this.m, this.y, this.k, a);
    }

    toCMY() {
        const k = this.k / 100;
        const c = (this.c / 100) * (1 - k) + k;
        const m = (this.m / 100) * (1 - k) + k;
        const y = (this.y / 100) * (1 - k) + k;

        return new CMY(c * 100, m * 100, y * 100, this.a);
    }

    toCMYK() {
        return new CMYK(this.c, this.m, this.y, this.k, this.a);
    }

    toRGB() {
        return this.toCMY().toRGB();
    }
}
class HSL extends ColorBase {
    constructor(h, s, l, a = 1) {
        super(a);

        this.h = h;
        this.s = s;
        this.l = l;

        return this;
    }

    get h() {
        return this._h;
    }

    get s() {
        return this._s;
    }

    get l() {
        return this._l;
    }

    set h(h) {
        this._h = h % 360;
    }

    set s(s) {
        this._s = frost.clampPercent(s);
    }

    set l(l) {
        this._l = frost.clampPercent(l);
    }

    darken(amount) {
        return new HSL(this.h, this.s, this.l - (amount * 50), this.a);
    }

    lighten(amount) {
        return new HSL(this.h, this.s, this.l + (amount * 50), this.a);
    }

    setAlpha(a) {
        return new HSL(this.h, this.s, this.l, a);
    }

    toHSL() {
        return new HSL(this.h, this.s, this.l, this.a);
    }

    toRGB() {
        if (this.l == 0) {
            return new RGB(0, 0, 0, this.a);
        }

        const h = this.h / 360;
        const s = this.s / 100;
        const l = this.l / 100;

        let v2;
        if (l < 0.5) {
            v2 = l * (1 + s);
        } else {
            v2 = (l + s) - (s * l);
        }

        const v1 = 2 * l - v2;

        const r = HSL.RGBHue(v1, v2, h + (1 / 3));
        const g = HSL.RGBHue(v1, v2, h);
        const b = HSL.RGBHue(v1, v2, h - (1 / 3));

        return new RGB(r * 255, g * 255, b * 255, this.a);
    }

    toString() {
		const h = Math.round(this.h);
		const s = Math.round(this.s) + '%';
		const l = Math.round(this.l) + '%';

		if (this.a == 1) {
			return 'hsl(' + h + ', ' + s + ', ' + l + ')';
		}

		const a = Math.round(this.a * 100) / 100;
		return 'hsla(' + h + ', ' + s + ', ' + l + ', ' + a + ')';
    }

    static RGBHue(v1, v2, vH) {
        if (vH < 0) {
            vH += 1;
        } else if (vH > 1) {
            vH -= 1;
        }

        if (6 * vH < 1) {
            return v1 + (v2 - v1) * 6 * vH;
        }

        if (2 * vH < 1) {
            return v2;
        }

        if (3 * vH < 2) {
            return v1 + (v2 - v1) * ((2 / 3) - vH) * 6;
        }

        return v1;
    }
}
class HSV extends ColorBase {
    constructor(h, s, v, a = 1) {
        super(a);

        this.h = h;
        this.s = s;
        this.v = v;

        return this;
    }

    get h() {
        return this._h;
    }

    get s() {
        return this._s;
    }

    get v() {
        return this._v;
    }

    set h(h) {
        this._h = h % 360;
    }

    set s(s) {
        this._s = frost.clampPercent(s);
    }

    set v(v) {
        this._v = frost.clampPercent(v);
    }

    setAlpha(a) {
        return new HSV(this.h, this.s, this.v, a);
    }

    setBrightness(brightness) {
        return new HSV(this.h, this.s, brightness, this.a);
    }

    setHue(hue) {
        return new HSV(hue, this.s, this.v, this.a);
    }

    setSaturation(saturation) {
        return new HSV(this.h, saturation, this.v, this.a);
    }

    toHSV() {
        return new HSV(this.h, this.s, this.v, this.a);
    }

    toRGB() {
        const s = this.s / 100;
        const v = this.v / 100;
        if (s == 0) {
            return new RGB(v * 255, v * 255, v * 255, this.a);
        }

        let h = this.h / 60;
        if (h == 6) {
            h = 0;
        }

        const vi = Math.floor(h);
        const v1 = v * (1 - s);
        const v2 = v * (1 - s * (h - vi));
        const v3 = v * (1 - s * (1 - (h - vi)));

        let r;
        let g;
        let b;
        if (vi == 0) {
            r = v;
            g = v3;
            b = v1;
        } else if (vi == 1) {
            r = v2;
            g = v;
            b = v1;
        } else if (vi == 2) {
            r = v1;
            g = v;
            b = v3;
        } else if (vi == 3) {
            r = v1;
            g = v2;
            b = v;
        } else if (vi == 4) {
            r = v3;
            g = v1;
            b = v;
        } else {
            r = v;
            g = v1;
            b = v2;
        }

        return new RGB(r * 255, g * 255, b * 255, this.a);
    }
}
class RGB extends ColorBase {
    constructor(r, g, b, a = 1) {
        super(a);

        this.r = r;
        this.g = g;
        this.b = b;

        return this;
    }

    get r() {
        return this._r;
    }

    get g() {
        return this._g;
    }

    get b() {
        return this._b;
    }

    set r(r) {
        this._r = frost.clamp(r, 0, 255);
    }

    set g(g) {
        this._g = frost.clamp(g, 0, 255);
    }

    set b(b) {
        this._b = frost.clamp(b, 0, 255);
    }

    luma() {
		const v1 = 0.2126 * this.r;
		const v2 = 0.7152 * this.g;
        const v3 = 0.0722 * this.b;

		return (v1 + v2 + v3) / 255;
    }

    mix(color, amount) {
        color = color.toRGB();
        const r = frost.lerp(this.r, color.r, amount);
        const g = frost.lerp(this.g, color.g, amount);
        const b = frost.lerp(this.b, color.b, amount);
        const a = frost.lerp(this.a, color.a, amount);
        return new RGB(r, g, b, a);
    }

    multiply(color) {
        color = color.toRGB();
        const r = (this.r / 255) * (color.r / 255) * 255;
        const g = (this.g / 255) * (color.g / 255) * 255;
        const b = (this.b / 255) * (color.b / 255) * 255;
        const a = (this.a / 255) * (color.a / 255) * 255;
        return new RGB(r, g, b, a);
    }

    setAlpha(a) {
        return new RGB(this.r, this.g, this.b, a);
    }

    shade(amount) {
        return this.mix(new RGB(0, 0, 0), amount);
    }

    tint(amount) {
        return this.mix(new RGB(255, 255, 255), amount);
    }

    toCMY() {
        const c = 1 - (this.r / 255);
        const m = 1 - (this.g / 255);
        const y = 1 - (this.b / 255);

        return new CMY(c * 100, m * 100, y * 100, this.a);
    }

    toHSL() {
        const r = this.r / 255;
        const g = this.g / 255;
        const b = this.b / 255;

        const min = Math.min(r, g, b);
        const max = Math.max(r, g, b);
        const diff = max - min;

        const l = (max + min) / 2;

        if (diff == 0) {
            return new HSL(0, 0, l * 100, this.a);
        }

        let h = 0;
        let s;
        if (l < 0.5) {
            s = diff / (max + min);
        } else {
            s = diff / (2 - max - min);
        }

        const deltaR = (((max - r) / 6) + (diff / 2)) / diff;
        const deltaG = (((max - g) / 6) + (diff / 2)) / diff;
        const deltaB = (((max - b) / 6) + (diff / 2)) / diff;

        if (r == max) {
            h = deltaB - deltaG;
        } else if (g == max) {
            h = (1 / 2) + deltaR - deltaB;
        } else if (b == max) {
            h = (2 / 3) + deltaG - deltaR;
        }

        if (h > 1) {
            h--;
        } else if (h < 0) {
            h++;
        }

        return new HSL(h * 360, s * 100, l * 100, this.a);
    }

    toHSV() {
        const r = this.r / 255;
        const g = this.g / 255;
        const b = this.b / 255;

        const min = Math.min(r, g, b);
        const max = Math.max(r, g, b);
        const diff = max - min;

        const v = max;

        if (diff == 0) {
            return new HSV(0, 0, v * 100, this.a);
        }

        let h = 0;
        const s = diff / max;

        const deltaR = (((max - r) / 6) + (diff / 2)) / diff;
        const deltaG = (((max - g) / 6) + (diff / 2)) / diff;
        const deltaB = (((max - b) / 6) + (diff / 2)) / diff;

        if (r == max) {
            h = deltaB - deltaG;
        } else if (g == max) {
            h = (1 / 2) + deltaR - deltaB;
        } else if (b == max) {
            h = (2 / 3) + deltaG - deltaR;
        }

        if (h > 1) {
            h--;
        } else if (h < 0) {
            h++;
        }

        return new HSV(h * 360, s * 100, v * 100, this.a);
    }

    tone(amount) {
        return this.mix(new RGB(128, 128, 128), amount);
    }

    toRGB() {
        return new RGB(this.r, this.g, this.b, this.a);
    }

    toString() {
        if (this.a === 0) {
            return 'transparent';
        }

        const r = Math.round(this.r);
        const g = Math.round(this.g);
        const b = Math.round(this.b);

        if (this.a === 1) {
            const rgb = b | (g << 8) | (r << 16);
            const hex = '#' + (0x1000000 + rgb).toString(16).slice(1);
            return Object.keys(Color.colors).find(name => Color.colors[name] === hex) || hex;
        }

		const a = Math.round(this.a * 100) / 100;
		return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
    }
}
Object.assign(Color, {

	fromCMY(c, m, y, a = 1) {
		const cmy = new CMY(c, m, y, a);
		return new this(cmy);
	},

	fromCMYK(c, m, y, k, a = 1) {
		const cmyk = new CMYK(c, m, y, k, a);
		return new this(cmyk);
	},

	fromHSL(h, s, l, a = 1) {
		const hsl = new HSL(h, s, l, a);
		return new this(hsl);
	},

	fromHSV(h, s, v, a = 1) {
		const hsv = new HSV(h, s, v, a);
		return new this(hsv);
	},

	fromRGB(r, g, b, a = 1) {
		const rgb = new RGB(r, g, b, a);
		return new this(rgb);
	},

    fromString(string) {
		string = string.toLowerCase();

		if (string === 'transparent') {
			return this.fromRGB(0, 0, 0, 0);
		}

		if (this.colors[string]) {
			string = this.colors[string];
		}

		const hexMatch = string.match(this.hexRegEx);
		if (hexMatch) {
			const rgb = hexMatch.slice(1, 4).map(value => parseInt(value, 16));
			return this.fromRGB(rgb[0], rgb[1], rgb[2]);
		}

		const hexMatchShort = string.match(this.hexRegExShort);
		if (hexMatchShort) {
			const rgb = hexMatchShort.slice(1, 4).map(value => 0x11 * parseInt(value, 16));
			return this.fromRGB(rgb[0], rgb[1], rgb[2]);
		}

		const RGBAMatch = string.match(this.RGBARegEx);
		if (RGBAMatch) {
			return this.fromRGB(RGBAMatch[1], RGBAMatch[2], RGBAMatch[3], RGBAMatch[4]);
		}

		const RGBMatch = string.match(this.RGBRegEx);
		if (RGBMatch) {
			return this.fromRGB(RGBMatch[1], RGBMatch[2], RGBMatch[3]);
		}

		return this.fromRGB(0, 0, 0);
    }

});
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
Color.colors = {
    aliceblue: '#f0f8ff',
    antiquewhite: '#faebd7',
    aqua: '#00ffff',
    aquamarine: '#7fffd4',
    azure: '#f0ffff',
    beige: '#f5f5dc',
    bisque: '#ffe4c4',
    black: '#000000',
    blanchedalmond: '#ffebcd',
    blue: '#0000ff',
    blueviolet: '#8a2be2',
    brown: '#a52a2a',
    burlywood: '#deb887',
    cadetblue: '#5f9ea0',
    chartreuse: '#7fff00',
    chocolate: '#d2691e',
    coral: '#ff7f50',
    cornflowerblue: '#6495ed',
    cornsilk: '#fff8dc',
    crimson: '#dc143c',
    cyan: '#00ffff',
    darkblue: '#00008b',
    darkcyan: '#008b8b',
    darkgoldenrod: '#b8860b',
    darkgray: '#a9a9a9',
    darkgrey: '#a9a9a9',
    darkgreen: '#006400',
    darkkhaki: '#bdb76b',
    darkmagenta: '#8b008b',
    darkolivegreen: '#556b2f',
    darkorange: '#ff8c00',
    darkorchid: '#9932cc',
    darkred: '#8b0000',
    darksalmon: '#e9967a',
    darkseagreen: '#8fbc8f',
    darkslateblue: '#483d8b',
    darkslategray: '#2f4f4f',
    darkslategrey: '#2f4f4f',
    darkturquoise: '#00ced1',
    darkviolet: '#9400d3',
    deeppink: '#ff1493',
    deepskyblue: '#00bfff',
    dimgray: '#696969',
    dimgrey: '#696969',
    dodgerblue: '#1e90ff',
    firebrick: '#b22222',
    floralwhite: '#fffaf0',
    forestgreen: '#228b22',
    fuchsia: '#ff00ff',
    gainsboro: '#dcdcdc',
    ghostwhite: '#f8f8ff',
    gold: '#ffd700',
    goldenrod: '#daa520',
    gray: '#808080',
    grey: '#808080',
    green: '#008000',
    greenyellow: '#adff2f',
    honeydew: '#f0fff0',
    hotpink: '#ff69b4',
    indianred: '#cd5c5c',
    indigo: '#4b0082',
    ivory: '#fffff0',
    khaki: '#f0e68c',
    lavender: '#e6e6fa',
    lavenderblush: '#fff0f5',
    lawngreen: '#7cfc00',
    lemonchiffon: '#fffacd',
    lightblue: '#add8e6',
    lightcoral: '#f08080',
    lightcyan: '#e0ffff',
    lightgoldenrodyellow: '#fafad2',
    lightgray: '#d3d3d3',
    lightgrey: '#d3d3d3',
    lightgreen: '#90ee90',
    lightpink: '#ffb6c1',
    lightsalmon: '#ffa07a',
    lightseagreen: '#20b2aa',
    lightskyblue: '#87cefa',
    lightslategray: '#778899',
    lightslategrey: '#778899',
    lightsteelblue: '#b0c4de',
    lightyellow: '#ffffe0',
    lime: '#00ff00',
    limegreen: '#32cd32',
    linen: '#faf0e6',
    magenta: '#ff00ff',
    maroon: '#800000',
    mediumaquamarine: '#66cdaa',
    mediumblue: '#0000cd',
    mediumorchid: '#ba55d3',
    mediumpurple: '#9370db',
    mediumseagreen: '#3cb371',
    mediumslateblue: '#7b68ee',
    mediumspringgreen: '#00fa9a',
    mediumturquoise: '#48d1cc',
    mediumvioletred: '#c71585',
    midnightblue: '#191970',
    mintcream: '#f5fffa',
    mistyrose: '#ffe4e1',
    moccasin: '#ffe4b5',
    navajowhite: '#ffdead',
    navy: '#000080',
    oldlace: '#fdf5e6',
    olive: '#808000',
    olivedrab: '#6b8e23',
    orange: '#ffa500',
    orangered: '#ff4500',
    orchid: '#da70d6',
    palegoldenrod: '#eee8aa',
    palegreen: '#98fb98',
    paleturquoise: '#afeeee',
    palevioletred: '#db7093',
    papayawhip: '#ffefd5',
    peachpuff: '#ffdab9',
    peru: '#cd853f',
    pink: '#ffc0cb',
    plum: '#dda0dd',
    powderblue: '#b0e0e6',
    purple: '#800080',
    rebeccapurple: '#663399',
    red: '#ff0000',
    rosybrown: '#bc8f8f',
    royalblue: '#4169e1',
    saddlebrown: '#8b4513',
    salmon: '#fa8072',
    sandybrown: '#f4a460',
    seagreen: '#2e8b57',
    seashell: '#fff5ee',
    sienna: '#a0522d',
    silver: '#c0c0c0',
    skyblue: '#87ceeb',
    slateblue: '#6a5acd',
    slategray: '#708090',
    slategrey: '#708090',
    snow: '#fffafa',
    springgreen: '#00ff7f',
    steelblue: '#4682b4',
    tan: '#d2b48c',
    teal: '#008080',
    thistle: '#d8bfd8',
    tomato: '#ff6347',
    turquoise: '#40e0d0',
    violet: '#ee82ee',
    wheat: '#f5deb3',
    white: '#ffffff',
    whitesmoke: '#f5f5f5',
    yellow: '#ffff00',
    yellowgreen: '#9acd32'
};

Color.hexRegEx = /^#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/i;
Color.hexRegExShort = /^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])$/i;

Color.RGBARegEx = /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0?\.\d+)\)$/i;
Color.RGBRegEx = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/i;

})(frost);