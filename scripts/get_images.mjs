import axios from 'axios';
import fs from 'fs/promises';
import ogfs from 'fs';
import process from 'process';
import zlib from 'zlib';
import tar from 'tar';

console.log('Obtaining AstroGarden gallery');

const RELEASES_URL = 'https://api.github.com/repos/USA-RedDragon/astro.garden-images/releases';
const RELEASE_FILENAME = 'gallery.tar.gz';
const DESTINATION_PATH = 'public/gallery';

const tmpdir = ogfs.mkdtempSync('gallery-');
// Remove temporary directory
process.on('exit', () => {
  console.log(`Removing temporary directory ${tmpdir}`);
  ogfs.rmdirSync(tmpdir, { recursive: true });
});

const mkdirP = async (path) => {
  try {
    console.log(`[mkdir] ${path}`);
    return await fs.mkdir(path);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err;
    }
  }
};

const getImages = async () => {
  const resp = await axios.get(RELEASES_URL);
  if (resp.status !== 200) {
    throw new Error(`Could not obtain gallery, status ${resp.status}`);
  }
  const releases = resp.data;
  if (releases.length === 0) {
    throw new Error('No releases found');
  }
  const latestRelease = releases[0];
  const latestReleaseAssets = latestRelease.assets;
  if (latestReleaseAssets.length === 0) {
    throw new Error('No assets found for latest release');
  }
  const galleryAsset = latestReleaseAssets.find((asset) => asset.name === RELEASE_FILENAME);
  if (!galleryAsset) {
    throw new Error('Could not find gallery asset');
  }
  const galleryUrl = galleryAsset.browser_download_url;
  if (!galleryUrl) {
    throw new Error('Could not find gallery URL');
  }
  console.log(`Downloading gallery from ${galleryUrl}`);
  const galleryResp = await axios.get(galleryUrl, { responseType: 'stream' });
  if (galleryResp.status !== 200) {
    throw new Error('Could not download gallery');
  }

  const galleryFile = ogfs.createWriteStream(`${tmpdir}/${RELEASE_FILENAME}`);
  galleryResp.data.pipe(galleryFile);

  try {
    await new Promise((resolve, reject) => {
      galleryFile.on('finish', resolve);
      galleryFile.on('error', reject);
    });
    return `${tmpdir}/${RELEASE_FILENAME}`;
  } catch (err) {
    throw new Error('Could not save gallery file');
  }
};

const decompressImages = async (galleryPath) => {
  console.log(`Decompressing ${galleryPath}`);
  const galleryFile = ogfs.createReadStream(galleryPath);
  const galleryDecompressor = new zlib.Gunzip();
  const galleryDecompressed = ogfs.createWriteStream(`${tmpdir}/gallery.tar`);
  galleryFile.pipe(galleryDecompressor).pipe(galleryDecompressed);

  try {
    await new Promise((resolve, reject) => {
      galleryDecompressed.on('finish', resolve);
      galleryDecompressed.on('error', reject);
    });
  } catch (err) {
    throw new Error('Could not decompress gallery file');
  }

  console.log('Extracting gallery');

  const galleryExtractor = tar.extract({
    cwd: DESTINATION_PATH,
  });

  const galleryExtracted = ogfs.createReadStream(`${tmpdir}/gallery.tar`);
  galleryExtracted.pipe(galleryExtractor);

  try {
    await new Promise((resolve, reject) => {
      galleryExtractor.on('finish', resolve);
      galleryExtractor.on('error', reject);
    });
  } catch (err) {
    throw new Error('Could not extract gallery file');
  }
};

mkdirP(DESTINATION_PATH).then(() => {
  getImages().then((galleryPath) => {
    decompressImages(galleryPath).then(() => {
      console.log('Gallery downloaded and decompressed');
    }).catch((err) => {
      console.error(err);
    });
  }).catch((err) => {
    console.error(err);
  });
}).catch((err) => {
  console.error(err);
});
