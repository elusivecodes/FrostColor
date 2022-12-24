import assert from 'node:assert/strict';
import Color from './../src/index.js';

describe('Color Formatting', function() {

    describe('#toHexString', function() {
        it('returns a short hex string', function() {
            assert.strictEqual(
                new Color(17, 17, 17)
                    .toHexString(),
                '#111'
            );
        });

        it('returns a short hex string (with alpha)', function() {
            assert.strictEqual(
                new Color(17, 17, 17, .4)
                    .toHexString(),
                '#1116'
            );
        });

        it('returns a hex string', function() {
            assert.strictEqual(
                new Color(120, 50, 50)
                    .toHexString(),
                '#783232'
            );
        });

        it('returns a hex string (with alpha)', function() {
            assert.strictEqual(
                new Color(120, 50, 50, .5)
                    .toHexString(),
                '#78323280'
            );
        });
    });

    describe('#toRGBString', function() {
        it('returns a rgb string', function() {
            assert.strictEqual(
                new Color(120, 50, 50)
                    .toRGBString(),
                'rgb(120 50 50)'
            );
        });

        it('returns a rgba string', function() {
            assert.strictEqual(
                new Color(120, 50, 50, .5)
                    .toRGBString(),
                'rgb(120 50 50 / 50%)'
            );
        });
    });

    describe('#toHSLString', function() {
        it('returns a hsl string', function() {
            assert.strictEqual(
                Color.fromHSL(120, 50, 50)
                    .toHSLString(),
                'hsl(120deg 50% 50%)'
            );
        });

        it('returns a hsla string', function() {
            assert.strictEqual(
                Color.fromHSL(120, 50, 50, .5)
                    .toHSLString(),
                'hsl(120deg 50% 50% / 50%)'
            );
        });
    });

    describe('#label', function() {
        it('returns the closest html color name', function() {
            assert.strictEqual(
                new Color(120, 50, 50)
                    .label(),
                'saddlebrown'
            );
        });

    });

});
