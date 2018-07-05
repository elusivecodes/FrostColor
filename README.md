# FrostColor

**FrostColor** is a free, open-source color manipulation library for *JavaScript*.

It is built as an extension for the **FrostCore** library, and features full support for RGB, HSL, HSV, CMY and CMYK color spaces.


## Table of contents
- [Basic Usage](#basic-usage)
- [Color Creation](#color-creation)
- [Color Attributes](#color-attributes)
- [Color Manipulation](#color-manipulation)
- [Color Palettes](#color-palettes)


## Basic Usage

#### From RGB

Colors can created using the following syntax, where `red`, `green` and `blue` are values between 0 and 255, and `alpha` is a value between 0 and 1.

If the `alpha` argument is omitted, a default value of 1 will be used (opaque).

```javascript
const color = new frost.Color(red, green, blue, alpha);
```

#### From Brightness

If you are creating a greyscale color, you can alternatively enter a single `brightness` value between 0 and 100.

Again, the `alpha` argument can be omitted for a default value of 1.

```javascript
const color = new frost.Color(brightness, alpha);
```

#### Immutable Colors

By default, Color objects are mutable, but if you wish to create an immutable reference you can use the following syntax.

Immutable Color objects return a new ColorImmutable whenever they are modified.

```javascript
const color = new frost.ColorImmutable(red, green, blue, alpha);
```

#### To String

After a Color object has been created, you can get the string representation using the `toString()` method.

```javascript
const colorString = color.toString();
```


## Color Creation

#### From String

If you have a string representation of a color, you can create a Color object from it using the static `fromString()` method.

This method supports hex, rgb, rgba, hsl, hsla and HTML color names;

```javascript
const color = frost.Color.fromString(colorString);
```

#### From CMY

Create a color from a CMY range, where `cyan`, `magenta` and `yellow` are values between 0 and 100.

```javascript
const color = frost.Color.fromCMY(cyan, magenta, yellow, alpha);
```

#### From CMYK

Create a color from a CMYK range, where `cyan`, `magenta`, `yellow` and `key` are values between 0 and 100.

```javascript
const color = frost.Color.fromCMYK(cyan, magenta, yellow, key, alpha);
```

#### From HSL

Create a color from a HSL range, where `hue` is a value between 0 and 360, and `saturation` and `lightness` are values between 0 and 100.

```javascript
const color = frost.Color.fromHSL(hue, saturation, lightness, alpha);
```

#### From HSV

Create a color from a HSV range, where `hue` is a value between 0 and 360, and `saturation` and `value` are values between 0 and 100.

```javascript
const color = frost.Color.fromHSV(hue, saturation, value, alpha);
```


## Color Attributes

Retrieve information about a Color object you have created using the following methods.

The `brightness` and `saturation` values returned will be between 0 and 100, while the `hue` value will be between 0 and 360.

```javascript
const brightness = color.getBrightness();
const hue = color.getHue();
const saturation = color.getSaturation();
```

You can also set these values on any Color object you have created.

```javascript
color.setBrightness(brightness);
color.setHue(hue);
color.setSaturation(saturation);
```

The `luma()` function will return the luminance value of a Color, between 0 and 1.

This can be useful, for example, when deciding what color text to display on a background.

```javascript
const luma = color.luma();
```


## Color Manipulation

#### Darken

Darken a color, where the `amount` specified is a value between 0 and 1.

```javascript
color.darken(amount);
```

#### Lighten

Lighten a color, where the `amount` specified is a value between 0 and 1.

```javascript
color.lighten(amount);
```

#### Shade

Shade a color (mix with black), where the `amount` specified in a value between 0 and 1.

```javascript
color.shade(amount);
```

#### Tint

Tint a color (mix with white), where the `amount` specified in a value between 0 and 1.

```javascript
color.tint(amount);
```

#### Tone

Tone a color (mix with grey), where the `amount` specified in a value between 0 and 1.

```javascript
color.tone(amount);
```


## Color Mixing

#### Mix

Mix two colors together, by a specified `amount` (between 0 and 1).

```javascript
const red = frost.Color.fromString('red');
const yellow = frost.Color.fromString('yellow');
const orange = frost.Color.mix(red, yellow, 0.5);
```

#### Multiply

Multiply a color with another color.

```javascript
const blue = frost.Color.fromString('blue');
const yellow = frost.Color.fromString('yellow');
const purple = frost.Color.multiply(blue, yellow);
```


## Color Palettes

#### Complementary

Creates the complementary of a color.

```javascript
const complementary = color.complementary();
```

#### Split

Creates an array containing the split complementary of a color.

```javascript
const split = color.split();
```

#### Analogous

Creates an array with 2 analogous colors, based on a color.

```javascript
const analogous = color.analogous();
```

#### Triadic

Creates an array with 3 triadic colors, based on a color.

```javascript
const triadic = color.triadic();
```

#### Tetradic

Creates an array with 4 tetradic colors, based on a color.

```javascript
const tetradic = color.tetradic();
```

#### Shades

Creates an array with a specified number of evenly distributed `shades` of a color. Defaults to 10.

```javascript
const shades = color.shades(shades);
```

#### Tints

Creates an array with a specified number of evenly distributed `tints` of a color. Defaults to 10.

```javascript
const tints = color.tints(tints);
```

#### Tones

Creates an array with a specified number of evenly distributed `tones` of a color. Defaults to 10.

```javascript
const tones = color.tones(tones);
```

#### Palette

Creates an object with a specified number of evenly distributed `shades`, `tints` and `tones` of a color. Defaults to 10 of each.

```javascript
const colorPalette = color.palette(shades, tints, tones);
```