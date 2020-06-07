"use strict";

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * FrostColor v1.0.0
 * https://github.com/elusivecodes/FrostColor
 */
(function (global, factory) {
  'use strict';

  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') {
    module.exports = factory();
  } else {
    Object.assign(global, factory());
  }
})(void 0, function () {
  'use strict';
  /**
   * Color class
   * @class
   */

  var Color = /*#__PURE__*/function () {
    /**
     * New Color constructor.
     * @param {number|BaseColor|Color} [a=0] The red value, the brightness value, or a Color or BaseColor object.
     * @param {number} [b=1] The green value or the alpha value.
     * @param {null|number} [c=null] The blue value.
     * @param {number} [d=1] The alpha value.
     * @returns {Color} A new Color object.
     */
    function Color() {
      var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var c = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var d = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

      _classCallCheck(this, Color);

      if (a instanceof BaseColor) {
        this._color = a;
      } else if (a instanceof Color) {
        this._color = a.getColor();
      } else if (c !== null) {
        this._color = new RGBColor(a, b, c, d);
      } else {
        this._color = new HSVColor(0, 0, a, b);
      }
    }
    /**
     * Return the internal BaseColor of the Color object.
     * @returns {BaseColor} The BaseColor.
     */


    _createClass(Color, [{
      key: "getColor",
      value: function getColor() {
        return this._color;
      }
      /**
       * Get the closest color name for the color.
       * @returns {string} The name.
       */

    }, {
      key: "label",
      value: function label() {
        var closest,
            closestDist = Number.MAX_SAFE_INTEGER;

        for (var label in Color.colors) {
          var color = Color.fromHexString(Color.colors[label]);
          var dist = Color.dist(this, color);

          if (dist < closestDist) {
            closest = label;
            closestDist = dist;
          }
        }

        return closest;
      }
      /**
       * Set the BaseColor of the Color object.
       * @param {BaseColor} color A new BaseColor.
       * @returns {Color} The Color object.
       */

    }, {
      key: "setColor",
      value: function setColor(color) {
        this._color = color;
        return this;
      }
      /**
       * Return a hexadecimal string representation of the color.
       * @returns {string} The hexadecimal string.
       */

    }, {
      key: "toHexString",
      value: function toHexString() {
        return this._color.toHexString();
      }
      /**
       * Return a HSL/HSLA string representation of the color.
       * @returns {string} The HSL/HSLA string.
       */

    }, {
      key: "toHSLString",
      value: function toHSLString() {
        return this._color.toHSLString();
      }
      /**
       * Return a RGB/RGBA string representation of the color.
       * @returns {string} The RGB/RGBA string.
       */

    }, {
      key: "toRGBString",
      value: function toRGBString() {
        return this._color.toRGBString();
      }
      /**
       * Return a HTML string representation of the color.
       * @returns {string} The HTML color string.
       */

    }, {
      key: "toString",
      value: function toString() {
        return this._color.toString();
      }
      /**
       * Return the luminance value of the color.
       * @returns {number} The luminance value. (0, 1)
       */

    }, {
      key: "valueOf",
      value: function valueOf() {
        return this._color.valueOf();
      }
      /**
       * Return a primitive value of the color.
       * @returns {string|number} The HTML color string, or the luminance value.
       */

    }, {
      key: Symbol.toPrimitive,
      value: function value(hint) {
        return this._color[Symbol.toPrimitive](hint);
      }
    }]);

    return Color;
  }();
  /**
   * ColorImmutable class
   * @class
   */


  var ColorImmutable = /*#__PURE__*/function (_Color) {
    _inherits(ColorImmutable, _Color);

    var _super = _createSuper(ColorImmutable);

    function ColorImmutable() {
      _classCallCheck(this, ColorImmutable);

      return _super.apply(this, arguments);
    }

    _createClass(ColorImmutable, [{
      key: "setColor",

      /**
       * Create a new ColorImmutable from a BaseColor.
       * @param {BaseColor} color A new BaseColor.
       * @returns {ColorImmutable} A new ColorImmutable object.
       */
      value: function setColor(color) {
        return new ColorImmutable(color);
      }
    }]);

    return ColorImmutable;
  }(Color);
  /**
   * Color (Static) Conversions
   */


  Object.assign(Color, {
    /**
     * Convert CMY color values to CMYK.
     * @param {number} c The cyan value. (0, 100)
     * @param {number} m The magenta value. (0, 100)
     * @param {number} y The yellow value. (0, 100)
     * @returns {number[]} An array containing the CMYK values.
     */
    CMY2CMYK: function CMY2CMYK(c, m, y) {
      var k = Math.min(c, m, y);

      if (k === 100) {
        return [0, 0, 0, k];
      }

      k /= (_readOnlyError("k"), 100);
      return [(c / 100 - k) / (1 - k) * 100, (m / 100 - k) / (1 - k) * 100, (y / 100 - k) / (1 - k) * 100, k * 100];
    },

    /**
     * Convert CMY color values to RGB.
     * @param {number} c The cyan value. (0, 100)
     * @param {number} m The magenta value. (0, 100)
     * @param {number} y The yellow value. (0, 100)
     * @returns {number[]} An array containing the RGB values.
     */
    CMY2RGB: function CMY2RGB(c, m, y) {
      return [(1 - c / 100) * 255, (1 - m / 100) * 255, (1 - y / 100) * 255];
    },

    /**
     * Convert CMYK color values to CMY.
     * @param {number} c The cyan value. (0, 100)
     * @param {number} m The magenta value. (0, 100)
     * @param {number} y The yellow value. (0, 100)
     * @param {number} k The key value. (0, 100)
     * @returns {number[]} An array containing the CMY values.
     */
    CMYK2CMY: function CMYK2CMY(c, m, y, k) {
      k /= 100;
      return [(c / 100 * (1 - k) + k) * 100, (m / 100 * (1 - k) + k) * 100, (y / 100 * (1 - k) + k) * 100];
    },

    /**
     * Convert HSL color values to RGB.
     * @param {number} h The hue value. (0, 360)
     * @param {number} s The saturation value. (0, 100)
     * @param {number} l The lightness value. (0, 100)
     * @returns {number[]} An array containing the RGB values.
     */
    HSL2RGB: function HSL2RGB(h, s, l) {
      if (!l) {
        return [0, 0, 0];
      }

      h /= 360;
      s /= 100;
      l /= 100;
      var v2 = l < 0.5 ? l * (1 + s) : l + s - s * l,
          v1 = 2 * l - v2;
      return [this.RGBHue(v1, v2, h + 1 / 3) * 255, this.RGBHue(v1, v2, h) * 255, this.RGBHue(v1, v2, h - 1 / 3) * 255];
    },

    /**
     * Convert HSV color values to RGB.
     * @param {number} h The hue value. (0, 360)
     * @param {number} s The saturation value. (0, 100)
     * @param {number} v The brightness value (0, 100)
     * @returns {number[]} An array containing the RGB values.
     */
    HSV2RGB: function HSV2RGB(h, s, v) {
      v /= 100;

      if (!s) {
        return [v * 255, v * 255, v * 255];
      }

      h = h / 60 % 6;
      s /= 100;
      var vi = Math.floor(h),
          v1 = v * (1 - s),
          v2 = v * (1 - s * (h - vi)),
          v3 = v * (1 - s * (1 - (h - vi)));
      var r, g, b;

      switch (vi) {
        case 0:
          r = v;
          g = v3;
          b = v1;
          break;

        case 1:
          r = v2;
          g = v;
          b = v1;
          break;

        case 2:
          r = v1;
          g = v;
          b = v3;
          break;

        case 3:
          r = v1;
          g = v2;
          b = v;
          break;

        case 4:
          r = v3;
          g = v1;
          b = v;
          break;

        default:
          r = v;
          g = v1;
          b = v2;
          break;
      }

      return [r * 255, g * 255, b * 255];
    },

    /**
     * Convert RGB color values to CMY.
     * @param {number} r The red value. (0, 255)
     * @param {number} g The green value. (0, 255)
     * @param {number} b The blue value. (0, 255)
     * @returns {number[]} An array containing the CMY values.
     */
    RGB2CMY: function RGB2CMY(r, g, b) {
      return [(1 - r / 255) * 100, (1 - g / 255) * 100, (1 - b / 255) * 100];
    },

    /**
     * Calculate the luminance of an RGB color.
     * @param {number} r The red value. (0, 255)
     * @param {number} g The green value. (0, 255)
     * @param {number} b The blue value. (0, 255)
     * @returns {number} The luminance value.
     */
    RGB2Luma: function RGB2Luma(r, g, b) {
      return 0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255);
    },

    /**
     * Convert RGB color values to HSL.
     * @param {number} r The red value. (0, 255)
     * @param {number} g The green value. (0, 255)
     * @param {number} b The blue value. (0, 255)
     * @returns {number[]} An array containing the HSL values.
     */
    RGB2HSL: function RGB2HSL(r, g, b) {
      r /= 255;
      g /= 255;
      b /= 255;
      var min = Math.min(r, g, b),
          max = Math.max(r, g, b),
          diff = max - min,
          l = (max + min) / 2;

      if (!diff) {
        return [0, 0, l * 100];
      }

      var s = l < 0.5 ? diff / (max + min) : diff / (2 - max - min),
          deltaR = ((max - r) / 6 + diff / 2) / diff,
          deltaG = ((max - g) / 6 + diff / 2) / diff,
          deltaB = ((max - b) / 6 + diff / 2) / diff;
      var h = 0;

      switch (max) {
        case r:
          h = deltaB - deltaG;
          break;

        case g:
          h = 1 / 2 + deltaR - deltaB;
          break;

        case b:
          h = 2 / 3 + deltaG - deltaR;
          break;
      }

      return [(h + 1) % 1 * 360, s * 100, l * 100];
    },

    /**
     * Convert RGB color values to HSV.
     * @param {number} r The red value. (0, 255)
     * @param {number} g The green value. (0, 255)
     * @param {number} b The blue value. (0, 255)
     * @returns {number[]} An array containing the HSV values.
     */
    RGB2HSV: function RGB2HSV(r, g, b) {
      r /= 255;
      g /= 255;
      b /= 255;
      var min = Math.min(r, g, b),
          max = Math.max(r, g, b),
          diff = max - min,
          v = max;

      if (!diff) {
        return [0, 0, v * 100];
      }

      var s = diff / max,
          deltaR = ((max - r) / 6 + diff / 2) / diff,
          deltaG = ((max - g) / 6 + diff / 2) / diff,
          deltaB = ((max - b) / 6 + diff / 2) / diff;
      var h = 0;

      switch (max) {
        case r:
          h = deltaB - deltaG;
          break;

        case g:
          h = 1 / 2 + deltaR - deltaB;
          break;

        case b:
          h = 2 / 3 + deltaG - deltaR;
          break;
      }

      h = (h + 1) % 1;
      return [h * 360, s * 100, v * 100];
    },

    /**
     * Calculate the R, G or B value of a hue.
     * @param {number} v1 The first value.
     * @param {number} v2 The second value.
     * @param {number} vH The hue value.
     * @returns {number} The R, G or B value.
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
  /**
   * Color (Static) Creation
   */

  Object.assign(Color, {
    /**
     * Create a new Color from CMY values.
     * @param {number} c The cyan value. (0, 100)
     * @param {number} m The magenta value. (0, 100)
     * @param {number} y The yellow value. (0, 100)
     * @param {number} [a=1] The alpha value. (0, 1)
     * @returns {Color} A new Color object.
     */
    fromCMY: function fromCMY(c, m, y) {
      var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
      return new this(new CMYColor(c, m, y, a));
    },

    /**
     * Create a new Color from CMYK values.
     * @param {number} c The cyan value. (0, 100)
     * @param {number} m The magenta value. (0, 100)
     * @param {number} y The yellow value. (0, 100)
     * @param {number} k The key value. (0, 100)
     * @param {number} [a=1] The alpha value. (0, 1)
     * @returns {Color} A new Color object.
     */
    fromCMYK: function fromCMYK(c, m, y, k) {
      var a = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
      return new this(new CMYKColor(c, m, y, k, a));
    },

    /**
     * Create a new Color from a hex color string.
     * @param {string} string The hex color string.
     * @returns {Color} A new Color object.
     */
    fromHexString: function fromHexString(string) {
      string = string.trim();
      var hexMatch = string.length > 6 ? string.match(this._hexRegExp) : string.match(this._hexRegExpShort);

      if (!hexMatch) {
        throw new Error('Invalid hex string');
      }

      var rgb = hexMatch.slice(1, 5).map(function (value) {
        return value ? parseInt(value.length == 2 ? value : value + value, 16) : null;
      });
      return new this(rgb[0], rgb[1], rgb[2], rgb[3] ? rgb[3] / 255 : 1);
    },

    /**
     * Create a new Color from HSL values.
     * @param {number} h The hue value. (0, 360)
     * @param {number} s The saturation value. (0, 100)
     * @param {number} l The lightness value. (0, 100)
     * @param {number} [a=1] The alpha value. (0, 1)
     * @returns {Color} A new Color object.
     */
    fromHSL: function fromHSL(h, s, l) {
      var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
      return new this(new HSLColor(h, s, l, a));
    },

    /**
     * Create a new Color from a HSL color string.
     * @param {string} string The HSL color string.
     * @returns {Color} A new Color object.
     */
    fromHSLString: function fromHSLString(string) {
      var HSLMatch = string.match(this._hslRegExp);

      if (!HSLMatch) {
        throw new Error('Invalid HSL string');
      }

      return this.fromHSL(HSLMatch[1], HSLMatch[2], HSLMatch[3]);
    },

    /**
     * Create a new Color from a HSLA color string.
     * @param {string} string The HSLA color string.
     * @returns {Color} A new Color object.
     */
    fromHSLAString: function fromHSLAString(string) {
      var HSLAMatch = string.match(this._hslaRegExp);

      if (!HSLAMatch) {
        throw new Error('Invalid HSLA string');
      }

      return this.fromHSL(HSLAMatch[1], HSLAMatch[2], HSLAMatch[3], HSLAMatch[5] ? HSLAMatch[4] / 100 : HSLAMatch[4]);
    },

    /**
     * Create a new Color from HSV values.
     * @param {number} h The hue value. (0, 360)
     * @param {number} s The saturation value. (0, 100)
     * @param {number} v The brightness value. (0, 100)
     * @param {number} [a=1] The alpha value. (0, 1)
     * @returns {Color} A new Color object.
     */
    fromHSV: function fromHSV(h, s, v) {
      var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
      return new this(new HSVColor(h, s, v, a));
    },

    /**
     * Create a new Color from RGB values.
     * @param {number} r The red value. (0, 255)
     * @param {number} g The green value. (0, 255)
     * @param {number} b The blue value. (0, 255)
     * @param {number} [a=1] The alpha value. (0, 1)
     * @returns {Color} A new Color object.
     */
    fromRGB: function fromRGB(r, g, b) {
      var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
      return new this(new RGBColor(r, g, b, a));
    },

    /**
     * Create a new Color from a RGB color string.
     * @param {string} string The RGB color string.
     * @returns {Color} A new Color object.
     */
    fromRGBString: function fromRGBString(string) {
      var RGBMatch = string.match(this._rgbRegExp);

      if (!RGBMatch) {
        throw new Error('Invalid RGB string');
      }

      return new this(RGBMatch[1], RGBMatch[2], RGBMatch[3]);
    },

    /**
     * Create a new Color from a RGBA color string.
     * @param {string} string The RGBA color string.
     * @returns {Color} A new Color object.
     */
    fromRGBAString: function fromRGBAString(string) {
      var RGBAMatch = string.match(this._rgbaRegExp);

      if (!RGBAMatch) {
        throw new Error('Invalid RGBA string');
      }

      return new this(RGBAMatch[1], RGBAMatch[2], RGBAMatch[3], RGBAMatch[5] ? RGBAMatch[4] / 100 : RGBAMatch[4]);
    },

    /**
     * Create a new Color from a HTML color string.
     * @param {string} string The HTML color string.
     * @returns {Color} A new Color object.
     */
    fromString: function fromString(string) {
      string = string.toLowerCase();

      if (string === 'transparent') {
        return new this(0, 0, 0, 0);
      }

      if (this.colors[string]) {
        string = this.colors[string];
      } else {
        string = string.trim();
      }

      if (string.substring(0, 1) === '#') {
        return this.fromHexString(string);
      }

      if (string.substring(0, 4).toLowerCase() === 'rgba') {
        return this.fromRGBAString(string);
      }

      if (string.substring(0, 3).toLowerCase() === 'rgb') {
        return this.fromRGBString(string);
      }

      if (string.substring(0, 4).toLowerCase() === 'hsla') {
        return this.fromHSLAString(string);
      }

      if (string.substring(0, 3).toLowerCase() === 'hsl') {
        return this.fromHSLString(string);
      }

      throw new Error('Invalid color string');
    }
  });
  /**
   * Color (Static) Helpers
   */

  Object.assign(Color, {
    /**
     * Clamp a value between a min and max.
     * @param {number} value The value to clamp.
     * @param {number} [min=0] The minimum value of the clamped range.
     * @param {number} [max=1] The maximum value of the clamped range.
     * @returns {number} The clamped value.
     */
    _clamp: function _clamp(val) {
      var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
      return Math.max(min, Math.min(max, val));
    },

    /**
     * Linear interpolation from one value to another.
     * @param {number} v1 The starting value.
     * @param {number} v2 The ending value.
     * @param {number} amount The amount to interpolate.
     * @returns {number} The interpolated value.
     */
    _lerp: function _lerp(a, b, amount) {
      return a * (1 - amount) + b * amount;
    }
  });
  /**
   * Color (Static) Utility
   */

  Object.assign(Color, {
    /**
     * Calculate the distance between two colors.
     * @param {Color} color1 The first Color.
     * @param {Color} color2 The second Color.
     * @returns {number} The distance between the colors.
     */
    dist: function dist(color1, color2) {
      var rgb1 = color1.getColor().toRGB();
      var rgb2 = color2.getColor().toRGB();
      return Math.hypot(rgb1._r - rgb2._r, rgb1._g - rgb2._g, rgb1._b - rgb2._b);
    },

    /**
     * Create a new Color by mixing two colors together by a specified amount.
     * @param {Color} color1 The first Color.
     * @param {Color} color2 The second Color.
     * @param {number} amount The amount to mix them by. (0, 1)
     * @returns {Color} A new Color object.
     */
    mix: function mix(color1, color2, amount) {
      return new this(color1.getColor().mix(color2.getColor(), amount));
    },

    /**
     * Create a new Color by multiplying two colors together by a specified amount.
     * @param {Color} color1 The first Color.
     * @param {Color} color2 The second Color.
     * @param {number} amount The amount to multiply them by. (0, 1)
     * @returns {Color} A new Color object.
     */
    multiply: function multiply(color1, color2, amount) {
      return new this(color1.getColor().multiply(color2.getColor(), amount));
    }
  });
  /**
   * Color Attributes
   */

  Object.assign(Color.prototype, {
    /**
     * Get the alpha value of the color.
     * @returns {number} The alpha value. (0, 1)
     */
    getAlpha: function getAlpha() {
      return this._color.getAlpha();
    },

    /**
     * Get the brightness value of the color.
     * @returns {number} The brightness value. (0, 100)
     */
    getBrightness: function getBrightness() {
      return this._color.getBrightness();
    },

    /**
     * Get the hue value of the color.
     * @returns {number} The hue value. (0, 360)
     */
    getHue: function getHue() {
      return this._color.getHue();
    },

    /**
     * Get the saturation value of the color.
     * @returns {number} The saturation value. (0, 100)
     */
    getSaturation: function getSaturation() {
      return this._color.getSaturation();
    },

    /**
     * Get the luminance value of the color 
     * @returns {number} The luminance value. (0, 1)
     */
    luma: function luma() {
      return this._color.luma();
    },

    /**
     * Set the alpha value of the color.
     * @param {number} a The alpha value. (0, 1)
     * @returns {Color} The modified Color object.
     */
    setAlpha: function setAlpha(a) {
      return this.setColor(this._color.setAlpha(a));
    },

    /**
     * Set the brightness value of the color.
     * @param {number} v The brightness value. (0, 100)
     * @returns {Color} The modified Color object.
     */
    setBrightness: function setBrightness(v) {
      return this.setColor(this._color.setBrightness(v));
    },

    /**
     * Set the hue value of the color.
     * @param {number} h The hue value. (0, 360)
     * @returns {Color} The modified Color object.
     */
    setHue: function setHue(h) {
      return this.setColor(this._color.setHue(h));
    },

    /**
     * Set the saturation value of the color.
     * @param {number} s The saturation value. (0, 100)
     * @returns {Color} The modified Color object.
     */
    setSaturation: function setSaturation(s) {
      return this.setColor(this._color.setSaturation(s));
    }
  });
  /**
   * Color Manipulation
   */

  Object.assign(Color.prototype, {
    /**
     * Darken the color by a specified amount.
     * @param {number} amount The amount to darken the color by. (0, 1)
     * @returns {Color} The darkened Color object.
     */
    darken: function darken(amount) {
      return this.setColor(this._color.darken(amount));
    },

    /**
     * Invert the color.
     * @returns {Color} The inverted Color object.
     */
    invert: function invert() {
      return this.setColor(this._color.invert());
    },

    /**
     * Lighten the color by a specified amount.
     * @param {number} amount The amount to lighten the color by. (0, 1)
     * @returns {Color} The lightened Color object.
     */
    lighten: function lighten(amount) {
      return this.setColor(this._color.lighten(amount));
    },

    /**
     * Shade the color by a specified amount.
     * @param {number} amount The amount to shade the color by. (0, 1)
     * @returns {Color} The shaded Color object.
     */
    shade: function shade(amount) {
      return this.setColor(Color.mix(new Color(this), new Color(0), amount).getColor());
    },

    /**
     * Tint the color by a specified amount.
     * @param {number} amount The amount to tint the color by. (0, 1)
     * @returns {Color} The tinted Color object.
     */
    tint: function tint(amount) {
      return this.setColor(Color.mix(new Color(this), new Color(100), amount).getColor());
    },

    /**
     * Tone the color by a specified amount.
     * @param {number} amount The amount to tone the color by. (0, 1)
     * @returns {Color} The toned Color object.
     */
    tone: function tone(amount) {
      return this.setColor(Color.mix(new Color(this), new Color(50), amount).getColor());
    }
  });
  /**
   * Color Palette
   */

  Object.assign(Color.prototype, {
    /**
     * Create a palette object with a specified number of shades, tints and tone variations.
     * @param {number} [shades=10] The number of shades to generate.
     * @param {number} [tints=10] The number of tints to generate.
     * @param {number} [tones=10] The number of tones to generate.
     * @returns {object} A palette object.
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
     * Create an array with a specified number of shade variations.
     * @param {number} [shades=10] The number of shades to generate.
     * @returns {Color[]} An array containing shade variations.
     */
    shades: function shades() {
      var _this = this;

      var shades = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

      var rgb = this._color.toRGB();

      return new Array(shades).fill().map(function (_, index) {
        return new _this.constructor(rgb).shade(index / (shades + 1));
      });
    },

    /**
     * Create an array with a specified number of tint variations.
     * @param {number} [tints=10] The number of tints to generate.
     * @returns {Color[]} An array containing tint variations.
     */
    tints: function tints() {
      var _this2 = this;

      var tints = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

      var rgb = this._color.toRGB();

      return new Array(tints).fill().map(function (_, index) {
        return new _this2.constructor(rgb).tint(index / (tints + 1));
      });
    },

    /**
     * Create an array with a specified number of tone variations.
     * @param {number} [tones=10] The number of tones to generate.
     * @returns {Color[]} An array containing tone variations.
     */
    tones: function tones() {
      var _this3 = this;

      var tones = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

      var rgb = this._color.toRGB();

      return new Array(tones).fill().map(function (_, index) {
        return new _this3.constructor(rgb).tone(index / (tones + 1));
      });
    }
  });
  /**
   * Color Schemes
   */

  Object.assign(Color.prototype, {
    /**
     * Create an array with 2 analogous color variations.
     * @returns {Color[]} An array containing 2 analogous color variations.
     */
    analogous: function analogous() {
      var hsv = this._color.toHSV();

      return [new this.constructor(hsv.setHue(hsv.getHue() + 30)), new this.constructor(hsv.setHue(hsv.getHue() - 30))];
    },

    /**
     * Create a complementary color variation.
     * @returns {Color} A complementary color variation.
     */
    complementary: function complementary() {
      var hsv = this._color.toHSV();

      return new this.constructor(hsv.setHue(hsv.getHue() + 180));
    },

    /**
     * Create an array with 2 split color variations.
     * @returns {Color[]} An array containing 2 split color variations.
     */
    split: function split() {
      var hsv = this._color.toHSV();

      return [new this.constructor(hsv.setHue(hsv.getHue() + 150)), new this.constructor(hsv.setHue(hsv.getHue() - 150))];
    },

    /**
     * Create an array with 3 tetradic color variations.
     * @returns {Color[]} An array containing 3 tetradic color variations.
     */
    tetradic: function tetradic() {
      var hsv = this._color.toHSV();

      return [new this.constructor(hsv.setHue(hsv.getHue() + 60)), new this.constructor(hsv.setHue(hsv.getHue() + 180)), new this.constructor(hsv.setHue(hsv.getHue() + 240))];
    },

    /**
     * Create an array with 2 triadic color variations.
     * @returns {Color[]} An array containing 2 triadic color variations.
     */
    triadic: function triadic() {
      var hsv = this._color.toHSV();

      return [new this.constructor(hsv.setHue(hsv.getHue() + 120)), new this.constructor(hsv.setHue(hsv.getHue() + 240))];
    }
  });
  /**
   * Color (Static) Properties
   */

  Object.assign(Color, {
    // HTML color names
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
    // Hex RegExp
    _hexRegExpShort: /^#([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f]?)$/i,
    _hexRegExp: /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})?$/i,
    // HSL RegExp
    _hslRegExp: /^hsl\(((?:\d*\.)?\d+),\s*((?:\d*\.)?\d+)\%,\s*((?:\d*\.)?\d+)\%\)$/i,
    _hslaRegExp: /^hsla\(((?:\d*\.)?\d+),\s*((?:\d*\.)?\d+)\%,\s*((?:\d*\.)?\d+)\%,\s*((?:\d*\.)?\d+)(\%?)\)$/i,
    // RGB RegExp
    _rgbRegExp: /^rgb\(((?:\d*\.)?\d+),\s*((?:\d*\.)?\d+),\s*((?:\d*\.)?\d+)\)$/i,
    _rgbaRegExp: /^rgba\(((?:\d*\.)?\d+),\s*((?:\d*\.)?\d+),\s*((?:\d*\.)?\d+),\s*((?:\d*\.)?\d+)(\%?)\)$/i
  });
  /**
   * BaseColor class
   * @class
   */

  var BaseColor = /*#__PURE__*/function () {
    /**
     * New BaseColor constructor.
     * @param {number} [a=1] The alpha value. (0, 1)
     * @returns {BaseColor} A new BaseColor object.
     */
    function BaseColor() {
      var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      _classCallCheck(this, BaseColor);

      this._a = Color._clamp(a, 0, 1);
    }
    /**
     * Darken the color by a specified amount.
     * @param {number} amount The amount to darken the color by. (0, 1)
     * @returns {HSLColor} A new HSLColor object.
     */


    _createClass(BaseColor, [{
      key: "darken",
      value: function darken(amount) {
        return this.toHSL().darken(amount);
      }
      /**
       * Get the alpha value of the color.
       * @returns {number} The alpha value. (0, 1)
       */

    }, {
      key: "getAlpha",
      value: function getAlpha() {
        return this._a;
      }
      /**
       * Get the brightness value of the color.
       * @returns {number} The brightness value. (0, 100)
       */

    }, {
      key: "getBrightness",
      value: function getBrightness() {
        return this.toHSV().getBrightness();
      }
      /**
       * Get the hue value of the color.
       * @returns {number} The hue value. (0, 360)
       */

    }, {
      key: "getHue",
      value: function getHue() {
        return this.toHSV().getHue();
      }
      /**
       * Get the saturation value of the color.
       * @returns {number} The saturation value. (0, 100)
       */

    }, {
      key: "getSaturation",
      value: function getSaturation() {
        return this.toHSV().getSaturation();
      }
      /**
       * Invert the color.
       * @returns {RGBColor} A new RGBColor object.
       */

    }, {
      key: "invert",
      value: function invert() {
        return this.toRGB().invert();
      }
      /**
       * Lighten the color by a specified amount.
       * @param {number} amount The amount to lighten the color by. (0, 1)
       * @returns {HSLColor} A new HSLColor object.
       */

    }, {
      key: "lighten",
      value: function lighten(amount) {
        return this.toHSL().lighten(amount);
      }
      /**
       * Get the luminance value of the color.
       * @returns {number} The luminance value. (0, 1)
       */

    }, {
      key: "luma",
      value: function luma() {
        return this.toRGB().luma();
      }
      /**
       * Mix this color with another by a specified amount.
       * @param {BaseColor} color The color to mix with.
       * @param {number} amount The amount to mix by. (0, 1)
       * @returns {RGBColor} A new RGBColor object.
       */

    }, {
      key: "mix",
      value: function mix(color, amount) {
        return this.toRGB().mix(color, amount);
      }
      /**
       * Multiply this color with another by a specified amount.
       * @param {BaseColor} color The color to multiply with.
       * @param {number} amount The amount to multiply by. (0, 1)
       * @returns {RGBColor} A new RGBColor object.
       */

    }, {
      key: "multiply",
      value: function multiply(color, amount) {
        return this.toRGB().multiply(color, amount);
      }
      /**
       * Set the brightness value of the color.
       * @param {number} v The brightness value. (0, 100)
       * @returns {HSVColor} A new HSVColor object.
       */

    }, {
      key: "setBrightness",
      value: function setBrightness(v) {
        return this.toHSV().setBrightness(v);
      }
      /**
       * Set the hue value of the color.
       * @param {number} h The hue value. (0, 360)
       * @returns {HSVColor} A new HSVColor object.
       */

    }, {
      key: "setHue",
      value: function setHue(h) {
        return this.toHSV().setHue(h);
      }
      /**
       * Set the saturation value of the color.
       * @param {number} s The saturation value. (0, 100)
       * @returns {HSVColor} A new HSVColor object.
       */

    }, {
      key: "setSaturation",
      value: function setSaturation(s) {
        return this.toHSV().setSaturation(s);
      }
      /**
       * Create a CMY representation of the color.
       * @returns {CMYColor} A new CMYColor object.
       */

    }, {
      key: "toCMY",
      value: function toCMY() {
        return this.toRGB().toCMY();
      }
      /**
       * Create a CMYK representation of the color.
       * @returns {CMYKColor} A new CMYKColor object.
       */

    }, {
      key: "toCMYK",
      value: function toCMYK() {
        return this.toCMY().toCMYK();
      }
      /**
       * Create a HSL representation of the color.
       * @returns {HSLColor} A new HSLColor object.
       */

    }, {
      key: "toHSL",
      value: function toHSL() {
        return this.toRGB().toHSL();
      }
      /**
       * Create a HSV representation of the color.
       * @returns {HSVColor} A new HSVColor object.
       */

    }, {
      key: "toHSV",
      value: function toHSV() {
        return this.toRGB().toHSV();
      }
      /**
       * Return a hexadecimal string representation of the color.
       * @returns {string} The hexadecimal string.
       */

    }, {
      key: "toHexString",
      value: function toHexString() {
        return this.toRGB().toHexString();
      }
      /**
       * Return a HSL/HSLA string representation of the color.
       * @returns {string} The HSL/HSLA string.
       */

    }, {
      key: "toHSLString",
      value: function toHSLString() {
        return this.toHSL().toHSLString();
      }
      /**
       * Return a RGB/RGBA string representation of the color.
       * @returns {string} The RGB/RGBA string.
       */

    }, {
      key: "toRGBString",
      value: function toRGBString() {
        return this.toRGB().toRGBString();
      }
      /**
       * Return a HTML string representation of the color.
       * @returns {string} The HTML color string.
       */

    }, {
      key: "toString",
      value: function toString() {
        return this.toRGB().toString();
      }
      /**
       * Get the luminance value of the color.
       * @returns {number} The luminance value. (0, 1)
       */

    }, {
      key: "valueOf",
      value: function valueOf() {
        return this.luma();
      }
      /**
       * Return a primitive value of the color.
       * @returns {string|number} The HTML color string, or the luminance value.
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


  var CMYColor = /*#__PURE__*/function (_BaseColor) {
    _inherits(CMYColor, _BaseColor);

    var _super2 = _createSuper(CMYColor);

    /**
     * New CMYColor constructor.
     * @param {number} c The cyan value. (0, 100)
     * @param {number} m The magenta value. (0, 100)
     * @param {number} y The yellow value. (0, 100)
     * @param {number} [a=1] The alpha value. (0, 1)
     * @returns {CMYColor} A new CMYColor object.
     */
    function CMYColor(c, m, y) {
      var _this4;

      var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

      _classCallCheck(this, CMYColor);

      _this4 = _super2.call(this, a);
      _this4._c = Color._clamp(c);
      _this4._m = Color._clamp(m);
      _this4._y = Color._clamp(y);
      return _this4;
    }
    /**
     * Set the alpha value of the color.
     * @param {number} a The alpha value. (0, 1)
     * @returns {CMYColor} A new CMYColor object.
     */


    _createClass(CMYColor, [{
      key: "setAlpha",
      value: function setAlpha(a) {
        return new CMYColor(this._c, this._m, this._y, a);
      }
      /**
       * Create a CMY representation of the color.
       * @returns {CMYColor} A CMYColor object.
       */

    }, {
      key: "toCMY",
      value: function toCMY() {
        return this;
      }
      /**
       * Create a CMYK representation of the color.
       * @returns {CMYKColor} A new CMYKColor object.
       */

    }, {
      key: "toCMYK",
      value: function toCMYK() {
        return _construct(CMYKColor, _toConsumableArray(Color.CMY2CMYK(this._c, this._m, this._y).concat([this._a])));
      }
      /**
       * Create a RGB representation of the color.
       * @returns {RGBColor} A new RGBColor object.
       */

    }, {
      key: "toRGB",
      value: function toRGB() {
        return _construct(RGBColor, _toConsumableArray(Color.CMY2RGB(this._c, this._m, this._y).concat([this._a])));
      }
    }]);

    return CMYColor;
  }(BaseColor);
  /**
   * CMYKColor class
   * @class
   */


  var CMYKColor = /*#__PURE__*/function (_BaseColor2) {
    _inherits(CMYKColor, _BaseColor2);

    var _super3 = _createSuper(CMYKColor);

    /**
     * New CMYKColor constructor.
     * @param {number} c The cyan value. (0, 100)
     * @param {number} m The magenta value. (0, 100)
     * @param {number} y The yellow value. (0, 100)
     * @param {number} k The key value. (0, 100)
     * @param {number} [a=1] The alpha value. (0, 1)
     * @returns {CMYKColor} A new CMYKColor object.
     */
    function CMYKColor(c, m, y, k) {
      var _this5;

      var a = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;

      _classCallCheck(this, CMYKColor);

      _this5 = _super3.call(this, a);
      _this5._c = Color._clamp(c);
      _this5._m = Color._clamp(m);
      _this5._y = Color._clamp(y);
      _this5._k = Color._clamp(k);
      return _this5;
    }
    /**
     * Set the alpha value of the color.
     * @param {number} a The alpha value. (0, 1)
     * @returns {CMYKColor} A new CMYKColor object.
     */


    _createClass(CMYKColor, [{
      key: "setAlpha",
      value: function setAlpha(a) {
        return new CMYKColor(this._c, this._m, this._y, this._k, a);
      }
      /**
       * Create a CMY representation of the color.
       * @returns {CMYColor} A new CMYColor object.
       */

    }, {
      key: "toCMY",
      value: function toCMY() {
        return _construct(CMYColor, _toConsumableArray(Color.CMYK2CMY(this._c, this._m, this._y, this._k).concat([this._a])));
      }
      /**
       * Create a CMYK representation of the color.
       * @returns {CMYKColor} A CMYKColor object.
       */

    }, {
      key: "toCMYK",
      value: function toCMYK() {
        return this;
      }
      /**
       * Create a RGB representation of the color.
       * @returns {RGBColor} A new RGBColor object.
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


  var HSLColor = /*#__PURE__*/function (_BaseColor3) {
    _inherits(HSLColor, _BaseColor3);

    var _super4 = _createSuper(HSLColor);

    /**
     * New HSLColor constructor.
     * @param {number} h The hue value. (0, 360)
     * @param {number} s The saturation value. (0, 100)
     * @param {number} l The lightness value. (0, 100)
     * @param {number} [a=1] The alpha value. (0, 1)
     * @returns {HSLColor} A new HSLColor object.
     */
    function HSLColor(h, s, l) {
      var _this6;

      var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

      _classCallCheck(this, HSLColor);

      _this6 = _super4.call(this, a);
      _this6._h = h % 360;
      _this6._s = Color._clamp(s);
      _this6._l = Color._clamp(l);
      return _this6;
    }
    /**
     * Darken the color by a specified amount.
     * @param {number} amount The amount to darken the color by. (0, 1)
     * @returns {HSLColor} A new HSLColor object.
     */


    _createClass(HSLColor, [{
      key: "darken",
      value: function darken(amount) {
        return new HSLColor(this._h, this._s, this._l - this._l * amount, this._a);
      }
      /**
       * Lighten the color by a specified amount.
       * @param {number} amount The amount to lighten the color by. (0, 1)
       * @returns {HSLColor} A new HSLColor object.
       */

    }, {
      key: "lighten",
      value: function lighten(amount) {
        return new HSLColor(this._h, this._s, this._l + (100 - this._l) * amount, this._a);
      }
      /**
       * Set the alpha value of the color.
       * @param {number} a The alpha value. (0, 1)
       * @returns {HSLColor} A new HSLColor object.
       */

    }, {
      key: "setAlpha",
      value: function setAlpha(a) {
        return new HSLColor(this._h, this._s, this._l, a);
      }
      /**
       * Create a HSL representation of the color.
       * @returns {HSLColor} A HSLColor object.
       */

    }, {
      key: "toHSL",
      value: function toHSL() {
        return this;
      }
      /**
       * Return a HSL/HSLA string representation of the color.
       * @returns {string} The HSL/HSLA string.
       */

    }, {
      key: "toHSLString",
      value: function toHSLString() {
        var h = Math.round(this._h);
        var s = Math.round(this._s);
        var l = Math.round(this._l);
        var a = Math.round(this._a * 100) / 100;

        if (a < 1) {
          return "hsla(".concat(h, ", ").concat(s, "%, ").concat(l, "%, ").concat(a, ")");
        }

        return "hsl(".concat(h, ", ").concat(s, "%, ").concat(l, "%)");
      }
      /**
       * Create a RGB representation of the color.
       * @returns {RGBColor} A new RGBColor object.
       */

    }, {
      key: "toRGB",
      value: function toRGB() {
        return _construct(RGBColor, _toConsumableArray(Color.HSL2RGB(this._h, this._s, this._l).concat([this._a])));
      }
    }]);

    return HSLColor;
  }(BaseColor);
  /**
   * HSVColor class
   * @class
   */


  var HSVColor = /*#__PURE__*/function (_BaseColor4) {
    _inherits(HSVColor, _BaseColor4);

    var _super5 = _createSuper(HSVColor);

    /**
     * New HSVColor constructor.
     * @param {number} h The hue value. (0, 360)
     * @param {number} s The saturation value. (0, 100)
     * @param {number} v The brightness value. (0, 100)
     * @param {number} [a=1] The alpha value. (0, 1)
     * @returns {HSVColor} A new HSVColor object.
     */
    function HSVColor(h, s, v) {
      var _this7;

      var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

      _classCallCheck(this, HSVColor);

      _this7 = _super5.call(this, a);
      _this7._h = h % 360;
      _this7._s = Color._clamp(s);
      _this7._v = Color._clamp(v);
      return _this7;
    }
    /**
     * Get the brightness value of the color.
     * @returns {number} The brightess value. (0, 100)
     */


    _createClass(HSVColor, [{
      key: "getBrightness",
      value: function getBrightness() {
        return this._v;
      }
      /**
       * Get the hue value of the color.
       * @returns {number} The hue value. (0, 360)
       */

    }, {
      key: "getHue",
      value: function getHue() {
        return this._h;
      }
      /**
       * Get the saturation value of the color.
       * @returns {number} The saturation value. (0, 100)
       */

    }, {
      key: "getSaturation",
      value: function getSaturation() {
        return this._s;
      }
      /**
       * Set the alpha value of the color.
       * @param {number} a The alpha value. (0, 1)
       * @returns {HSVColor} A new HSVColor object.
       */

    }, {
      key: "setAlpha",
      value: function setAlpha(a) {
        return new HSVColor(this._h, this._s, this._v, a);
      }
      /**
       * Set the brightness value of the color.
       * @param {number} v The brightness value. (0, 100)
       * @returns {HSVColor} A new HSVColor object.
       */

    }, {
      key: "setBrightness",
      value: function setBrightness(v) {
        return new HSVColor(this._h, this._s, v, this._a);
      }
      /**
       * Set the hue value of the color.
       * @param {number} h The hue value. (0, 360)
       * @returns {HSVColor} A new HSVColor object.
       */

    }, {
      key: "setHue",
      value: function setHue(h) {
        return new HSVColor(h, this._s, this._v, this._a);
      }
      /**
       * Set the saturation value of the color.
       * @param {number} s The saturation value. (0, 100)
       * @returns {HSVColor} A new HSVColor object.
       */

    }, {
      key: "setSaturation",
      value: function setSaturation(s) {
        return new HSVColor(this._h, s, this._v, this._a);
      }
      /**
       * Create a HSV representation of the color.
       * @returns {HSVColor} A HSVColor object.
       */

    }, {
      key: "toHSV",
      value: function toHSV() {
        return this;
      }
      /**
       * Create a RGB representation of the color.
       * @returns {RGBColor} A new RGBColor object.
       */

    }, {
      key: "toRGB",
      value: function toRGB() {
        return _construct(RGBColor, _toConsumableArray(Color.HSV2RGB(this._h, this._s, this._v).concat([this._a])));
      }
    }]);

    return HSVColor;
  }(BaseColor);
  /**
   * RGBColor class
   * @class
   */


  var RGBColor = /*#__PURE__*/function (_BaseColor5) {
    _inherits(RGBColor, _BaseColor5);

    var _super6 = _createSuper(RGBColor);

    /**
     * New RGBColor constructor.
     * @param {number} r The red value. (0, 255)
     * @param {number} g The green value. (0, 255)
     * @param {number} b The blue value. (0, 255)
     * @param {number} [a=1] The alpha value. (0, 1)
     * @returns {RGBColor} A new RGBColor object.
     */
    function RGBColor(r, g, b) {
      var _this8;

      var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

      _classCallCheck(this, RGBColor);

      _this8 = _super6.call(this, a);
      _this8._r = Color._clamp(r, 0, 255);
      _this8._g = Color._clamp(g, 0, 255);
      _this8._b = Color._clamp(b, 0, 255);
      return _this8;
    }
    /**
     * Invert the color.
     * @returns {RGBColor} A new RGBColor object.
     */


    _createClass(RGBColor, [{
      key: "invert",
      value: function invert() {
        return new RGBColor(255 - this._r, 255 - this._g, 255 - this._b, this._a);
      }
      /**
       * Get the luminance value of the color.
       * @returns {number} The luminance value. (0, 1)
       */

    }, {
      key: "luma",
      value: function luma() {
        return Color.RGB2Luma(this._r, this._g, this._b);
      }
      /**
       * Mix this color with another by a specified amount.
       * @param {BaseColor} color The color to mix with.
       * @param {number} amount The amount to mix by. (0, 1)
       * @returns {RGBColor} A new RGBColor object.
       */

    }, {
      key: "mix",
      value: function mix(color, amount) {
        var rgb = color.toRGB();
        return new RGBColor(Color._lerp(this._r, rgb._r, amount), Color._lerp(this._g, rgb._g, amount), Color._lerp(this._b, rgb._b, amount), Color._lerp(this._a, rgb._a, amount));
      }
      /**
       * Multiply this color with another by a specified amount.
       * @param {BaseColor} color The color to multiply with.
       * @param {number} amount The amount to multiply by. (0, 1)
       * @returns {RGBColor} A new RGBColor object.
       */

    }, {
      key: "multiply",
      value: function multiply(color, amount) {
        var rgb = color.toRGB();
        return new RGBColor(Color._lerp(this._r, this._r * rgb._r / 255, amount), Color._lerp(this._g, this._g * rgb._g / 255, amount), Color._lerp(this._b, this._b * rgb._b / 255, amount), Color._lerp(this._a, this._a * rgb._a, amount));
      }
      /**
       * Set the alpha value of the color.
       * @param {number} a The alpha value. (0, 1)
       * @returns {RGBColor} A new RGBColor object.
       */

    }, {
      key: "setAlpha",
      value: function setAlpha(a) {
        return new RGBColor(this._r, this._g, this._b, a);
      }
      /**
       * Create a CMY representation of the color.
       * @returns {CMYColor} A new CMYColor object.
       */

    }, {
      key: "toCMY",
      value: function toCMY() {
        return _construct(CMYColor, _toConsumableArray(Color.RGB2CMY(this._r, this._g, this._b).concat([this._a])));
      }
      /**
       * Create a HSL representation of the color.
       * @returns {HSLColor} A new HSLColor object.
       */

    }, {
      key: "toHSL",
      value: function toHSL() {
        return _construct(HSLColor, _toConsumableArray(Color.RGB2HSL(this._r, this._g, this._b).concat([this._a])));
      }
      /**
       * Create a HSLV representation of the color.
       * @returns {HSVColor} A new HSVColor object.
       */

    }, {
      key: "toHSV",
      value: function toHSV() {
        return _construct(HSVColor, _toConsumableArray(Color.RGB2HSV(this._r, this._g, this._b).concat([this._a])));
      }
      /**
       * Create a RGB representation of the color.
       * @returns {RGBColor} An RGBColor object.
       */

    }, {
      key: "toRGB",
      value: function toRGB() {
        return this;
      }
      /**
       * Return a hexadecimal string representation of the color.
       * @returns {string} The hexadecimal string.
       */

    }, {
      key: "toHexString",
      value: function toHexString() {
        var hex = this._getHex();

        if (hex.length === 9 && hex[1] === hex[2] && hex[3] === hex[4] && hex[5] === hex[6] && hex[7] === hex[8]) {
          return "#".concat(hex[1]).concat(hex[3]).concat(hex[5]).concat(hex[7]);
        }

        if (hex.length === 7 && hex[1] === hex[2] && hex[3] === hex[4] && hex[5] === hex[6]) {
          return "#".concat(hex[1]).concat(hex[3]).concat(hex[5]);
        }

        return hex;
      }
      /**
       * Return a RGB/RGBA string representation of the color.
       * @returns {string} The RGB/RGBA string.
       */

    }, {
      key: "toRGBString",
      value: function toRGBString() {
        var r = Math.round(this._r);
        var g = Math.round(this._g);
        var b = Math.round(this._b);
        var a = Math.round(this._a * 1000) / 1000;

        if (a < 1) {
          return "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(a, ")");
        }

        return "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")");
      }
      /**
       * Return a HTML string representation of the color.
       * @returns {string} The HTML color string.
       */

    }, {
      key: "toString",
      value: function toString() {
        if (!this._a) {
          return 'transparent';
        }

        if (this._a < 1) {
          return this.toRGBString();
        }

        var hex = this._getHex();

        for (var name in Color.colors) {
          if (Color.colors[name] === hex) {
            return name;
          }
        }

        if (hex[1] === hex[2] && hex[3] === hex[4] && hex[5] === hex[6]) {
          return "#".concat(hex[1]).concat(hex[3]).concat(hex[5]);
        }

        return hex;
      }
    }, {
      key: "_getHex",
      value: function _getHex() {
        var r = (Math.round(this._r) | 1 << 8).toString(16).slice(1),
            g = (Math.round(this._g) | 1 << 8).toString(16).slice(1),
            b = (Math.round(this._b) | 1 << 8).toString(16).slice(1),
            hex = "#".concat(r).concat(g).concat(b);

        if (this._a < 1) {
          return hex + (this._a * 255 | 1 << 8).toString(16).slice(1);
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