import imagemin from 'imagemin';
import imageminOptipng from 'imagemin-optipng';
import prettyBytes from 'pretty-bytes';
import imageminWebp from 'imagemin-webp';
import glob from 'glob';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

const origPath = '_images';
const galleryPath = 'src/assets/gallery';
const genFullresPath = `${galleryPath}/generated/fullres`;
const genHalfresPath = `${galleryPath}/generated/halfres`;
const otherDataImages = [];
const myDataImages = [];

async function mkdirP(path) {
    try {
        return await fs.mkdir(path)
    } catch (err) {
        if (err.code !== "EEXIST") {
            throw err
        }
    }
}

await mkdirP(galleryPath)
await mkdirP(`${galleryPath}/generated`)
await mkdirP(genHalfresPath)
await mkdirP(genFullresPath)
await mkdirP(`${genHalfresPath}/my-data`)
await mkdirP(`${genHalfresPath}/other-data`)
await mkdirP(`${genFullresPath}/my-data`)
await mkdirP(`${genFullresPath}/other-data`)

// Optimize original pngs
await imagemin([`${origPath}/my-data/*.png`], {
    destination: `${genFullresPath}/my-data`,
    plugins: [
        imageminOptipng({
            optimizationLevel: 5
        }),
    ]
});

await imagemin([`${origPath}/other-data/*.png`], {
    destination: `${genFullresPath}/other-data`,
    plugins: [
        imageminOptipng({
            optimizationLevel: 5
        }),
    ]
});

// Reduce to 1/2 size and create jpeg + webp
glob(`${genFullresPath}/my-data/*.png`, async (err, matches) => {
    if (err) {
        console.error(err);
    } else {
        for (const mat of matches) {
            const size = (await fs.stat(mat)).size
            sharp(mat)
                .metadata()
                .then(({ width, height }) => {
                    sharp(mat)
                        .resize(Math.round(width * 0.5))
                        .toFormat('jpeg')
                        .jpeg({ quality: 80, progressive: true, mozjpeg: true })
                        .toFile(`${genHalfresPath}/my-data/${path.parse(mat).name}.jpg`).then((out) => {
                            console.log(`${mat} to JPEG - ${prettyBytes(size)} -> ${prettyBytes(out.size)}`);
                        }).catch((err) => {
                            console.error(err)
                        });

                    sharp(mat)
                        .resize(Math.round(width * 0.5))
                        .toFormat('webp')
                        .webp({ quality: 80 })
                        .toFile(`${genHalfresPath}/my-data/${path.parse(mat).name}.webp`).then((out) => {
                            console.log(`${mat} to WEBP - ${prettyBytes(size)} -> ${prettyBytes(out.size)}`);
                        }).catch((err) => {
                            console.error(err)
                        });

                    myDataImages.push({
                        name: `my-data/${path.parse(mat).name}`,
                        width: Math.round(width * 0.5),
                        height: Math.round(height * 0.5),
                    });
                });
        }
    }
});

glob(`${genFullresPath}/other-data/*.png`, async (err, matches) => {
    if (err) {
        console.error(err);
    } else {
        for (const mat of matches) {
            const size = (await fs.stat(mat)).size
            sharp(mat)
                .metadata()
                .then(({ width }) => {
                    sharp(mat)
                        .resize(Math.round(width * 0.5))
                        .toFormat('jpeg')
                        .jpeg({ quality: 80, progressive: true, mozjpeg: true })
                        .toFile(`${genHalfresPath}/other-data/${path.parse(mat).name}.jpg`).then((out) => {
                            console.log(`${mat} to JPEG - ${prettyBytes(size)} -> ${prettyBytes(out.size)}`);
                        }).catch((err) => {
                            console.error(err)
                        });

                    sharp(mat)
                        .resize(Math.round(width * 0.5))
                        .toFormat('webp')
                        .webp({ quality: 80 })
                        .toFile(`${genHalfresPath}/other-data/${path.parse(mat).name}.webp`).then((out) => {
                            console.log(`${mat} to WEBP - ${prettyBytes(size)} -> ${prettyBytes(out.size)}`);
                        }).catch((err) => {
                            console.error(err)
                        });

                    otherDataImages.push({
                        name: `other-data/${path.parse(mat).name}`,
                        width: Math.round(width * 0.5),
                        height: Math.round(height * 0.5),
                    });
                });
        }
    }
});

await fs.writeFile(`${galleryPath}/other-data.json`, JSON.stringify(otherDataImages));
await fs.writeFile(`${galleryPath}/my-data.json`, JSON.stringify(myDataImages));
