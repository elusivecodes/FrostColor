Object.assign(Color, {

    mix(color1, color2, amount) {
        const c1 = color1._color.toRGB();
        const c2 = color2._color.toRGB();

        const r = lerp(c1.r, c2.r, amount);
        const g = lerp(c1.g, c2.g, amount);
        const b = lerp(c1.b, c2.b, amount);
        const a = lerp(c1.a, c2.a, amount);

        return new RGB(r, g, b, a);
    },

    multiply(color1, color2) {
        const c1 = color1._color.toRGB();
        const c2 = color2._color.toRGB();

        const r = (c1.r / 255) * (c2.r / 255) * 255;
        const g = (c1.g / 255) * (c2.g / 255) * 255;
        const b = (c1.b / 255) * (c2.b / 255) * 255;
        const a = c1.a * c2.a;

        return new RGB(r, g, b, a);
    }

});