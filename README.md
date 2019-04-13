# FrostColor

**FrostColor** is a free, open-source color manipulation library for *JavaScript*.

It it a lightweight (~12kb) and modern library, and features full support for RGB, HSL, HSV, CMY and CMYK color-spaces.


## Table of contents
- [Basic Usage](#basic-usage)
- [Color Creation](#color-creation)
- [Color Attributes](#color-attributes)
- [Color Manipulation](#color-manipulation)
- [Color Schemes](#color-schemes)
- [Color Palettes](#color-palettes)


## Basic Usage

#### From RGB

- `red` is a number between *0* and *255*.
- `green` is a number between *0* and *255*.
- `blue` is a number between *0* and *255*.
- `alpha` is a number between *0* and *1*, and will default to *1*.

```javascript
const color = new Color(red, green, blue, alpha);
```

#### From Brightness

- `brightness` is a number between *0* and *100*.
- `alpha` is a number between *0* and *1*, and will default to *1*.

```javascript
const color = new Color(brightness, alpha);
```

#### Immutable Colors

By default, *Color* objects are mutable, but if you wish to create an immutable reference you can use the following syntax.

Immutable *Color* objects return a new *ColorImmutable* whenever they are modified.

```javascript
const color = new ColorImmutable(red, green, blue, alpha);
```

#### To String

After a *Color* object has been created, you can get the string representation using the `toString()` method.

The `colorString` returned will be a string containing either a HTML color name (if one exists), a hexadecimal representation (if alpha is *1*) or an RGBA string.

```javascript
const colorString = color.toString();
```


## Color Creation

#### From String

- `colorString` is a string containing a color value in either hexadecimal, RGB, RGBA, HSL, HSLA or a standard HTML color name.

```javascript
const color = Color.fromString(colorString);
```

#### From CMY

- `cyan` is a number between *0* and *100*.
- `magenta` is a number between *0* and *100*.
- `yellow` is a number between *0* and *100*.
- `alpha` is a number between *0* and *1*, and will default to *1*.

```javascript
const color = Color.fromCMY(cyan, magenta, yellow, alpha);
```

#### From CMYK

- `cyan` is a number between *0* and *100*.
- `magenta` is a number between *0* and *100*.
- `yellow` is a number between *0* and *100*.
- `key` is a number between *0* and *100*.
- `alpha` is a number between *0* and *1*, and will default to *1*.

```javascript
const color = Color.fromCMYK(cyan, magenta, yellow, key, alpha);
```

#### From HSL

- `hue` is a number between *0* and *360*.
- `saturation` is a number between *0* and *100*.
- `lightness` is a number between *0* and *100*.
- `alpha` is a number between *0* and *1*, and will default to *1*.

```javascript
const color = Color.fromHSL(hue, saturation, lightness, alpha);
```

#### From HSV

- `hue` is a number between *0* and *360*.
- `saturation` is a number between *0* and *100*.
- `value` is a number between *0* and *100*.
- `alpha` is a number between *0* and *1*, and will default to *1*.

```javascript
const color = Color.fromHSV(hue, saturation, value, alpha);
```


## Color Attributes

Retrieve or set attributes on a *Color* object you have created using the following methods.

#### Alpha

- `alpha` is a number between *0* and *1*.

```javascript
// Get alpha
const alpha = color.getAlpha();

// Set alpha
color.setAlpha(alpha);
```

#### Brightness

- `brightness` is a number between *0* and *100*.

```javascript
// Get brightness
const brightness = color.getBrightness();

// Set brightness
color.setBrightness(brightness);
```

#### Hue

- `hue` is a number between *0* and *360*.

```javascript
// Get hue
const hue = color.getHue();

// Set hue
color.setHue(hue);
```

#### Saturation

- `saturation` is a number between *0* and *100*.

```javascript
// Get saturation
const saturation = color.getSaturation();

// Set saturation
color.setSaturation(saturation);
```

#### Luma

The `luma` value returned is a number between *0* and *1*.

```javascript
const luma = color.luma();
```


## Color Manipulation

Manipulate a *Color* object you have created using the following methods.

#### Darken

- `amount` is a number between *0* and *1*.

```javascript
color.darken(amount);
```

#### Lighten

- `amount` is a number between *0* and *1*.

```javascript
color.lighten(amount);
```

#### Shade

- `amount` is a number between *0* and *1*.

```javascript
color.shade(amount);
```

#### Tint

- `amount` is a number between *0* and *1*.

```javascript
color.tint(amount);
```

#### Tone

- `amount` is a number between *0* and *1*.

```javascript
color.tone(amount);
```


## Color Mixing

Mix two *Color* objects you have created using the following methods.

#### Mix

- `color1` is a *Color* object.
- `color2` is a *Color* object.
- `amount` is a number between *0* and *1*.

```javascript
const mixed = Color.mix(color1, color2, amount);
```

#### Multiply

- `color1` is a *Color* object.
- `color2` is a *Color* object.
- `amount` is a number between *0* and *1*.

```javascript
const multiplied = Color.multiply(color1, color2, amount);
```


## Color Schemes

Create schemes from a *Color* object you have created using the following methods.

#### Complementary

Create a complementary color.

```javascript
const complementary = color.complementary();
```

#### Split

Create an array containing the 2 split complementary colors.

```javascript
const [secondary, accent] = color.split();
```

#### Analogous

Create an array containing the 2 analogous colors.

```javascript
const [secondary, accent] = color.analogous();
```

#### Triadic

Create an array containing the 2 triadic colors.

```javascript
const [secondary, accent] = color.triadic();
```

#### Tetradic

Create an array containing the 3 tetradic colors.

```javascript
const [secondary, alternate, accent] = color.tetradic();
```


## Color Palettes

Create a palette of colors from a *Color* object you have created using the following methods.

#### Shades

- `shades` is a number indicating how shades you wish to generate, and will default to *10*.

```javascript
const colorShades = color.shades(shades);
```

#### Tints

- `tints` is a number indicating how shades you wish to generate, and will default to *10*.

```javascript
const colorTints = color.tints(tints);
```

#### Tones

- `tones` is a number indicating how shades you wish to generate, and will default to *10*.

```javascript
const colorTones = color.tones(tones);
```

#### Palette

- `shades` is a number indicating how shades you wish to generate, and will default to *10*.
- `tints` is a number indicating how shades you wish to generate, and will default to *10*.
- `tones` is a number indicating how shades you wish to generate, and will default to *10*.

```javascript
const colorPalette = color.palette(shades, tints, tones);
```