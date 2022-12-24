import assert from 'node:assert/strict';
import Color from './../src/index.js';

describe('Color Primitive', function() {

    describe('#toString', function() {
        it('returns a html color name', function() {
            assert.strictEqual(
                new Color(255, 0, 0)
                    .toString(),
                'red'
            );
        });

        it('returns a short hex string', function() {
            assert.strictEqual(
                new Color(17, 17, 17)
                    .toString(),
                '#111'
            );
        });

        it('returns a hex string', function() {
            assert.strictEqual(
                new Color(120, 50, 50)
                    .toString(),
                '#783232'
            );
        });

        it('returns a rgba string', function() {
            assert.strictEqual(
                new Color(120, 50, 50, .5)
                    .toString(),
                'rgb(120 50 50 / 50%)'
            );
        });
    });

    describe('#valueOf', function() {
        it('returns the relative luma value', function() {
            assert.strictEqual(
                Color.fromHSV(180, 50, 50)
                    .valueOf(),
                .17935225036098287
            );
        });
    });

    describe('#[Symbol.toPrimitive]', function() {
        it('returns a html color name', function() {
            const color = new Color(255, 0, 0);
            assert.strictEqual(
                color[Symbol.toPrimitive]('string'),
                'red'
            );
        });

        it('returns a short hex string', function() {
            const color = new Color(17, 17, 17);
            assert.strictEqual(
                color[Symbol.toPrimitive]('string'),
                '#111'
            );
        });

        it('returns a hex string', function() {
            const color = new Color(120, 50, 50);
            assert.strictEqual(
                color[Symbol.toPrimitive]('string'),
                '#783232'
            );
        });

        it('returns a rgba string', function() {
            const color = new Color(120, 50, 50, .5);
            assert.strictEqual(
                color[Symbol.toPrimitive]('string'),
                'rgb(120 50 50 / 50%)'
            );
        });

        it('returns the relative luma value', function() {
            const color = Color.fromHSV(180, 50, 50);
            assert.strictEqual(
                color[Symbol.toPrimitive]('number'),
                .17935225036098287
            );
        });
    });

});
