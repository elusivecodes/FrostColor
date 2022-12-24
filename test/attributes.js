import assert from 'node:assert/strict';
import Color from './../src/index.js';

describe('Color Attributes', function() {

    describe('#getAlpha', function() {
        it('returns the alpha value', function() {
            assert.strictEqual(
                new Color(0, 0, 0, .75)
                    .getAlpha(),
                .75
            );
        });
    });

    describe('#getBrightness', function() {
        it('returns the brightness value', function() {
            assert.strictEqual(
                Color.fromHSV(180, 50, 75)
                    .getBrightness(),
                75
            );
        });
    });

    describe('#getHue', function() {
        it('returns the hue value', function() {
            assert.strictEqual(
                Color.fromHSV(270, 50, 50)
                    .getHue(),
                270
            );
        });
    });

    describe('#getSaturation', function() {
        it('returns the saturation value', function() {
            assert.strictEqual(
                Color.fromHSV(180, 25, 50)
                    .getSaturation(),
                25
            );
        });
    });

    describe('#luma', function() {
        it('returns the relative luma value', function() {
            assert.strictEqual(
                Color.fromHSV(180, 50, 50)
                    .luma(),
                .17935225036098287
            );
        });
    });

    describe('#setAlpha', function() {
        it('sets the alpha value', function() {
            const color1 = Color.fromHSV(120, 50, 50);
            const color2 = color1.setAlpha(.75);
            assert.strictEqual(
                color1.getAlpha(),
                1
            );
            assert.strictEqual(
                color2.getAlpha(),
                .75
            );
        });
    });

    describe('#setBrightness', function() {
        it('sets the brightness value', function() {
            const color1 = Color.fromHSV(180, 50, 50);
            const color2 = color1.setBrightness(75);
            assert.strictEqual(
                color1.getBrightness(),
                50
            );
            assert.strictEqual(
                color2.getBrightness(),
                75
            );
        });
    });

    describe('#setHue', function() {
        it('sets the hue value', function() {
            const color1 = Color.fromHSV(180, 50, 50);
            const color2 = color1.setHue(270);
            assert.strictEqual(
                color1.getHue(),
                180
            );
            assert.strictEqual(
                color2.getHue(),
                270
            );
        });
    });

    describe('#setSaturation', function() {
        it('sets the saturation value', function() {
            const color1 = Color.fromHSV(180, 50, 50);
            const color2 = color1.setSaturation(25);
            assert.strictEqual(
                color1.getSaturation(),
                50
            );
            assert.strictEqual(
                color2.getSaturation(),
                25
            );
        });
    });

});
