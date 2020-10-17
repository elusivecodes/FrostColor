const assert = require('assert');
const { ColorImmutable } = require('../../dist/frost-color.min');

describe('ColorImmutable Manipulation', function() {

    describe('#darken', function() {
        it('darkens the color', function() {
            const color1 = ColorImmutable.fromHSV(120, 50, 50);
            const color2 = color1.darken(.5);
            assert.strictEqual(
                color1.toString(),
                '#408040'
            );
            assert.strictEqual(
                color2.toString(),
                '#204020'
            );
        });
    });

    describe('#invert', function() {
        it('inverts the color', function() {
            const color1 = ColorImmutable.fromHSV(120, 50, 50);
            const color2 = color1.invert();
            assert.strictEqual(
                color1.toString(),
                '#408040'
            );
            assert.strictEqual(
                color2.toString(),
                '#bf80bf'
            );
        });
    });

    describe('#lighten', function() {
        it('lightens the color', function() {
            const color1 = ColorImmutable.fromHSV(120, 50, 50);
            const color2 = color1.lighten(.5);
            assert.strictEqual(
                color1.toString(),
                '#408040'
            );
            assert.strictEqual(
                color2.toString(),
                '#95ca95'
            );
        });
    });

    describe('#shade', function() {
        it('shades the color', function() {
            const color1 = ColorImmutable.fromHSV(120, 50, 50);
            const color2 = color1.shade(.3);
            assert.strictEqual(
                color1.toString(),
                '#408040'
            );
            assert.strictEqual(
                color2.toString(),
                '#2d592d'
            );
        });
    });

    describe('#tint', function() {
        it('tints the color', function() {
            const color1 = ColorImmutable.fromHSV(120, 50, 50);
            const color2 = color1.tint(.3);
            assert.strictEqual(
                color1.toString(),
                '#408040'
            );
            assert.strictEqual(
                color2.toString(),
                '#79a679'
            );
        });
    });

    describe('#tone', function() {
        it('tones the color', function() {
            const color1 = ColorImmutable.fromHSV(120, 50, 50);
            const color2 = color1.tone(.3);
            assert.strictEqual(
                color1.toString(),
                '#408040'
            );
            assert.strictEqual(
                color2.toString(),
                '#538053'
            );
        });
    });

});
