import assert from 'node:assert/strict';
import Color from './../src/index.js';

describe('Color Palette', function() {

    describe('#shades', function() {
        it('creates a shades palette', function() {
            const shades = Color.fromHSV(120, 50, 50).shades();
            assert.deepStrictEqual(
                shades.map(
                    color => color.toString()
                ),
                [
                    '#408040',
                    '#3a743a',
                    '#346834',
                    '#2e5d2e',
                    '#295129',
                    '#234623',
                    '#1d3a1d',
                    '#172e17',
                    '#112311',
                    '#0c170c'
                ]
            );

            assert.ok(
                shades.every(
                    color => color instanceof Color
                )
            );
        });

        it('works with shades argument', function() {
            const shades = Color.fromHSV(120, 50, 50).shades(5);
            assert.deepStrictEqual(
                shades.map(
                    color => color.toString()
                ),
                [
                    '#408040',
                    '#356a35',
                    '#2b552b',
                    '#204020',
                    '#152b15'
                ]
            );

            assert.ok(
                shades.every(
                    color => color instanceof Color
                )
            );
        });
    });

    describe('#tints', function() {
        it('creates a tints palette', function() {
            const tints = Color.fromHSV(120, 50, 50).tints();
            assert.deepStrictEqual(
                tints.map(
                    color => color.toString()
                ),
                [
                    '#408040',
                    '#518b51',
                    '#639763',
                    '#74a274',
                    '#85ae85',
                    '#97b997',
                    '#a8c5a8',
                    '#b9d1b9',
                    '#cbdccb',
                    '#dce8dc'
                ]
            );

            assert.ok(
                tints.every(
                    color => color instanceof Color
                )
            );
        });

        it('works with tints argument', function() {
            const tints = Color.fromHSV(120, 50, 50).tints(5);
            assert.deepStrictEqual(
                tints.map(
                    color => color.toString()
                ),
                [
                    '#408040',
                    '#609560',
                    '#80aa80',
                    '#9fbf9f',
                    '#bfd5bf'
                ]
            );

            assert.ok(
                tints.every(
                    color => color instanceof Color
                )
            );
        });
    });

    describe('#tones', function() {
        it('creates a tones palette', function() {
            const tones = Color.fromHSV(120, 50, 50).tones();
            assert.deepStrictEqual(
                tones.map(
                    color => color.toString()
                ),
                [
                    '#408040',
                    '#468046',
                    '#4b804b',
                    '#518051',
                    '#578057',
                    '#5d805d',
                    '#638063',
                    '#688068',
                    '#6e806e',
                    '#748074'
                ]
            );

            assert.ok(
                tones.every(
                    color => color instanceof Color
                )
            );
        });

        it('works with tones argument', function() {
            const tones = Color.fromHSV(120, 50, 50).tones(5);
            assert.deepStrictEqual(
                tones.map(
                    color => color.toString()
                ),
                [
                    '#408040',
                    '#4a804a',
                    '#558055',
                    '#608060',
                    '#6a806a'
                ]
            );

            assert.ok(
                tones.every(
                    color => color instanceof Color
                )
            );
        });
    });

    describe('#palette', function() {
        it('creates a color palette', function() {
            const palette = Color.fromHSV(120, 50, 50)
                .palette();

            assert.ok('shades' in palette);
            assert.ok('tints' in palette);
            assert.ok('tones' in palette);

            assert.deepStrictEqual(
                {
                    shades: palette.shades
                        .map(
                            color => color.toString()
                        ),
                    tints: palette.tints
                        .map(
                            color => color.toString()
                        ),
                    tones: palette.tones
                        .map(
                            color => color.toString()
                        )
                },
                {
                    shades: [
                        '#408040',
                        '#3a743a',
                        '#346834',
                        '#2e5d2e',
                        '#295129',
                        '#234623',
                        '#1d3a1d',
                        '#172e17',
                        '#112311',
                        '#0c170c'
                    ],
                    tints: [
                        '#408040',
                        '#518b51',
                        '#639763',
                        '#74a274',
                        '#85ae85',
                        '#97b997',
                        '#a8c5a8',
                        '#b9d1b9',
                        '#cbdccb',
                        '#dce8dc'
                    ],
                    tones: [
                        '#408040',
                        '#468046',
                        '#4b804b',
                        '#518051',
                        '#578057',
                        '#5d805d',
                        '#638063',
                        '#688068',
                        '#6e806e',
                        '#748074'
                    ]
                }
            );

            assert.ok(
                palette.shades.every(
                    color => color instanceof Color
                )
            );
            assert.ok(
                palette.tints.every(
                    color => color instanceof Color
                )
            );
            assert.ok(
                palette.tones.every(
                    color => color instanceof Color
                )
            );
        });

        it('works with shades argument', function() {
            const palette = Color.fromHSV(120, 50, 50)
                .palette(5, 0, 0);

            assert.deepStrictEqual(
                palette.shades.map(
                    color => color.toString()
                ),
                [
                    '#408040',
                    '#356a35',
                    '#2b552b',
                    '#204020',
                    '#152b15'
                ]
            );

            assert.strictEqual(
                palette.tints.length,
                0
            );
            assert.strictEqual(
                palette.tones.length,
                0
            );
            assert.ok(
                palette.shades.every(
                    color => color instanceof Color
                )
            );
        });

        it('works with tints argument', function() {
            const palette = Color.fromHSV(120, 50, 50)
                .palette(0, 5, 0);

            assert.deepStrictEqual(
                palette.tints.map(
                    color => color.toString()
                ),
                [
                    '#408040',
                    '#609560',
                    '#80aa80',
                    '#9fbf9f',
                    '#bfd5bf'
                ]
            );

            assert.strictEqual(
                palette.shades.length,
                0
            );
            assert.strictEqual(
                palette.tones.length,
                0
            );
            assert.ok(
                palette.tints.every(
                    color => color instanceof Color
                )
            );
        });

        it('works with tones argument', function() {
            const palette = Color.fromHSV(120, 50, 50)
                .palette(0, 0, 5);

            assert.deepStrictEqual(
                palette.tones.map(
                    color => color.toString()
                ),
                [
                    '#408040',
                    '#4a804a',
                    '#558055',
                    '#608060',
                    '#6a806a'
                ]
            );

            assert.strictEqual(
                palette.shades.length,
                0
            );
            assert.strictEqual(
                palette.tints.length,
                0
            );
            assert.ok(
                palette.tones.every(
                    color => color instanceof Color
                )
            );
        });
    });

});
