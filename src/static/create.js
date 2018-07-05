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

		const HSLAMatch = string.match(this.HSLARegEx);
		if (HSLAMatch) {
			return this.fromHSL(HSLAMatch[1], HSLAMatch[2], HSLAMatch[3], HSLAMatch[4]);
		}

		const HSLMatch = string.match(this.HSLRegEx);
		if (HSLMatch) {
			return this.fromRGB(HSLMatch[1], HSLMatch[2], HSLMatch[3]);
		}

		return this.fromRGB(0, 0, 0);
    }

});