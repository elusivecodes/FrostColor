const assert = require('assert').strict;
const Color = require('../dist/frost-color.min').Color;


describe('Color Attribute Tests', function() {

    describe('#getAlpha', function() {
        it('returns the alpha value', function() {
            assert.equal(
                new Color(0, 0, 0, .75)
                    .getAlpha(),
                0.75
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
            assert.equal(
                Color.fromHSV(120, 50, 50)
                    .setAlpha(0.75)
                    .getAlpha(),
                0.75
            );
        });
    });

    describe('#setBrightness', function() {
        it('sets the brightness value', function() {
            assert.equal(
                Color.fromHSV(180, 50, 50)
                    .setBrightness(75)
                    .getBrightness(),
                75
            );
        });
    });

    describe('#setHue', function() {
        it('sets the hue value', function() {
            assert.equal(
                Color.fromHSV(180, 50, 50)
                    .setHue(270)
                    .getHue(),
                270
            );
        });
    });

    describe('#setSaturation', function() {
        it('sets the saturation value', function() {
            assert.equal(
                Color.fromHSV(180, 50, 50)
                    .setSaturation(25)
                    .getSaturation(),
                25
            );
        });
    });

});
