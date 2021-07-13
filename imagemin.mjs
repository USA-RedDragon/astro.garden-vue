import imagemin from 'imagemin';
import imageminOptipng from 'imagemin-optipng';
import prettyBytes from 'pretty-bytes';
import glob from 'glob';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

const origPath = '_images';
const galleryPath = 'src/assets/gallery';
const galleryJSONPath = 'public/gallery';
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
await mkdirP(galleryJSONPath)
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
                .then(async ({ width, height }) => {
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

                    const imgMeta = JSON.parse(await fs.readFile(`${origPath}/my-data/${path.parse(mat).name}.json`))

                    myDataImages.push({
                        width: Math.round(width * 0.5),
                        height: Math.round(height * 0.5),
                        title: imgMeta.title,
                        text: imgMeta.text,
                        src: `my-data/${path.parse(mat).name}`
                    });

                    await fs.writeFile(`${galleryJSONPath}/my-data.json`, JSON.stringify(myDataImages)).catch((err) => {
                        console.error(err);
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
                .then(async ({ width, height }) => {
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
                    
                    const imgMeta = JSON.parse(await fs.readFile(`${origPath}/other-data/${path.parse(mat).name}.json`))

                    otherDataImages.push({
                        width: Math.round(width * 0.5),
                        height: Math.round(height * 0.5),
                        title: imgMeta.title,
                        text: imgMeta.text,
                        src: `other-data/${path.parse(mat).name}`
                    });

                    await fs.writeFile(`${galleryJSONPath}/other-data.json`, JSON.stringify(otherDataImages)).catch((err) => {
                        console.error(err);
                    });
                });
        }
    }
});
