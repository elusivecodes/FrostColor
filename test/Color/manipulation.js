const assert = require('assert');
const { Color } = require('../../dist/frost-color.min');

describe('Color Manipulation', function() {

    describe('#darken', function() {
        it('darkens the color', function() {
            const color1 = Color.fromHSV(120, 50, 50);
            const color2 = color1.darken(.5);
            assert.strictEqual(
                color1.toString(),
                '#204020'
            );
            assert.strictEqual(
                color1,
                color2
            );
        });
    });

    describe('#invert', function() {
        it('inverts the color', function() {
            const color1 = Color.fromHSV(120, 50, 50);
            const color2 = color1.invert();
            assert.strictEqual(
                color1.toString(),
                '#bf80bf'
            );
            assert.strictEqual(
                color1,
                color2
            );
        });
    });

    describe('#lighten', function() {
        it('lightens the color', function() {
            const color1 = Color.fromHSV(120, 50, 50);
            const color2 = color1.lighten(.5);
            assert.strictEqual(
                color1.toString(),
                '#95ca95'
            );
            assert.strictEqual(
                color1,
                color2
            );
        });
    });

    describe('#shade', function() {
        it('shades the color', function() {
            const color1 = Color.fromHSV(120, 50, 50);
            const color2 = color1.shade(.3);
            assert.strictEqual(
                color1.toString(),
                '#2d592d'
            );
            assert.strictEqual(
                color1,
                color2
            );
        });
    });

    describe('#tint', function() {
        it('tints the color', function() {
            const color1 = Color.fromHSV(120, 50, 50);
            const color2 = color1.tint(.3);
            assert.strictEqual(
                color1.toString(),
                '#79a679'
            );
            assert.strictEqual(
                color1,
                color2
            );
        });
    });

    describe('#tone', function() {
        it('tones the color', function() {
            const color1 = Color.fromHSV(120, 50, 50);
            const color2 = color1.tone(.3);
            assert.strictEqual(
                color1.toString(),
                '#538053'
            );
            assert.strictEqual(
                color1,
                color2
            );
        });
    });

});
