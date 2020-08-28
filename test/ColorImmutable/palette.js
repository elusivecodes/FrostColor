const assert = require('assert').strict;
const { ColorImmutable } = require('../../dist/frost-color.min');

describe('ColorImmutable Palette', function() {

    describe('#shades', function() {
        it('creates a shades palette', function() {
            const shades = ColorImmutable.fromHSV(120, 50, 50).shades();
            assert.deepEqual(
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
                    color => color instanceof ColorImmutable
                )
            );
        });

        it('works with shades argument', function() {
            const shades = ColorImmutable.fromHSV(120, 50, 50).shades(5);
            assert.deepEqual(
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
                    color => color instanceof ColorImmutable
                )
            );
        });
    });

    describe('#tints', function() {
        it('creates a tints palette', function() {
            const tints = ColorImmutable.fromHSV(120, 50, 50).tints();
            assert.deepEqual(
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
                    color => color instanceof ColorImmutable
                )
            );
        });

        it('works with tints argument', function() {
            const tints = ColorImmutable.fromHSV(120, 50, 50).tints(5);
            assert.deepEqual(
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
                    color => color instanceof ColorImmutable
                )
            );
        });
    });

    describe('#tones', function() {
        it('creates a tones palette', function() {
            const tones = ColorImmutable.fromHSV(120, 50, 50).tones();
            assert.deepEqual(
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
                    color => color instanceof ColorImmutable
                )
            );
        });

        it('works with tones argument', function() {
            const tones = ColorImmutable.fromHSV(120, 50, 50).tones(5);
            assert.deepEqual(
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
                    color => color instanceof ColorImmutable
                )
            );
        });
    });

    describe('#palette', function() {
        it('creates a color palette', function() {
            const palette = ColorImmutable.fromHSV(120, 50, 50)
                .palette();

            assert.ok('shades' in palette);
            assert.ok('tints' in palette);
            assert.ok('tones' in palette);

            assert.deepEqual(
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
                    color => color instanceof ColorImmutable
                )
            );
            assert.ok(
                palette.tints.every(
                    color => color instanceof ColorImmutable
                )
            );
            assert.ok(
                palette.tones.every(
                    color => color instanceof ColorImmutable
                )
            );
        });

        it('works with shades argument', function() {
            const palette = ColorImmutable.fromHSV(120, 50, 50)
                .palette(5, 0, 0);

            assert.deepEqual(
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

            assert.equal(
                palette.tints.length,
                0
            );
            assert.equal(
                palette.tones.length,
                0
            );
            assert.ok(
                palette.shades.every(
                    color => color instanceof ColorImmutable
                )
            );
        });

        it('works with tints argument', function() {
            const palette = ColorImmutable.fromHSV(120, 50, 50)
                .palette(0, 5, 0);

            assert.deepEqual(
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

            assert.equal(
                palette.shades.length,
                0
            );
            assert.equal(
                palette.tones.length,
                0
            );
            assert.ok(
                palette.tints.every(
                    color => color instanceof ColorImmutable
                )
            );
        });

        it('works with tones argument', function() {
            const palette = ColorImmutable.fromHSV(120, 50, 50)
                .palette(0, 0, 5);

            assert.deepEqual(
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

            assert.equal(
                palette.shades.length,
                0
            );
            assert.equal(
                palette.tints.length,
                0
            );
            assert.ok(
                palette.tones.every(
                    color => color instanceof ColorImmutable
                )
            );
        });
    });

});
