const assert = require('assert').strict;
const { Color } = require('../../dist/frost-color.min');

describe('Color Attributes', function() {

    describe('#getAlpha', function() {
        it('returns the alpha value', function() {
            assert.equal(
                new Color(0, 0, 0, .75)
                    .getAlpha(),
                .75
            );
        });
    });

    describe('#getBrightness', function() {
        it('returns the brightness value', function() {
            assert.equal(
                Color.fromHSV(180, 50, 75)
                    .getBrightness(),
                75
            );
        });
    });

    describe('#getHue', function() {
        it('returns the hue value', function() {
            assert.equal(
                Color.fromHSV(270, 50, 50)
                    .getHue(),
                270
            );
        });
    });

    describe('#getSaturation', function() {
        it('returns the saturation value', function() {
            assert.equal(
                Color.fromHSV(180, 25, 50)
                    .getSaturation(),
                25
            );
        });
    });

    describe('#luma', function() {
        it('returns the luma value', function() {
            assert.equal(
                Color.fromHSV(180, 50, 50)
                    .luma(),
                0.44684999999999997
            );
        });
    });

    describe('#setAlpha', function() {
        it('sets the alpha value', function() {
            const color1 = Color.fromHSV(120, 50, 50);
            const color2 = color1.setAlpha(.75);
            assert.equal(
                color1.getAlpha(),
                .75
            );
            assert.equal(
                color1,
                color2
            );
        });
    });

    describe('#setBrightness', function() {
        it('sets the brightness value', function() {
            const color1 = Color.fromHSV(180, 50, 50);
            const color2 = color1.setBrightness(75);
            assert.equal(
                color1.getBrightness(),
                75
            );
            assert.equal(
                color1,
                color2
            );
        });
    });

    describe('#setHue', function() {
        it('sets the hue value', function() {
            const color1 = Color.fromHSV(180, 50, 50);
            const color2 = color1.setHue(270);
            assert.equal(
                color1.getHue(),
                270
            );
            assert.equal(
                color1,
                color2
            );
        });
    });

    describe('#setSaturation', function() {
        it('sets the saturation value', function() {
            const color1 = Color.fromHSV(180, 50, 50);
            const color2 = color1.setSaturation(25);
            assert.equal(
                color1.getSaturation(),
                25
            );
            assert.equal(
                color1,
                color2
            );
        });
    });

});
