"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (global, factory) {
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') {
    module.exports = factory();
  } else {
    Object.assign(global, factory());
  }
})(window, function () {
  'use strict';
  /**
   * Color class
   * @class
   */

  var Color =
  /*#__PURE__*/
  function () {
    /**
     * New Color constructor
     * @param {number} [r=0]
     * @param {number} [g=1]
     * @param {null|number} [b=null]
     * @param {number} [a=1]
     * @returns {Color}
     */
    function Color() {
      var r = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var g = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var b = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

      _classCallCheck(this, Color);

      if (b !== null) {
        this.color = new RGBColor(r, g, b, a);
      } else if (r instanceof BaseColor) {
        this.color = r;
      } else if (r instanceof Color) {
        this.color = r.color;
      } else {
        this.color = new HSLColor(0, 0, r, g);
      }
    }
    /**
     * Sets the BaseColor of the color
     * @param {BaseColor} color
     * @returns {Color}
     */


    _createClass(Color, [{
      key: "setColor",
      value: function setColor(color) {
        this.color = color;
        return this;
      }
      /**
       * Returns a string representation of the color
       * @returns {string}
       */

    }, {
      key: "toString",
      value: function toString() {
        return this.color.toString();
      }
      /**
       * Returns the luminance value of the color
       * @returns {number}
       */

    }, {
      key: "valueOf",
      value: function valueOf() {
        return this.color.valueOf();
      }
      /**
       * Returns a primitive value of the color
       * @returns {string|number}
       */

    }, {
      key: Symbol.toPrimitive,
      value: function value(hint) {
        return this.color[Symbol.toPrimitive](hint);
      }
    }]);

    return Color;
  }();
  /**
   * ColorImmutable class
   * @class
   */


  var ColorImmutable =
  /*#__PURE__*/
  function (_Color) {
    _inherits(ColorImmutable, _Color);

    function ColorImmutable() {
      _classCallCheck(this, ColorImmutable);

      return _possibleConstructorReturn(this, _getPrototypeOf(ColorImmutable).apply(this, arguments));
    }

    _createClass(ColorImmutable, [{
      key: "setColor",

      /**
       * Creates a new ColorImmutable from a BaseColor
       * @param {BaseColor} color
       * @returns {ColorImmutable}
       */
      value: function setColor(color) {
        return new ColorImmutable(color);
      }
    }]);

    return ColorImmutable;
  }(Color);

  Object.assign(Color, {
    /**
     * Converts CMY color values to CMYK
     * @param {number} c
     * @param {number} m
     * @param {number} y
     * @returns {number[]}
     */
    CMY2CMYK: function CMY2CMYK(c, m, y) {
      var k = Math.min(c, m, y);

      if (k === 100) {
        return [0, 0, 0, k];
      }

      return [(c - k) / (100 - k) * 100, (m - k) / (100 - k) * 100, (y - k) / (100 - k) * 100, k];
    },

    /**
     * Converts CMY color values to RGB
     * @param {number} c
     * @param {number} m
     * @param {number} y
     * @returns {number[]}
     */
    CMY2RGB: function CMY2RGB(c, m, y) {
      return [(100 - c) * 2.5, (100 - m) * 2.5, (100 - y) * 2.5];
    },

    /**
     * Converts CMYK color values to CMY
     * @param {number} c
     * @param {number} m
     * @param {number} y
     * @param {number} k
     * @returns {number[]}
     */
    CMYK2CMY: function CMYK2CMY(c, m, y, k) {
      return [c * (100 - k) + k, m * (100 - k) + k, y * (100 - k) + k];
    },

    /**
     * Converts HSL color values to RGB
     * @param {number} h
     * @param {number} s
     * @param {number} l
     * @returns {number[]}
     */
    HSL2RGB: function HSL2RGB(h, s, l) {
      if (l == 0) {
        return [0, 0, 0];
      }

      h /= 360;
      s /= 100;
      l /= 100;
      var v2 = l < 0.5 ? l * (1 + s) : l + s - s * l;
      var v1 = 2 * l - v2;
      var r = this.RGBHue(v1, v2, h + 1 / 3);
      var g = this.RGBHue(v1, v2, h);
      var b = this.RGBHue(v1, v2, h - 1 / 3);
      return [r * 255, g * 255, b * 255];
    },

    /**
     * Converts HSV color values to RGB
     * @param {number} h
     * @param {number} s
     * @param {number} v
     * @returns {number[]}
     */
    HSV2RGB: function HSV2RGB(h, s, v) {
      v /= 100;

      if (s == 0) {
        return [v * 255, v * 255, v * 255];
      }

      h = h / 60 % 6;
      s /= 100;
      var vi = Math.floor(h);
      var v1 = v * (1 - s);
      var v2 = v * (1 - s * (h - vi));
      var v3 = v * (1 - s * (1 - (h - vi)));
      var r;
      var g;
      var b;

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
     * Converts RGB color values to CMY
     * @param {number} r
     * @param {number} g
     * @param {number} b
     * @returns {number[]}
     */
    RGB2CMY: function RGB2CMY(r, g, b) {
      return [100 - r / 2.55, 100 - g / 2.55, 100 - b / 2.55];
    },

    /**
     * Calculates the luminance of an RGB color
     * @param {number} r
     * @param {number} g
     * @param {number} b
     * @returns {number}
     */
    RGB2Luma: function RGB2Luma(r, g, b) {
      return 0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255);
    },

    /**
     * Converts RGB color values to HSL
     * @param {number} r
     * @param {number} g
     * @param {number} b
     * @returns {number[]}
     */
    RGB2HSL: function RGB2HSL(r, g, b) {
      r /= 255;
      g /= 255;
      b /= 255;
      var min = Math.min(r, g, b);
      var max = Math.max(r, g, b);
      var diff = max - min;
      var l = (max + min) / 2;

      if (diff == 0) {
        return [0, 0, l * 100];
      }

      var s = l < 0.5 ? diff / (max + min) : diff / (2 - max - min);
      var deltaR = ((max - r) / 6 + diff / 2) / diff;
      var deltaG = ((max - g) / 6 + diff / 2) / diff;
      var deltaB = ((max - b) / 6 + diff / 2) / diff;
      var h = 0;

      if (r == max) {
        h = deltaB - deltaG;
      } else if (g == max) {
        h = 1 / 2 + deltaR - deltaB;
      } else if (b == max) {
        h = 2 / 3 + deltaG - deltaR;
      }

      h = (h + 1) % 1;
      return [h * 360, s * 100, l * 100];
    },

    /**
     * Converts RGB color values to HSV
     * @param {number} r
     * @param {number} g
     * @param {number} b
     * @returns {number[]}
     */
    RGB2HSV: function RGB2HSV(r, g, b) {
      r /= 255;
      g /= 255;
      b /= 255;
      var min = Math.min(r, g, b);
      var max = Math.max(r, g, b);
      var diff = max - min;
      var v = max;

      if (diff == 0) {
        return [0, 0, v * 100];
      }

      var s = diff / max;
      var deltaR = ((max - r) / 6 + diff / 2) / diff;
      var deltaG = ((max - g) / 6 + diff / 2) / diff;
      var deltaB = ((max - b) / 6 + diff / 2) / diff;
      var h = 0;

      if (r == max) {
        h = deltaB - deltaG;
      } else if (g == max) {
        h = 1 / 2 + deltaR - deltaB;
      } else if (b == max) {
        h = 2 / 3 + deltaG - deltaR;
      }

      h = (h + 1) % 1;
      return [h * 360, s * 100, v * 100];
    },

    /**
     * Calculates the R, G or B value of a hue
     * @param {number} v1
     * @param {number} v2
     * @param {number} vH
     * @returns {number}
     */
    RGBHue: function RGBHue(v1, v2, vH) {
      vH = (vH + 1) % 1;

      if (6 * vH < 1) {
        return v1 + (v2 - v1) * 6 * vH;
      }

      if (2 * vH < 1) {
        return v2;
      }

      if (3 * vH < 2) {
        return v1 + (v2 - v1) * (2 / 3 - vH) * 6;
      }

      return v1;
    }
  });
  Object.assign(Color, {
    /**
     * Creates a new Color object from CMY color values
     * @param {number} c
     * @param {number} m
     * @param {number} y
     * @param {number} [a=1]
     * @returns {Color}
     */
    fromCMY: function fromCMY(c, m, y) {
      var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
      return new this(new CMYColor(c, m, y, a));
    },

    /**
     * Creates a new Color object from CMYK color values
     * @param {number} c
     * @param {number} m
     * @param {number} y
     * @param {number} k
     * @param {number} [a=1]
     * @returns {Color}
     */
    fromCMYK: function fromCMYK(c, m, y, k) {
      var a = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
      return new this(new CMYKColor(c, m, y, k, a));
    },

    /**
     * Creates a new Color object from HSL color values
     * @param {number} h
     * @param {number} s
     * @param {number} l
     * @param {number} [a=1]
     * @returns {Color}
     */
    fromHSL: function fromHSL(h, s, l) {
      var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
      return new this(new HSLColor(h, s, l, a));
    },

    /**
     * Creates a new Color object from HSV color values
     * @param {number} h
     * @param {number} s
     * @param {number} v
     * @param {number} [a=1]
     * @returns {Color}
     */
    fromHSV: function fromHSV(h, s, v) {
      var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
      return new this(new HSVColor(h, s, v, a));
    },

    /**
     * Creates a new Color object from RGB color values
     * @param {number} r
     * @param {number} g
     * @param {number} b
     * @param {number} [a=1]
     * @returns {Color}
     */
    fromRGB: function fromRGB(r, g, b) {
      var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
      return new this(new RGBColor(r, g, b, a));
    },

    /**
     * Creates a new Color object from a HTML color string
     * @param {string} string
     * @returns {Color}
     */
    fromString: function fromString(string) {
      string = string.toLowerCase();

      if (string === 'transparent') {
        return new this(0, 0, 0, 0);
      }

      if (this.colors[string]) {
        string = this.colors[string];
      }

      var hexMatch = string.match(this.hexRegEx);

      if (hexMatch) {
        var rgb = hexMatch.slice(1, 4).map(function (value) {
          return parsenumber(value, 16);
        });
        return new this(rgb[0], rgb[1], rgb[2]);
      }

      var hexMatchShort = string.match(this.hexRegExShort);

      if (hexMatchShort) {
        var _rgb = hexMatchShort.slice(1, 4).map(function (value) {
          return 0x11 * parsenumber(value, 16);
        });

        return new this(_rgb[0], _rgb[1], _rgb[2]);
      }

      var RGBAMatch = string.match(this.RGBARegEx);

      if (RGBAMatch) {
        return new this(RGBAMatch[1], RGBAMatch[2], RGBAMatch[3], RGBAMatch[4]);
      }

      var RGBMatch = string.match(this.RGBRegEx);

      if (RGBMatch) {
        return new this(RGBMatch[1], RGBMatch[2], RGBMatch[3]);
      }

      var HSLAMatch = string.match(this.HSLARegEx);

      if (HSLAMatch) {
        return this.fromHSL(HSLAMatch[1], HSLAMatch[2], HSLAMatch[3], HSLAMatch[4]);
      }

      var HSLMatch = string.match(this.HSLRegEx);

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
    mix: function mix(color1, color2, amount) {
      return new this(color1.color.mix(color2.color, amount));
    },

    /**
     * Creates a new Color object by multiplying two colors together by a specified amount (between 0 and 1)
     * @param {Color} color1
     * @param {Color} color2
     * @param {number} amount
     * @returns {Color}
     */
    multiply: function multiply(color1, color2, amount) {
      return new this(color1.color.multiply(color2.color, amount));
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
    clamp: function clamp(val) {
      var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
      return Math.max(min, Math.min(max, val));
    },

    /**
     * Linearly interpolates from one value to another
     * @param {number} a
     * @param {number} b
     * @param {number} amount
     * @returns {number}
     */
    lerp: function lerp(a, b, amount) {
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
    getAlpha: function getAlpha() {
      return this.color.getAlpha();
    },

    /**
     * Gets the brightness value of the color (between 0 and 100)
     * @returns {number}
     */
    getBrightness: function getBrightness() {
      return this.color.getBrightness();
    },

    /**
     * Gets the hue value of the color (between 0 and 360)
     * @returns {number}
     */
    getHue: function getHue() {
      return this.color.getHue();
    },

    /**
     * Gets the saturation value of the color (between 0 and 100)
     * @returns {number}
     */
    getSaturation: function getSaturation() {
      return this.color.getSaturation();
    },

    /**
     * Gets the luminance value of the color 
     * @returns {number}
     */
    luma: function luma() {
      return this.color.luma();
    },

    /**
     * Sets the alpha value of the color (between 0 and 1)
     * @param {number} alpha
     * @returns {Color}
     */
    setAlpha: function setAlpha(alpha) {
      return this.setColor(this.color.setAlpha(alpha));
    },

    /**
     * Sets the brightness value of the color (between 0 and 100)
     * @param {number} brightness
     * @returns {Color}
     */
    setBrightness: function setBrightness(brightness) {
      return this.setColor(this.color.setBrightness(brightness));
    },

    /**
     * Sets the hue value of the color (between 0 and 360)
     * @param {number} h
     * @returns {Color}
     */
    setHue: function setHue(hue) {
      return this.setColor(this.color.setHue(hue));
    },

    /**
     * Sets the saturation value of the color (between 0 and 100)
     * @param {number} s
     * @returns {Color}
     */
    setSaturation: function setSaturation(saturation) {
      return this.setColor(this.color.setSaturation(saturation));
    }
  });
  Object.assign(Color.prototype, {
    /**
     * Darkens the color by a specified amount (between 0 and 1)
     * @param {number} amount
     * @returns {Color}
     */
    darken: function darken(amount) {
      return this.setColor(this.color.darken(amount));
    },

    /**
     * Lightens the color by a specified amount (between 0 and 1)
     * @param {number} amount
     * @returns {Color}
     */
    lighten: function lighten(amount) {
      return this.setColor(this.color.lighten(amount));
    },

    /**
     * Shades the color by a specified amount (between 0 and 1)
     * @param {number} amount
     * @returns {Color}
     */
    shade: function shade(amount) {
      return this.setColor(this.color.shade(amount));
    },

    /**
     * Tints the color by a specified amount (between 0 and 1)
     * @param {number} amount
     * @returns {Color}
     */
    tint: function tint(amount) {
      return this.setColor(this.color.tint(amount));
    },

    /**
     * Tones the color by a specified amount (between 0 and 1)
     * @param {number} amount
     * @returns {Color}
     */
    tone: function tone(amount) {
      return this.setColor(this.color.tone(amount));
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
    palette: function palette() {
      var shades = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
      var tints = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
      var tones = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
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
    shades: function shades() {
      var _this = this;

      var _shades = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

      return new Array(_shades).fill().map(function (_, index) {
        return _this.color.shade(index / (_shades + 1));
      });
    },

    /**
     * Returns an Array with a specified number of tint variations
     * @param {number} [tints=10]
     * @returns {Color[]}
     */
    tints: function tints() {
      var _this2 = this;

      var _tints = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

      return new Array(_tints).fill().map(function (_, index) {
        return _this2.color.tint(index / (_tints + 1));
      });
    },

    /**
     * Returns an Array with a specified number of tone variations
     * @param {number} [tones=10]
     * @returns {Color[]}
     */
    tones: function tones() {
      var _this3 = this;

      var _tones = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

      return new Array(_tones).fill().map(function (_, index) {
        return _this3.color.tone(index / (_tones + 1));
      });
    }
  });
  Object.assign(Color.prototype, {
    /**
     * Returns an Array with 2 analogous Color variations
     * @returns {Color[]}
     */
    analogous: function analogous() {
      return [new Color(this.color.setHue(this.color.getHue() + 30)), new Color(this.color.setHue(this.color.getHue() - 30))];
    },

    /**
     * Returns a complementary Color variation
     * @returns {Color}
     */
    complementary: function complementary() {
      return new Color(this.color.setHue(this.color.getHue() + 180));
    },

    /**
     * Returns an Array with 2 split Color variations
     * @returns {Color[]}
     */
    split: function split() {
      return [new Color(this.color.setHue(this.color.getHue() + 150)), new Color(this.color.setHue(this.color.getHue() - 150))];
    },

    /**
     * Returns an Array with 3 tetradic Color variations
     * @returns {Color[]}
     */
    tetradic: function tetradic() {
      return [new Color(this.color.setHue(this.color.getHue() + 60)), new Color(this.color.setHue(this.color.getHue() + 180)), new Color(this.color.setHue(this.color.getHue() + 240))];
    },

    /**
     * Returns an Array with 2 triadic Color variations
     * @returns {Color[]}
     */
    triadic: function triadic() {
      return [new Color(this.color.setHue(this.color.getHue() + 120)), new Color(this.color.setHue(this.color.getHue() + 240))];
    }
  });
  /**
   * BaseColor class
   * @class
   */

  var BaseColor =
  /*#__PURE__*/
  function () {
    /**
     * New BaseColor constructor
     * @param {number} [a=1]
     * @returns {BaseColor}
     */
    function BaseColor() {
      var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      _classCallCheck(this, BaseColor);

      this.a = Color.clamp(a, 0, 1);
    }
    /**
     * Darkens the color by a specified amount (between 0 and 1)
     * @param {number} amount
     * @returns {HSLColor}
     */


    _createClass(BaseColor, [{
      key: "darken",
      value: function darken(amount) {
        return this.toHSL().darken(amount);
      }
      /**
       * Gets the alpha value of the color (between 0 and 1)
       * @returns {number}
       */

    }, {
      key: "getAlpha",
      value: function getAlpha() {
        return this.a;
      }
      /**
       * Gets the brightness value of the color (between 0 and 100)
       * @returns {number}
       */

    }, {
      key: "getBrightness",
      value: function getBrightness() {
        return this.toHSV().getBrightness();
      }
      /**
       * Gets the hue value of the color (between 0 and 360)
       * @returns {number}
       */

    }, {
      key: "getHue",
      value: function getHue() {
        return this.toHSV().getHue();
      }
      /**
       * Gets the saturation value of the color (between 0 and 100)
       * @returns {number}
       */

    }, {
      key: "getSaturation",
      value: function getSaturation() {
        return this.toHSV().getSaturation();
      }
      /**
       * Lightens the color by a specified amount (between 0 and 1)
       * @param {number} amount
       * @returns {HSLColor}
       */

    }, {
      key: "lighten",
      value: function lighten(amount) {
        return this.toHSL().lighten(amount);
      }
      /**
       * Gets the luminance value of the color 
       * @returns {number}
       */

    }, {
      key: "luma",
      value: function luma() {
        return this.toRGB().luma();
      }
      /**
       * Mixes this color with another by a specified amount (between 0 and 1)
       * @param {BaseColor} color
       * @param {number} amount
       * @returns {RGBColor}
       */

    }, {
      key: "mix",
      value: function mix(color, amount) {
        return this.toRGB().mix(color, amount);
      }
      /**
       * Multiplies this color with another by a specified amount (between 0 and 1)
       * @param {BaseColor} color
       * @param {number} amount
       * @returns {RGBColor}
       */

    }, {
      key: "multiply",
      value: function multiply(color, amount) {
        return this.toRGB().multiply(color, amount);
      }
      /**
       * Sets the brightness value of the color (between 0 and 100)
       * @param {number} v
       * @returns {HSVColor}
       */

    }, {
      key: "setBrightness",
      value: function setBrightness(v) {
        return this.toHSV().setBrightness(v);
      }
      /**
       * Sets the hue value of the color (between 0 and 360)
       * @param {number} h
       * @returns {HSVColor}
       */

    }, {
      key: "setHue",
      value: function setHue(h) {
        return this.toHSV().setHue(h);
      }
      /**
       * Sets the saturation value of the color (between 0 and 100)
       * @param {number} s
       * @returns {HSVColor}
       */

    }, {
      key: "setSaturation",
      value: function setSaturation(s) {
        return this.toHSV().setSaturation(s);
      }
      /**
       * Shades the color by a specified amount (between 0 and 1)
       * @param {number} amount
       * @returns {RGBColor}
       */

    }, {
      key: "shade",
      value: function shade(amount) {
        return Color.mix(this, new RGBColor(0, 0, 0), amount);
      }
      /**
       * Tints the color by a specified amount (between 0 and 1)
       * @param {number} amount
       * @returns {RGBColor}
       */

    }, {
      key: "tint",
      value: function tint(amount) {
        return Color.mix(this, new RGBColor(255, 255, 255), amount);
      }
      /**
       * Creates a CMY representation of the color
       * @returns {CMYColor}
       */

    }, {
      key: "toCMY",
      value: function toCMY() {
        return this.toRGB().toCMY();
      }
      /**
       * Creates a CMYK representation of the color
       * @returns {CMYKColor}
       */

    }, {
      key: "toCMYK",
      value: function toCMYK() {
        return this.toCMY().toCMYK();
      }
      /**
       * Creates a HSL representation of the color
       * @returns {HSLColor}
       */

    }, {
      key: "toHSL",
      value: function toHSL() {
        return this.toRGB().toHSL();
      }
      /**
       * Creates a HSV representation of the color
       * @returns {HSVColor}
       */

    }, {
      key: "toHSV",
      value: function toHSV() {
        return this.toRGB().toHSV();
      }
      /**
       * Tones the color by a specified amount (between 0 and 1)
       * @param {number} amount
       * @returns {RGBColor}
       */

    }, {
      key: "tone",
      value: function tone(amount) {
        return Color.mix(this, new RGB(127, 127, 127), amount);
      }
      /**
       * Returns a string representation of the color
       * @returns {string}
       */

    }, {
      key: "toString",
      value: function toString() {
        return this.toRGB().toString();
      }
      /**
       * Returns the luminance value of the color
       * @returns {number}
       */

    }, {
      key: "valueOf",
      value: function valueOf() {
        return this.luma();
      }
      /**
       * Returns a primitive value of the color
       * @returns {string|number}
       */

    }, {
      key: Symbol.toPrimitive,
      value: function value(hint) {
        return hint === 'number' ? this.valueOf() : this.toString();
      }
    }]);

    return BaseColor;
  }();
  /**
   * CMYColor class
   * @class
   */


  var CMYColor =
  /*#__PURE__*/
  function (_BaseColor) {
    _inherits(CMYColor, _BaseColor);

    /**
     * New CMYColor constructor
     * @param {number} [c]
     * @param {number} [m]
     * @param {number} [y]
     * @param {number} [a=1]
     * @returns {CMYColor}
     */
    function CMYColor(c, m, y) {
      var _this4;

      var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

      _classCallCheck(this, CMYColor);

      _this4 = _possibleConstructorReturn(this, _getPrototypeOf(CMYColor).call(this, a));
      _this4.c = Color.clamp(c);
      _this4.m = Color.clamp(m);
      _this4.y = Color.clamp(y);
      return _this4;
    }
    /**
     * Sets the alpha value of the color (between 0 and 1)
     * @param {number} a
     * @returns {CMYColor}
     */


    _createClass(CMYColor, [{
      key: "setAlpha",
      value: function setAlpha(a) {
        return new CMYColor(this.c, this.m, this.y, a);
      }
      /**
       * Creates a CMY representation of the color
       * @returns {CMYColor}
       */

    }, {
      key: "toCMY",
      value: function toCMY() {
        return this;
      }
      /**
       * Creates a CMYK representation of the color
       * @returns {CMYKColor}
       */

    }, {
      key: "toCMYK",
      value: function toCMYK() {
        var _Color$CMY2CMYK = Color.CMY2CMYK(this.c, this.m, this.y),
            _Color$CMY2CMYK2 = _slicedToArray(_Color$CMY2CMYK, 4),
            c = _Color$CMY2CMYK2[0],
            m = _Color$CMY2CMYK2[1],
            y = _Color$CMY2CMYK2[2],
            k = _Color$CMY2CMYK2[3];

        return new CMYKColor(c, m, y, k, this.a);
      }
      /**
       * Creates a RGB representation of the color
       * @returns {RGBColor}
       */

    }, {
      key: "toRGB",
      value: function toRGB() {
        var _Color$CMY2RGB = Color.CMY2RGB(this.c, this.m, this.y),
            _Color$CMY2RGB2 = _slicedToArray(_Color$CMY2RGB, 3),
            r = _Color$CMY2RGB2[0],
            g = _Color$CMY2RGB2[1],
            b = _Color$CMY2RGB2[2];

        return new RGBColor(r, g, b, this.a);
      }
    }]);

    return CMYColor;
  }(BaseColor);
  /**
   * CMYKColor class
   * @class
   */


  var CMYKColor =
  /*#__PURE__*/
  function (_BaseColor2) {
    _inherits(CMYKColor, _BaseColor2);

    /**
     * New CMYKColor constructor
     * @param {number} [c]
     * @param {number} [m]
     * @param {number} [y]
     * @param {number} [k]
     * @param {number} [a=1]
     * @returns {CMYKColor}
     */
    function CMYKColor(c, m, y, k) {
      var _this5;

      var a = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;

      _classCallCheck(this, CMYKColor);

      _this5 = _possibleConstructorReturn(this, _getPrototypeOf(CMYKColor).call(this, a));
      _this5.c = Color.clamp(c);
      _this5.m = Color.clamp(m);
      _this5.y = Color.clamp(y);
      _this5.k = Color.clamp(k);
      return _this5;
    }
    /**
     * Sets the alpha value of the color (between 0 and 1)
     * @param {number} a
     * @returns {CMYKColor}
     */


    _createClass(CMYKColor, [{
      key: "setAlpha",
      value: function setAlpha(a) {
        return new CMYKColor(this.c, this.m, this.y, this.k, a);
      }
      /**
       * Creates a CMY representation of the color
       * @returns {CMYColor}
       */

    }, {
      key: "toCMY",
      value: function toCMY() {
        var _Color$CMYK2CMY = Color.CMYK2CMY(this.c, this.m, this.y, this.k),
            _Color$CMYK2CMY2 = _slicedToArray(_Color$CMYK2CMY, 3),
            c = _Color$CMYK2CMY2[0],
            m = _Color$CMYK2CMY2[1],
            y = _Color$CMYK2CMY2[2];

        return new CMYColor(c, m, y, this.a);
      }
      /**
       * Creates a CMYK representation of the color
       * @returns {CMYKColor}
       */

    }, {
      key: "toCMYK",
      value: function toCMYK() {
        return this;
      }
      /**
       * Creates a RGB representation of the color
       * @returns {RGBColor}
       */

    }, {
      key: "toRGB",
      value: function toRGB() {
        return this.toCMY().toRGB();
      }
    }]);

    return CMYKColor;
  }(BaseColor);
  /**
   * HSLColor class
   * @class
   */


  var HSLColor =
  /*#__PURE__*/
  function (_BaseColor3) {
    _inherits(HSLColor, _BaseColor3);

    /**
     * New HSLColor constructor
     * @param {number} [h]
     * @param {number} [s]
     * @param {number} [l]
     * @param {number} [a=1]
     * @returns {HSLColor}
     */
    function HSLColor(h, s, l) {
      var _this6;

      var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

      _classCallCheck(this, HSLColor);

      _this6 = _possibleConstructorReturn(this, _getPrototypeOf(HSLColor).call(this, a));
      _this6.h = h % 360;
      _this6.s = Color.clamp(s);
      _this6.l = Color.clamp(l);
      return _this6;
    }
    /**
     * Darkens the color by a specified amount (between 0 and 1)
     * @param {number} amount
     * @returns {HSLColor}
     */


    _createClass(HSLColor, [{
      key: "darken",
      value: function darken(amount) {
        return new HSLColor(this.h, this.s, this.l - this.l * amount, this.a);
      }
      /**
       * Lightens the color by a specified amount (between 0 and 1)
       * @param {number} amount
       * @returns {HSLColor}
       */

    }, {
      key: "lighten",
      value: function lighten(amount) {
        return new HSLColor(this.h, this.s, this.l + (100 - this.l) * amount, this.a);
      }
      /**
       * Sets the alpha value of the color (between 0 and 1)
       * @param {number} a
       * @returns {HSLColor}
       */

    }, {
      key: "setAlpha",
      value: function setAlpha(a) {
        return new HSL(this.h, this.s, this.l, a);
      }
      /**
       * Creates a HSL representation of the color
       * @returns {HSLColor}
       */

    }, {
      key: "toHSL",
      value: function toHSL() {
        return this;
      }
      /**
       * Creates a RGB representation of the color
       * @returns {RGBColor}
       */

    }, {
      key: "toRGB",
      value: function toRGB() {
        var _Color$HSL2RGB = Color.HSL2RGB(this.h, this.s, this.l),
            _Color$HSL2RGB2 = _slicedToArray(_Color$HSL2RGB, 3),
            r = _Color$HSL2RGB2[0],
            g = _Color$HSL2RGB2[1],
            b = _Color$HSL2RGB2[2];

        return new RGBColor(r, g, b, this.a);
      }
    }]);

    return HSLColor;
  }(BaseColor);
  /**
   * HSVColor class
   * @class
   */


  var HSVColor =
  /*#__PURE__*/
  function (_BaseColor4) {
    _inherits(HSVColor, _BaseColor4);

    /**
     * New HSVColor constructor
     * @param {number} [h]
     * @param {number} [s]
     * @param {number} [v]
     * @param {number} [a=1]
     * @returns {HSVColor}
     */
    function HSVColor(h, s, v) {
      var _this7;

      var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

      _classCallCheck(this, HSVColor);

      _this7 = _possibleConstructorReturn(this, _getPrototypeOf(HSVColor).call(this, a));
      _this7.h = h % 360;
      _this7.s = Color.clamp(s);
      _this7.v = Color.clamp(v);
      return _this7;
    }
    /**
     * Gets the brightness value of the color (between 0 and 100)
     * @returns {number}
     */


    _createClass(HSVColor, [{
      key: "getBrightness",
      value: function getBrightness() {
        return this.v;
      }
      /**
       * Gets the hue value of the color (between 0 and 360)
       * @returns {number}
       */

    }, {
      key: "getHue",
      value: function getHue() {
        return this.h;
      }
      /**
       * Gets the saturation value of the color (between 0 and 100)
       * @returns {number}
       */

    }, {
      key: "getSaturation",
      value: function getSaturation() {
        return this.s;
      }
      /**
       * Sets the alpha value of the color (between 0 and 1)
       * @param {number} a
       * @returns {HSVColor}
       */

    }, {
      key: "setAlpha",
      value: function setAlpha(a) {
        return new HSVColor(this.h, this.s, this.v, a);
      }
      /**
       * Sets the brightness value of the color (between 0 and 100)
       * @param {number} v
       * @returns {HSVColor}
       */

    }, {
      key: "setBrightness",
      value: function setBrightness(v) {
        return new HSVColor(this.h, this.s, v, this.a);
      }
      /**
       * Sets the hue value of the color (between 0 and 360)
       * @param {number} h
       * @returns {HSVColor}
       */

    }, {
      key: "setHue",
      value: function setHue(h) {
        return new HSVColor(h, this.s, this.v, this.a);
      }
      /**
       * Sets the saturation value of the color (between 0 and 100)
       * @param {number} s
       * @returns {HSVColor}
       */

    }, {
      key: "setSaturation",
      value: function setSaturation(s) {
        return new HSVColor(this.h, s, this.v, this.a);
      }
      /**
       * Creates a HSV representation of the color
       * @returns {HSVColor}
       */

    }, {
      key: "toHSV",
      value: function toHSV() {
        return this;
      }
      /**
       * Creates a RGB representation of the color
       * @returns {RGBColor}
       */

    }, {
      key: "toRGB",
      value: function toRGB() {
        var _Color$HSV2RGB = Color.HSV2RGB(this.h, this.s, this.v),
            _Color$HSV2RGB2 = _slicedToArray(_Color$HSV2RGB, 3),
            r = _Color$HSV2RGB2[0],
            g = _Color$HSV2RGB2[1],
            b = _Color$HSV2RGB2[2];

        return new RGBColor(r, g, b, this.a);
      }
    }]);

    return HSVColor;
  }(BaseColor);
  /**
   * RGBColor class
   * @class
   */


  var RGBColor =
  /*#__PURE__*/
  function (_BaseColor5) {
    _inherits(RGBColor, _BaseColor5);

    /**
     * New RGBColor constructor
     * @param {number} [r]
     * @param {number} [g]
     * @param {number} [b]
     * @param {number} [a=1]
     * @returns {RGBColor}
     */
    function RGBColor(r, g, b) {
      var _this8;

      var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

      _classCallCheck(this, RGBColor);

      _this8 = _possibleConstructorReturn(this, _getPrototypeOf(RGBColor).call(this, a));
      _this8.r = Color.clamp(r, 0, 255);
      _this8.g = Color.clamp(g, 0, 255);
      _this8.b = Color.clamp(b, 0, 255);
      return _this8;
    }
    /**
     * Gets the luminance value of the color 
     * @returns {number}
     */


    _createClass(RGBColor, [{
      key: "luma",
      value: function luma() {
        return Color.RGB2Luma(this.r, this.g, this.b);
      }
      /**
       * Mixes this color with another by a specified amount (between 0 and 1)
       * @param {BaseColor} color
       * @param {number} amount
       * @returns {RGBColor}
       */

    }, {
      key: "mix",
      value: function mix(color, amount) {
        var rgb = color.toRGB();
        return new RGBColor(Color.lerp(this.r, rgb.r, amount), Color.lerp(this.g, rgb.g, amount), Color.lerp(this.b, rgb.b, amount), Color.lerp(this.a, rgb.a, amount));
      }
      /**
       * Multiplies this color with another by a specified amount (between 0 and 1)
       * @param {BaseColor} color
       * @param {number} amount
       * @returns {RGBColor}
       */

    }, {
      key: "multiply",
      value: function multiply(color, amount) {
        var rgb = color.toRGB();
        return new RGBColor(Color.lerp(this.r, this.r * rgb.r / 255, amount), Color.lerp(this.g, this.g * rgb.g / 255, amount), Color.lerp(this.b, this.b * rgb.b / 255, amount), Color.lerp(this.a, this.a * rgb.a, amount));
      }
      /**
       * Sets the alpha value of the color (between 0 and 1)
       * @param {number} a
       * @returns {RGBColor}
       */

    }, {
      key: "setAlpha",
      value: function setAlpha(a) {
        return new RGBColor(this.r, this.g, this.b, a);
      }
      /**
       * Creates a CMY representation of the color
       * @returns {CMYColor}
       */

    }, {
      key: "toCMY",
      value: function toCMY() {
        var _Color$RGB2CMY = Color.RGB2CMY(this.r, this.g, this.b),
            _Color$RGB2CMY2 = _slicedToArray(_Color$RGB2CMY, 3),
            c = _Color$RGB2CMY2[0],
            m = _Color$RGB2CMY2[1],
            y = _Color$RGB2CMY2[2];

        return new CMYColor(c, m, y, this.a);
      }
      /**
       * Creates a HSL representation of the color
       * @returns {HSLColor}
       */

    }, {
      key: "toHSL",
      value: function toHSL() {
        var _Color$RGB2HSL = Color.RGB2HSL(this.r, this.g, this.b),
            _Color$RGB2HSL2 = _slicedToArray(_Color$RGB2HSL, 3),
            h = _Color$RGB2HSL2[0],
            s = _Color$RGB2HSL2[1],
            l = _Color$RGB2HSL2[2];

        return new HSLColor(h, s, l, this.a);
      }
      /**
       * Creates a HSLV representation of the color
       * @returns {HSVColor}
       */

    }, {
      key: "toHSV",
      value: function toHSV() {
        var _Color$RGB2HSV = Color.RGB2HSV(this.r, this.g, this.b),
            _Color$RGB2HSV2 = _slicedToArray(_Color$RGB2HSV, 3),
            h = _Color$RGB2HSV2[0],
            s = _Color$RGB2HSV2[1],
            v = _Color$RGB2HSV2[2];

        return new HSVColor(h, s, v, this.a);
      }
      /**
       * Creates a RGB representation of the color
       * @returns {RGBColor}
       */

    }, {
      key: "toRGB",
      value: function toRGB() {
        return this;
      }
      /**
       * To String
       * @returns {string}
       */

    }, {
      key: "toString",
      value: function toString() {
        var a = Math.round(this.a * 100) / 100;

        if (a === 0) {
          return 'transparent';
        }

        var r = Math.round(this.r);
        var g = Math.round(this.g);
        var b = Math.round(this.b);

        if (a < 1) {
          return "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(a, ")");
        }

        var hex = "#".concat((0x1000000 + (b | g << 8 | r << 16)).toString(16).slice(1));
        var name = Object.keys(Color.colors).find(function (name) {
          return Color.colors[name] === hex;
        });

        if (name) {
          return name;
        }

        if (hex[1] === hex[2] && hex[3] === hex[4] && hex[5] === hex[6]) {
          return "#".concat(hex[1]).concat(hex[3]).concat(hex[5]);
        }

        return hex;
      }
    }]);

    return RGBColor;
  }(BaseColor);

  return {
    Color: Color,
    ColorImmutable: ColorImmutable,
    BaseColor: BaseColor,
    CMYColor: CMYColor,
    CMYKColor: CMYKColor,
    HSLColor: HSLColor,
    HSVColor: HSVColor,
    RGBColor: RGBColor
  };
});