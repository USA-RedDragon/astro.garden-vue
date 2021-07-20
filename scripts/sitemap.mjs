import routes from '../src/router/routes.mjs';
import { Path } from 'path-parser';
import fs from 'fs';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

console.log('Generating sitemap');

const stream = new SitemapStream( { hostname: 'https://astro.garden' } );
const images = JSON.parse(fs.readFileSync('public/gallery/my-data.json'));
images.push(...JSON.parse(fs.readFileSync('public/gallery/other-data.json')));

const sitemapRoutes = [];

for (const route of routes) {
  const path = new Path(route.path);

  if (!path.hasUrlParams) {
    sitemapRoutes.push({
      url: route.path,
      changefreq: route.sitemap.changefreq,
      priority: route.sitemap.priority,
    });
  } else if (path.hasUrlParams && route.path.startsWith('/gallery')) {
    for (const pic of images) {
      const [gallery, image] = pic.src.split('/');
      sitemapRoutes.push({
        url: path.build({ gallery, image }, { urlParamsEncoding: 'none' }),
        changefreq: route.sitemap.changefreq,
        priority: route.sitemap.priority,
      });
    }
  } else {
    console.error("You have URL parameters not accounted for in the sitemap");
    process.exit(1);
  }
}

streamToPromise(Readable.from(sitemapRoutes).pipe(stream)).then((data) => {
  fs.writeFileSync('public/sitemap.xml', data);
  console.log('Sitemap done');
});
