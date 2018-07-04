# FrostColor

*FrostColor* is a free open-source Color manipulation library for JavaScript. It is built as an extension for the *FrostCore* library.

## Table of contents
- [Basic usage](#basic-usage)
- [Color creation](#color-creation)
- [Color manipulation](#color-manipulation)
- [Color palettes](#color-palettes)

## Basic usage

#### From RGB

Colors can created using the following syntax, where `red`, `green` and `blue` are values between 0 and 255, and `alpha` is a value between 0 and 1.

If the alpha argument is omitted, a default value of 1 will be used (opaque).

```javascript
const color = new frost.Color(red, green, blue, alpha);
```

#### From brightness

If you are creating a greyscale color, you can just enter a brightness value between 0 and 100.

Again, the alpha argument can be omitted for a default value of 1.

```javascript
const color = new frost.Color(brightness, alpha);
```

#### Color output

After a color has been created, you can get the string representation using the `toString()` method.

```javascript
const colorString = color.toString();
```

## Color creation

#### From string

If you have a string representation of a color, you can create a Color object from it using the static `fromString()` method.

This method supports hex strings (`#fff` or `#ffffff`), rgb strings (`rgb(255, 255, 255)`) or rgba (`rgba(255, 255, 255, 1)`) or HTML color names (`white`);

```javascript
const color = frost.Color.fromString(colorString);
```

#### From CMY

```javascript
const color = frost.Color.fromCMY(cyan, magenta, yellow, alpha);
```

#### From CMYK

```javascript
const color = frost.Color.fromCMYK(cyan, magenta, yellow, key, alpha);
```

#### From HSL

```javascript
const color = frost.Color.fromHSL(hue, saturation, lightness, alpha);
```

#### From HSV

```javascript
const color = frost.Color.fromHSV(hue, saturation, value, alpha);
```

## Color manipulation

```javascript
color.darken(amount);
```

```javascript
color.lighten(amount);
```

```javascript
color.shade(amount);
```

```javascript
color.tint(amount);
```

```javascript
color.tone(amount);
```

## Color mixing

```javascript
const red = frost.Color.fromString('red');
const yellow = frost.Color.fromString('yellow');
const orange = red.mix(yellow, 0.5);
```

```javascript
const blue = frost.Color.fromString('blue');
const yellow = frost.Color.fromString('yellow');
const purple = blue.multiply(yellow);
```

## Color palettes

```javascript
color.complementary();
```

```javascript
color.split();
```

```javascript
color.analogous();
```

```javascript
color.triadic();
```

```javascript
color.tetradic();
```

```javascript
color.shades(shades);
```

```javascript
color.tints(tints);
```

```javascript
color.tones(tones);
```

```javascript
color.palette(shades, tints, tones);
```