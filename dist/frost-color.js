(function(global, factory) {

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory();
    } else {
        Object.assign(global, factory());
    }

})(window, function() {
    'use strict';

    /**
     * Color class
     * @class
     */
    class Color {

        /**
         * New Color constructor
         * @param {number|BaseColor|Color} [red=0]
         * @param {number} [green=1]
         * @param {null|number} [blue=null]
         * @param {number} [alpha=1]
         * @returns {Color}
         */
        constructor(red = 0, green = 1, blue = null, alpha = 1) {
            if (blue !== null) {
                this._color = new RGBColor(red, green, blue, alpha);
            } else if (red instanceof BaseColor) {
                this._color = red;
            } else if (red instanceof Color) {
                this._color = red.getColor();
            } else {
                this._color = new HSLColor(0, 0, red, green);
            }
        }

        /**
         * Returns the internal BaseColor of the color
         * @returns {BaseColor}
         */
        getColor() {
            return this._color;
        }

        /**
         * Sets the BaseColor of the color
         * @param {BaseColor} color
         * @returns {Color}
         */
        setColor(color) {
            this._color = color;
            return this;
        }

        /**
         * Returns a string representation of the color
         * @returns {string}
         */
        toString() {
            return this.getColor()
                .toString();
        }

        /**
         * Returns the luminance value of the color
         * @returns {number}
         */
        valueOf() {
            return this.getColor()
                .valueOf();
        }

        /**
         * Returns a primitive value of the color
         * @returns {string|number}
         */
        [Symbol.toPrimitive](hint) {
            return this.getColor()[Symbol.toPrimitive](hint);
        }

    }

    /**
     * ColorImmutable class
     * @class
     */
    class ColorImmutable extends Color {

        /**
         * Creates a new ColorImmutable from a BaseColor
         * @param {BaseColor} color
         * @returns {ColorImmutable}
         */
        setColor(color) {
            return new ColorImmutable(color);
        }

    }

    Object.assign(Color, {

        /**
         * Converts CMY color values to CMYK
         * @param {number} c
         * @param {number} m
         * @param {number} y
         * @returns {number[]}
         */
        CMY2CMYK(c, m, y) {
            const k = Math.min(c, m, y);

            if (k === 100) {
                return [0, 0, 0, k];
            }

            k /= 100;

            return [
                (c / 100 - k) / (1 - k) * 100,
                (m / 100 - k) / (1 - k) * 100,
                (y / 100 - k) / (1 - k) * 100,
                k * 100
            ];
        },

        /**
         * Converts CMY color values to RGB
         * @param {number} c
         * @param {number} m
         * @param {number} y
         * @returns {number[]}
         */
        CMY2RGB(c, m, y) {
            return [
                (100 - c) / 100 * 255,
                (100 - m) / 100 * 255,
                (100 - y) / 100 * 255
            ];
        },

        /**
         * Converts CMYK color values to CMY
         * @param {number} c
         * @param {number} m
         * @param {number} y
         * @param {number} k
         * @returns {number[]}
         */
        CMYK2CMY(c, m, y, k) {
            k /= 100;

            return [
                (c / 100 * (1 - k) + k) * 100,
                (m / 100 * (1 - k) + k) * 100,
                (y / 100 * (1 - k) + k) * 100
            ];
        },

        /**
         * Converts HSL color values to RGB
         * @param {number} h
         * @param {number} s
         * @param {number} l
         * @returns {number[]}
         */
        HSL2RGB(h, s, l) {
            if (l == 0) {
                return [0, 0, 0];
            }

            h /= 360;
            s /= 100;
            l /= 100;

            const v2 = l < 0.5 ?
                l * (1 + s) :
                (l + s) - (s * l),
                v1 = 2 * l - v2;

            return [
                this.RGBHue(v1, v2, h + (1 / 3)) * 255,
                this.RGBHue(v1, v2, h) * 255,
                this.RGBHue(v1, v2, h - (1 / 3)) * 255
            ];
        },

        /**
         * Converts HSV color values to RGB
         * @param {number} h
         * @param {number} s
         * @param {number} v
         * @returns {number[]}
         */
        HSV2RGB(h, s, v) {
            v /= 100;

            if (s == 0) {
                return [
                    v * 255,
                    v * 255,
                    v * 255
                ];
            }

            h = (h / 60) % 6;
            s /= 100;

            const vi = Math.floor(h),
                v1 = v * (1 - s),
                v2 = v * (1 - s * (h - vi)),
                v3 = v * (1 - s * (1 - (h - vi)));

            let r, g, b;

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

            return [
                r * 255,
                g * 255,
                b * 255
            ];
        },

        /**
         * Converts RGB color values to CMY
         * @param {number} r
         * @param {number} g
         * @param {number} b
         * @returns {number[]}
         */
        RGB2CMY(r, g, b) {
            return [
                (1 - (r / 255)) * 100,
                (1 - (g / 255)) * 100,
                (1 - (b / 255)) * 100
            ];
        },

        /**
         * Calculates the luminance of an RGB color
         * @param {number} r
         * @param {number} g
         * @param {number} b
         * @returns {number}
         */
        RGB2Luma(r, g, b) {
            return (0.2126 * (r / 255)) +
                (0.7152 * (g / 255)) +
                (0.0722 * (b / 255));
        },

        /**
         * Converts RGB color values to HSL
         * @param {number} r
         * @param {number} g
         * @param {number} b
         * @returns {number[]}
         */
        RGB2HSL(r, g, b) {
            r /= 255;
            g /= 255;
            b /= 255;

            const min = Math.min(r, g, b),
                max = Math.max(r, g, b),
                diff = max - min,
                l = (max + min) / 2;

            if (diff == 0) {
                return [0, 0, l * 100];
            }

            const s = l < 0.5 ?
                diff / (max + min) :
                diff / (2 - max - min);

            const deltaR = (((max - r) / 6) + (diff / 2)) / diff,
                deltaG = (((max - g) / 6) + (diff / 2)) / diff,
                deltaB = (((max - b) / 6) + (diff / 2)) / diff;

            let h = 0;

            if (r == max) {
                h = deltaB - deltaG;
            } else if (g == max) {
                h = (1 / 2) + deltaR - deltaB;
            } else if (b == max) {
                h = (2 / 3) + deltaG - deltaR;
            }

            return [
                ((h + 1) % 1) * 360,
                s * 100,
                l * 100
            ];
        },

        /**
         * Converts RGB color values to HSV
         * @param {number} r
         * @param {number} g
         * @param {number} b
         * @returns {number[]}
         */
        RGB2HSV(r, g, b) {
            r /= 255;
            g /= 255;
            b /= 255;

            const min = Math.min(r, g, b),
                max = Math.max(r, g, b),
                diff = max - min,
                v = max;

            if (diff == 0) {
                return [0, 0, v * 100];
            }

            const s = diff / max,
                deltaR = (((max - r) / 6) + (diff / 2)) / diff,
                deltaG = (((max - g) / 6) + (diff / 2)) / diff,
                deltaB = (((max - b) / 6) + (diff / 2)) / diff;

            let h = 0;

            if (r == max) {
                h = deltaB - deltaG;
            } else if (g == max) {
                h = (1 / 2) + deltaR - deltaB;
            } else if (b == max) {
                h = (2 / 3) + deltaG - deltaR;
            }

            h = (h + 1) % 1;

            return [
                h * 360,
                s * 100,
                v * 100
            ];
        },

        /**
         * Calculates the R, G or B value of a hue
         * @param {number} v1
         * @param {number} v2
         * @param {number} vH
         * @returns {number}
         */
        RGBHue(v1, v2, vH) {
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
         * Creates a new Color object from CMY color values
         * @param {number} cyan
         * @param {number} magenta
         * @param {number} yellow
         * @param {number} [alpha=1]
         * @returns {Color}
         */
        fromCMY(cyan, magenta, yellow, alpha = 1) {
            return new this(
                new CMYColor(cyan, magenta, yellow, alpha)
            );
        },

        /**
         * Creates a new Color object from CMYK color values
         * @param {number} cyan
         * @param {number} magenta
         * @param {number} yellow
         * @param {number} key
         * @param {number} [alpha=1]
         * @returns {Color}
         */
        fromCMYK(cyan, magenta, yellow, key, alpha = 1) {
            return new this(
                new CMYKColor(cyan, magenta, yellow, key, alpha)
            );
        },

        /**
         * Creates a new Color object from HSL color values
         * @param {number} hue
         * @param {number} saturation
         * @param {number} lightness
         * @param {number} [alpha=1]
         * @returns {Color}
         */
        fromHSL(hue, saturation, lightness, alpha = 1) {
            return new this(
                new HSLColor(hue, saturation, lightness, alpha)
            );
        },

        /**
         * Creates a new Color object from HSV color values
         * @param {number} hue
         * @param {number} saturation
         * @param {number} brightness
         * @param {number} [alpha=1]
         * @returns {Color}
         */
        fromHSV(hue, saturation, brightness, alpha = 1) {
            return new this(
                new HSVColor(hue, saturation, brightness, alpha)
            );
        },

        /**
         * Creates a new Color object from RGB color values
         * @param {number} red
         * @param {number} green
         * @param {number} blue
         * @param {number} [alpha=1]
         * @returns {Color}
         */
        fromRGB(red, green, blue, alpha = 1) {
            return new this(
                new RGBColor(red, green, blue, alpha)
            );
        },

        /**
         * Creates a new Color object from a HTML color string
         * @param {string} string
         * @returns {Color}
         */
        fromString(string) {
            string = string.toLowerCase();

            if (string === 'transparent') {
                return new this(0, 0, 0, 0);
            }

            if (this.colors[string]) {
                string = this.colors[string];
            }

            const hexMatch = string.match(this.hexRegEx);
            if (hexMatch) {
                const rgb = hexMatch.slice(1, 4).map(value => parsenumber(value, 16));
                return new this(rgb[0], rgb[1], rgb[2]);
            }

            const hexMatchShort = string.match(this.hexRegExShort);
            if (hexMatchShort) {
                const rgb = hexMatchShort.slice(1, 4).map(value => 0x11 * parsenumber(value, 16));
                return new this(rgb[0], rgb[1], rgb[2]);
            }

            const RGBAMatch = string.match(this.RGBARegEx);
            if (RGBAMatch) {
                return new this(RGBAMatch[1], RGBAMatch[2], RGBAMatch[3], RGBAMatch[4]);
            }

            const RGBMatch = string.match(this.RGBRegEx);
            if (RGBMatch) {
                return new this(RGBMatch[1], RGBMatch[2], RGBMatch[3]);
            }

            const HSLAMatch = string.match(this.HSLARegEx);
            if (HSLAMatch) {
                return this.fromHSL(HSLAMatch[1], HSLAMatch[2], HSLAMatch[3], HSLAMatch[4]);
            }

            const HSLMatch = string.match(this.HSLRegEx);
            if (HSLMatch) {
                return this.fromHSL(HSLMatch[1], HSLMatch[2], HSLMatch[3]);
            }

            return new this(0, 0, 0);
        }

    });

    Object.assign(Color, {

        /**
         * Creates a new Color object by mixing two colors together by a specified amount (between 0 and 1)
         * @param {Color} color1
         * @param {Color} color2
         * @param {number} amount
         * @returns {Color}
         */
        mix(color1, color2, amount) {
            return new this(
                color1.getColor()
                    .mix(color2.getColor(), amount)
            );
        },

        /**
         * Creates a new Color object by multiplying two colors together by a specified amount (between 0 and 1)
         * @param {Color} color1
         * @param {Color} color2
         * @param {number} amount
         * @returns {Color}
         */
        multiply(color1, color2, amount) {
            return new this(
                color1.getColor()
                    .multiply(color2.getColor(), amount)
            );
        }

    });

    Object.assign(Color, {

        /**
         * Clamps a value between a min and max
         * @param {number} val
         * @param {number} [min=0]
         * @param {number} [max=100]
         * @returns {number}
         */
        clamp(val, min = 0, max = 100) {
            return Math.max(
                min,
                Math.min(max, val)
            );
        },

        /**
         * Linearly interpolates from one value to another
         * @param {number} a
         * @param {number} b
         * @param {number} amount
         * @returns {number}
         */
        lerp(a, b, amount) {
            return a * (1 - amount) + b * amount;
        }

    });

    Object.assign(Color, {

        // HTML Color Names
        colors: {
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
        },

        // Hex RegEx
        hexRegEx: /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i,
        hexRegExShort: /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i,

        // HSL RegEx
        HSLARegEx: /^hsla\((\d{1,3}),\s*(\d{1,3})\%,\s*(\d{1,3})\%,\s*(0?\.\d+)\)$/i,
        HSLRegEx: /^hsl\((\d{1,3}),\s*(\d{1,3})\%,\s*(\d{1,3})\%\)$/i,

        // RGB RegEx
        RGBARegEx: /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0?\.\d+)\)$/i,
        RGBRegEx: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/i

    });

    Object.assign(Color.prototype, {

        /**
         * Gets the alpha value of the color (between 0 and 1)
         * @returns {number}
         */
        getAlpha() {
            return this.getColor()
                .getAlpha();
        },

        /**
         * Gets the brightness value of the color (between 0 and 100)
         * @returns {number}
         */
        getBrightness() {
            return this.getColor()
                .getBrightness();
        },

        /**
         * Gets the hue value of the color (between 0 and 360)
         * @returns {number}
         */
        getHue() {
            return this.getColor()
                .getHue();
        },

        /**
         * Gets the saturation value of the color (between 0 and 100)
         * @returns {number}
         */
        getSaturation() {
            return this.getColor()
                .getSaturation();
        },

        /**
         * Gets the luminance value of the color 
         * @returns {number}
         */
        luma() {
            return this.getColor()
                .luma();
        },

        /**
         * Sets the alpha value of the color (between 0 and 1)
         * @param {number} alpha
         * @returns {Color}
         */
        setAlpha(alpha) {
            return this.setColor(
                this.getColor()
                    .setAlpha(alpha)
            );
        },

        /**
         * Sets the brightness value of the color (between 0 and 100)
         * @param {number} brightness
         * @returns {Color}
         */
        setBrightness(brightness) {
            return this.setColor(
                this.getColor()
                    .setBrightness(brightness)
            );
        },

        /**
         * Sets the hue value of the color (between 0 and 360)
         * @param {number} hue
         * @returns {Color}
         */
        setHue(hue) {
            return this.setColor(
                this.getColor()
                    .setHue(hue)
            );
        },

        /**
         * Sets the saturation value of the color (between 0 and 100)
         * @param {number} saturation
         * @returns {Color}
         */
        setSaturation(saturation) {
            return this.setColor(
                this.getColor()
                    .setSaturation(saturation)
            );
        }

    });

    Object.assign(Color.prototype, {

        /**
         * Darkens the color by a specified amount (between 0 and 1)
         * @param {number} amount
         * @returns {Color}
         */
        darken(amount) {
            return this.setColor(
                this.getColor()
                    .darken(amount)
            );
        },

        /**
         * Lightens the color by a specified amount (between 0 and 1)
         * @param {number} amount
         * @returns {Color}
         */
        lighten(amount) {
            return this.setColor(
                this.getColor()
                    .lighten(amount)
            );
        },

        /**
         * Shades the color by a specified amount (between 0 and 1)
         * @param {number} amount
         * @returns {Color}
         */
        shade(amount) {
            return this.setColor(
                this.getColor()
                    .shade(amount)
            );
        },

        /**
         * Tints the color by a specified amount (between 0 and 1)
         * @param {number} amount
         * @returns {Color}
         */
        tint(amount) {
            return this.setColor(
                this.getColor()
                    .tint(amount)
            );
        },

        /**
         * Tones the color by a specified amount (between 0 and 1)
         * @param {number} amount
         * @returns {Color}
         */
        tone(amount) {
            return this.setColor(
                this.getColor()
                    .tone(amount)
            );
        }

    });

    Object.assign(Color.prototype, {

        /**
         * Returns a palette object with a specified number of shades, tints and tone variations
         * @param {number} [shades=10]
         * @param {number} [tints=10]
         * @param {number} [tones=10]
         * @returns {object}
         */
        palette(shades = 10, tints = 10, tones = 10) {
            return {
                shades: this.shades(shades),
                tints: this.tints(tints),
                tones: this.tones(tones)
            };
        },

        /**
         * Returns an Array with a specified number of shade variations
         * @param {number} [shades=10]
         * @returns {Color[]}
         */
        shades(shades = 10) {
            const rgb = this.getColor()
                .toRGB();

            return new Array(shades)
                .fill()
                .map((_, index) =>
                    rgb.shade(
                        index / (shades + 1)
                    )
                );
        },

        /**
         * Returns an Array with a specified number of tint variations
         * @param {number} [tints=10]
         * @returns {Color[]}
         */
        tints(tints = 10) {
            const rgb = this.getColor()
                .toRGB();

            return new Array(tints)
                .fill()
                .map((_, index) =>
                    rgb.tint(
                        index / (tints + 1)
                    )
                );
        },

        /**
         * Returns an Array with a specified number of tone variations
         * @param {number} [tones=10]
         * @returns {Color[]}
         */
        tones(tones = 10) {
            const rgb = this.getColor()
                .toRGB();

            return new Array(tones)
                .fill()
                .map((_, index) =>
                    rgb.tone(
                        index / (tones + 1)
                    )
                );
        }

    });

    Object.assign(Color.prototype, {

        /**
         * Returns an Array with 2 analogous Color variations
         * @returns {Color[]}
         */
        analogous() {
            const hsv = this.getColor()
                .toHSV();

            return [
                new Color(
                    hsv.setHue(
                        hsv.getHue() + 30
                    )
                ),
                new Color(
                    hsv.setHue(
                        hsv.getHue() - 30
                    )
                )
            ];
        },

        /**
         * Returns a complementary Color variation
         * @returns {Color}
         */
        complementary() {
            const hsv = this.getColor()
                .toHSV();

            return new Color(
                hsv.setHue(
                    hsv.getHue() + 180
                )
            );
        },

        /**
         * Returns an Array with 2 split Color variations
         * @returns {Color[]}
         */
        split() {
            const hsv = this.getColor()
                .toHSV();

            return [
                new Color(
                    hsv.setHue(
                        hsv.getHue() + 150
                    )
                ),
                new Color(
                    hsv.setHue(
                        hsv.getHue() - 150
                    )
                )
            ];
        },

        /**
         * Returns an Array with 3 tetradic Color variations
         * @returns {Color[]}
         */
        tetradic() {
            const hsv = this.getColor()
                .toHSV();

            return [
                new Color(
                    hsv.setHue(
                        hsv.getHue() + 60
                    )
                ),
                new Color(
                    hsv.setHue(
                        hsv.getHue() + 180
                    )
                ),
                new Color(
                    hsv.setHue(
                        hsv.getHue() + 240
                    )
                )
            ];
        },

        /**
         * Returns an Array with 2 triadic Color variations
         * @returns {Color[]}
         */
        triadic() {
            const hsv = this.getColor()
                .toHSV();

            return [
                new Color(
                    hsv.setHue(
                        hsv.getHue() + 120
                    )
                ),
                new Color(
                    hsv.setHue(
                        hsv.getHue() + 240
                    )
                )
            ];
        }

    });

    /**
     * BaseColor class
     * @class
     */
    class BaseColor {

        /**
         * New BaseColor constructor
         * @param {number} [alpha=1]
         * @returns {BaseColor}
         */
        constructor(alpha = 1) {
            this._a = Color.clamp(alpha, 0, 1);
        }

        /**
         * Darkens the color by a specified amount (between 0 and 1)
         * @param {number} amount
         * @returns {HSLColor}
         */
        darken(amount) {
            return this.toHSL()
                .darken(amount);
        }

        /**
         * Gets the alpha value of the color (between 0 and 1)
         * @returns {number}
         */
        getAlpha() {
            return this._a;
        }

        /**
         * Gets the brightness value of the color (between 0 and 100)
         * @returns {number}
         */
        getBrightness() {
            return this.toHSV()
                .getBrightness();
        }

        /**
         * Gets the hue value of the color (between 0 and 360)
         * @returns {number}
         */
        getHue() {
            return this.toHSV()
                .getHue();
        }

        /**
         * Gets the saturation value of the color (between 0 and 100)
         * @returns {number}
         */
        getSaturation() {
            return this.toHSV()
                .getSaturation();
        }

        /**
         * Lightens the color by a specified amount (between 0 and 1)
         * @param {number} amount
         * @returns {HSLColor}
         */
        lighten(amount) {
            return this.toHSL()
                .lighten(amount);
        }

        /**
         * Gets the luminance value of the color 
         * @returns {number}
         */
        luma() {
            return this.toRGB()
                .luma();
        }

        /**
         * Mixes this color with another by a specified amount (between 0 and 1)
         * @param {BaseColor} color
         * @param {number} amount
         * @returns {RGBColor}
         */
        mix(color, amount) {
            return this.toRGB()
                .mix(color, amount);
        }

        /**
         * Multiplies this color with another by a specified amount (between 0 and 1)
         * @param {BaseColor} color
         * @param {number} amount
         * @returns {RGBColor}
         */
        multiply(color, amount) {
            return this.toRGB()
                .multiply(color, amount);
        }

        /**
         * Sets the brightness value of the color (between 0 and 100)
         * @param {number} brightness
         * @returns {HSVColor}
         */
        setBrightness(brightness) {
            return this.toHSV()
                .setBrightness(brightness);
        }

        /**
         * Sets the hue value of the color (between 0 and 360)
         * @param {number} hue
         * @returns {HSVColor}
         */
        setHue(hue) {
            return this.toHSV()
                .setHue(hue);
        }

        /**
         * Sets the saturation value of the color (between 0 and 100)
         * @param {number} saturation
         * @returns {HSVColor}
         */
        setSaturation(saturation) {
            return this.toHSV()
                .setSaturation(saturation);
        }

        /**
         * Shades the color by a specified amount (between 0 and 1)
         * @param {number} amount
         * @returns {RGBColor}
         */
        shade(amount) {
            return Color.mix(
                this,
                new RGBColor(0, 0, 0),
                amount
            );
        }

        /**
         * Tints the color by a specified amount (between 0 and 1)
         * @param {number} amount
         * @returns {RGBColor}
         */
        tint(amount) {
            return Color.mix(
                this,
                new RGBColor(255, 255, 255),
                amount
            );
        }

        /**
         * Creates a CMY representation of the color
         * @returns {CMYColor}
         */
        toCMY() {
            return this.toRGB()
                .toCMY();
        }

        /**
         * Creates a CMYK representation of the color
         * @returns {CMYKColor}
         */
        toCMYK() {
            return this.toCMY()
                .toCMYK();
        }

        /**
         * Creates a HSL representation of the color
         * @returns {HSLColor}
         */
        toHSL() {
            return this.toRGB()
                .toHSL();
        }

        /**
         * Creates a HSV representation of the color
         * @returns {HSVColor}
         */
        toHSV() {
            return this.toRGB()
                .toHSV();
        }

        /**
         * Tones the color by a specified amount (between 0 and 1)
         * @param {number} amount
         * @returns {RGBColor}
         */
        tone(amount) {
            return Color.mix(
                this,
                new RGB(127, 127, 127),
                amount
            );
        }

        /**
         * Returns a string representation of the color
         * @returns {string}
         */
        toString() {
            return this.toRGB()
                .toString();
        }

        /**
         * Returns the luminance value of the color
         * @returns {number}
         */
        valueOf() {
            return this.luma();
        }

        /**
         * Returns a primitive value of the color
         * @returns {string|number}
         */
        [Symbol.toPrimitive](hint) {
            return hint === 'number' ?
                this.valueOf() :
                this.toString();
        }

    }
    /**
     * CMYColor class
     * @class
     */
    class CMYColor extends BaseColor {

        /**
         * New CMYColor constructor
         * @param {number} cyan
         * @param {number} magenta
         * @param {number} yellow
         * @param {number} [alpha=1]
         * @returns {CMYColor}
         */
        constructor(cyan, magenta, yellow, alpha = 1) {
            super(alpha);

            this._c = Color.clamp(cyan);
            this._m = Color.clamp(magenta);
            this._y = Color.clamp(yellow);
        }

        /**
         * Sets the alpha value of the color (between 0 and 1)
         * @param {number} alpha
         * @returns {CMYColor}
         */
        setAlpha(alpha) {
            return new CMYColor(this._c, this._m, this._y, alpha);
        }

        /**
         * Creates a CMY representation of the color
         * @returns {CMYColor}
         */
        toCMY() {
            return this;
        }

        /**
         * Creates a CMYK representation of the color
         * @returns {CMYKColor}
         */
        toCMYK() {
            const [c, m, y, k] = Color.CMY2CMYK(this._c, this._m, this._y);
            return new CMYKColor(c, m, y, k, this.a);
        }

        /**
         * Creates a RGB representation of the color
         * @returns {RGBColor}
         */
        toRGB() {
            const [r, g, b] = Color.CMY2RGB(this._c, this._m, this._y);
            return new RGBColor(r, g, b, this._a);
        }

    }

    /**
     * CMYKColor class
     * @class
     */
    class CMYKColor extends BaseColor {

        /**
         * New CMYKColor constructor
         * @param {number} cyan
         * @param {number} magenta
         * @param {number} yellow
         * @param {number} key
         * @param {number} [alpha=1]
         * @returns {CMYKColor}
         */
        constructor(cyan, magenta, yellow, key, alpha = 1) {
            super(alpha);

            this._c = Color.clamp(cyan);
            this._m = Color.clamp(magenta);
            this._y = Color.clamp(yellow);
            this._k = Color.clamp(key);
        }

        /**
         * Sets the alpha value of the color (between 0 and 1)
         * @param {number} alpha
         * @returns {CMYKColor}
         */
        setAlpha(alpha) {
            return new CMYKColor(this._c, this._m, this._y, this._k, alpha);
        }

        /**
         * Creates a CMY representation of the color
         * @returns {CMYColor}
         */
        toCMY() {
            const [c, m, y] = Color.CMYK2CMY(this._c, this._m, this._y, this._k);
            return new CMYColor(c, m, y, this._a);
        }

        /**
         * Creates a CMYK representation of the color
         * @returns {CMYKColor}
         */
        toCMYK() {
            return this;
        }

        /**
         * Creates a RGB representation of the color
         * @returns {RGBColor}
         */
        toRGB() {
            return this.toCMY()
                .toRGB();
        }

    }

    /**
     * HSLColor class
     * @class
     */
    class HSLColor extends BaseColor {

        /**
         * New HSLColor constructor
         * @param {number} hue
         * @param {number} saturation
         * @param {number} lightness
         * @param {number} [alpha=1]
         * @returns {HSLColor}
         */
        constructor(hue, saturation, lightness, alpha = 1) {
            super(alpha);

            this._h = hue % 360;
            this._s = Color.clamp(saturation);
            this._l = Color.clamp(lightness);
        }

        /**
         * Darkens the color by a specified amount (between 0 and 1)
         * @param {number} amount
         * @returns {HSLColor}
         */
        darken(amount) {
            return new HSLColor(
                this._h,
                this._s,
                this._l - (this._l * amount),
                this._a
            );
        }

        /**
         * Lightens the color by a specified amount (between 0 and 1)
         * @param {number} amount
         * @returns {HSLColor}
         */
        lighten(amount) {
            return new HSLColor(
                this._h,
                this._s,
                this._l + ((100 - this._l) * amount),
                this._a
            );
        }

        /**
         * Sets the alpha value of the color (between 0 and 1)
         * @param {number} alpha
         * @returns {HSLColor}
         */
        setAlpha(alpha) {
            return new HSL(this._h, this._s, this._l, alpha);
        }

        /**
         * Creates a HSL representation of the color
         * @returns {HSLColor}
         */
        toHSL() {
            return this;
        }

        /**
         * Creates a RGB representation of the color
         * @returns {RGBColor}
         */
        toRGB() {
            const [r, g, b] = Color.HSL2RGB(this._h, this._s, this._l);
            return new RGBColor(r, g, b, this._a);
        }

    }

    /**
     * HSVColor class
     * @class
     */
    class HSVColor extends BaseColor {

        /**
         * New HSVColor constructor
         * @param {number} hue
         * @param {number} saturation
         * @param {number} brightness
         * @param {number} [alpha=1]
         * @returns {HSVColor}
         */
        constructor(hue, saturation, brightness, alpha = 1) {
            super(alpha);

            this._h = hue % 360;
            this._s = Color.clamp(saturation);
            this._v = Color.clamp(brightness);
        }

        /**
         * Gets the brightness value of the color (between 0 and 100)
         * @returns {number}
         */
        getBrightness() {
            return this._v;
        }

        /**
         * Gets the hue value of the color (between 0 and 360)
         * @returns {number}
         */
        getHue() {
            return this._h;
        }

        /**
         * Gets the saturation value of the color (between 0 and 100)
         * @returns {number}
         */
        getSaturation() {
            return this._s;
        }

        /**
         * Sets the alpha value of the color (between 0 and 1)
         * @param {number} alpha
         * @returns {HSVColor}
         */
        setAlpha(alpha) {
            return new HSVColor(this._h, this._s, this._v, alpha);
        }

        /**
         * Sets the brightness value of the color (between 0 and 100)
         * @param {number} brightness
         * @returns {HSVColor}
         */
        setBrightness(brightness) {
            return new HSVColor(this._h, this._s, brightness, this._a);
        }

        /**
         * Sets the hue value of the color (between 0 and 360)
         * @param {number} hue
         * @returns {HSVColor}
         */
        setHue(hue) {
            return new HSVColor(hue, this._s, this._v, this._a);
        }

        /**
         * Sets the saturation value of the color (between 0 and 100)
         * @param {number} saturation
         * @returns {HSVColor}
         */
        setSaturation(saturation) {
            return new HSVColor(this._h, saturation, this._v, this._a);
        }

        /**
         * Creates a HSV representation of the color
         * @returns {HSVColor}
         */
        toHSV() {
            return this;
        }

        /**
         * Creates a RGB representation of the color
         * @returns {RGBColor}
         */
        toRGB() {
            const [r, g, b] = Color.HSV2RGB(this._h, this._s, this._v);
            return new RGBColor(r, g, b, this._a);
        }

    }

    /**
     * RGBColor class
     * @class
     */
    class RGBColor extends BaseColor {

        /**
         * New RGBColor constructor
         * @param {number} red
         * @param {number} green
         * @param {number} blue
         * @param {number} [alpha=1]
         * @returns {RGBColor}
         */
        constructor(red, green, blue, alpha = 1) {
            super(alpha);

            this._r = Color.clamp(red, 0, 255);
            this._g = Color.clamp(green, 0, 255);
            this._b = Color.clamp(blue, 0, 255);
        }

        /**
         * Gets the luminance value of the color 
         * @returns {number}
         */
        luma() {
            return Color.RGB2Luma(this._r, this._g, this._b);
        }

        /**
         * Mixes this color with another by a specified amount (between 0 and 1)
         * @param {BaseColor} color
         * @param {number} amount
         * @returns {RGBColor}
         */
        mix(color, amount) {
            const rgb = color.toRGB();

            return new RGBColor(
                Color.lerp(this._r, rgb._r, amount),
                Color.lerp(this._g, rgb._g, amount),
                Color.lerp(this._b, rgb._b, amount),
                Color.lerp(this._a, rgb._a, amount)
            );
        }

        /**
         * Multiplies this color with another by a specified amount (between 0 and 1)
         * @param {BaseColor} color
         * @param {number} amount
         * @returns {RGBColor}
         */
        multiply(color, amount) {
            const rgb = color.toRGB();

            return new RGBColor(
                Color.lerp(this._r, this._r * rgb._r / 255, amount),
                Color.lerp(this._g, this._g * rgb._g / 255, amount),
                Color.lerp(this._b, this._b * rgb._b / 255, amount),
                Color.lerp(this._a, this._a * rgb._a, amount)
            );
        }

        /**
         * Sets the alpha value of the color (between 0 and 1)
         * @param {number} alpha
         * @returns {RGBColor}
         */
        setAlpha(alpha) {
            return new RGBColor(this._r, this._g, this._b, alpha);
        }

        /**
         * Creates a CMY representation of the color
         * @returns {CMYColor}
         */
        toCMY() {
            const [c, m, y] = Color.RGB2CMY(this._r, this._g, this._b);
            return new CMYColor(c, m, y, this._a);
        }

        /**
         * Creates a HSL representation of the color
         * @returns {HSLColor}
         */
        toHSL() {
            const [h, s, l] = Color.RGB2HSL(this._r, this._g, this._b);
            return new HSLColor(h, s, l, this._a);
        }

        /**
         * Creates a HSLV representation of the color
         * @returns {HSVColor}
         */
        toHSV() {
            const [h, s, v] = Color.RGB2HSV(this._r, this._g, this._b);
            return new HSVColor(h, s, v, this._a);
        }

        /**
         * Creates a RGB representation of the color
         * @returns {RGBColor}
         */
        toRGB() {
            return this;
        }

        /**
         * Returns a string representation of the color
         * @returns {string}
         */
        toString() {
            const a = Math.round(this._a * 100) / 100;

            if (a === 0) {
                return 'transparent';
            }

            const r = Math.round(this._r);
            const g = Math.round(this._g);
            const b = Math.round(this._b);

            if (a < 1) {
                return `rgba(${r}, ${g}, ${b}, ${a})`;
            }

            const hex = `#${
                (0x1000000 + (b | (g << 8) | (r << 16)))
                    .toString(16)
                    .slice(1)
                }`;

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

    return {
        Color,
        ColorImmutable,
        BaseColor,
        CMYColor,
        CMYKColor,
        HSLColor,
        HSVColor,
        RGBColor
    };

});