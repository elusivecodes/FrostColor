const assert = require('assert').strict;
const { ColorImmutable } = require('../../dist/frost-color.min');

describe('ColorImmutable Primitive Tests', function() {

    describe('#toString', function() {
        it('returns a html color name', function() {
            assert.equal(
                new ColorImmutable(255, 0, 0)
                    .toString(),
                'red'
            );
        });

        it('returns a short hex string', function() {
            assert.equal(
                new ColorImmutable(17, 17, 17)
                    .toString(),
                '#111'
            );
        });

        it('returns a hex string', function() {
            assert.equal(
                new ColorImmutable(120, 50, 50)
                    .toString(),
                '#783232'
            );
        });

        it('returns a rgba string', function() {
            assert.equal(
                new ColorImmutable(120, 50, 50, .5)
                    .toString(),
                'rgba(120, 50, 50, 0.5)'
            );
        });
    });

    describe('#valueOf', function() {
        it('returns the luma value', function() {
            assert.equal(
                ColorImmutable.fromHSV(180, 50, 50)
                    .valueOf(),
                0.44684999999999997
            );
        });
    });

    describe('#[Symbol.toPrimitive]', function() {
        it('returns a html color name', function() {
            const color = new ColorImmutable(255, 0, 0);
            assert.equal(
                color[Symbol.toPrimitive]('string'),
                'red'
            );
        });

        it('returns a short hex string', function() {
            const color = new ColorImmutable(17, 17, 17);
            assert.equal(
                color[Symbol.toPrimitive]('string'),
                '#111'
            );
        });

        it('returns a hex string', function() {
            const color = new ColorImmutable(120, 50, 50);
            assert.equal(
                color[Symbol.toPrimitive]('string'),
                '#783232'
            );
        });

        it('returns a rgba string', function() {
            const color = new ColorImmutable(120, 50, 50, .5);
            assert.equal(
                color[Symbol.toPrimitive]('string'),
                'rgba(120, 50, 50, 0.5)'
            );
        });

        it('returns the luma value', function() {
            const color = ColorImmutable.fromHSV(180, 50, 50);
            assert.equal(
                color[Symbol.toPrimitive]('number'),
                0.44684999999999997
            );
        });
    });

});
