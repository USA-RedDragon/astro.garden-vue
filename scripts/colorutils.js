const materialColorUtils = require('@usa-reddragon/material-color-utilities');
const getPixels = require('get-pixels');

exports.quantize = (path) => {
    return new Promise((resolve, reject) => {
        getPixels(path, (err, pixels) => {
            if (err) {
                reject(err);
            } else {
                const pixelArray = [];
                for (let y = 0; y < pixels.shape[1]; y++) {
                    for (let x = 0; x < pixels.shape[0]; x++) {
                        const r = pixels.get(x, y, 0);
                        const g = pixels.get(x, y, 1);
                        const b = pixels.get(x, y, 2);
                        const a = pixels.get(x, y, 3);
                        const color = (a & 255) << 24 | (r & 255) << 16 | (g & 255) << 8 | (b & 255);
                        pixelArray.push(color);
                    }
                }
                resolve(materialColorUtils.QuantizerCelebi.quantize(pixelArray, 128));
            }
        });
    });
}

exports.score = (population) => {
    return materialColorUtils.Score.score(population);
}

exports.palette = (scored) => {
    const palette = materialColorUtils.CorePalette.of(scored[0]);
    return {
        a1: shadesFrom(palette.a1.hue, palette.a1.chroma),
        a2: shadesFrom(palette.a2.hue, palette.a2.chroma),
        a3: shadesFrom(palette.a3.hue, palette.a3.chroma),
        n1: shadesFrom(palette.n1.hue, palette.n1.chroma),
        n2: shadesFrom(palette.n2.hue, palette.n2.chroma),
    }
}

function shadesFrom(hue, chroma) {
    const cappedChroma = Math.min(chroma, 40);
    const shades = [];
    shades.push(materialColorUtils.hexFromArgb(materialColorUtils.CAM16.fromJch(99, cappedChroma, hue).viewedInSrgb()));
    shades.push(materialColorUtils.hexFromArgb(materialColorUtils.CAM16.fromJch(95, cappedChroma, hue).viewedInSrgb()));
    for (let i=2; i < 13; i++) {
        let lStar = (i == 6) ? 49.6:(100 - 10 * (i - 1))
        shades.push(materialColorUtils.hexFromArgb(materialColorUtils.CAM16.fromJch(lStar, cappedChroma, hue).viewedInSrgb()));
    }
    return shades;
}
