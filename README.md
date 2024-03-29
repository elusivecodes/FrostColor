# FrostColor

**FrostColor** is a free, open-source immutable color manipulation library for *JavaScript*.

It is a lightweight (~4kb gzipped) and modern library, and features full support for RGB, HSL, HSV, CMY and CMYK color-spaces.


## Table Of Contents
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Color Creation](#color-creation)
- [Color Formatting](#color-formatting)
- [Color Attributes](#color-attributes)
- [Color Manipulation](#color-manipulation)
- [Color Schemes](#color-schemes)
- [Color Palettes](#color-palettes)
- [Static Methods](#static-methods)


## Installation

**In Browser**

```html
<script type="text/javascript" src="/path/to/frost-color.min.js"></script>
```

**Using NPM**

```
npm i @fr0st/color
```

In Node.js:

```javascript
import Color from '@fr0st/color';
```


## Basic Usage

**From RGB**

- `red` is a number between *0* and *255*.
- `green` is a number between *0* and *255*.
- `blue` is a number between *0* and *255*.
- `alpha` is a number between *0* and *1*, and will default to *1*.

```javascript
const color = new Color(red, green, blue, alpha);
```

**From Brightness**

- `brightness` is a number between *0* and *100*.
- `alpha` is a number between *0* and *1*, and will default to *1*.

```javascript
const color = new Color(brightness, alpha);
```


## Color Creation

**From String**

Create a new *Color* from a HTML color string.

- `colorString` is a string containing a color value in either hexadecimal, RGB, RGBA, HSL, HSLA or a standard HTML color name.

```javascript
const color = Color.fromString(colorString);
```

**From CMY**

Create a new *Color* from CMY values.

- `cyan` is a number between *0* and *100*.
- `magenta` is a number between *0* and *100*.
- `yellow` is a number between *0* and *100*.
- `alpha` is a number between *0* and *1*, and will default to *1*.

```javascript
const color = Color.fromCMY(cyan, magenta, yellow, alpha);
```

**From CMYK**

Create a new *Color* from CMYK values.

- `cyan` is a number between *0* and *100*.
- `magenta` is a number between *0* and *100*.
- `yellow` is a number between *0* and *100*.
- `key` is a number between *0* and *100*.
- `alpha` is a number between *0* and *1*, and will default to *1*.

```javascript
const color = Color.fromCMYK(cyan, magenta, yellow, key, alpha);
```

**From HSL**

Create a new *Color* from HSL values.

- `hue` is a number between *0* and *360*.
- `saturation` is a number between *0* and *100*.
- `lightness` is a number between *0* and *100*.
- `alpha` is a number between *0* and *1*, and will default to *1*.

```javascript
const color = Color.fromHSL(hue, saturation, lightness, alpha);
```

**From HSV**

Create a new *Color* from HSV values.

- `hue` is a number between *0* and *360*.
- `saturation` is a number between *0* and *100*.
- `value` is a number between *0* and *100*.
- `alpha` is a number between *0* and *1*, and will default to *1*.

```javascript
const color = Color.fromHSV(hue, saturation, value, alpha);
```


## Color Formatting

**To String**

Return a HTML string representation of the color.

The `colorString` returned will be a string containing either a HTML color name (if one exists), a hexadecimal string (if alpha is *1*) or an RGBA string.

```javascript
const colorString = color.toString();
```

**To Hex String**

Return a hexadecimal string representation of the color.

```javascript
const hexString = color.toHexString();
```

**To RGB String**

Return a RGB/RGBA string representation of the color.

```javascript
const rgbString = color.toRGBString();
```

**To HSL String**

Return a HSL/HSLA string representation of the color.

```javascript
const hslString = color.toHSLString();
```

**Label**

Get the closest color name for the color.

```javascript
const label = color.label();
```


## Color Attributes

**Get Alpha**

Get the alpha value of the color (between *0* and *1*).

```javascript
const alpha = color.getAlpha();
```

**Get Brightness**

Get the brightness value of the color (between *0* and *100*).

```javascript
const brightness = color.getBrightness();
```

**Get Hue**

Get the hue value of the color (between *0* and *360*).

```javascript
const hue = color.getHue();
```

**Get Saturation**

Get the saturation value of the color (between *0* and *100*).

```javascript
const saturation = color.getSaturation();
```

**Luma**

Get the relative luminance value of the color (between *0* and *1*).

```javascript
const luma = color.luma();
```

**Set Alpha**

Set the alpha value of the color.

- `alpha` is a number between *0* and *1*.

```javascript
const newColor = color.setAlpha(alpha);
```

**Set Brightness**

Set the brightness value of the color.

- `brightness` is a number between *0* and *100*.

```javascript
const newColor = color.setBrightness(brightness);
```

**Set Hue**

Set the hue value of the color.

- `hue` is a number between *0* and *360*.

```javascript
const newColor = color.setHue(hue);
```

**Set Saturation**

Set the saturation value of the color.

- `saturation` is a number between *0* and *100*.

```javascript
const newColor = color.setSaturation(saturation);
```


## Color Manipulation

**Darken**

Darken the color by a specified amount.

- `amount` is a number between *0* and *1*.

```javascript
const newColor = color.darken(amount);
```

**Invert**

Invert the color.

```javascript
const newColor = color.invert();
```

**Lighten**

Lighten the color by a specified amount.

- `amount` is a number between *0* and *1*.

```javascript
const newColor = color.lighten(amount);
```

**Shade**

Shade the color by a specified amount.

- `amount` is a number between *0* and *1*.

```javascript
const newColor = color.shade(amount);
```

**Tint**

Tint the color by a specified amount.

- `amount` is a number between *0* and *1*.

```javascript
const newColor = color.tint(amount);
```

**Tone**

Tone the color by a specified amount.

- `amount` is a number between *0* and *1*.

```javascript
const newColor = color.tone(amount);
```


## Color Schemes

**Complementary**

Create a complementary color variation.

```javascript
const complementary = color.complementary();
```

**Split**

Create an array with 2 split color variations.

```javascript
const [secondary, accent] = color.split();
```

**Analogous**

Create an array with 2 analogous color variations.

```javascript
const [secondary, accent] = color.analogous();
```

**Triadic**

Create an array with 2 triadic color variations.

```javascript
const [secondary, accent] = color.triadic();
```

**Tetradic**

Create an array with 3 tetradic color variations.

```javascript
const [secondary, alternate, accent] = color.tetradic();
```


## Color Palettes

Create a palette of colors from a *Color* object you have created using the following methods.

**Shades**

Create an array with a specified number of shade variations.

- `shades` is a number indicating how many shades you wish to generate, and will default to *10*.

```javascript
const colorShades = color.shades(shades);
```

**Tints**

Create an array with a specified number of tint variations.

- `tints` is a number indicating how many tints you wish to generate, and will default to *10*.

```javascript
const colorTints = color.tints(tints);
```

**Tones**

Create an array with a specified number of tone variations.

- `tones` is a number indicating how many tones you wish to generate, and will default to *10*.

```javascript
const colorTones = color.tones(tones);
```

**Palette**

Create a palette object with a specified number of shades, tints and tone variations.

- `options` is an object containing options for how the palette should be generated.
    - `shades` is a number indicating how many shades you wish to generate, and will default to *10*.
    - `tints` is a number indicating how many tints you wish to generate, and will default to *10*.
    - `tones` is a number indicating how many tones you wish to generate, and will default to *10*.

```javascript
const colorPalette = color.palette(options);
```


## Static Methods

**Contrast**

Calculate the contrast between two colors (between *1* and *21*).

- `color1` is a *Color* object.
- `color2` is a *Color* object.

```javascript
const contrast = Color.contrast(color1, color2);
```

**Distance**

Calculate the distance between two colors.

- `color1` is a *Color* object.
- `color2` is a *Color* object.

```javascript
const distance = Color.dist(color1, color2);
```

**Find Contrast**

Find an optimally contrasting color for another color.

- `color1` is a *Color* object.
- `color2` is a *Color* object, and will default to *null*.
- `options` is an object containing options for how the contrasting color should be found.
    - `minContrast` is a number between *1* and *21* indicating the minimum valid contrast, and will default to *4.5*.
    - `stepSize` is a number between *0* and *1* indicating the amount to darken/lighten the color on each iteration, and will default to *0.01*.

```javascript
const contrastColor = Color.findContrast(color1, color2, options);
```

If `color2` value is *null*, `color1` will be used instead.

This method will tint/shade `color2` until it meets a minimum contrast threshold with `color1`, then the new color will be returned. If no valid contrast value can be found, this method will return *null* instead.

**Mix**

Create a new *Color* by mixing two colors together by a specified amount.

- `color1` is a *Color* object.
- `color2` is a *Color* object.
- `amount` is a number between *0* and *1*.

```javascript
const mixed = Color.mix(color1, color2, amount);
```

**Multiply**

Create a new *Color* by multiplying two colors together by a specified amount.

- `color1` is a *Color* object.
- `color2` is a *Color* object.
- `amount` is a number between *0* and *1*.

```javascript
const multiplied = Color.multiply(color1, color2, amount);
```
