const assert = require('assert').strict;
const { Color, ColorImmutable } = require('../../dist/frost-color.min');

describe('ColorImmutable Static Tests', function() {

    describe('#dist', function() {
        it('returns the distance between two colors', function() {
            assert.equal(
                ColorImmutable.dist(
                    new ColorImmutable(100, 0, 0),
                    new ColorImmutable(0, 0, 100)
                ),
                141.4213562373095
            );
        });

        it('works with Color', function() {
            assert.equal(
                ColorImmutable.dist(
                    new ColorImmutable(100, 0, 0),
                    new Color(0, 0, 100)
                ),
                141.4213562373095
            );
        });
    });

    describe('#mix', function() {
        it('returns a new ColorImmutable mixed from two colors', function() {
            const color1 = new ColorImmutable(255, 0, 0);
            const color2 = new ColorImmutable(0, 0, 255);
            const color3 = ColorImmutable.mix(color1, color2, .5);
            assert.equal(
                color1.toString(),
                'red'
            );
            assert.equal(
                color2.toString(),
                'blue'
            );
            assert.equal(
                color3.toString(),
                'purple'
            );
            assert.ok(
                color3 instanceof ColorImmutable
            );
        });

        it('works with Color', function() {
            const color1 = new ColorImmutable(255, 0, 0);
            const color2 = new Color(0, 0, 255);
            const color3 = ColorImmutable.mix(color1, color2, .5);
            assert.equal(
                color1.toString(),
                'red'
            );
            assert.equal(
                color2.toString(),
                'blue'
            );
            assert.equal(
                color3.toString(),
                'purple'
            );
            assert.ok(
                color3 instanceof ColorImmutable
            );
        });

        it('works with two Color', function() {
            const color1 = new Color(255, 0, 0);
            const color2 = new Color(0, 0, 255);
            const color3 = ColorImmutable.mix(color1, color2, .5);
            assert.equal(
                color1.toString(),
                'red'
            );
            assert.equal(
                color2.toString(),
                'blue'
            );
            assert.equal(
                color3.toString(),
                'purple'
            );
            assert.ok(
                color3 instanceof ColorImmutable
            );
        });
    });

    describe('#multiply', function() {
        it('returns a new ColorImmutable multiplied from two colors', function() {
            const color1 = new ColorImmutable(255, 0, 0);
            const color2 = new ColorImmutable(0, 0, 255);
            const color3 = ColorImmutable.multiply(color1, color2, .5);
            assert.equal(
                color1.toString(),
                'red'
            );
            assert.equal(
                color2.toString(),
                'blue'
            );
            assert.equal(
                color3.toString(),
                'maroon'
            );
            assert.ok(
                color3 instanceof ColorImmutable
            );
        });

        it('works with Color', function() {
            const color1 = new ColorImmutable(255, 0, 0);
            const color2 = new Color(0, 0, 255);
            const color3 = ColorImmutable.multiply(color1, color2, .5);
            assert.equal(
                color1.toString(),
                'red'
            );
            assert.equal(
                color2.toString(),
                'blue'
            );
            assert.equal(
                color3.toString(),
                'maroon'
            );
            assert.ok(
                color3 instanceof ColorImmutable
            );
        });

        it('works with two Color', function() {
            const color1 = new Color(255, 0, 0);
            const color2 = new Color(0, 0, 255);
            const color3 = ColorImmutable.multiply(color1, color2, .5);
            assert.equal(
                color1.toString(),
                'red'
            );
            assert.equal(
                color2.toString(),
                'blue'
            );
            assert.equal(
                color3.toString(),
                'maroon'
            );
            assert.ok(
                color3 instanceof ColorImmutable
            );
        });
    });
});