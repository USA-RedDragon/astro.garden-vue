// This fakes the behavior of imagemin.mjs for use in CI where
// we don't want to actually imagemin every single run,
// only releases

import imagemin from 'imagemin';
import imageminOptipng from 'imagemin-optipng';
import prettyBytes from 'pretty-bytes';
import glob from 'glob';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

import colorutils from './colorutils.js';

const origPath = '_images';
const galleryPath = 'src/assets/gallery';
const galleryJSONPath = 'public/gallery';
const genFullresPath = `${galleryPath}/generated/fullres`;
const genHalfresPath = `${galleryPath}/generated/halfres`;
const otherDataImages = [];
const myDataImages = [];

async function mkdirP(path) {
    try {
        console.log(`[mkdir] ${path}`)
        return await fs.mkdir(path)
    } catch (err) {
        if (err.code !== "EEXIST") {
            throw err
        }
    }
}

console.log('Creating folders')
await mkdirP(galleryPath)
await mkdirP(galleryJSONPath)
await mkdirP(`${galleryJSONPath}/my-data`)
await mkdirP(`${galleryJSONPath}/other-data`)
await mkdirP(`${galleryPath}/generated`)
await mkdirP(genHalfresPath)
await mkdirP(genFullresPath)
await mkdirP(`${genHalfresPath}/my-data`)
await mkdirP(`${genHalfresPath}/other-data`)
await mkdirP(`${genFullresPath}/my-data`)
await mkdirP(`${genFullresPath}/other-data`)

const myFiles = await fs.readdir(`${origPath}/my-data`)
const myPngFiles = myFiles.filter(file => path.extname(file) === '.png');

const otherFiles = await fs.readdir(`${origPath}/other-data`)
const otherPngFiles = otherFiles.filter(file => path.extname(file) === '.png');

console.log('[My images] Faking halfres')
await myPngFiles.forEach(async (pngFile) => {
    const origFilePath = path.join(`${origPath}/my-data`, pngFile);
    const genFullresFilePath = path.join(`${genFullresPath}/my-data`, pngFile);

    // copy the fake.png file to the gen/fullres directory with the original filename
    await fs.copyFile('scripts/fake.png', genFullresFilePath);
    console.log(`Copied ${origFilePath} to ${genFullresFilePath}`);

    const webpFile = pngFile.replace(".png", ".webp")
    const jpegFile = pngFile.replace(".png", ".jpg")

    const genHalfresWebpFilePath = path.join(`${genHalfresPath}/my-data`, webpFile);
    const genHalfresJpegFilePath = path.join(`${genHalfresPath}/my-data`, jpegFile);

    await fs.copyFile('scripts/fake.jpg', genHalfresJpegFilePath);
    console.log(`Copied ${origFilePath} to ${genHalfresJpegFilePath}`);

    await fs.copyFile('scripts/fake.webp', genHalfresWebpFilePath);
    console.log(`Copied ${origFilePath} to ${genHalfresWebpFilePath}`);

    const colors = await colorutils.quantize(origFilePath);
    const theme = colorutils.palette(colorutils.score(colors));
    const imgMeta = JSON.parse(await fs.readFile(`${origPath}/my-data/${path.parse(origFilePath).name}.json`))
    const imgData = {
        width: 1,
        height: 1,
        title: imgMeta.title,
        text: imgMeta.text,
        src: `my-data/${path.parse(origFilePath).name}`,
        theme
    };
    myDataImages.push(imgData);

    console.log(`[My data] Writing JSON for ${imgData.src}`)
    await fs.writeFile(`${galleryJSONPath}/${imgData.src}.json`, JSON.stringify(imgData))
    await fs.writeFile(`${galleryJSONPath}/my-data.json`, JSON.stringify(myDataImages))
});

console.log('[Other images] Faking halfres')
await otherPngFiles.forEach(async (pngFile) => {
    const origFilePath = path.join(`${origPath}/other-data`, pngFile);
    const genFullresFilePath = path.join(`${genFullresPath}/other-data`, pngFile);

    // copy the fake.png file to the gen/fullres directory with the original filename
    await fs.copyFile('scripts/fake.png', genFullresFilePath);
    console.log(`Copied ${origFilePath} to ${genFullresFilePath}`);

    const webpFile = pngFile.replace(".png", ".webp")
    const jpegFile = pngFile.replace(".png", ".jpg")

    const genHalfresWebpFilePath = path.join(`${genHalfresPath}/other-data`, webpFile);
    const genHalfresJpegFilePath = path.join(`${genHalfresPath}/other-data`, jpegFile);

    await fs.copyFile('scripts/fake.jpg', genHalfresJpegFilePath);
    console.log(`Copied ${origFilePath} to ${genHalfresJpegFilePath}`);

    await fs.copyFile('scripts/fake.webp', genHalfresWebpFilePath);
    console.log(`Copied ${origFilePath} to ${genHalfresWebpFilePath}`);

    const colors = await colorutils.quantize(origFilePath);
    const theme = colorutils.palette(colorutils.score(colors));
    const imgMeta = JSON.parse(await fs.readFile(`${origPath}/other-data/${path.parse(origFilePath).name}.json`))
    const imgData = {
        width: 1,
        height: 1,
        title: imgMeta.title,
        text: imgMeta.text,
        src: `other-data/${path.parse(origFilePath).name}`,
        theme
    };
    otherDataImages.push(imgData);

    console.log(`[Other data] Writing JSON for ${imgData.src}`)
    await fs.writeFile(`${galleryJSONPath}/${imgData.src}.json`, JSON.stringify(imgData))
    await fs.writeFile(`${galleryJSONPath}/other-data.json`, JSON.stringify(otherDataImages))
})
