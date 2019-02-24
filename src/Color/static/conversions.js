Object.assign(Color, {

    /**
     * Converts CMY color values to CMYK
     * @param {number} c
     * @param {number} m
     * @param {number} y
     * @returns {number[]}
     */
    CMY2CMYK(c, m, y) {
        const k = Math.min(c, m, y);

        if (k === 100) {
            return [0, 0, 0, k];
        }

        return [
            (c - k) / (100 - k) * 100,
            (m - k) / (100 - k) * 100,
            (y - k) / (100 - k) * 100,
            k
        ];
    },

    /**
     * Converts CMY color values to RGB
     * @param {number} c
     * @param {number} m
     * @param {number} y
     * @returns {number[]}
     */
    CMY2RGB(c, m, y) {
        return [
            (100 - c) * 2.5,
            (100 - m) * 2.5,
            (100 - y) * 2.5
        ];
    },

    /**
     * Converts CMYK color values to CMY
     * @param {number} c
     * @param {number} m
     * @param {number} y
     * @param {number} k
     * @returns {number[]}
     */
    CMYK2CMY(c, m, y, k) {
        return [
            c * (100 - k) + k,
            m * (100 - k) + k,
            y * (100 - k) + k
        ];
    },

    /**
     * Converts HSL color values to RGB
     * @param {number} h
     * @param {number} s
     * @param {number} l
     * @returns {number[]}
     */
    HSL2RGB(h, s, l) {
        if (l == 0) {
            return [0, 0, 0];
        }

        h /= 360;
        s /= 100;
        l /= 100;

        const v2 = l < 0.5 ?
            l * (1 + s) :
            (l + s) - (s * l);
        const v1 = 2 * l - v2;

        const r = this.RGBHue(v1, v2, h + (1 / 3));
        const g = this.RGBHue(v1, v2, h);
        const b = this.RGBHue(v1, v2, h - (1 / 3));

        return [r * 255, g * 255, b * 255];
    },

    /**
     * Converts HSV color values to RGB
     * @param {number} h
     * @param {number} s
     * @param {number} v
     * @returns {number[]}
     */
    HSV2RGB(h, s, v) {
        v /= 100;

        if (s == 0) {
            return [v * 255, v * 255, v * 255];
        }

        h = (h / 60) % 6;
        s /= 100;

        const vi = Math.floor(h);
        const v1 = v * (1 - s);
        const v2 = v * (1 - s * (h - vi));
        const v3 = v * (1 - s * (1 - (h - vi)));

        let r;
        let g;
        let b;
        if (vi == 0) {
            r = v;
            g = v3;
            b = v1;
        } else if (vi == 1) {
            r = v2;
            g = v;
            b = v1;
        } else if (vi == 2) {
            r = v1;
            g = v;
            b = v3;
        } else if (vi == 3) {
            r = v1;
            g = v2;
            b = v;
        } else if (vi == 4) {
            r = v3;
            g = v1;
            b = v;
        } else {
            r = v;
            g = v1;
            b = v2;
        }

        return [r * 255, g * 255, b * 255];
    },

    /**
     * Converts RGB color values to CMY
     * @param {number} r
     * @param {number} g
     * @param {number} b
     * @returns {number[]}
     */
    RGB2CMY(r, g, b) {
        return [
            100 - (r / 2.55),
            100 - (g / 2.55),
            100 - (b / 2.55)
        ];
    },

    /**
     * Calculates the luminance of an RGB color
     * @param {number} r
     * @param {number} g
     * @param {number} b
     * @returns {number}
     */
    RGB2Luma(r, g, b) {
        return (0.2126 * (r / 255)) +
            (0.7152 * (g / 255)) +
            (0.0722 * (b / 255));
    },

    /**
     * Converts RGB color values to HSL
     * @param {number} r
     * @param {number} g
     * @param {number} b
     * @returns {number[]}
     */
    RGB2HSL(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;

        const min = Math.min(r, g, b);
        const max = Math.max(r, g, b);
        const diff = max - min;

        const l = (max + min) / 2;

        if (diff == 0) {
            return [0, 0, l * 100];
        }

        const s = l < 0.5 ?
            diff / (max + min) :
            diff / (2 - max - min);

        const deltaR = (((max - r) / 6) + (diff / 2)) / diff;
        const deltaG = (((max - g) / 6) + (diff / 2)) / diff;
        const deltaB = (((max - b) / 6) + (diff / 2)) / diff;

        let h = 0;
        if (r == max) {
            h = deltaB - deltaG;
        } else if (g == max) {
            h = (1 / 2) + deltaR - deltaB;
        } else if (b == max) {
            h = (2 / 3) + deltaG - deltaR;
        }

        h = (h + 1) % 1;

        return [h * 360, s * 100, l * 100];
    },

    /**
     * Converts RGB color values to HSV
     * @param {number} r
     * @param {number} g
     * @param {number} b
     * @returns {number[]}
     */
    RGB2HSV(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;

        const min = Math.min(r, g, b);
        const max = Math.max(r, g, b);
        const diff = max - min;

        const v = max;

        if (diff == 0) {
            return [0, 0, v * 100];
        }

        const s = diff / max;

        const deltaR = (((max - r) / 6) + (diff / 2)) / diff;
        const deltaG = (((max - g) / 6) + (diff / 2)) / diff;
        const deltaB = (((max - b) / 6) + (diff / 2)) / diff;

        let h = 0;
        if (r == max) {
            h = deltaB - deltaG;
        } else if (g == max) {
            h = (1 / 2) + deltaR - deltaB;
        } else if (b == max) {
            h = (2 / 3) + deltaG - deltaR;
        }

        h = (h + 1) % 1;

        return [h * 360, s * 100, v * 100];
    },

    /**
     * Calculates the R, G or B value of a hue
     * @param {number} v1
     * @param {number} v2
     * @param {number} vH
     * @returns {number}
     */
    RGBHue(v1, v2, vH) {
        vH = (vH + 1) % 1;

        if (6 * vH < 1) {
            return v1 + (v2 - v1) * 6 * vH;
        }

        if (2 * vH < 1) {
            return v2;
        }

        if (3 * vH < 2) {
            return v1 + (v2 - v1) * ((2 / 3) - vH) * 6;
        }

        return v1;
    }
});
