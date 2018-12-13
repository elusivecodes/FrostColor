(function(global, factory) {

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory();
    } else {
        Object.assign(global, factory());
    }

})(window, function() {

    class Color
    {

        /**
         * New Color constructor
         * @param {int} [r]
         * @param {int} [g]
         * @param {int} [b]
         * @param {float} [a]
         * @returns {Color}
         */
        constructor(r = 0, g = 1, b = null, a = 1)
        {
            if (b !== null) {
                this.color = new RGB(r, g, b, a);
            }
            else if (r instanceof ColorBase) {
                this.color = r;
            }
            else if (r instanceof Color) {
                this.color = r.color;
            }
            else {
                this.color = new HSL(0, 0, r, g);
            }
        }

        /**
         * Set Color
         * @param {Base} color
         * @returns {Color}
         */
        setColor(color)
        {
            this.color = color;
            return this;
        }

        /**
         * To String
         * @returns {string}
         */
        toString()
        {
            return this.color.toString();
        }

        /**
         * Value Of
         * @returns {float}
         */
        valueOf()
        {
            return this.luma();
        }

        /**
         * To Primitive
         * @returns {string|float}
         */
        [Symbol.toPrimitive](hint)
        {
            return hint === 'number' ?
                this.valueOf() :
                this.toString();
        }

    }

    class ColorImmutable extends Color
    {

        /**
         * Set Color
         * @param {Base} color
         * @returns {ColorImmutable}
         */
        setColor(color)
        {
            return new ColorImmutable(color);
        }

    }

    Object.assign(Color, {

        /**
         * CMY2CMYK
         * @param {int} c
         * @param {int} m
         * @param {int} y
         * @returns {Array}
         */
        CMY2CMYK(c, m, y)
        {
            const k = Math.min(c, m, y);

            if (k === 100) {
                return [0, 0, 0, k];
            }

            return [
                (c - k) / (100 - k) * 100,
                (m - k) / (100 - k) * 100,
                (y - k) / (100 - k) * 100,
                k
            ];
        },

        /**
         * CMY2RGB
         * @param {int} c
         * @param {int} m
         * @param {int} y
         * @returns {Array}
         */
        CMY2RGB(c, m, y)
        {
            return [
                (100 - c) * 2.5,
                (100 - m) * 2.5,
                (100 - y) * 2.5
            ];
        },

        /**
         * CMYK2CMY
         * @param {int} c
         * @param {int} m
         * @param {int} y
         * @param {int} k
         * @returns {Array}
         */
        CMYK2CMY(c, m, y, k)
        {
            return [
                c * (100 - k) + k,
                m * (100 - k) + k,
                y * (100 - k) + k
            ];
        },

        /**
         * HSL2RGB
         * @param {int} h
         * @param {int} s
         * @param {int} l
         * @returns {Array}
         */
        HSL2RGB(h, s, l)
        {
            if (l == 0) {
                return [0, 0, 0];
            }

            h /= 360;
            s /= 100;
            l /= 100;

            const v2 = l < 0.5 ?
                l * (1 + s) :
                (l + s) - (s * l);
            const v1 = 2 * l - v2;

            const r = this.RGBHue(v1, v2, h + (1 / 3));
            const g = this.RGBHue(v1, v2, h);
            const b = this.RGBHue(v1, v2, h - (1 / 3));

            return [r * 255, g * 255, b * 255];
        },

        /**
         * HSV2RGB
         * @param {int} h
         * @param {int} s
         * @param {int} v
         * @returns {Array}
         */
        HSV2RGB(h, s, v)
        {
            v /= 100;

            if (s == 0) {
                return [v * 255, v * 255, v * 255];
            }

            h = (h / 60) % 6;
            s /= 100;

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

            return [r * 255, g * 255, b * 255];
        },

        /**
         * RGB2CMY
         * @param {int} r
         * @param {int} g
         * @param {int} b
         * @returns {Array}
         */
        RGB2CMY(r, g, b)
        {
            return [
                100 - (r / 2.55),
                100 - (g / 2.55),
                100 - (b / 2.55)
            ];
        },

        /**
         * RGB2Luma
         * @param {int} r
         * @param {int} g
         * @param {int} b
         * @returns {float}
         */
        RGB2Luma(r, g, b)
        {
            return (0.2126 * (r / 255)) +
                (0.7152 * (g / 255)) +
                (0.0722 * (b / 255));
        },

        /**
         * RGB2HSL
         * @param {int} r
         * @param {int} g
         * @param {int} b
         * @returns {Array}
         */
        RGB2HSL(r, g, b)
        {
            r /= 255;
            g /= 255;
            b /= 255;

            const min = Math.min(r, g, b);
            const max = Math.max(r, g, b);
            const diff = max - min;

            const l = (max + min) / 2;

            if (diff == 0) {
                return [0, 0, l * 100];
            }

            const s = l < 0.5 ?
                diff / (max + min) :
                diff / (2 - max - min);

            const deltaR = (((max - r) / 6) + (diff / 2)) / diff;
            const deltaG = (((max - g) / 6) + (diff / 2)) / diff;
            const deltaB = (((max - b) / 6) + (diff / 2)) / diff;

            let h = 0;
            if (r == max) {
                h = deltaB - deltaG;
            } else if (g == max) {
                h = (1 / 2) + deltaR - deltaB;
            } else if (b == max) {
                h = (2 / 3) + deltaG - deltaR;
            }

            h = (h + 1) % 1;

            return [h * 360, s * 100, l * 100];
        },

        /**
         * RGB2HSV
         * @param {int} r
         * @param {int} g
         * @param {int} b
         * @returns {Array}
         */
        RGB2HSV(r, g, b)
        {
            r /= 255;
            g /= 255;
            b /= 255;

            const min = Math.min(r, g, b);
            const max = Math.max(r, g, b);
            const diff = max - min;

            const v = max;

            if (diff == 0) {
                return [0, 0, v * 100];
            }

            const s = diff / max;

            const deltaR = (((max - r) / 6) + (diff / 2)) / diff;
            const deltaG = (((max - g) / 6) + (diff / 2)) / diff;
            const deltaB = (((max - b) / 6) + (diff / 2)) / diff;

            let h = 0;
            if (r == max) {
                h = deltaB - deltaG;
            } else if (g == max) {
                h = (1 / 2) + deltaR - deltaB;
            } else if (b == max) {
                h = (2 / 3) + deltaG - deltaR;
            }

            h = (h + 1) % 1;

            return [h * 360, s * 100, v * 100];
        },

        /**
         * RGBHue
         * @param {float} v1
         * @param {float} v2
         * @param {float} vH
         * @returns {float}
         */
        RGBHue(v1, v2, vH)
        {
            vH = (vH + 1) % 1;

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
    });

    Object.assign(Color, {

        /**
         * From CMY
         * @param {int} c
         * @param {int} m
         * @param {int} y
         * @param {float} [a]
         * @returns {Color}
         */
        fromCMY(...args)
        {
            return new this(
                new CMY(...args)
            );
        },

        /**
         * From CMYK
         * @param {int} c
         * @param {int} m
         * @param {int} y
         * @param {int} k
         * @param {float} [a]
         * @returns {Color}
         */
        fromCMYK(...args)
        {
            return new this(
                new CMYK(...args)
            );
        },

        /**
         * From HSL
         * @param {int} h
         * @param {int} s
         * @param {int} l
         * @param {float} [a]
         * @returns {Color}
         */
        fromHSL(...args)
        {
            return new this(
                new HSL(...args)
            );
        },

        /**
         * From HSV
         * @param {int} h
         * @param {int} s
         * @param {int} v
         * @param {float} [a]
         * @returns {Color}
         */
        fromHSV(...args)
        {
            return new this(
                new HSV(...args)
            );
        },

        /**
         * From RGB
         * @param {int} r
         * @param {int} g
         * @param {int} b
         * @param {float} [a]
         * @returns {Color}
         */
        fromRGB(...args)
        {
            return new this(
                new RGB(...args)
            );
        },

        /**
         * From String
         * @param {string} string
         * @returns {Color}
         */
        fromString(string)
        {
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
                return this.fromHSL(HSLMatch[1], HSLMatch[2], HSLMatch[3]);
            }

            return this.fromRGB(0, 0, 0);
        }

    });

    Object.assign(Color, {

        /**
         * Mix
         * @param {Color} color1
         * @param {Color} color2
         * @param {float} amount
         * @returns {Color}
         */
        mix(color1, color2, amount)
        {
            return new this(
                color1.color.mix(color2.color, amount)
            );
        },

        /**
         * Multiply
         * @param {Color} color1
         * @param {Color} color2
         * @param {float} amount
         * @returns {Color}
         */
        multiply(color1, color2, amount)
        {
            return new this(
                color1.color.multiply(color2.color, amount)
            );
        }

    });

    Object.assign(Color.prototype, {

        /**
         * Get Alpha
         * @returns {float} The alpha value of the color (between 0 and 1)
         */
        getAlpha()
        {
            return this.color.getAlpha();
        },

        /**
         * Get Brightness
         * @returns {int} The brightness value of the color (between 0 and 100)
         */
        getBrightness()
        {
            return this.color.getBrightness();
        },

        /**
         * Get Hue
         * @returns {int} The hue value of the color (between 0 and 360)
         */
        getHue()
        {
            return this.color.getHue();
        },

        /**
         * Get Saturation
         * @returns {int} The saturation value of the color (between 0 and 100)
         */
        getSaturation()
        {
            return this.color.getSaturation();
        },

        /**
         * Luma
         * @returns {int} The luma value of the color
         */
        luma()
        {
            return this.color.luma();
        },

        /**
         * Set Alpha
         * @param {float} a The new alpha value (between 0 and 1)
         * @returns {Color}
         */
        setAlpha(alpha)
        {
            return this.setColor(this.color.setAlpha(alpha));
        },

        /**
         * Set Brightness
         * @param {int} v The new brightness value (between 0 and 100)
         * @returns {Color}
         */
        setBrightness(brightness)
        {
            return this.setColor(this.color.setBrightness(brightness));
        },

        /**
         * Set Hue
         * @param {int} h The new hue value (between 0 and 360)
         * @returns {Color}
         */
        setHue(hue)
        {
            return this.setColor(this.color.setHue(hue));
        },

        /**
         * Set Saturation
         * @param {int} s The new saturation value (between 0 and 100)
         * @returns {Color}
         */
        setSaturation(saturation)
        {
            return this.setColor(this.color.setSaturation(saturation));
        }

    });

    Object.assign(Color.prototype, {

        /**
         * Darken
         * @param {float} amount The amount to darken the color by (between 0 and 1)
         * @returns {Color}
         */
        darken(amount)
        {
            return this.setColor(this.color.darken(amount));
        },

        /**
         * Lighten
         * @param {float} amount The amount to lighten the color by (between 0 and 1)
         * @returns {Color}
         */
        lighten(amount)
        {
            return this.setColor(this.color.lighten(amount));
        },

        /**
         * Shade
         * @param {float} amount The amount to shade the color by (between 0 and 1)
         * @returns {Color}
         */
        shade(amount)
        {
            return this.setColor(this.color.shade(amount));
        },

        /**
         * Tint
         * @param {float} amount The amount to tint the color by (between 0 and 1)
         * @returns {RGB}
         */
        tint(amount)
        {
            return this.setColor(this.color.tint(amount));
        },

        /**
         * Tone
         * @param {float} amount The amount to tone the color by (between 0 and 1)
         * @returns {RGB}
         */
        tone(amount)
        {
            return this.setColor(this.color.tone(amount));
        }

    });

    Object.assign(Color.prototype, {

        /**
         * Palette
         * @param {int} [shades=10] The number of shades to create
         * @param {int} [tints=10] The number of tints to create
         * @param {int} [tones=10] The number of tones to create
         * @returns {Array}
         */
        palette(shades = 10, tints = 10, tones = 10)
        {
            return {
                shades: this.shades(shades),
                tints: this.tints(tints),
                tones: this.tones(tones)
            };
        },

        /**
         * Shades
         * @param {int} [shades=10] The number of shades to create
         * @returns {Array}
         */
        shades(shades = 10)
        {
            return new Array(shades)
                .fill(0)
                .map((value, index) =>
                    this.color.shade(
                        index / (shades + 1)
                    )
                );
        },

        /**
         * Tints
         * @param {int} [tints=10] The number of tints to create
         * @returns {Array}
         */
        tints(tints = 10)
        {
            return new Array(tints)
                .fill(0)
                .map((value, index) =>
                    this.color.tint(
                        index / (tints + 1)
                    )
                );
        },

        /**
         * Tones
         * @param {int} [tones=10] The number of tones to create
         * @returns {Array}
         */
        tones(tones = 10)
        {
            return new Array(tones)
                .fill(0)
                .map((value, index) =>
                    this.color.tone(
                        index / (tones + 1)
                    )
                );
        }

    });

    Object.assign(Color.prototype, {

        /**
         * Analogous
         * @returns {Array}
         */
        analogous()
        {
            return [
                new Color(
                    this.color.setHue(
                        this.color.getHue() + 30
                    )
                ),
                new Color(
                    this.color.setHue(
                        this.color.getHue() + 330
                    )
                )
            ];
        },

        /**
         * Complementary
         * @returns {Color}
         */
        complementary()
        {
            return new Color(
                this.color.setHue(
                    this.color.getHue() + 180
                )
            );
        },

        /**
         * Split
         * @returns {Array}
         */
        split()
        {
            return [
                new Color(
                    this.color.setHue(
                        this.color.getHue() + 150
                    )
                ),
                new Color(
                    this.color.setHue(
                        this.color.getHue() + 210
                    )
                )
            ];
        },

        /**
         * Tetradic
         * @returns {Array}
         */
        tetradic()
        {
            return [
                new Color(
                    this.color.setHue(
                        this.color.getHue() + 60
                    )
                ),
                new Color(
                    this.color.setHue(
                        this.color.getHue() + 180
                    )
                ),
                new Color(
                    this.color.setHue(
                        this.color.getHue() + 240
                    )
                )
            ];
        },

        /**
         * Triadic
         * @returns {Array}
         */
        triadic()
        {
            return [
                new Color(
                    this.color.setHue(
                        this.color.getHue() + 120
                    )
                ),
                new Color(
                    this.color.setHue(
                        this.color.getHue() + 240
                    )
                )
            ];
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

    Color.hexRegEx = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i;
    Color.hexRegExShort = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i;

    Color.RGBARegEx = /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0?\.\d+)\)$/i;
    Color.RGBRegEx = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/i;

    Color.HSLARegEx = /^hsla\((\d{1,3}),\s*(\d{1,3})\%,\s*(\d{1,3})\%,\s*(0?\.\d+)\)$/i;
    Color.HSLRegEx = /^hsl\((\d{1,3}),\s*(\d{1,3})\%,\s*(\d{1,3})\%\)$/i;

    class ColorBase
    {
        constructor(a = 1)
        {
            this.a = clamp(a, 0, 1);
        }

        /**
         * Darken
         * @param {float} amount The amount to darken the color by (between 0 and 1)
         * @returns {HSL}
         */
        darken(amount)
        {
            return this.toHSL().darken(amount);
        }

        /**
         * Get Alpha
         * @returns {float} The alpha value of the color (between 0 and 1)
         */
        getAlpha()
        {
            return this.a;
        }

        /**
         * Get Brightness
         * @returns {int} The brightness value of the color (between 0 and 100)
         */
        getBrightness()
        {
            return this.toHSV().getBrightness();
        }

        /**
         * Get Hue
         * @returns {int} The hue value of the color (between 0 and 360)
         */
        getHue()
        {
            return this.toHSV().getHue();
        }

        /**
         * Get Saturation
         * @returns {int} The saturation value of the color (between 0 and 100)
         */
        getSaturation()
        {
            return this.toHSV().getSaturation();
        }

        /**
         * Lighten
         * @param {float} amount The amount to lighten the color by (between 0 and 1)
         * @returns {HSL}
         */
        lighten(amount)
        {
            return this.toHSL().lighten(amount);
        }

        /**
         * Luma
         * @returns {int} The luma value of the color
         */
        luma()
        {
            return this.toRGB().luma();
        }

        /**
         * Mix
         * @param {Base} color
         * @param {float} amount
         * @returns {RGB}
         */
        mix(color, amount)
        {
            return this.toRGB().mix(color, amount);
        }

        /**
         * Multiply
         * @param {Base} color
         * @param {float} amount
         * @returns {RGB}
         */
        multiply(color, amount)
        {
            return this.toRGB().multiply(color, amount);
        }

        /**
         * Set Brightness
         * @param {int} v The new brightness value (between 0 and 100)
         * @returns {HSV}
         */
        setBrightness(v)
        {
            return this.toHSV().setBrightness(v);
        }

        /**
         * Set Hue
         * @param {int} h The new hue value (between 0 and 360)
         * @returns {HSV}
         */
        setHue(h)
        {
            return this.toHSV().setHue(h);
        }

        /**
         * Set Saturation
         * @param {int} s The new saturation value (between 0 and 100)
         * @returns {HSV}
         */
        setSaturation(s)
        {
            return this.toHSV().setSaturation(s);
        }

        /**
         * Shade
         * @param {float} amount The amount to shade the color by (between 0 and 1)
         * @returns {RGB}
         */
        shade(amount)
        {
            return Color.mix(this, new RGB(0, 0, 0), amount);
        }

        /**
         * Tint
         * @param {float} amount The amount to tint the color by (between 0 and 1)
         * @returns {RGB}
         */
        tint(amount)
        {
            return Color.mix(this, new RGB(255, 255, 255), amount);
        }

        /**
         * To CMY
         * @returns {CMY}
         */
        toCMY()
        {
            return this.toRGB().toCMY();
        }

        /**
         * To CMYK
         * @returns {CMYK}
         */
        toCMYK()
        {
            return this.toCMY().toCMYK();
        }

        /**
         * To HSL
         * @returns {HSL}
         */
        toHSL()
        {
            return this.toRGB().toHSL();
        }

        /**
         * To HSV
         * @returns {HSV}
         */
        toHSV()
        {
            return this.toRGB().toHSV();
        }

        /**
         * Tone
         * @param {float} amount The amount to tone the color by (between 0 and 1)
         * @returns {RGB}
         */
        tone(amount)
        {
            return Color.mix(this, new RGB(127, 127, 127), amount);
        }

        /**
         * To String
         * @returns {string}
         */
        toString()
        {
            return this.toRGB().toString();
        }
    }

    class CMY extends ColorBase
    {
        constructor(c, m, y, a = 1)
        {
            super(a);

            this.c = clamp(c);
            this.m = clamp(m);
            this.y = clamp(y);
        }

        /**
         * Set Alpha
         * @param {float} a The new alpha value (between 0 and 1)
         * @returns {CMY}
         */
        setAlpha(a)
        {
            return new CMY(this.c, this.m, this.y, a);
        }

        /**
         * To CMY
         * @returns {CMY}
         */
        toCMY()
        {
            return this;
        }

        /**
         * To CMYK
         * @returns {CMYK}
         */
        toCMYK()
        {
            const [c, m, y, k] = Color.CMY2CMYK(this.c, this.m, this.y);
            return new CMYK(c, m, y, k, this.a);
        }

        /**
         * To RGB
         * @returns {RGB}
         */
        toRGB()
        {
            const [r, g, b] = Color.CMY2RGB(this.c, this.m, this.y);
            return new RGB(r, g, b, this.a);
        }
    }

    class CMYK extends ColorBase
    {
        constructor(c, m, y, k, a = 1)
        {
            super(a);

            this.c = clamp(c);
            this.m = clamp(m);
            this.y = clamp(y);
            this.k = clamp(k);
        }

        /**
         * Set Alpha
         * @param {float} a The new alpha value (between 0 and 1)
         * @returns {CMYK}
         */
        setAlpha(a)
        {
            return new CMYK(this.c, this.m, this.y, this.k, a);
        }

        /**
         * To CMY
         * @returns {CMY}
         */
        toCMY()
        {
            const [c, m, y] = Color.CMYK2CMY(this.c, this.m, this.y, this.k);
            return new CMY(c, m, y, this.a);
        }

        /**
         * To CMYK
         * @returns {CMYK}
         */
        toCMYK()
        {
            return this;
        }

        /**
         * To RGB
         * @returns {RGB}
         */
        toRGB()
        {
            return this.toCMY().toRGB();
        }
    }

    class HSL extends ColorBase
    {
        constructor(h, s, l, a = 1)
        {
            super(a);

            this.h = h % 360;
            this.s = clamp(s);
            this.l = clamp(l);
        }

        /**
         * Darken
         * @param {float} amount The amount to darken the color by (between 0 and 1)
         * @returns {HSL}
         */
        darken(amount)
        {
            const l = this.l - (this.l * amount);
            return new HSL(this.h, this.s, l, this.a);
        }

        /**
         * Lighten
         * @param {float} amount The amount to lighten the color by (between 0 and 1)
         * @returns {HSL}
         */
        lighten(amount)
        {
            const l = this.l + ((100 - this.l) * amount);
            return new HSL(this.h, this.s, l, this.a);
        }

        /**
         * Set Alpha
         * @param {float} a The new alpha value (between 0 and 1)
         * @returns {HSL}
         */
        setAlpha(a)
        {
            return new HSL(this.h, this.s, this.l, a);
        }

        /**
         * To HSL
         * @returns {HSL}
         */
        toHSL()
        {
            return this;
        }

        /**
         * To RGB
         * @returns {RGB}
         */
        toRGB()
        {
            const [r, g, b] = Color.HSL2RGB(this.h, this.s, this.l);
            return new RGB(r, g, b, this.a);
        }
    }

    class HSV extends ColorBase
    {
        constructor(h, s, v, a = 1)
        {
            super(a);

            this.h = h % 360;
            this.s = clamp(s);
            this.v = clamp(v);
        }

        /**
         * Get Brightness
         * @returns {int} The brightness value of the color (between 0 and 100)
         */
        getBrightness()
        {
            return this.v;
        }

        /**
         * Get Hue
         * @returns {int} The hue value of the color (between 0 and 360)
         */
        getHue()
        {
            return this.h;
        }

        /**
         * Get Saturation
         * @returns {int} The saturation value of the color (between 0 and 100)
         */
        getSaturation()
        {
            return this.s;
        }

        /**
         * Set Alpha
         * @param {float} a The new alpha value (between 0 and 1)
         * @returns {HSV}
         */
        setAlpha(a)
        {
            return new HSV(this.h, this.s, this.v, a);
        }

        /**
         * Set Brightness
         * @param {int} v The new brightness value (between 0 and 100)
         * @returns {HSV}
         */
        setBrightness(v)
        {
            return new HSV(this.h, this.s, v, this.a);
        }

        /**
         * Set Hue
         * @param {int} h The new hue value (between 0 and 360)
         * @returns {HSV}
         */
        setHue(h)
        {
            return new HSV(h, this.s, this.v, this.a);
        }

        /**
         * Set Saturation
         * @param {int} s The new saturation value (between 0 and 100)
         * @returns {HSV}
         */
        setSaturation(s)
        {
            return new HSV(this.h, s, this.v, this.a);
        }

        /**
         * To HSV
         * @returns {HSV}
         */
        toHSV()
        {
            return this;
        }

        /**
         * To RGB
         * @returns {RGB}
         */
        toRGB()
        {
            const [r, g, b] = Color.HSV2RGB(this.h, this.s, this.v);
            return new RGB(r, g, b, this.a);
        }
    }

    class RGB extends ColorBase
    {
        constructor(r, g, b, a = 1)
        {
            super(a);

            this.r = clamp(r, 0, 255);
            this.g = clamp(g, 0, 255);
            this.b = clamp(b, 0, 255);
        }

        /**
         * Luma
         * @returns {int} The luma value of the color
         */
        luma()
        {
            return Color.RGB2Luma(this.r, this.g, this.b);
        }

        /**
         * Mix
         * @param {Base} color
         * @param {float} amount
         * @returns {RGB}
         */
        mix(color, amount)
        {
            const rgb = color.toRGB();

            return new RGB(
                lerp(this.r, rgb.r, amount),
                lerp(this.g, rgb.g, amount),
                lerp(this.b, rgb.b, amount),
                lerp(this.a, rgb.a, amount)
            );
        }

        /**
         * Multiply
         * @param {Base} color
         * @param {float} amount
         * @returns {RGB}
         */
        multiply(color, amount)
        {
            const rgb = color.toRGB();

            return new RGB(
                lerp(this.r, this.r * rgb.r / 255, amount),
                lerp(this.g, this.g * rgb.g / 255, amount),
                lerp(this.b, this.b * rgb.b / 255, amount),
                lerp(this.a, this.a * rgb.a, amount)
            );
        }

        /**
         * Set Alpha
         * @param {float} a The new alpha value (between 0 and 1)
         * @returns {RGB}
         */
        setAlpha(a)
        {
            return new RGB(this.r, this.g, this.b, a);
        }

        /**
         * To CMY
         * @returns {CMY}
         */
        toCMY()
        {
            const [c, m, y] = Color.RGB2CMY(this.r, this.g, this.b);
            return new CMY(c, m, y, this.a);
        }

        /**
         * To HSL
         * @returns {HSL}
         */
        toHSL()
        {
            const [h, s, l] = Color.RGB2HSL(this.r, this.g, this.b);
            return new HSL(h, s, l, this.a);
        }

        /**
         * To HSV
         * @returns {HSV}
         */
        toHSV()
        {
            const [h, s, v] = Color.RGB2HSV(this.r, this.g, this.b);
            return new HSV(h, s, v, this.a);
        }

        /**
         * To RGB
         * @returns {RGB}
         */
        toRGB()
        {
            return this;
        }

        /**
         * To String
         * @returns {string}
         */
        toString()
        {
            const a = Math.round(this.a * 100) / 100;

            if (a === 0) {
                return 'transparent';
            }

            const r = Math.round(this.r);
            const g = Math.round(this.g);
            const b = Math.round(this.b);

            if (a < 1) {
                return `rgba(${r}, ${g}, ${b}, ${a})`;
            }

            const rgb = b | (g << 8) | (r << 16);
            const hex = '#' + (0x1000000 + rgb).toString(16).slice(1);

            const name = Object.keys(Color.colors)
                .find(name => Color.colors[name] === hex);

            if (name) {
                return name;
            }

            if (hex[1] === hex[2] &&
                hex[3] === hex[4] &&
                hex[5] === hex[6]) {
                return `#${hex[1]}${hex[3]}${hex[5]}`;
            }

            return hex;
        }
    }

    /**
     * Linear Interpolation
     * @param {float} a
     * @param {float} b
     * @param {float} amount
     * @returns {float}
     */
    function lerp(a, b, amount)
    {
        return a * (1 - amount) + b * amount;
    }

    /**
     * Clamp
     * @param {float} val
     * @param {float} [min]
     * @param {float} [max]
     * @returns {float}
     */
    function clamp(val, min = 0, max = 100)
    {
        return Math.max(min, Math.min(max, val));
    }

    return {
        Color,
        ColorImmutable
    };

});