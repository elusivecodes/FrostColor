"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

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
  var Color =
  /*#__PURE__*/
  function () {
    /**
     * New Color constructor
     * @param {int} [r]
     * @param {int} [g]
     * @param {int} [b]
     * @param {float} [a]
     * @returns {Color}
     */
    function Color() {
      var r = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var g = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var b = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

      _classCallCheck(this, Color);

      if (b !== null) {
        this.color = new RGB(r, g, b, a);
      } else if (r instanceof ColorBase) {
        this.color = r;
      } else if (r instanceof Color) {
        this.color = r.color;
      } else {
        this.color = new HSL(0, 0, r, g);
      }
    }
    /**
     * Set Color
     * @param {Base} color
     * @returns {Color}
     */


    _createClass(Color, [{
      key: "setColor",
      value: function setColor(color) {
        this.color = color;
        return this;
      }
      /**
       * To String
       * @returns {string}
       */

    }, {
      key: "toString",
      value: function toString() {
        return this.color.toString();
      }
      /**
       * Value Of
       * @returns {float}
       */

    }, {
      key: "valueOf",
      value: function valueOf() {
        return this.luma();
      }
      /**
       * To Primitive
       * @returns {string|float}
       */

    }, {
      key: Symbol.toPrimitive,
      value: function value(hint) {
        return hint === 'number' ? this.valueOf() : this.toString();
      }
    }]);

    return Color;
  }();

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
       * Set Color
       * @param {Base} color
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
     * CMY2CMYK
     * @param {int} c
     * @param {int} m
     * @param {int} y
     * @returns {Array}
     */
    CMY2CMYK: function CMY2CMYK(c, m, y) {
      var k = Math.min(c, m, y);

      if (k === 100) {
        return [0, 0, 0, k];
      }

      return [(c - k) / (100 - k) * 100, (m - k) / (100 - k) * 100, (y - k) / (100 - k) * 100, k];
    },

    /**
     * CMY2RGB
     * @param {int} c
     * @param {int} m
     * @param {int} y
     * @returns {Array}
     */
    CMY2RGB: function CMY2RGB(c, m, y) {
      return [(100 - c) * 2.5, (100 - m) * 2.5, (100 - y) * 2.5];
    },

    /**
     * CMYK2CMY
     * @param {int} c
     * @param {int} m
     * @param {int} y
     * @param {int} k
     * @returns {Array}
     */
    CMYK2CMY: function CMYK2CMY(c, m, y, k) {
      return [c * (100 - k) + k, m * (100 - k) + k, y * (100 - k) + k];
    },

    /**
     * HSL2RGB
     * @param {int} h
     * @param {int} s
     * @param {int} l
     * @returns {Array}
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
     * HSV2RGB
     * @param {int} h
     * @param {int} s
     * @param {int} v
     * @returns {Array}
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
     * RGB2CMY
     * @param {int} r
     * @param {int} g
     * @param {int} b
     * @returns {Array}
     */
    RGB2CMY: function RGB2CMY(r, g, b) {
      return [100 - r / 2.55, 100 - g / 2.55, 100 - b / 2.55];
    },

    /**
     * RGB2Luma
     * @param {int} r
     * @param {int} g
     * @param {int} b
     * @returns {float}
     */
    RGB2Luma: function RGB2Luma(r, g, b) {
      return 0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255);
    },

    /**
     * RGB2HSL
     * @param {int} r
     * @param {int} g
     * @param {int} b
     * @returns {Array}
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
     * RGB2HSV
     * @param {int} r
     * @param {int} g
     * @param {int} b
     * @returns {Array}
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
     * RGBHue
     * @param {float} v1
     * @param {float} v2
     * @param {float} vH
     * @returns {float}
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
     * From CMY
     * @param {int} c
     * @param {int} m
     * @param {int} y
     * @param {float} [a]
     * @returns {Color}
     */
    fromCMY: function fromCMY() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return new this(_construct(CMY, args));
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
    fromCMYK: function fromCMYK() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return new this(_construct(CMYK, args));
    },

    /**
     * From HSL
     * @param {int} h
     * @param {int} s
     * @param {int} l
     * @param {float} [a]
     * @returns {Color}
     */
    fromHSL: function fromHSL() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return new this(_construct(HSL, args));
    },

    /**
     * From HSV
     * @param {int} h
     * @param {int} s
     * @param {int} v
     * @param {float} [a]
     * @returns {Color}
     */
    fromHSV: function fromHSV() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return new this(_construct(HSV, args));
    },

    /**
     * From RGB
     * @param {int} r
     * @param {int} g
     * @param {int} b
     * @param {float} [a]
     * @returns {Color}
     */
    fromRGB: function fromRGB() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      return new this(_construct(RGB, args));
    },

    /**
     * From String
     * @param {string} string
     * @returns {Color}
     */
    fromString: function fromString(string) {
      string = string.toLowerCase();

      if (string === 'transparent') {
        return this.fromRGB(0, 0, 0, 0);
      }

      if (this.colors[string]) {
        string = this.colors[string];
      }

      var hexMatch = string.match(this.hexRegEx);

      if (hexMatch) {
        var rgb = hexMatch.slice(1, 4).map(function (value) {
          return parseInt(value, 16);
        });
        return this.fromRGB(rgb[0], rgb[1], rgb[2]);
      }

      var hexMatchShort = string.match(this.hexRegExShort);

      if (hexMatchShort) {
        var _rgb = hexMatchShort.slice(1, 4).map(function (value) {
          return 0x11 * parseInt(value, 16);
        });

        return this.fromRGB(_rgb[0], _rgb[1], _rgb[2]);
      }

      var RGBAMatch = string.match(this.RGBARegEx);

      if (RGBAMatch) {
        return this.fromRGB(RGBAMatch[1], RGBAMatch[2], RGBAMatch[3], RGBAMatch[4]);
      }

      var RGBMatch = string.match(this.RGBRegEx);

      if (RGBMatch) {
        return this.fromRGB(RGBMatch[1], RGBMatch[2], RGBMatch[3]);
      }

      var HSLAMatch = string.match(this.HSLARegEx);

      if (HSLAMatch) {
        return this.fromHSL(HSLAMatch[1], HSLAMatch[2], HSLAMatch[3], HSLAMatch[4]);
      }

      var HSLMatch = string.match(this.HSLRegEx);

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
    mix: function mix(color1, color2, amount) {
      return new this(color1.color.mix(color2.color, amount));
    },

    /**
     * Multiply
     * @param {Color} color1
     * @param {Color} color2
     * @param {float} amount
     * @returns {Color}
     */
    multiply: function multiply(color1, color2, amount) {
      return new this(color1.color.multiply(color2.color, amount));
    }
  });
  Object.assign(Color.prototype, {
    /**
     * Get Alpha
     * @returns {float} The alpha value of the color (between 0 and 1)
     */
    getAlpha: function getAlpha() {
      return this.color.getAlpha();
    },

    /**
     * Get Brightness
     * @returns {int} The brightness value of the color (between 0 and 100)
     */
    getBrightness: function getBrightness() {
      return this.color.getBrightness();
    },

    /**
     * Get Hue
     * @returns {int} The hue value of the color (between 0 and 360)
     */
    getHue: function getHue() {
      return this.color.getHue();
    },

    /**
     * Get Saturation
     * @returns {int} The saturation value of the color (between 0 and 100)
     */
    getSaturation: function getSaturation() {
      return this.color.getSaturation();
    },

    /**
     * Luma
     * @returns {int} The luma value of the color
     */
    luma: function luma() {
      return this.color.luma();
    },

    /**
     * Set Alpha
     * @param {float} a The new alpha value (between 0 and 1)
     * @returns {Color}
     */
    setAlpha: function setAlpha(alpha) {
      return this.setColor(this.color.setAlpha(alpha));
    },

    /**
     * Set Brightness
     * @param {int} v The new brightness value (between 0 and 100)
     * @returns {Color}
     */
    setBrightness: function setBrightness(brightness) {
      return this.setColor(this.color.setBrightness(brightness));
    },

    /**
     * Set Hue
     * @param {int} h The new hue value (between 0 and 360)
     * @returns {Color}
     */
    setHue: function setHue(hue) {
      return this.setColor(this.color.setHue(hue));
    },

    /**
     * Set Saturation
     * @param {int} s The new saturation value (between 0 and 100)
     * @returns {Color}
     */
    setSaturation: function setSaturation(saturation) {
      return this.setColor(this.color.setSaturation(saturation));
    }
  });
  Object.assign(Color.prototype, {
    /**
     * Darken
     * @param {float} amount The amount to darken the color by (between 0 and 1)
     * @returns {Color}
     */
    darken: function darken(amount) {
      return this.setColor(this.color.darken(amount));
    },

    /**
     * Lighten
     * @param {float} amount The amount to lighten the color by (between 0 and 1)
     * @returns {Color}
     */
    lighten: function lighten(amount) {
      return this.setColor(this.color.lighten(amount));
    },

    /**
     * Shade
     * @param {float} amount The amount to shade the color by (between 0 and 1)
     * @returns {Color}
     */
    shade: function shade(amount) {
      return this.setColor(this.color.shade(amount));
    },

    /**
     * Tint
     * @param {float} amount The amount to tint the color by (between 0 and 1)
     * @returns {RGB}
     */
    tint: function tint(amount) {
      return this.setColor(this.color.tint(amount));
    },

    /**
     * Tone
     * @param {float} amount The amount to tone the color by (between 0 and 1)
     * @returns {RGB}
     */
    tone: function tone(amount) {
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
     * Shades
     * @param {int} [shades=10] The number of shades to create
     * @returns {Array}
     */
    shades: function shades() {
      var _this = this;

      var _shades = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

      return new Array(_shades).fill(0).map(function (value, index) {
        return _this.color.shade(index / (_shades + 1));
      });
    },

    /**
     * Tints
     * @param {int} [tints=10] The number of tints to create
     * @returns {Array}
     */
    tints: function tints() {
      var _this2 = this;

      var _tints = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

      return new Array(_tints).fill(0).map(function (value, index) {
        return _this2.color.tint(index / (_tints + 1));
      });
    },

    /**
     * Tones
     * @param {int} [tones=10] The number of tones to create
     * @returns {Array}
     */
    tones: function tones() {
      var _this3 = this;

      var _tones = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

      return new Array(_tones).fill(0).map(function (value, index) {
        return _this3.color.tone(index / (_tones + 1));
      });
    }
  });
  Object.assign(Color.prototype, {
    /**
     * Analogous
     * @returns {Array}
     */
    analogous: function analogous() {
      return [new Color(this.color.setHue(this.color.getHue() + 30)), new Color(this.color.setHue(this.color.getHue() + 330))];
    },

    /**
     * Complementary
     * @returns {Color}
     */
    complementary: function complementary() {
      return new Color(this.color.setHue(this.color.getHue() + 180));
    },

    /**
     * Split
     * @returns {Array}
     */
    split: function split() {
      return [new Color(this.color.setHue(this.color.getHue() + 150)), new Color(this.color.setHue(this.color.getHue() + 210))];
    },

    /**
     * Tetradic
     * @returns {Array}
     */
    tetradic: function tetradic() {
      return [new Color(this.color.setHue(this.color.getHue() + 60)), new Color(this.color.setHue(this.color.getHue() + 180)), new Color(this.color.setHue(this.color.getHue() + 240))];
    },

    /**
     * Triadic
     * @returns {Array}
     */
    triadic: function triadic() {
      return [new Color(this.color.setHue(this.color.getHue() + 120)), new Color(this.color.setHue(this.color.getHue() + 240))];
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

  var ColorBase =
  /*#__PURE__*/
  function () {
    function ColorBase() {
      var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      _classCallCheck(this, ColorBase);

      this.a = clamp(a, 0, 1);
    }
    /**
     * Darken
     * @param {float} amount The amount to darken the color by (between 0 and 1)
     * @returns {HSL}
     */


    _createClass(ColorBase, [{
      key: "darken",
      value: function darken(amount) {
        return this.toHSL().darken(amount);
      }
      /**
       * Get Alpha
       * @returns {float} The alpha value of the color (between 0 and 1)
       */

    }, {
      key: "getAlpha",
      value: function getAlpha() {
        return this.a;
      }
      /**
       * Get Brightness
       * @returns {int} The brightness value of the color (between 0 and 100)
       */

    }, {
      key: "getBrightness",
      value: function getBrightness() {
        return this.toHSV().getBrightness();
      }
      /**
       * Get Hue
       * @returns {int} The hue value of the color (between 0 and 360)
       */

    }, {
      key: "getHue",
      value: function getHue() {
        return this.toHSV().getHue();
      }
      /**
       * Get Saturation
       * @returns {int} The saturation value of the color (between 0 and 100)
       */

    }, {
      key: "getSaturation",
      value: function getSaturation() {
        return this.toHSV().getSaturation();
      }
      /**
       * Lighten
       * @param {float} amount The amount to lighten the color by (between 0 and 1)
       * @returns {HSL}
       */

    }, {
      key: "lighten",
      value: function lighten(amount) {
        return this.toHSL().lighten(amount);
      }
      /**
       * Luma
       * @returns {int} The luma value of the color
       */

    }, {
      key: "luma",
      value: function luma() {
        return this.toRGB().luma();
      }
      /**
       * Mix
       * @param {Base} color
       * @param {float} amount
       * @returns {RGB}
       */

    }, {
      key: "mix",
      value: function mix(color, amount) {
        return this.toRGB().mix(color, amount);
      }
      /**
       * Multiply
       * @param {Base} color
       * @param {float} amount
       * @returns {RGB}
       */

    }, {
      key: "multiply",
      value: function multiply(color, amount) {
        return this.toRGB().multiply(color, amount);
      }
      /**
       * Set Brightness
       * @param {int} v The new brightness value (between 0 and 100)
       * @returns {HSV}
       */

    }, {
      key: "setBrightness",
      value: function setBrightness(v) {
        return this.toHSV().setBrightness(v);
      }
      /**
       * Set Hue
       * @param {int} h The new hue value (between 0 and 360)
       * @returns {HSV}
       */

    }, {
      key: "setHue",
      value: function setHue(h) {
        return this.toHSV().setHue(h);
      }
      /**
       * Set Saturation
       * @param {int} s The new saturation value (between 0 and 100)
       * @returns {HSV}
       */

    }, {
      key: "setSaturation",
      value: function setSaturation(s) {
        return this.toHSV().setSaturation(s);
      }
      /**
       * Shade
       * @param {float} amount The amount to shade the color by (between 0 and 1)
       * @returns {RGB}
       */

    }, {
      key: "shade",
      value: function shade(amount) {
        return Color.mix(this, new RGB(0, 0, 0), amount);
      }
      /**
       * Tint
       * @param {float} amount The amount to tint the color by (between 0 and 1)
       * @returns {RGB}
       */

    }, {
      key: "tint",
      value: function tint(amount) {
        return Color.mix(this, new RGB(255, 255, 255), amount);
      }
      /**
       * To CMY
       * @returns {CMY}
       */

    }, {
      key: "toCMY",
      value: function toCMY() {
        return this.toRGB().toCMY();
      }
      /**
       * To CMYK
       * @returns {CMYK}
       */

    }, {
      key: "toCMYK",
      value: function toCMYK() {
        return this.toCMY().toCMYK();
      }
      /**
       * To HSL
       * @returns {HSL}
       */

    }, {
      key: "toHSL",
      value: function toHSL() {
        return this.toRGB().toHSL();
      }
      /**
       * To HSV
       * @returns {HSV}
       */

    }, {
      key: "toHSV",
      value: function toHSV() {
        return this.toRGB().toHSV();
      }
      /**
       * Tone
       * @param {float} amount The amount to tone the color by (between 0 and 1)
       * @returns {RGB}
       */

    }, {
      key: "tone",
      value: function tone(amount) {
        return Color.mix(this, new RGB(127, 127, 127), amount);
      }
      /**
       * To String
       * @returns {string}
       */

    }, {
      key: "toString",
      value: function toString() {
        return this.toRGB().toString();
      }
    }]);

    return ColorBase;
  }();

  var CMY =
  /*#__PURE__*/
  function (_ColorBase) {
    _inherits(CMY, _ColorBase);

    function CMY(c, m, y) {
      var _this4;

      var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

      _classCallCheck(this, CMY);

      _this4 = _possibleConstructorReturn(this, _getPrototypeOf(CMY).call(this, a));
      _this4.c = clamp(c);
      _this4.m = clamp(m);
      _this4.y = clamp(y);
      return _this4;
    }
    /**
     * Set Alpha
     * @param {float} a The new alpha value (between 0 and 1)
     * @returns {CMY}
     */


    _createClass(CMY, [{
      key: "setAlpha",
      value: function setAlpha(a) {
        return new CMY(this.c, this.m, this.y, a);
      }
      /**
       * To CMY
       * @returns {CMY}
       */

    }, {
      key: "toCMY",
      value: function toCMY() {
        return this;
      }
      /**
       * To CMYK
       * @returns {CMYK}
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

        return new CMYK(c, m, y, k, this.a);
      }
      /**
       * To RGB
       * @returns {RGB}
       */

    }, {
      key: "toRGB",
      value: function toRGB() {
        var _Color$CMY2RGB = Color.CMY2RGB(this.c, this.m, this.y),
            _Color$CMY2RGB2 = _slicedToArray(_Color$CMY2RGB, 3),
            r = _Color$CMY2RGB2[0],
            g = _Color$CMY2RGB2[1],
            b = _Color$CMY2RGB2[2];

        return new RGB(r, g, b, this.a);
      }
    }]);

    return CMY;
  }(ColorBase);

  var CMYK =
  /*#__PURE__*/
  function (_ColorBase2) {
    _inherits(CMYK, _ColorBase2);

    function CMYK(c, m, y, k) {
      var _this5;

      var a = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;

      _classCallCheck(this, CMYK);

      _this5 = _possibleConstructorReturn(this, _getPrototypeOf(CMYK).call(this, a));
      _this5.c = clamp(c);
      _this5.m = clamp(m);
      _this5.y = clamp(y);
      _this5.k = clamp(k);
      return _this5;
    }
    /**
     * Set Alpha
     * @param {float} a The new alpha value (between 0 and 1)
     * @returns {CMYK}
     */


    _createClass(CMYK, [{
      key: "setAlpha",
      value: function setAlpha(a) {
        return new CMYK(this.c, this.m, this.y, this.k, a);
      }
      /**
       * To CMY
       * @returns {CMY}
       */

    }, {
      key: "toCMY",
      value: function toCMY() {
        var _Color$CMYK2CMY = Color.CMYK2CMY(this.c, this.m, this.y, this.k),
            _Color$CMYK2CMY2 = _slicedToArray(_Color$CMYK2CMY, 3),
            c = _Color$CMYK2CMY2[0],
            m = _Color$CMYK2CMY2[1],
            y = _Color$CMYK2CMY2[2];

        return new CMY(c, m, y, this.a);
      }
      /**
       * To CMYK
       * @returns {CMYK}
       */

    }, {
      key: "toCMYK",
      value: function toCMYK() {
        return this;
      }
      /**
       * To RGB
       * @returns {RGB}
       */

    }, {
      key: "toRGB",
      value: function toRGB() {
        return this.toCMY().toRGB();
      }
    }]);

    return CMYK;
  }(ColorBase);

  var HSL =
  /*#__PURE__*/
  function (_ColorBase3) {
    _inherits(HSL, _ColorBase3);

    function HSL(h, s, l) {
      var _this6;

      var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

      _classCallCheck(this, HSL);

      _this6 = _possibleConstructorReturn(this, _getPrototypeOf(HSL).call(this, a));
      _this6.h = h % 360;
      _this6.s = clamp(s);
      _this6.l = clamp(l);
      return _this6;
    }
    /**
     * Darken
     * @param {float} amount The amount to darken the color by (between 0 and 1)
     * @returns {HSL}
     */


    _createClass(HSL, [{
      key: "darken",
      value: function darken(amount) {
        var l = this.l - this.l * amount;
        return new HSL(this.h, this.s, l, this.a);
      }
      /**
       * Lighten
       * @param {float} amount The amount to lighten the color by (between 0 and 1)
       * @returns {HSL}
       */

    }, {
      key: "lighten",
      value: function lighten(amount) {
        var l = this.l + (100 - this.l) * amount;
        return new HSL(this.h, this.s, l, this.a);
      }
      /**
       * Set Alpha
       * @param {float} a The new alpha value (between 0 and 1)
       * @returns {HSL}
       */

    }, {
      key: "setAlpha",
      value: function setAlpha(a) {
        return new HSL(this.h, this.s, this.l, a);
      }
      /**
       * To HSL
       * @returns {HSL}
       */

    }, {
      key: "toHSL",
      value: function toHSL() {
        return this;
      }
      /**
       * To RGB
       * @returns {RGB}
       */

    }, {
      key: "toRGB",
      value: function toRGB() {
        var _Color$HSL2RGB = Color.HSL2RGB(this.h, this.s, this.l),
            _Color$HSL2RGB2 = _slicedToArray(_Color$HSL2RGB, 3),
            r = _Color$HSL2RGB2[0],
            g = _Color$HSL2RGB2[1],
            b = _Color$HSL2RGB2[2];

        return new RGB(r, g, b, this.a);
      }
    }]);

    return HSL;
  }(ColorBase);

  var HSV =
  /*#__PURE__*/
  function (_ColorBase4) {
    _inherits(HSV, _ColorBase4);

    function HSV(h, s, v) {
      var _this7;

      var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

      _classCallCheck(this, HSV);

      _this7 = _possibleConstructorReturn(this, _getPrototypeOf(HSV).call(this, a));
      _this7.h = h % 360;
      _this7.s = clamp(s);
      _this7.v = clamp(v);
      return _this7;
    }
    /**
     * Get Brightness
     * @returns {int} The brightness value of the color (between 0 and 100)
     */


    _createClass(HSV, [{
      key: "getBrightness",
      value: function getBrightness() {
        return this.v;
      }
      /**
       * Get Hue
       * @returns {int} The hue value of the color (between 0 and 360)
       */

    }, {
      key: "getHue",
      value: function getHue() {
        return this.h;
      }
      /**
       * Get Saturation
       * @returns {int} The saturation value of the color (between 0 and 100)
       */

    }, {
      key: "getSaturation",
      value: function getSaturation() {
        return this.s;
      }
      /**
       * Set Alpha
       * @param {float} a The new alpha value (between 0 and 1)
       * @returns {HSV}
       */

    }, {
      key: "setAlpha",
      value: function setAlpha(a) {
        return new HSV(this.h, this.s, this.v, a);
      }
      /**
       * Set Brightness
       * @param {int} v The new brightness value (between 0 and 100)
       * @returns {HSV}
       */

    }, {
      key: "setBrightness",
      value: function setBrightness(v) {
        return new HSV(this.h, this.s, v, this.a);
      }
      /**
       * Set Hue
       * @param {int} h The new hue value (between 0 and 360)
       * @returns {HSV}
       */

    }, {
      key: "setHue",
      value: function setHue(h) {
        return new HSV(h, this.s, this.v, this.a);
      }
      /**
       * Set Saturation
       * @param {int} s The new saturation value (between 0 and 100)
       * @returns {HSV}
       */

    }, {
      key: "setSaturation",
      value: function setSaturation(s) {
        return new HSV(this.h, s, this.v, this.a);
      }
      /**
       * To HSV
       * @returns {HSV}
       */

    }, {
      key: "toHSV",
      value: function toHSV() {
        return this;
      }
      /**
       * To RGB
       * @returns {RGB}
       */

    }, {
      key: "toRGB",
      value: function toRGB() {
        var _Color$HSV2RGB = Color.HSV2RGB(this.h, this.s, this.v),
            _Color$HSV2RGB2 = _slicedToArray(_Color$HSV2RGB, 3),
            r = _Color$HSV2RGB2[0],
            g = _Color$HSV2RGB2[1],
            b = _Color$HSV2RGB2[2];

        return new RGB(r, g, b, this.a);
      }
    }]);

    return HSV;
  }(ColorBase);

  var RGB =
  /*#__PURE__*/
  function (_ColorBase5) {
    _inherits(RGB, _ColorBase5);

    function RGB(r, g, b) {
      var _this8;

      var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

      _classCallCheck(this, RGB);

      _this8 = _possibleConstructorReturn(this, _getPrototypeOf(RGB).call(this, a));
      _this8.r = clamp(r, 0, 255);
      _this8.g = clamp(g, 0, 255);
      _this8.b = clamp(b, 0, 255);
      return _this8;
    }
    /**
     * Luma
     * @returns {int} The luma value of the color
     */


    _createClass(RGB, [{
      key: "luma",
      value: function luma() {
        return Color.RGB2Luma(this.r, this.g, this.b);
      }
      /**
       * Mix
       * @param {Base} color
       * @param {float} amount
       * @returns {RGB}
       */

    }, {
      key: "mix",
      value: function mix(color, amount) {
        var rgb = color.toRGB();
        return new RGB(lerp(this.r, rgb.r, amount), lerp(this.g, rgb.g, amount), lerp(this.b, rgb.b, amount), lerp(this.a, rgb.a, amount));
      }
      /**
       * Multiply
       * @param {Base} color
       * @param {float} amount
       * @returns {RGB}
       */

    }, {
      key: "multiply",
      value: function multiply(color, amount) {
        var rgb = color.toRGB();
        return new RGB(lerp(this.r, this.r * rgb.r / 255, amount), lerp(this.g, this.g * rgb.g / 255, amount), lerp(this.b, this.b * rgb.b / 255, amount), lerp(this.a, this.a * rgb.a, amount));
      }
      /**
       * Set Alpha
       * @param {float} a The new alpha value (between 0 and 1)
       * @returns {RGB}
       */

    }, {
      key: "setAlpha",
      value: function setAlpha(a) {
        return new RGB(this.r, this.g, this.b, a);
      }
      /**
       * To CMY
       * @returns {CMY}
       */

    }, {
      key: "toCMY",
      value: function toCMY() {
        var _Color$RGB2CMY = Color.RGB2CMY(this.r, this.g, this.b),
            _Color$RGB2CMY2 = _slicedToArray(_Color$RGB2CMY, 3),
            c = _Color$RGB2CMY2[0],
            m = _Color$RGB2CMY2[1],
            y = _Color$RGB2CMY2[2];

        return new CMY(c, m, y, this.a);
      }
      /**
       * To HSL
       * @returns {HSL}
       */

    }, {
      key: "toHSL",
      value: function toHSL() {
        var _Color$RGB2HSL = Color.RGB2HSL(this.r, this.g, this.b),
            _Color$RGB2HSL2 = _slicedToArray(_Color$RGB2HSL, 3),
            h = _Color$RGB2HSL2[0],
            s = _Color$RGB2HSL2[1],
            l = _Color$RGB2HSL2[2];

        return new HSL(h, s, l, this.a);
      }
      /**
       * To HSV
       * @returns {HSV}
       */

    }, {
      key: "toHSV",
      value: function toHSV() {
        var _Color$RGB2HSV = Color.RGB2HSV(this.r, this.g, this.b),
            _Color$RGB2HSV2 = _slicedToArray(_Color$RGB2HSV, 3),
            h = _Color$RGB2HSV2[0],
            s = _Color$RGB2HSV2[1],
            v = _Color$RGB2HSV2[2];

        return new HSV(h, s, v, this.a);
      }
      /**
       * To RGB
       * @returns {RGB}
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

        var rgb = b | g << 8 | r << 16;
        var hex = '#' + (0x1000000 + rgb).toString(16).slice(1);
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

    return RGB;
  }(ColorBase);
  /**
   * Linear Interpolation
   * @param {float} a
   * @param {float} b
   * @param {float} amount
   * @returns {float}
   */


  function lerp(a, b, amount) {
    return a * (1 - amount) + b * amount;
  }
  /**
   * Clamp
   * @param {float} val
   * @param {float} [min]
   * @param {float} [max]
   * @returns {float}
   */


  function clamp(val) {
    var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
    return Math.max(min, Math.min(max, val));
  }

  return {
    Color: Color,
    ColorImmutable: ColorImmutable
  };
});