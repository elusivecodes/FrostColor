(function(window) {

class Color {
    constructor(r, g = 1, b = false, a = 1) {
        if (b) {
            this._color = new RGB(r, g, b, a);
        } else if (utility.isColorBase(r)) {
            this._color = r.toRGB();
        } else if (utility.isColor(r)) {
            this._color = r._color.toRGB();
        } else {
            this._color = new HSV(0, 0, r || 0, g).toRGB();
        }
    }

    darken(amount) {
        this._color = this._color.darken(amount);
        return this;
    }

    getAlpha() {
        return this._color.getAlpha();
    }

    getBrightness() {
        return this._color.getBrightness();
    }

    getHue() {
        return this._color.getHue();
    }

    getSaturation() {
        return this._color.getSaturation();
    }

    lighten(amount) {
        this._color = this._color.lighten(amount);
        return this;
    }

    luma() {
        return this._color.luma();
    }

    mix(color, amount = 0.5) {
        this._color = this._color.mix(color._color, amount);
        return this;
    }

    setAlpha(saturation) {
        this._color = this._color.setAlpha(saturation);
        return this;
    }

    setBrightness(brightness) {
        this._color = this._color.setBrightness(brightness);
        return this;
    }

    setHue(hue) {
        this._color = this._color.setHue(hue);
        return this;
    }

    setSaturation(saturation) {
        this._color = this._color.setSaturation(saturation);
        return this;
    }

    shade(amount) {
        this._color = this._color.shade(amount);
        return this;
    }

    tint(amount) {
        this._color = this._color.tint(amount);
        return this;
    }

    toString() {
        return this._color.toString();
    }
}
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
class CMY extends ColorBase {
    constructor(c, m, y, a = 1) {
        super(a);

        this.c = c;
        this.m = m;
        this.y = y;

        return this;
    }

    set c(c) {
        this.c = clamp(c);
    }

    set m(m) {
        this.m = clamp(m);
    }

    set y(y) {
        this.y = clamp(y);
    }

    setAlpha(a) {
        return new CMY(this.c, this.m, this.y, a);
    }

    toCMY() {
        return new CMY(this.c, this.m, this,y, this.a);
    }

    toCMYK() {
        const k = Math.min(this.c, this.m, this.y);

        let c, m, y;
        if (k == 1) {
            c = 0;
            m = 0;
            y = 0;
        } else {
            c = (this.c - k) / (1 - k);
            m = (this.m - k) / (1 - k);
            y = (this.y - k) / (1 - k);
        }

        return new CMYK(c, m, y, k, this.a);
    }

    toRGB() {
        const r = (1 - this.c) * 255;
        const g = (1 - this.m) * 255;
        const b = (1 - this.y) * 255;

        return new RGB(r, g, b, this.a);
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

    set c(c) {
        this.c = clamp(c);
    }

    set m(m) {
        this.m = clamp(m);
    }

    set y(y) {
        this.y = clamp(y);
    }

    set k(k) {
        this.k = clamp(k);
    }

    setAlpha(a) {
        return new CMYK(this.c, this.m, this.y, this.k, a);
    }

    toCMY() {
        const c = this.c * (1 - this.k) + this.k;
        const m = this.m * (1 - this.k) + this.k;
        const y = this.y * (1 - this.k) + this.k;

        return new CMY(c, m, y, this.a);
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
        this._h = h % 1;
    }

    set s(s) {
        this._s = clamp(s);
    }

    set l(l) {
        this._l = clamp(l);
    }

    darken(amount) {
        return new HSL(this.h, this.s, this.l - (amount / 200), this.a);
    }

    lighten(amount) {
        return new HSL(this.h, this.s, this.l + (amount / 200), this.a);
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

        let v2;
        if (this.l < 0.5) {
            v2 = this.l * (1 + this.s);
        } else {
            v2 = (this.l + this.s) - (this.s * this.l);
        }

        const v1 = 2 * this.l - v2;

        const r = HSL.RGBHue(v1, v2, this.h + (1 / 3)) * 255;
        const g = HSL.RGBHue(v1, v2, this.h) * 255;
        const b = HSL.RGBHue(v1, v2, this.h - (1 / 3)) * 255;

        return new RGB(r, g, b, this.a);
    }

    toString() {
		const h = Math.floor(this.h * 360);
		const s = Math.floor(this.s * 100) + '%';
		const l = Math.floor(this.l * 100) + '%';

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
        this._h = h % 1;
    }

    set s(s) {
        this._s = clamp(s, 0, 1);
    }

    set v(v) {
        this._v = clamp(v, 0, 1);
    }

    setAlpha(a) {
        return new HSV(this.h, this.s, this.v, a);
    }

    shade(amount) {
        return new HSV(this.h, this.s, this.v - (amount / 200), this.a);
    }

    tint(amount) {
        return new HSV(this.h, this.s, this.v + (amount / 200), this.a);
    }

    toHSV() {
        return new HSV(this.h, this.s, this.v, this.a);
    }

    toRGB() {
        if (this.s == 0) {
            return new RGB(this.v * 255, this.v * 255, this.v * 255, this.a);
        }

        let h = this.h * 6;
        if (h == 6) {
            h = 0;
        }

        const vi = Math.floor(h);
        const v1 = this.v * (1 - this.s);
        const v2 = this.v * (1 - this.s * (h - vi));
        const v3 = this.v * (1 - this.s * (1 - (h - vi)));

        let r;
        let g;
        let b;
        if (vi == 0) {
            r = this.v;
            g = v3;
            b = v1;
        } else if (vi == 1) {
            r = v2;
            g = this.v;
            b = v1;
        } else if (vi == 2) {
            r = v1;
            g = this.v;
            b = v3;
        } else if (vi == 3) {
            r = v1;
            g = v2;
            b = this.v;
        } else if (vi == 4) {
            r = v3;
            g = v1;
            b = this.v;
        } else {
            r = this.v;
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
        this._r = clamp(r, 0, 255);
    }

    set g(g) {
        this._g = clamp(g, 0, 255);
    }

    set b(b) {
        this._b = clamp(b, 0, 255);
    }

    luma() {
		const v1 = 0.2126 * this.r;
		const v2 = 0.7152 * this.g;
        const v3 = 0.0722 * this.b;

		return (v1 + v2 + v3) / 255;
    }

    mix(color, amount = 0.5) {
        color = color.toRGB();
        const r = lerp(this.r, color.r, amount);
        const g = lerp(this.g, color.g, amount);
        const b = lerp(this.b, color.b, amount);
        const a = lerp(this.a, color.a, amount);
        return new RGB(r, g, b, a);
    }

    setAlpha(a) {
        return new RGB(this.r, this.g, this.b, a);
    }

    toCMY() {
        const c = 1 - (this.r / 255);
        const m = 1 - (this.g / 255);
        const y = 1 - (this.b / 255);

        return new CMY(c, m, y, this.a);
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
            return new HSL(0, 0, l, this.a);
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

        return new HSL(h, s, l, this.a);
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
            return new HSV(0, 0, v, this.a);
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

        return new HSV(h, s, v, this.a);
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
Color.colors = {
    ALICEBLUE: '#F0F8FF',
    ANTIQUEWHITE: '#FAEBD7',
    AQUA: '#00FFFF',
    AQUAMARINE: '#7FFFD4',
    AZURE: '#F0FFFF',
    BEIGE: '#F5F5DC',
    BISQUE: '#FFE4C4',
    BLACK: '#000000',
    BLANCHEDALMOND: '#FFEBCD',
    BLUE: '#0000FF',
    BLUEVIOLET: '#8A2BE2',
    BROWN: '#A52A2A',
    BURLYWOOD: '#DEB887',
    CADETBLUE: '#5F9EA0',
    CHARTREUSE: '#7FFF00',
    CHOCOLATE: '#D2691E',
    CORAL: '#FF7F50',
    CORNFLOWERBLUE: '#6495ED',
    CORNSILK: '#FFF8DC',
    CRIMSON: '#DC143C',
    CYAN: '#00FFFF',
    DARKBLUE: '#00008B',
    DARKCYAN: '#008B8B',
    DARKGOLDENROD: '#B8860B',
    DARKGRAY: '#A9A9A9',
    DARKGREY: '#A9A9A9',
    DARKGREEN: '#006400',
    DARKKHAKI: '#BDB76B',
    DARKMAGENTA: '#8B008B',
    DARKOLIVEGREEN: '#556B2F',
    DARKORANGE: '#FF8C00',
    DARKORCHID: '#9932CC',
    DARKRED: '#8B0000',
    DARKSALMON: '#E9967A',
    DARKSEAGREEN: '#8FBC8F',
    DARKSLATEBLUE: '#483D8B',
    DARKSLATEGRAY: '#2F4F4F',
    DARKSLATEGREY: '#2F4F4F',
    DARKTURQUOISE: '#00CED1',
    DARKVIOLET: '#9400D3',
    DEEPPINK: '#FF1493',
    DEEPSKYBLUE: '#00BFFF',
    DIMGRAY: '#696969',
    DIMGREY: '#696969',
    DODGERBLUE: '#1E90FF',
    FIREBRICK: '#B22222',
    FLORALWHITE: '#FFFAF0',
    FORESTGREEN: '#228B22',
    FUCHSIA: '#FF00FF',
    GAINSBORO: '#DCDCDC',
    GHOSTWHITE: '#F8F8FF',
    GOLD: '#FFD700',
    GOLDENROD: '#DAA520',
    GRAY: '#808080',
    GREY: '#808080',
    GREEN: '#008000',
    GREENYELLOW: '#ADFF2F',
    HONEYDEW: '#F0FFF0',
    HOTPINK: '#FF69B4',
    INDIANRED: '#CD5C5C',
    INDIGO: '#4B0082',
    IVORY: '#FFFFF0',
    KHAKI: '#F0E68C',
    LAVENDER: '#E6E6FA',
    LAVENDERBLUSH: '#FFF0F5',
    LAWNGREEN: '#7CFC00',
    LEMONCHIFFON: '#FFFACD',
    LIGHTBLUE: '#ADD8E6',
    LIGHTCORAL: '#F08080',
    LIGHTCYAN: '#E0FFFF',
    LIGHTGOLDENRODYELLOW: '#FAFAD2',
    LIGHTGRAY: '#D3D3D3',
    LIGHTGREY: '#D3D3D3',
    LIGHTGREEN: '#90EE90',
    LIGHTPINK: '#FFB6C1',
    LIGHTSALMON: '#FFA07A',
    LIGHTSEAGREEN: '#20B2AA',
    LIGHTSKYBLUE: '#87CEFA',
    LIGHTSLATEGRAY: '#778899',
    LIGHTSLATEGREY: '#778899',
    LIGHTSTEELBLUE: '#B0C4DE',
    LIGHTYELLOW: '#FFFFE0',
    LIME: '#00FF00',
    LIMEGREEN: '#32CD32',
    LINEN: '#FAF0E6',
    MAGENTA: '#FF00FF',
    MAROON: '#800000',
    MEDIUMAQUAMARINE: '#66CDAA',
    MEDIUMBLUE: '#0000CD',
    MEDIUMORCHID: '#BA55D3',
    MEDIUMPURPLE: '#9370DB',
    MEDIUMSEAGREEN: '#3CB371',
    MEDIUMSLATEBLUE: '#7B68EE',
    MEDIUMSPRINGGREEN: '#00FA9A',
    MEDIUMTURQUOISE: '#48D1CC',
    MEDIUMVIOLETRED: '#C71585',
    MIDNIGHTBLUE: '#191970',
    MINTCREAM: '#F5FFFA',
    MISTYROSE: '#FFE4E1',
    MOCCASIN: '#FFE4B5',
    NAVAJOWHITE: '#FFDEAD',
    NAVY: '#000080',
    OLDLACE: '#FDF5E6',
    OLIVE: '#808000',
    OLIVEDRAB: '#6B8E23',
    ORANGE: '#FFA500',
    ORANGERED: '#FF4500',
    ORCHID: '#DA70D6',
    PALEGOLDENROD: '#EEE8AA',
    PALEGREEN: '#98FB98',
    PALETURQUOISE: '#AFEEEE',
    PALEVIOLETRED: '#DB7093',
    PAPAYAWHIP: '#FFEFD5',
    PEACHPUFF: '#FFDAB9',
    PERU: '#CD853F',
    PINK: '#FFC0CB',
    PLUM: '#DDA0DD',
    POWDERBLUE: '#B0E0E6',
    PURPLE: '#800080',
    REBECCAPURPLE: '#663399',
    RED: '#FF0000',
    ROSYBROWN: '#BC8F8F',
    ROYALBLUE: '#4169E1',
    SADDLEBROWN: '#8B4513',
    SALMON: '#FA8072',
    SANDYBROWN: '#F4A460',
    SEAGREEN: '#2E8B57',
    SEASHELL: '#FFF5EE',
    SIENNA: '#A0522D',
    SILVER: '#C0C0C0',
    SKYBLUE: '#87CEEB',
    SLATEBLUE: '#6A5ACD',
    SLATEGRAY: '#708090',
    SLATEGREY: '#708090',
    SNOW: '#FFFAFA',
    SPRINGGREEN: '#00FF7F',
    STEELBLUE: '#4682B4',
    TAN: '#D2B48C',
    TEAL: '#008080',
    THISTLE: '#D8BFD8',
    TOMATO: '#FF6347',
    TURQUOISE: '#40E0D0',
    VIOLET: '#EE82EE',
    WHEAT: '#F5DEB3',
    WHITE: '#FFFFFF',
    WHITESMOKE: '#F5F5F5',
    YELLOW: '#FFFF00',
    YELLOWGREEN: '#9ACD32'
};

Color.hexRegEx = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i;
Color.hexRegExShort = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i;
Color.RGBARegEx = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+)\)$/i;
Color.RGBRegEx = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i;

window.Color = Color;
Object.assign(Color, {

	fromCMY(c, m, y, a = 1) {
		const cmy = new CMY(c, m, y, a);
		return new Color(cmy);
	},

	fromCMYK(c, m, y, k, a = 1) {
		const cmyk = new CMYK(c, m, y, k, a);
		return new Color(cmyk);
	},

	fromHSL(h, s, l, a = 1) {
		const hsl = new HSL(h, s, l, a);
		return new Color(hsl);
	},

	fromHSV(h, s, v, a = 1) {
		const hsv = new HSV(h, s, v, a);
		return new Color(hsv);
	},

	fromRGB(r, g, b, a = 1) {
		const rgb = new RGB(r, g, b, a);
		return new Color(rgb);
	},

    fromString(string) {
		string = string.toUpperCase();

		if (string === 'TRANSPARENT') {
			return this.fromRGB(0, 0, 0, 0);
		}

		if (this.colors[string]) {
			string = this.colors[string];
		}

		const hexMatch = string.match(this.hexRegEx);
		if (hexMatch) {
			const rgb = hexMatch.slice(1, 4).map(x => parseInt(x, 16));
			return this.fromRGB(rgb[0], rgb[1], rgb[2]);
		}

		const hexMatchShort = string.match(this.hexRegExShort);
		if (hexMatchShort) {
			const rgb = hexMatchShort.slice(1, 4).map(x => 0x11 * parseInt(x, 16));
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
function clamp(value, min = 0, max = 1) {
    return value < min ?
        min : value > max ?
            max : value;
}

function lerp(a, b, amount) {
    return a * (1 - amount) + b * amount;
}

})(window);