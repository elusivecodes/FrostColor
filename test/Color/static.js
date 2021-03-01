const assert = require('assert');
const { Color, ColorImmutable } = require('../../dist/frost-color.min');

describe('Color Static', function() {

    describe('#contrast', function() {
        it('returns the contrast between two colors', function() {
            assert.strictEqual(
                Color.contrast(
                    new Color(100, 0, 0),
                    new Color(0, 0, 100)
                ),
                1.3022288504206543
            );
        });

        it('works with ColorImmutable', function() {
            assert.strictEqual(
                Color.contrast(
                    new Color(100, 0, 0),
                    new ColorImmutable(0, 0, 100)
                ),
                1.3022288504206543
            );
        });
    });

    describe('#dist', function() {
        it('returns the distance between two colors', function() {
            assert.strictEqual(
                Color.dist(
                    new Color(100, 0, 0),
                    new Color(0, 0, 100)
                ),
                141.4213562373095
            );
        });

        it('works with ColorImmutable', function() {
            assert.strictEqual(
                Color.dist(
                    new Color(100, 0, 0),
                    new ColorImmutable(0, 0, 100)
                ),
                141.4213562373095
            );
        });
    });

    describe('#mix', function() {
        it('returns a new Color mixed from two colors', function() {
            const color1 = new Color(255, 0, 0);
            const color2 = new Color(0, 0, 255);
            const color3 = Color.mix(color1, color2, .5);
            assert.strictEqual(
                color1.toString(),
                'red'
            );
            assert.strictEqual(
                color2.toString(),
                'blue'
            );
            assert.strictEqual(
                color3.toString(),
                'purple'
            );
            assert.ok(
                color3 instanceof Color
            );
        });

        it('works with ColorImmutable', function() {
            const color1 = new Color(255, 0, 0);
            const color2 = new ColorImmutable(0, 0, 255);
            const color3 = Color.mix(color1, color2, .5);
            assert.strictEqual(
                color1.toString(),
                'red'
            );
            assert.strictEqual(
                color2.toString(),
                'blue'
            );
            assert.strictEqual(
                color3.toString(),
                'purple'
            );
            assert.ok(
                color3 instanceof Color
            );
        });

        it('works with two ColorImmutable', function() {
            const color1 = new ColorImmutable(255, 0, 0);
            const color2 = new ColorImmutable(0, 0, 255);
            const color3 = Color.mix(color1, color2, .5);
            assert.strictEqual(
                color1.toString(),
                'red'
            );
            assert.strictEqual(
                color2.toString(),
                'blue'
            );
            assert.strictEqual(
                color3.toString(),
                'purple'
            );
            assert.ok(
                color3 instanceof Color
            );
        });
    });

    describe('#multiply', function() {
        it('returns a new Color multiplied from two colors', function() {
            const color1 = new Color(255, 0, 0);
            const color2 = new Color(0, 0, 255);
            const color3 = Color.multiply(color1, color2, .5);
            assert.strictEqual(
                color1.toString(),
                'red'
            );
            assert.strictEqual(
                color2.toString(),
                'blue'
            );
            assert.strictEqual(
                color3.toString(),
                'maroon'
            );
            assert.ok(
                color3 instanceof Color
            );
        });

        it('works with ColorImmutable', function() {
            const color1 = new Color(255, 0, 0);
            const color2 = new ColorImmutable(0, 0, 255);
            const color3 = Color.multiply(color1, color2, .5);
            assert.strictEqual(
                color1.toString(),
                'red'
            );
            assert.strictEqual(
                color2.toString(),
                'blue'
            );
            assert.strictEqual(
                color3.toString(),
                'maroon'
            );
            assert.ok(
                color3 instanceof Color
            );
        });

        it('works with two ColorImmutable', function() {
            const color1 = new ColorImmutable(255, 0, 0);
            const color2 = new ColorImmutable(0, 0, 255);
            const color3 = Color.multiply(color1, color2, .5);
            assert.strictEqual(
                color1.toString(),
                'red'
            );
            assert.strictEqual(
                color2.toString(),
                'blue'
            );
            assert.strictEqual(
                color3.toString(),
                'maroon'
            );
            assert.ok(
                color3 instanceof Color
            );
        });
    });
});
