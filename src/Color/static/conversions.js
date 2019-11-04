/**
 * Color (Static) Conversions
 */

Object.assign(Color, {

    /**
     * Convert CMY color values to CMYK.
     * @param {number} c The cyan value. (0, 100)
     * @param {number} m The magenta value. (0, 100)
     * @param {number} y The yellow value. (0, 100)
     * @returns {number[]} An array containing the CMYK values.
     */
    CMY2CMYK(c, m, y) {
        const k = Math.min(c, m, y);

        if (k === 100) {
            return [0, 0, 0, k];
        }

        k /= 100;

        return [
            (c / 100 - k)
            / (1 - k) * 100,
            (m / 100 - k)
            / (1 - k) * 100,
            (y / 100 - k)
            / (1 - k) * 100,
            k * 100
        ];
    },

    /**
     * Convert CMY color values to RGB.
     * @param {number} c The cyan value. (0, 100)
     * @param {number} m The magenta value. (0, 100)
     * @param {number} y The yellow value. (0, 100)
     * @returns {number[]} An array containing the RGB values.
     */
    CMY2RGB(c, m, y) {
        return [
            (1 - c / 100)
            * 255,
            (1 - m / 100)
            * 255,
            (1 - y / 100)
            * 255
        ];
    },

    /**
     * Convert CMYK color values to CMY.
     * @param {number} c The cyan value. (0, 100)
     * @param {number} m The magenta value. (0, 100)
     * @param {number} y The yellow value. (0, 100)
     * @param {number} k The key value. (0, 100)
     * @returns {number[]} An array containing the CMY values.
     */
    CMYK2CMY(c, m, y, k) {
        k /= 100;

        return [
            (
                c / 100
                * (1 - k)
                + k
            ) * 100,
            (
                m / 100
                * (1 - k)
                + k
            ) * 100,
            (
                y / 100
                * (1 - k)
                + k
            ) * 100
        ];
    },

    /**
     * Convert HSL color values to RGB.
     * @param {number} h The hue value. (0, 360)
     * @param {number} s The saturation value. (0, 100)
     * @param {number} l The lightness value. (0, 100)
     * @returns {number[]} An array containing the RGB values.
     */
    HSL2RGB(h, s, l) {
        if (!l) {
            return [0, 0, 0];
        }

        h /= 360;
        s /= 100;
        l /= 100;

        const v2 = l < 0.5 ?
            l * (1 + s) :
            (l + s) - (s * l),
            v1 = 2 * l - v2;

        return [
            this.RGBHue(
                v1,
                v2,
                h + (1 / 3)
            ) * 255,
            this.RGBHue(
                v1,
                v2,
                h
            ) * 255,
            this.RGBHue(
                v1,
                v2,
                h - (1 / 3)
            ) * 255
        ];
    },

    /**
     * Convert HSV color values to RGB.
     * @param {number} h The hue value. (0, 360)
     * @param {number} s The saturation value. (0, 100)
     * @param {number} v The brightness value (0, 100)
     * @returns {number[]} An array containing the RGB values.
     */
    HSV2RGB(h, s, v) {
        v /= 100;

        if (!s) {
            return [
                v * 255,
                v * 255,
                v * 255
            ];
        }

        h = (h / 60) % 6;
        s /= 100;

        const vi = Math.floor(h),
            v1 = v
                * (1 - s),
            v2 = v
                * (
                    1 - s
                    * (h - vi)
                ),
            v3 = v
                * (
                    1 - s
                    * (
                        1
                        - (h - vi)
                    )
                );

        let r, g, b;

        switch (vi) {
            case 0:
                r = v;
                g = v3;
                b = v1;
                break;
            case 1:
                r = v2;
                g = v;
                b = v1;
                break;
            case 2:
                r = v1;
                g = v;
                b = v3;
                break;
            case 3:
                r = v1;
                g = v2;
                b = v;
                break;
            case 4:
                r = v3;
                g = v1;
                b = v;
                break;
            default:
                r = v;
                g = v1;
                b = v2;
                break;
        }

        return [
            r * 255,
            g * 255,
            b * 255
        ];
    },

    /**
     * Convert RGB color values to CMY.
     * @param {number} r The red value. (0, 255)
     * @param {number} g The green value. (0, 255)
     * @param {number} b The blue value. (0, 255)
     * @returns {number[]} An array containing the CMY values.
     */
    RGB2CMY(r, g, b) {
        return [
            (
                1
                - (r / 255)
            ) * 100,
            (
                1 -
                (g / 255)
            ) * 100,
            (
                1
                - (b / 255)
            ) * 100
        ];
    },

    /**
     * Calculate the luminance of an RGB color.
     * @param {number} r The red value. (0, 255)
     * @param {number} g The green value. (0, 255)
     * @param {number} b The blue value. (0, 255)
     * @returns {number} The luminance value.
     */
    RGB2Luma(r, g, b) {
        return (0.2126 * (r / 255))
            + (0.7152 * (g / 255))
            + (0.0722 * (b / 255));
    },

    /**
     * Convert RGB color values to HSL.
     * @param {number} r The red value. (0, 255)
     * @param {number} g The green value. (0, 255)
     * @param {number} b The blue value. (0, 255)
     * @returns {number[]} An array containing the HSL values.
     */
    RGB2HSL(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;

        const min = Math.min(r, g, b),
            max = Math.max(r, g, b),
            diff = max - min,
            l = (max + min) / 2;

        if (!diff) {
            return [0, 0, l * 100];
        }

        const s = l < 0.5 ?
            diff / (max + min) :
            diff / (2 - max - min),
            deltaR = (
                (
                    (max - r)
                    / 6
                )
                + (diff / 2)
            ) / diff,
            deltaG = (
                (
                    (max - g)
                    / 6
                )
                + (diff / 2)
            ) / diff,
            deltaB = (
                (
                    (max - b)
                    / 6
                )
                + (diff / 2)
            ) / diff;

        let h = 0;

        switch (max) {
            case r:
                h = deltaB - deltaG;
                break;
            case g:
                h = 1 / 2
                    + deltaR
                    - deltaB;
                break;
            case b:
                h = 2 / 3
                    + deltaG
                    - deltaR;
                break;
        }

        return [
            (
                (h + 1) % 1
            ) * 360,
            s * 100,
            l * 100
        ];
    },

    /**
     * Convert RGB color values to HSV.
     * @param {number} r The red value. (0, 255)
     * @param {number} g The green value. (0, 255)
     * @param {number} b The blue value. (0, 255)
     * @returns {number[]} An array containing the HSV values.
     */
    RGB2HSV(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;

        const min = Math.min(r, g, b),
            max = Math.max(r, g, b),
            diff = max - min,
            v = max;

        if (!diff) {
            return [0, 0, v * 100];
        }

        const s = diff / max,
            deltaR = (
                (
                    (max - r)
                    / 6
                )
                + (diff / 2)
            ) / diff,
            deltaG = (
                (
                    (max - g)
                    / 6
                )
                + (diff / 2)
            ) / diff,
            deltaB = (
                (
                    (max - b)
                    / 6
                )
                + (diff / 2)
            ) / diff;

        let h = 0;

        switch (max) {
            case r:
                h = deltaB - deltaG;
                break;
            case g:
                h = 1 / 2
                    + deltaR - deltaB;
                break;
            case b:
                h = 2 / 3
                    + deltaG - deltaR;
                break;
        }

        h = (h + 1) % 1;

        return [
            h * 360,
            s * 100,
            v * 100
        ];
    },

    /**
     * Calculate the R, G or B value of a hue.
     * @param {number} v1 The first value.
     * @param {number} v2 The second value.
     * @param {number} vH The hue value.
     * @returns {number} The R, G or B value.
     */
    RGBHue(v1, v2, vH) {
        vH = (vH + 1) % 1;

        if (6 * vH < 1) {
            return v1
                + (v2 - v1)
                * 6
                * vH;
        }

        if (2 * vH < 1) {
            return v2;
        }

        if (3 * vH < 2) {
            return v1
                + (v2 - v1)
                * (
                    (2 / 3)
                    - vH
                )
                * 6;
        }

        return v1;
    }
});
