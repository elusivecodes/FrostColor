# FrostColor

**FrostColor** is a free, open-source color manipulation library for *JavaScript*.

It is built as an extension for the **FrostCore** library.


## Table of contents
- [Basic usage](#basic-usage)
- [Color creation](#color-creation)
- [Color manipulation](#color-manipulation)
- [Color palettes](#color-palettes)


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

#### Color Immutables

By default, Color objects are mutable, but if you wish to create an immutable reference you can use the following syntax.

Immutable Color objects return a new ColorImmutable whenever they are modified.

```javascript
const color = new frost.ColorImmutable(red, green, blue, alpha);
const color = new frost.ColorImmutable(brightness, alpha);
```

#### Color Output

After a Color object has been created, you can get the string representation using the `toString()` method.

```javascript
const colorString = color.toString();
```


## Color Creation

#### From String

If you have a string representation of a color, you can create a Color object from it using the static `fromString()` method.

This method supports hex, rgb, rgba, hsl, hsla and HTML color names;

```javascript
frost.Color.fromString('#fff').toString(); // white
frost.Color.fromString('#ffffff').toString(); // white
frost.Color.fromString('rgb(255, 255, 255)').toString(); // white
frost.Color.fromString('rgba(255, 255, 255, 1)').toString(); // white
frost.Color.fromString('hsl(0, 0%, 100%)').toString(); // white
frost.Color.fromString('hsla(0, 0%, 100%, 1)').toString(); // white
frost.Color.fromString('white').toString(); // white
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


## Color Manipulation

Darken a color, where the `amount` specified is a value between 0 and 1.

```javascript
color.darken(amount);
```

Lighten a color, where the `amount` specified is a value between 0 and 1.

```javascript
color.lighten(amount);
```

Shade a color (mix with black), where the `amount` specified in a value between 0 and 1.

```javascript
color.shade(amount);
```

Tint a color (mix with white), where the `amount` specified in a value between 0 and 1.

```javascript
color.tint(amount);
```

Tone a color (mix with grey), where the `amount` specified in a value between 0 and 1.

```javascript
color.tone(amount);
```


## Color Mixing

Mix two colors together, by a specified `amount` (between 0 and 1).

```javascript
const red = frost.Color.fromString('red');
const yellow = frost.Color.fromString('yellow');
const orange = frost.Color.mix(red, yellow, 0.5);
```

Multiply a color with another color.

```javascript
const blue = frost.Color.fromString('blue');
const yellow = frost.Color.fromString('yellow');
const purple = frost.Color.multiply(blue, yellow);
```


## Color Palettes

Creates the complementary of a color.

```javascript
const complementary = color.complementary();
```

Creates an array containing the split complementary of a color.

```javascript
const split = color.split();
```

Creates an array with 2 analogous colors, based on a color.

```javascript
const analogous = color.analogous();
```

Creates an array with 3 triadic colors, based on a color.

```javascript
const triadic = color.triadic();
```

Creates an array with 4 tetradic colors, based on a color.

```javascript
const tetradic = color.tetradic();
```

Creates an array with a specified number of evenly distributed `shades` of a color. Defaults to 10.

```javascript
const shades = color.shades(shades);
```

Creates an array with a specified number of evenly distributed `tints` of a color. Defaults to 10.

```javascript
const tints = color.tints(tints);
```

Creates an array with a specified number of evenly distributed `tones` of a color. Defaults to 10.

```javascript
const tones = color.tones(tones);
```

Creates an object with a specified number of evenly distributed `shades`, `tints` and `tones` of a color. Defaults to 10 of each.

```javascript
const colorPalette = color.palette(shades, tints, tones);
```